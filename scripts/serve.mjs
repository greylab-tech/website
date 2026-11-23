import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../out",
);
if (!(await Bun.file(path.join(root, "index.html")).exists())) {
  console.error("No production export found. Run bun run build first.");
  process.exit(1);
}
const server = Bun.serve({
  port: Number(process.env.PORT || 4173),
  hostname: process.env.HOST || "127.0.0.1",
  async fetch(request) {
    if (request.method !== "GET" && request.method !== "HEAD")
      return new Response("Method not allowed", {
        status: 405,
        headers: { Allow: "GET, HEAD" },
      });
    let pathname;
    try {
      pathname = decodeURIComponent(new URL(request.url).pathname);
    } catch {
      return new Response("Bad request", { status: 400 });
    }
    if (pathname.length > 1 && pathname.endsWith("/")) {
      const canonical = new URL(request.url);
      canonical.pathname = pathname.replace(/\/+$/, "");
      return Response.redirect(canonical, 308);
    }
    const requested = path.resolve(root, `.${pathname}`);
    if (requested !== root && !requested.startsWith(root + path.sep))
      return new Response("Not found", { status: 404 });
    const candidates = pathname.endsWith("/")
      ? [path.join(requested, "index.html")]
      : [requested, `${requested}.html`, path.join(requested, "index.html")];
    for (const candidate of candidates) {
      const file = Bun.file(candidate);
      if (await file.exists())
        return new Response(request.method === "HEAD" ? null : file, {
          headers: {
            "Content-Type": file.type,
            ...(pathname.startsWith("/_next/static/")
              ? { "Cache-Control": "public, max-age=31536000, immutable" }
              : {}),
          },
        });
    }
    return new Response(Bun.file(path.join(root, "404.html")), {
      status: 404,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  },
});
console.log(`GreyLab production preview: ${server.url}`);

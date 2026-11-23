#!/usr/bin/env bun

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// No server or browser is needed: run after `bun run build`.
const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const publicRoot = path.join(projectRoot, "public");
const exportRoot = path.join(projectRoot, "out");
const failures = new Set();
const sourceAssets = new Set();
const exportAssets = new Set();
const linkedRoutes = new Set();
const assetExtension =
  /\.(?:avif|bmp|gif|ico|jpe?g|png|svg|webp|mp4|webm|mov|m4v|ogv|mp3|ogg|wav|woff2?|ttf|otf|eot|pdf|css|m?js)$/i;

function filesIn(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(directory, entry.name);
    return entry.isDirectory() ? filesIn(absolute) : [absolute];
  });
}

function relative(file) {
  return path.relative(projectRoot, file);
}

function cleanUrl(value) {
  const decoded = value
    .trim()
    .replaceAll("&amp;", "&")
    .replaceAll("&#x27;", "'")
    .replaceAll("&#39;", "'")
    .replaceAll("&quot;", '"')
    .replace(/^["']|["']$/g, "");
  if (
    !decoded ||
    decoded.startsWith("#") ||
    /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(decoded)
  )
    return null;
  try {
    return decodeURIComponent(decoded.split(/[?#]/, 1)[0]);
  } catch {
    return decoded.split(/[?#]/, 1)[0];
  }
}

function isFile(file) {
  return existsSync(file) && statSync(file).isFile();
}

function exportedPage(route) {
  const pathname = route.replace(/^\/+|\/+$/g, "");
  return [
    path.join(exportRoot, pathname ? `${pathname}.html` : "index.html"),
    path.join(exportRoot, pathname, "index.html"),
  ].find(isFile);
}

function inspectAsset(value, origin, built = false) {
  const url = cleanUrl(value);
  if (!url || !assetExtension.test(url) || url.includes("${")) return;
  // Source literals use public URLs. Relative CSS URLs resolve beside their file.
  const target = url.startsWith("/")
    ? path.join(built ? exportRoot : publicRoot, url)
    : path.resolve(path.dirname(origin), url);
  (built ? exportAssets : sourceAssets).add(target);
  if (!isFile(target))
    failures.add(`Missing asset ${url} referenced by ${relative(origin)}`);
}

function inspectCss(content, origin, built) {
  for (const match of content.matchAll(/url\(\s*["']?([^\s"')]+)["']?\s*\)/g)) {
    inspectAsset(match[1], origin, built);
  }
}

const declaredRoutes = new Set();
for (const file of filesIn(path.join(projectRoot, "app"))) {
  if (!/^page\.(?:jsx?|tsx?)$/.test(path.basename(file))) continue;
  const segments = path
    .relative(path.join(projectRoot, "app"), path.dirname(file))
    .split(path.sep);
  if (segments.some((segment) => segment.includes("["))) continue;
  const route = segments
    .filter(
      (segment) =>
        segment && !segment.startsWith("(") && !segment.startsWith("@"),
    )
    .join("/");
  declaredRoutes.add(`/${route}`);
}

for (const [filename, prefix] of [
  ["projects.ts", "projects"],
  ["blogs.ts", "blogs"],
]) {
  const source = path.join(projectRoot, "data", filename);
  if (!isFile(source)) {
    failures.add(`Missing route data: ${relative(source)}`);
    continue;
  }
  const slugs = [
    ...readFileSync(source, "utf8").matchAll(
      /["']?slug["']?\s*:\s*["']([^"']+)["']/g,
    ),
  ];
  for (const [, slug] of slugs) declaredRoutes.add(`/${prefix}/${slug}`);
}

if (!existsSync(exportRoot)) {
  failures.add(
    "Missing out/ static export. Run `bun run build` before this check.",
  );
} else {
  for (const route of declaredRoutes) {
    if (!exportedPage(route)) failures.add(`Missing exported route: ${route}`);
  }
}

for (const directory of ["app", "components", "data", "styles"]) {
  for (const file of filesIn(path.join(projectRoot, directory))) {
    if (!/\.(?:jsx?|tsx?|css|json)$/.test(file)) continue;
    const content = readFileSync(file, "utf8");
    // Pick complete literal public URLs. Interpolated strings are covered by rendered HTML.
    for (const match of content.matchAll(
      /["'`]((?:\/(?!\/))[^"'`\s<>]+)["'`]/g,
    )) {
      inspectAsset(match[1], file);
    }
    if (file.endsWith(".css")) inspectCss(content, file, false);
  }
}
for (const file of filesIn(publicRoot).filter((file) =>
  file.endsWith(".css"),
)) {
  inspectCss(readFileSync(file, "utf8"), file, false);
}

const exportedFiles = filesIn(exportRoot);
const htmlFiles = exportedFiles.filter((file) => file.endsWith(".html"));
for (const file of htmlFiles) {
  const content = readFileSync(file, "utf8");
  for (const match of content.matchAll(
    /\b(src|href|poster|srcset)\s*=\s*["']([^"']*)["']/gi,
  )) {
    const [, attribute, value] = match;
    if (attribute.toLowerCase() === "srcset") {
      for (const item of value.split(","))
        inspectAsset(item.trim().split(/\s+/)[0], file, true);
    } else {
      inspectAsset(value, file, true);
      if (attribute.toLowerCase() === "href") {
        const url = cleanUrl(value);
        if (url && url.startsWith("/") && !path.posix.extname(url))
          linkedRoutes.add(url);
      }
    }
  }
  inspectCss(content, file, true);
}
for (const file of exportedFiles.filter((file) => file.endsWith(".css"))) {
  inspectCss(readFileSync(file, "utf8"), file, true);
}
for (const route of linkedRoutes) {
  if (!exportedPage(route))
    failures.add(`Internal link has no exported page: ${route}`);
}

const publicFiles = filesIn(publicRoot);
const publicBytes = publicFiles.reduce(
  (total, file) => total + statSync(file).size,
  0,
);
console.log(
  `Checked ${declaredRoutes.size} declared routes, ${htmlFiles.length} exported HTML files, ${sourceAssets.size} source asset paths, and ${exportAssets.size} built asset paths.`,
);
console.log(
  `Public assets: ${publicFiles.length} files, ${(publicBytes / 1024 / 1024).toFixed(2)} MiB.`,
);
if (failures.size) {
  for (const failure of failures) console.error(`ERROR: ${failure}`);
  process.exitCode = 1;
} else {
  console.log(
    "All declared routes, internal page links, and local assets exist.",
  );
}

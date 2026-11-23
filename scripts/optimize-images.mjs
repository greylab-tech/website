#!/usr/bin/env bun

import { createHash } from "node:crypto";
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { projects } from "../data/projects.ts";
import { blogs } from "../data/blogs.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDirectory = path.join(root, "public/images/responsive");
const widths = [480, 800, 1200, 1920];
const sources = [
  ...new Set([
    ...projects.flatMap((project) => [
      project.image,
      ...(project.gallery ?? []),
    ]),
    ...blogs.flatMap((post) => [post.image, post.bodyImage]),
  ]),
]
  .filter(Boolean)
  .sort();
const manifest = {};
const generated = new Map();
await mkdir(outputDirectory, { recursive: true });

for (const source of sources) {
  const input = path.join(root, "public", source);
  const inputBytes = await readFile(input);
  const metadata = await sharp(inputBytes).metadata();
  if (!metadata.width || !metadata.height) continue;
  if (metadata.width <= 1200 && inputBytes.length <= 300 * 1024) continue;
  const hash = createHash("sha1").update(inputBytes).digest("hex").slice(0, 12);
  let variants = generated.get(hash);
  if (!variants) {
    variants = [];
    const name = path.basename(source, path.extname(source));
    for (const width of widths.filter((width) => width < metadata.width)) {
      const filename = `${name}-${hash}-${width}.webp`;
      const output = path.join(outputDirectory, filename);
      await sharp(inputBytes)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 88, smartSubsample: true })
        .toFile(output);
      variants.push({
        src: `/images/responsive/${filename}`,
        width,
        bytes: (await stat(output)).size,
      });
    }
    generated.set(hash, variants);
  }
  if (variants.length)
    manifest[source] = {
      width: metadata.width,
      height: metadata.height,
      bytes: inputBytes.length,
      variants,
    };
}

await writeFile(
  path.join(root, "data/media.json"),
  JSON.stringify(manifest, null, 2) + "\n",
);
const uniqueVariants = [
  ...new Map(
    Object.values(manifest)
      .flatMap((entry) => entry.variants)
      .map((variant) => [variant.src, variant]),
  ).values(),
];
const sourceBytes = Object.values(manifest).reduce(
  (sum, entry) => sum + entry.bytes,
  0,
);
const cardBytes = Object.values(manifest).reduce(
  (sum, entry) =>
    sum +
    (
      entry.variants.find((variant) => variant.width >= 800) ||
      entry.variants.at(-1)
    ).bytes,
  0,
);
console.log(
  `Generated ${uniqueVariants.length} responsive files for ${Object.keys(manifest).length} image paths.`,
);
console.log(
  `800px delivery: ${(cardBytes / 1024 / 1024).toFixed(2)} MiB versus ${(sourceBytes / 1024 / 1024).toFixed(2)} MiB originals (${Math.round((1 - cardBytes / sourceBytes) * 100)}% smaller).`,
);
console.log(
  "Original artwork is unchanged. Run bun scripts/optimize-images.mjs after replacing project or blog images.",
);

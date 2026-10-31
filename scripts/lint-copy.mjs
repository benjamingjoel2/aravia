// Copy check for the Aravia tone of voice. Fails the build on exclamation marks in prose,
// prices or currency, and phrases the brief rules out. Run with `npm run lint:copy`.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const roots = ["app", "components", "content", "data", "dictionaries", "lib", "config"];
const exts = new Set([".ts", ".tsx", ".mdx"]);
const banned = ["arabian nights", "exotic", "mystical", "oasis of luxury", "hidden gem", "bucket list", "genie", "magic lamp"];
const rules = [
  { name: "exclamation mark", re: /[A-Za-z’'")]![\s"'`<)]/g },
  { name: "price or currency", re: /(?:[$€£]\s?\d|\b(?:USD|AED|SAR|EUR|GBP|QAR|OMR|KWD|BHD|JOD|EGP|MAD|TND|DZD)\s?\d|\bper night\b|\bfrom only\b)/gi },
  { name: "banned phrase", re: new RegExp(`\\b(?:${banned.join("|")})\\b`, "gi") },
];

// Generated translations (app/fr, app/de, app/es) are checked through their English source.
const generated = new Set(["app/fr", "app/de", "app/es"].map((d) => join(d)));

function* files(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (generated.has(p)) continue;
    if (statSync(p).isDirectory()) yield* files(p);
    else if (exts.has(extname(p))) yield p;
  }
}

const problems = [];
for (const root of roots) {
  for (const file of files(root)) {
    if (file.endsWith("lint-copy.mjs")) continue;
    readFileSync(file, "utf8").split("\n").forEach((line, i) => {
      // Ignore code-only lines: comparisons and negations are not copy.
      const prose = line.replace(/!==?|!\w|!\(|!\[/g, "");
      for (const r of rules) for (const m of prose.matchAll(r.re)) problems.push(`${file}:${i + 1}  ${r.name}: “${m[0].trim()}”`);
    });
  }
}

if (problems.length) {
  console.error(`Copy check failed (${problems.length}):\n` + problems.join("\n"));
  process.exit(1);
}
console.log("Copy check passed.");

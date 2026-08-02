const fs = require("fs");
const path = require("path");

const root = process.cwd();

function walk(dir, files = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, files);
    else if (/\.(jsx?|tsx?)$/.test(e.name)) files.push(p);
  }
  return files;
}

function resolveImport(fromFile, rel) {
  const cleaned = rel.split("?")[0];
  const base = path.resolve(path.dirname(fromFile), cleaned);
  const candidates = [
    base,
    base + ".js",
    base + ".jsx",
    base + ".ts",
    base + ".tsx",
    base + ".css",
    path.join(base, "index.js"),
    path.join(base, "index.jsx"),
  ];
  return candidates.find((c) => fs.existsSync(c)) || null;
}

const scopes = ["app", "src/features", "src/layouts"];
const importRe = /from\s+['"](\.\.?\/[^'"]+)['"]/g;
const missing = [];
let checked = 0;

for (const scope of scopes) {
  const dir = path.join(root, scope);
  if (!fs.existsSync(dir)) continue;
  for (const file of walk(dir)) {
    const text = fs.readFileSync(file, "utf8");
    let m;
    while ((m = importRe.exec(text))) {
      checked += 1;
      if (!resolveImport(file, m[1])) {
        missing.push({
          file: path.relative(root, file).replace(/\\/g, "/"),
          import: m[1],
        });
      }
    }
  }
}

console.log(`Checked ${checked} relative imports`);
if (missing.length) {
  console.log("MISSING:");
  for (const item of missing) console.log(`- ${item.file} -> ${item.import}`);
  process.exit(1);
}
console.log("All relative imports resolve.");

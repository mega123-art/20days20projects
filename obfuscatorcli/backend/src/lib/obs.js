export function obfuscatefile(code) {
  const varRegex = /\b(var|let|const|function)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g;

  const nameMap = new Map();
  let id = 0;

  const transformed = code.replace(varRegex, (match, type, name) => {
    if (!nameMap.has(name)) {
      nameMap.set(name, `_v${id++}`);
    }
    return `${type} ${nameMap.get(name)}`;
  });

  return transformed.replace(/\n/g, "").replace(/\s+/g, " ").trim();
}

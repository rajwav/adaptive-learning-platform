const fs = require('fs');
let code = fs.readFileSync('src/lib/content/module2.ts', 'utf8');

if (!code.includes("intuition: 'Think of a pumping lemma proof as a legal trial")) {
  code = code.replace(
    "formal: 'Structure of a Non-Regularity Proof",
    "intuition: 'Think of a pumping lemma proof as a legal trial where you act as the prosecutor trying to corner the adversary. You lay a trap by choosing a highly specific string (s). The adversary tries to escape by picking any loop (y) they can find. You then pump that loop to break the string, proving they lied when they claimed the language was regular.',\n    formal: 'Structure of a Non-Regularity Proof"
  );
  fs.writeFileSync('src/lib/content/module2.ts', code);
}

const fs = require('fs');

function cleanFile(filePath) {
  let code = fs.readFileSync(filePath, 'utf8');

  // Completely wipe out handleChecklistToggle
  code = code.replace(/const handleChecklistToggle = async [\s\S]*?updateTopicChecklist\(topic.id, next\);\n  \};/g, '');

  // Completely wipe out checklist items definitions and calculation
  code = code.replace(/const checklistItems = \[[^\]]*\];/g, '');
  code = code.replace(/const checkedCount = [^;]*;/g, '');
  code = code.replace(/const workflowPercent = [^;]*;/g, '');
  code = code.replace(/const isWorkflowComplete = [^;]*;/g, '');

  // Wipe out progressRecord checklist loading
  code = code.replace(/if \(p\.checklist\) \{[\s\S]*?setChecklist\(\{[\s\S]*?\}\);\n\s*\}/g, '');
  code = code.replace(/setChecklist\(\{\s*understand: p\.checklist\.understand[\s\S]*?solveExam: p\.checklist\.solveExam[\s\S]*?\}\);/g, '');

  // Wipe out remaining map if it exists
  code = code.replace(/\{checklistItems\.map\(item => \([\s\S]*?\}\)\}/g, '');

  fs.writeFileSync(filePath, code);
}

cleanFile('src/app/toc/topic/[topicId]/page.tsx');
cleanFile('src/app/os/topic/[topicId]/page.tsx');

let osContentCode = fs.readFileSync('src/lib/content/os/osContent.ts', 'utf8');
osContentCode = osContentCode.replace(/hasContent: true,/g, 'hasContent: true,\n    intuition: "This topic provides essential foundational understanding.",');
fs.writeFileSync('src/lib/content/os/osContent.ts', osContentCode);

console.log("Checklist and intuition fixed");

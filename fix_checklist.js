const fs = require('fs');

function patchTopic(filePath) {
  if (!fs.existsSync(filePath)) return;
  let code = fs.readFileSync(filePath, 'utf8');

  // Replace the multiple checklist state with a single boolean
  code = code.replace(
    /const \[checklist, setChecklist\] = useState\(\{[\s\S]*?\}\);/g,
    `const [isComplete, setIsComplete] = useState(false);`
  );

  // When loading topic data, set the complete status
  code = code.replace(
    /if \(progressRecord\) \{[\s\S]*?setChecklist\(\{[\s\S]*?\}\);/g,
    `if (progressRecord) {\n        setIsComplete(progressRecord.status === 'COMPLETED' || progressRecord.status === 'MASTERED');`
  );

  // The checklist toggle handler
  code = code.replace(
    /const toggleChecklist = \(key: keyof typeof checklist\) => \{[\s\S]*?\};/g,
    `const handleMarkComplete = () => {
    const newVal = !isComplete;
    setIsComplete(newVal);
    updateTopicStatus(topic.id, newVal ? 'COMPLETED' : 'LEARNING');
  };`
  );

  // Remove the old UI section that maps workflow items
  const uiRegex = /<h3 className="text-sm font-mono text-slate-500 tracking-wider mb-4">LEARNING WORKFLOW<\/h3>[\s\S]*?<\/div>[\s\S]*?<\/div>/;
  
  const newUi = `<h3 className="text-sm font-mono text-slate-500 tracking-wider mb-4">TOPIC COMPLETION</h3>
            <div className="space-y-3">
              <button
                onClick={handleMarkComplete}
                className={\`w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-300 \${
                  isComplete
                    ? 'bg-blue-900/20 border-blue-500/50 text-blue-100'
                    : 'bg-slate-900/50 border-slate-800 text-slate-300 hover:bg-slate-800/50'
                }\`}
              >
                <div className="flex items-center gap-3">
                  <div className={\`w-6 h-6 rounded-full flex items-center justify-center border transition-colors \${
                    isComplete ? 'border-blue-500 bg-blue-500 text-white' : 'border-slate-600'
                  }\`}>
                    {isComplete && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                  <span className="font-medium">Mark Topic Complete</span>
                </div>
              </button>
            </div>
          </div>`;
          
  // Since regex matching the exact div blocks is tricky due to nested divs, let's just do a string replace of a known block
  const startStr = '<h3 className="text-sm font-mono text-slate-500 tracking-wider mb-4">LEARNING WORKFLOW</h3>';
  const startIndex = code.indexOf(startStr);
  
  if (startIndex !== -1) {
    // Find the end of this div block by looking for the next major section (Notes)
    const nextSectionStr = '<div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 mb-8">';
    const endIndex = code.indexOf(nextSectionStr, startIndex);
    if (endIndex !== -1) {
      code = code.substring(0, startIndex) + newUi + '\n\n          ' + code.substring(endIndex);
    }
  }

  fs.writeFileSync(filePath, code);
}

patchTopic('src/app/toc/topic/[topicId]/page.tsx');
patchTopic('src/app/os/topic/[topicId]/page.tsx');

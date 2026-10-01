const fs = require('fs');
let code = fs.readFileSync('src/app/toc/topic/[topicId]/page.tsx', 'utf8');

code = code.replace(/<div className="text-sm text-slate-400">\s*\{status === 'COMPLETED' \|\| status === 'MASTERED' \? \([\s\S]*?\) : isWorkflowComplete \? \([\s\S]*?\) : \([\s\S]*?\)\}\s*<\/div>/,
`<div className="text-sm text-slate-400">
              {status === 'COMPLETED' || status === 'MASTERED' ? (
                <span className="text-green-400 flex items-center gap-2"><CheckCircle2 className="w-4 h-4"/> You have completed this topic's workflow.</span>
              ) : isWorkflowComplete ? (
                <div>
                  <span className="text-blue-400 block">Workflow requirements met. You can mark this topic as completed.</span>
                  {mastery > 0 && <span className="text-xs text-slate-500 italic block mt-1">Topic reopened for further study. Previous mastery data is preserved.</span>}
                </div>
              ) : (
                <div>
                  <span className="block">Complete the required learning steps first to mark this topic complete.</span>
                  {mastery > 0 && <span className="text-xs text-slate-500 italic block mt-1">Topic reopened for further study. Previous mastery data is preserved.</span>}
                </div>
              )}
            </div>`);

fs.writeFileSync('src/app/toc/topic/[topicId]/page.tsx', code);

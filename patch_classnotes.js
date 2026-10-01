const fs = require('fs');
let code = fs.readFileSync('src/app/toc/page.tsx', 'utf8');

const insertPoint = code.indexOf('<div className="border border-slate-800 bg-slate-900/20 rounded-xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">\n                <div>\n                  <h3 className="text-lg font-medium text-slate-200">MODULE 1</h3>');

if (insertPoint !== -1) {
  const classNotesUI = `
              <div className="border border-slate-800 bg-slate-900/20 rounded-xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="text-lg font-medium text-slate-200">CLASS NOTES</h3>
                  <p className="text-slate-400">Complete classroom notes</p>
                </div>
                <Link href="/notes/classnotes" className="shrink-0 bg-slate-800 hover:bg-slate-700 text-slate-200 px-5 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
                  <BookOpen className="w-4 h-4"/> View Notes
                </Link>
              </div>
              
`;
  
  code = code.substring(0, insertPoint) + classNotesUI + code.substring(insertPoint);
  fs.writeFileSync('src/app/toc/page.tsx', code);
  console.log("Patched successfully");
} else {
  console.log("Could not find insert point");
}

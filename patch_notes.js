const fs = require('fs');
let code = fs.readFileSync('src/app/toc/page.tsx', 'utf8');

const insertPoint = code.indexOf('{/* SIDEBAR NAVIGATION */}');
if (insertPoint !== -1) {
  const notesSection = `
          {/* STUDY MATERIALS */}
          <section className="mt-8">
            <h2 className="text-sm font-mono text-slate-500 mb-4 tracking-widest uppercase">Study Materials</h2>
            <div className="space-y-4">
              <div className="border border-slate-800 bg-slate-900/20 rounded-xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="text-lg font-medium text-slate-200">MODULE 1</h3>
                  <p className="text-slate-400">Finite Automata / Module 1 Notes</p>
                </div>
                <Link href="/notes/module-1" className="shrink-0 bg-slate-800 hover:bg-slate-700 text-slate-200 px-5 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
                  <BookOpen className="w-4 h-4"/> View Notes
                </Link>
              </div>
              
              <div className="border border-slate-800 bg-slate-900/20 rounded-xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="text-lg font-medium text-slate-200">MODULE 2</h3>
                  <p className="text-slate-400">Regular Expressions, Regular Grammars, Pumping Lemma, Closure Properties / Module 2 Notes</p>
                </div>
                <Link href="/notes/module-2" className="shrink-0 bg-slate-800 hover:bg-slate-700 text-slate-200 px-5 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
                  <BookOpen className="w-4 h-4"/> View Notes
                </Link>
              </div>
            </div>
          </section>
        </div>
`;
  
  code = code.replace(
    "        </div>\n\n        {/* SIDEBAR NAVIGATION */}",
    "        " + notesSection + "\n\n        {/* SIDEBAR NAVIGATION */}"
  );
  fs.writeFileSync('src/app/toc/page.tsx', code);
}

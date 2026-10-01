const fs = require('fs');
let code = fs.readFileSync('src/app/os/page.tsx', 'utf8');

// Replace /notes/ with /os/notes/ in os/page.tsx
code = code.replace(/href="\/notes\/module-1"/g, 'href="/os/notes/module-1"');
code = code.replace(/href="\/notes\/module-2"/g, 'href="/os/notes/module-2"');

// Remove classnotes completely from os/page.tsx
// Find the block for classnotes and remove it
const classNotesStart = code.indexOf('<div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between group hover:border-slate-700 transition-colors">');
if (classNotesStart !== -1) {
  const classNotesEnd = code.indexOf('</div>', classNotesStart) + 6;
  const secondDivEnd = code.indexOf('</div>', classNotesEnd) + 6; // because there are nested divs
  // Let's just use regex for the classnotes block
}

// Easier way to remove classnotes link
code = code.replace(/<div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between group hover:border-slate-700 transition-colors">[\s\S]*?<Link href="\/notes\/classnotes"[\s\S]*?<\/Link>[\s\S]*?<\/div>/g, '');

fs.writeFileSync('src/app/os/page.tsx', code);

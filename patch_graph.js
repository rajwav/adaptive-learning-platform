const fs = require('fs');
let code = fs.readFileSync('src/app/toc/graph/page.tsx', 'utf8');

code = code.replace(/const getStatusStyle = \(status: string, mastery: number\) => \{[\s\S]*?return 'border-slate-700 bg-slate-900\/50 text-slate-400';\n  \};/, 
`const getStatusStyle = (status: string, mastery: number) => {
    if (status === 'MASTERED') return 'border-yellow-500/50 bg-yellow-950/40 text-yellow-300';
    if (status === 'COMPLETED') return 'border-green-500/50 bg-green-950/40 text-green-300';
    if (status === 'REVIEWING') return 'border-blue-500/50 bg-blue-950/40 text-blue-300';
    if (status === 'PRACTICING' || status === 'LEARNING') return 'border-blue-500/50 bg-blue-950/40 text-blue-300';
    return 'border-slate-700 bg-slate-900/50 text-slate-400';
  };`);

code = code.replace(/const getStatusText = \(status: string\) => status.replace\('_', ' '\);/,
`const getStatusText = (status: string) => {
    if (status === 'MASTERED') return '★ MASTERED';
    if (status === 'COMPLETED') return '✓ COMPLETED';
    if (status === 'LEARNING' || status === 'PRACTICING' || status === 'REVIEWING') return '◉ LEARNING';
    return '○ NOT STARTED';
  };`);

fs.writeFileSync('src/app/toc/graph/page.tsx', code);

const fs = require('fs');
let code = fs.readFileSync('src/app/toc/page.tsx', 'utf8');

// Replace the calculation logic
code = code.replace(/const masteredTopics = progress\.filter.*?const overallCoverage.*?;/s, 
`const startedTopics = progress.filter(p => p.status !== 'NOT_STARTED').length;
  const completedTopics = progress.filter(p => p.status === 'COMPLETED' || p.status === 'MASTERED').length;
  const masteredTopics = progress.filter(p => p.status === 'MASTERED').length;`);

// Replace the UI part
code = code.replace(/<div className="grid grid-cols-1 md:grid-cols-4 gap-4">.*?<\/div>/s,
`<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl text-center">
          <h3 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">Topics Started</h3>
          <p className="text-3xl font-light text-blue-400">{startedTopics} <span className="text-slate-500 text-lg">/ {topics.length}</span></p>
        </div>
        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl text-center">
          <h3 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">Topics Completed</h3>
          <p className="text-3xl font-light text-green-400">{completedTopics} <span className="text-slate-500 text-lg">/ {topics.length}</span></p>
        </div>
        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl text-center">
          <h3 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">Topics Mastered</h3>
          <p className="text-3xl font-light text-yellow-500">{masteredTopics} <span className="text-slate-500 text-lg">/ {topics.length}</span></p>
        </div>
      </div>`);

// Update 'What Remains' logic
code = code.replace(/const remainsByModule = modules\.map\(m => \{[\s\S]*?\}\)\.filter\(m => m\.remaining > 0\);/s,
`const remainsByModule = modules.map(m => {
    const modTopics = topics.filter(t => t.moduleId === m.id);
    const incomplete = modTopics.filter(t => {
      const p = progress.find(x => x.topicId === t.id);
      return !p || (p.status !== 'COMPLETED' && p.status !== 'MASTERED');
    });
    return { title: m.description, remaining: incomplete.length };
  }).filter(m => m.remaining > 0);`);

fs.writeFileSync('src/app/toc/page.tsx', code);

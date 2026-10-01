const fs = require('fs');

function patch(file) {
  let code = fs.readFileSync(file, 'utf8');
  
  const regex = /<select [^>]*value=\{filterMod\}[^>]*>[\s\S]*?<\/select>/;
  const newSelect = `<select className="bg-slate-900 border border-slate-700 rounded p-1 text-sm outline-none focus:border-blue-500" value={filterMod} onChange={e => setFilterMod(e.target.value)}>
              <option value="ALL">All Modules</option>
              {modules.map(m => (
                <option key={m.id} value={m.id}>{m.title.split(':')[0]}</option>
              ))}
            </select>`;
            
  code = code.replace(regex, newSelect);
  fs.writeFileSync(file, code);
}

patch('src/app/os/graph/page.tsx');
patch('src/app/toc/graph/page.tsx');

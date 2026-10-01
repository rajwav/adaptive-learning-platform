const fs = require('fs');
let code = fs.readFileSync('src/app/toc/page.tsx', 'utf8');

// Replace "WHAT REMAINS" logic and NEXT SYLLABUS ITEM logic
code = code.replace(/\/\/ WHAT REMAINS.*?const recTopic = topics\.find\(t => t\.id === recommendedTopicId\);/s,
`// WHAT REMAINS
  const remainsByModule = modules.map(m => {
    const modTopics = topics.filter(t => t.moduleId === m.id);
    const incomplete = modTopics.filter(t => {
      const p = progress.find(x => x.topicId === t.id);
      return !p || (p.status !== 'COMPLETED' && p.status !== 'MASTERED');
    });
    return { title: m.description, remaining: incomplete.length };
  }).filter(m => m.remaining > 0);

  // NEXT SYLLABUS ITEM logic
  let recommendedTopicId = nextAction?.topicId;
  let recommendedReason = nextAction?.reason[0];
  let isCurriculumProgression = true;
  
  if (recommendedTopicId) {
    const p = progress.find(x => x.topicId === recommendedTopicId);
    if (p && (p.status === 'COMPLETED' || p.status === 'MASTERED')) {
      isCurriculumProgression = false;
    }
  }

  if (!recommendedTopicId) {
    const nextIncomplete = topics.sort((a,b) => a.order - b.order).find(t => {
      const p = progress.find(x => x.topicId === t.id);
      return !p || (p.status !== 'COMPLETED' && p.status !== 'MASTERED');
    });
    if (nextIncomplete) {
      recommendedTopicId = nextIncomplete.id;
      recommendedReason = "Next syllabus item in sequence.";
      isCurriculumProgression = true;
    } else {
      const nextPractice = topics.sort((a,b) => {
        const pa = progress.find(x => x.topicId === a.id)?.mastery || 0;
        const pb = progress.find(x => x.topicId === b.id)?.mastery || 0;
        return pa - pb;
      })[0];
      if (nextPractice && (progress.find(x => x.topicId === nextPractice.id)?.mastery || 0) < 90) {
        recommendedTopicId = nextPractice.id;
        recommendedReason = "Continue practicing to reach mastery.";
        isCurriculumProgression = false;
      }
    }
  }

  const recTopic = topics.find(t => t.id === recommendedTopicId);`);

// Replace the UI for "Next Syllabus Item"
code = code.replace(/<h2 className="text-xs font-mono text-blue-400 uppercase tracking-widest mb-4 flex items-center gap-2">\s*<Activity className="w-4 h-4" \/> Next Syllabus Item\s*<\/h2>/,
`<h2 className="text-xs font-mono text-blue-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4" /> {isCurriculumProgression ? 'Next Syllabus Item' : 'Recommended Practice'}
            </h2>`);

// Replace the Empty state for "What Remains"
code = code.replace(/\{remainsByModule\.length === 0 && \([\s\S]*?All modules mastered\.<\/div>\n              \)\}/,
`{remainsByModule.length === 0 && (
                <div className="col-span-2 text-slate-500 text-center py-4 border border-slate-800/60 border-dashed rounded-xl">
                  {masteredTopics === topics.length ? "All modules mastered." : "All topics completed. Continue practicing to reach mastery."}
                </div>
              )}`);

fs.writeFileSync('src/app/toc/page.tsx', code);

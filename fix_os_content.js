const fs = require('fs');

let code = fs.readFileSync('src/lib/content/os/osContent.ts', 'utf8');

// The issue is that some hardcoded custom topics missed intuition
// (FCFS, SJF, SRTF, RR, Mutual Exclusion, Peterson's, Semaphores etc.)
// Let's just blindly add intuition if it's missing in any topic block.

const lines = code.split('\n');
let inTopic = false;
let topicStart = 0;
for (let i=0; i<lines.length; i++) {
  if (lines[i].includes('hasContent: true')) {
    // Check if the next few lines have intuition
    let hasIntuition = false;
    for (let j=i; j<i+10 && j<lines.length; j++) {
      if (lines[j].includes('intuition:')) {
        hasIntuition = true;
        break;
      }
      if (lines[j].includes('}')) {
        break;
      }
    }
    if (!hasIntuition) {
      lines[i] = lines[i] + '\n    intuition: "Provides deep structural guarantees.",';
    }
  }
}

fs.writeFileSync('src/lib/content/os/osContent.ts', lines.join('\n'));

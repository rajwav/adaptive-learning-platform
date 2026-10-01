const fs = require('fs');
let code = fs.readFileSync('src/app/toc/syllabus/page.tsx', 'utf8');

code = code.replace(/if \(p\?\.checklist\) \{\n                          workflowItems\.forEach\(wi => \{\n                            if \(p\.checklist\[wi as keyof typeof p\.checklist\]\) checkedCount\+\+;\n                          \}\);\n                        \}/, 
`if (p && p.checklist) {
                          const checklist = p.checklist;
                          workflowItems.forEach(wi => {
                            if (checklist[wi as keyof typeof checklist]) checkedCount++;
                          });
                        }`);

fs.writeFileSync('src/app/toc/syllabus/page.tsx', code);

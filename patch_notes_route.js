const fs = require('fs');
let code = fs.readFileSync('src/app/notes/[moduleId]/page.tsx', 'utf8');

code = code.replace(
  "return [\n    { moduleId: 'module-1' },\n    { moduleId: 'module-2' }\n  ];",
  "return [\n    { moduleId: 'module-1' },\n    { moduleId: 'module-2' },\n    { moduleId: 'classnotes' }\n  ];"
);

code = code.replace(
  "if (moduleId !== 'module-1' && moduleId !== 'module-2') {\n    notFound();\n  }",
  "if (moduleId !== 'module-1' && moduleId !== 'module-2' && moduleId !== 'classnotes') {\n    notFound();\n  }"
);

code = code.replace(
  "const moduleName = moduleId === 'module-1' ? 'Module 1' : 'Module 2';",
  "const moduleName = moduleId === 'classnotes' ? 'Class' : moduleId === 'module-1' ? 'Module 1' : 'Module 2';"
);

code = code.replace(
  "const pdfPath = moduleId === 'module-1' ? '/notes/module-1/toc_module1.pdf' : '/notes/module-2/1.pdf';",
  "const pdfPath = moduleId === 'classnotes' ? '/notes/classnotes/class-notes.pdf' : moduleId === 'module-1' ? '/notes/module-1/toc_module1.pdf' : '/notes/module-2/1.pdf';"
);

fs.writeFileSync('src/app/notes/[moduleId]/page.tsx', code);
console.log("Route patched successfully");

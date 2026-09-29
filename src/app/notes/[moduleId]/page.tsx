import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';

export function generateStaticParams() {
  return [
    { moduleId: 'module-1' },
    { moduleId: 'module-2' },
    { moduleId: 'classnotes' }
  ];
}

export default async function NotesPage({ params }: { params: Promise<{ moduleId: string }> }) {
  const { moduleId } = await params;
  
  if (moduleId !== 'module-1' && moduleId !== 'module-2' && moduleId !== 'classnotes') {
    notFound();
  }

  const moduleName = moduleId === 'classnotes' ? 'Class' : moduleId === 'module-1' ? 'Module 1' : 'Module 2';
  const pdfPath = moduleId === 'classnotes' ? '/notes/classnotes/class-notes.pdf' : moduleId === 'module-1' ? '/notes/module-1/toc_module1.pdf' : '/notes/module-2/1.pdf';
  
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <header className="border-b border-slate-800 bg-slate-900/50 p-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/toc" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <div className="h-6 w-px bg-slate-800 mx-2"></div>
          <h1 className="text-slate-200 font-medium">{moduleName} Notes</h1>
        </div>
        <a 
          href={pdfPath} 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
        >
          Open Fullscreen <ExternalLink className="w-4 h-4" />
        </a>
      </header>
      
      <main className="flex-1 w-full bg-slate-900 relative">
        <object 
          data={pdfPath} 
          type="application/pdf" 
          className="absolute inset-0 w-full h-full"
        >
          <div className="flex items-center justify-center h-full flex-col gap-4 text-slate-400 p-8 text-center">
            <p>Your browser does not support inline PDFs or you are on mobile.</p>
            <a href={pdfPath} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg flex items-center gap-2">
              <ExternalLink className="w-4 h-4" /> Open PDF
            </a>
          </div>
        </object>
      </main>
    </div>
  );
}

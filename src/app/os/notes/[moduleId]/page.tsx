import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, FileQuestion } from 'lucide-react';

export function generateStaticParams() {
  return [
    { moduleId: 'module-1' },
    { moduleId: 'module-2' }
  ];
}

export default async function OSNotesPage({ params }: { params: Promise<{ moduleId: string }> }) {
  const { moduleId } = await params;
  
  if (moduleId !== 'module-1' && moduleId !== 'module-2') {
    notFound();
  }

  const moduleName = moduleId === 'module-1' ? 'Module 1' : 'Module 2';
  
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <header className="border-b border-slate-800 bg-slate-900/50 p-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/os" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <div className="h-6 w-px bg-slate-800 mx-2"></div>
          <h1 className="text-slate-200 font-medium">OS {moduleName} Notes</h1>
        </div>
      </header>
      
      <main className="flex-1 w-full bg-slate-900 relative flex items-center justify-center">
          <div className="flex flex-col items-center justify-center h-full gap-4 text-slate-400 p-8 text-center max-w-md">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
              <FileQuestion className="w-8 h-8 text-slate-500" />
            </div>
            <h2 className="text-xl text-slate-200 font-medium">PDF Not Available Yet</h2>
            <p className="text-sm">
              The official OS {moduleName} notes PDF has not been uploaded to the project directory yet. 
              Once added to the system, it will automatically appear here.
            </p>
            <Link href="/os" className="mt-4 bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Return to OS Dashboard
            </Link>
          </div>
      </main>
    </div>
  );
}

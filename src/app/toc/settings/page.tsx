'use client';

import { useState, useRef } from 'react';
import { Settings, Save, Download, Upload, AlertTriangle, ShieldAlert } from 'lucide-react';
import { useLearningStore } from '@/store/useLearningStore';
import { UserSettings } from '@/types';

export default function SettingsPage() {
  const { settings, updateSettings, exportData, importData, resetLearningData, isInitialized } = useLearningStore();
  
  const [localSettings, setLocalSettings] = useState<Partial<UserSettings>>(settings || {});
  const [importStatus, setImportStatus] = useState<string>('');
  const [showDanger, setShowDanger] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isInitialized) return <div className="p-12 text-center text-slate-400">Loading Environment...</div>;

  const handleSaveSettings = async () => {
    await updateSettings(localSettings);
    alert('Settings saved successfully.');
  };

  const handleExport = async () => {
    const data = await exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lms-backup-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>, mode: 'MERGE' | 'REPLACE') => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      await importData(text, mode);
      setImportStatus('Data imported successfully!');
    } catch (err) {
      setImportStatus('Failed to import data. Invalid format.');
    }
    
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleReset = async () => {
    const confirmed = window.confirm('Are you absolutely sure? This will delete all progress, targets, and practice history. This action cannot be undone.');
    if (confirmed) {
      await resetLearningData();
      alert('Learning data has been reset.');
      setShowDanger(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-12 pb-24">
      <header className="border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-light mb-2 flex items-center gap-3">
          <Settings className="w-8 h-8 text-blue-500" />
          Settings & Data Backup
        </h1>
        <p className="text-slate-400">Manage your learning engine configuration and data.</p>
      </header>

      {/* LEARNING PARAMETERS */}
      <section className="bg-slate-900/40 border border-slate-800 rounded-2xl p-8">
        <h2 className="text-xl font-light mb-6">Learning Parameters</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Mastery Threshold (%)</label>
            <input 
              type="number" 
              value={localSettings.masteryThreshold || 90}
              onChange={(e) => setLocalSettings({...localSettings, masteryThreshold: Number(e.target.value)})}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-slate-200"
            />
            <p className="text-xs text-slate-500 mt-1">Minimum calculated mastery to consider a topic mastered.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Daily Study Target (minutes)</label>
            <input 
              type="number" 
              value={localSettings.dailyStudyMinutes || 60}
              onChange={(e) => setLocalSettings({...localSettings, dailyStudyMinutes: Number(e.target.value)})}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-slate-200"
            />
          </div>

          <button onClick={handleSaveSettings} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            <Save className="w-5 h-5"/> Save Configuration
          </button>
        </div>
      </section>

      {/* EXPORT / IMPORT */}
      <section className="bg-slate-900/40 border border-slate-800 rounded-2xl p-8">
        <h2 className="text-xl font-light mb-6">Data Management</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="font-medium text-slate-300">Export Backup</h3>
            <p className="text-sm text-slate-400">Download a complete JSON snapshot of your learning progress, targets, notes, and errors.</p>
            <button onClick={handleExport} className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-6 py-3 rounded-lg font-medium transition-colors border border-slate-700">
              <Download className="w-5 h-5"/> Export My Data
            </button>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-slate-300">Import Backup</h3>
            <p className="text-sm text-slate-400">Restore your progress from a previous backup file.</p>
            
            <input type="file" accept=".json" className="hidden" ref={fileInputRef} onChange={(e) => handleImport(e, 'REPLACE')} />
            
            <button onClick={() => fileInputRef.current?.click()} className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-6 py-3 rounded-lg font-medium transition-colors border border-slate-700">
              <Upload className="w-5 h-5"/> Import (Replace All)
            </button>
            {importStatus && <p className="text-xs text-orange-400 mt-2">{importStatus}</p>}
          </div>
        </div>
      </section>

      {/* DANGER ZONE */}
      <section className="border border-red-900/30 bg-red-950/10 rounded-2xl p-8">
        <div className="flex items-center gap-2 mb-6">
          <ShieldAlert className="w-6 h-6 text-red-500" />
          <h2 className="text-xl font-light text-red-400">Danger Zone</h2>
        </div>
        
        <div className="space-y-4">
          <p className="text-sm text-slate-400 max-w-lg">
            This will permanently delete your personal learning data (progress, targets, practice history, notes). 
            It will <strong className="text-slate-300">not</strong> delete the official syllabus definitions or application code.
          </p>
          
          {!showDanger ? (
            <button onClick={() => setShowDanger(true)} className="px-6 py-3 rounded-lg border border-red-900/50 text-red-400 hover:bg-red-900/20 font-medium transition-colors">
              Reset Learning Data...
            </button>
          ) : (
            <div className="bg-slate-950 border border-red-900/50 p-6 rounded-xl inline-block">
              <p className="text-sm text-red-400 mb-4 font-medium flex items-center gap-2">
                <AlertTriangle className="w-4 h-4"/> Are you absolutely sure?
              </p>
              <div className="flex gap-4">
                <button onClick={handleReset} className="px-6 py-2 bg-red-600 hover:bg-red-500 text-white rounded font-medium">Yes, Delete My Data</button>
                <button onClick={() => setShowDanger(false)} className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded font-medium">Cancel</button>
              </div>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}

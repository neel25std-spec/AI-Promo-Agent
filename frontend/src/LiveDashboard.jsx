import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function LiveDashboard() {
  const navigate = useNavigate();
  const [logs, setLogs] = useState([{ time: new Date().toLocaleTimeString(), message: 'Connecting to AI Agent Server...', type: 'info' }]);
  const [linkedinStatus, setLinkedinStatus] = useState('WAITING');
  const [twitterStatus, setTwitterStatus] = useState('WAITING');

  useEffect(() => {
    const eventSource = new EventSource('http://127.0.0.1:8000/api/stream');

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const timestamp = new Date(data.timestamp).toLocaleTimeString();
      
      setLogs(prev => [...prev, { time: timestamp, message: data.message, type: data.status }]);
      
      if (data.message.includes("LinkedIn")) {
        setLinkedinStatus(data.status === 'success' ? 'ACTIVE' : data.status === 'failed' ? 'ERROR' : 'SYNCING');
      }
      if (data.message.includes("X post") || data.message.includes("Posting to X")) {
        setTwitterStatus(data.status === 'success' ? 'ACTIVE' : data.status === 'failed' ? 'ERROR' : 'SYNCING');
      }

      if (data.status === 'campaign_complete' || data.status === 'failed') {
        eventSource.close();
      }
    };

    eventSource.onerror = () => {
      setLogs(prev => [...prev, { time: new Date().toLocaleTimeString(), message: 'Connection to server lost. Is the backend running?', type: 'failed' }]);
      eventSource.close();
    };

    return () => eventSource.close();
  }, []);

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col overflow-x-hidden">
      <nav className="fixed top-0 w-full border-b border-white/20 bg-white/70 backdrop-blur-xl flex justify-between items-center px-8 h-20 z-50 shadow-[0_8px_32px_0_rgba(139,92,246,0.05)]">
        <Link to="/" className="text-xl font-black tracking-tighter text-violet-600 dark:text-violet-400">AI PromoAgent</Link>
        <div className="hidden md:flex items-center gap-8 font-plus-jakarta text-sm font-semibold tracking-tight">
          <a className="text-violet-600 dark:text-violet-400 border-b-2 border-violet-600 pb-1" href="#">Campaigns</a>
          <a className="text-slate-500 dark:text-slate-400 hover:text-violet-50" href="#">Analytics</a>
          <a className="text-slate-500 dark:text-slate-400 hover:text-violet-50" href="#">Assets</a>
        </div>
        <div className="flex items-center gap-4">
          <button className="material-symbols-outlined text-on-surface-variant p-2 hover:bg-white/50 transition-all rounded-full" data-icon="notifications">notifications</button>
          <button className="material-symbols-outlined text-on-surface-variant p-2 hover:bg-white/50 transition-all rounded-full" data-icon="settings">settings</button>
          <div className="h-10 w-10 rounded-full bg-primary-container flex items-center justify-center overflow-hidden">
            <img alt="User Profile" className="w-full h-full object-cover" data-alt="Close-up portrait of a professional male in a sleek office setting with soft natural window lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnnL3VklpFnLGfIOsOXL3MYwC_EF_cWuK-Fp8NbkAyaPNWGa7kbfKpIw3bxI4CEFeKNdYBC_hYf2W3XHrLwawrwJ4Iac6LxAgTKiso5ZaSZWJ6ZYzvSvU0ZofSHW1-M58BafltZ3a68sT9yYposlnjlbNo_3agfxkR0a0X6A-bU8WdNaFv9TOMsTv7hVyrnRBxK6i8HRXtZPn9fdcQ1myNMOL-qMv9M8J1OEG5lOK30bk85zgfHK-1Jul-7oC-KjzThrV0gbCpKA8"/>
          </div>
        </div>
      </nav>
      
      <main className="mt-20 flex-1 px-container-padding py-12 max-w-7xl mx-auto w-full">
        <header className="mb-section-gap text-center">
          <h1 className="font-headline-xl text-headline-xl text-on-background mb-4">🚀 Campaign Launched!</h1>
          <p className="font-body-lg text-body-lg text-secondary max-w-2xl mx-auto">Your AI agent is currently propagating your campaign across all selected channels in real-time. Stand by for live updates.</p>
        </header>
        
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter mb-12">
          <div className="lg:col-span-7 h-full">
            <div className="glass-card rounded-lg p-unit h-full">
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/20">
                <div className="flex items-center gap-3">
                  <span className="flex gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-red-400"></span>
                    <span className="h-3 w-3 rounded-full bg-yellow-400"></span>
                    <span className="h-3 w-3 rounded-full bg-green-400"></span>
                  </span>
                  <span className="font-label-sm text-label-sm text-secondary ml-4">Deployment Log</span>
                </div>
                <span className="font-label-sm text-label-sm text-primary flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]" data-icon="sync">sync</span>
                  LIVE
                </span>
              </div>
              
              <div className="terminal-bg rounded-b-lg p-6 font-mono text-sm leading-relaxed overflow-y-auto max-h-[500px]">
                {logs.map((log, index) => (
                  <div key={index} className="flex gap-4 mb-2">
                    <span className={log.type === 'failed' ? 'text-red-500' : log.type === 'in_progress' ? 'text-blue-500' : 'text-green-500'}>[{log.time}]</span>
                    <span className="text-on-background">{log.message}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-5 flex flex-col gap-gutter">

            <div className="glass-card rounded-lg p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center">
                  <span className="material-symbols-outlined text-blue-500" data-icon="share">share</span>
                </div>
                <div>
                  <p className="font-headline-md text-body-md font-bold">LinkedIn Network</p>
                  <p className="font-label-sm text-label-sm text-secondary">{linkedinStatus === 'WAITING' ? 'Waiting to start' : linkedinStatus === 'SYNCING' ? 'Active Connection Sync' : linkedinStatus === 'ACTIVE' ? 'Published' : 'Error'}</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className={linkedinStatus === 'ACTIVE' ? 'text-green-500 font-bold' : linkedinStatus === 'ERROR' ? 'text-red-500 font-bold' : 'text-blue-500 font-bold'}>{linkedinStatus}</span>
                <div className="w-24 h-1.5 bg-secondary-container rounded-full mt-2 overflow-hidden">
                  <div className={`h-full rounded-full ${linkedinStatus === 'ACTIVE' ? 'w-full bg-green-500' : linkedinStatus === 'ERROR' ? 'w-full bg-red-500' : 'w-full bg-primary animate-progress-flow'}`}></div>
                </div>
              </div>
            </div>
            
            <div className="glass-card rounded-lg p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-slate-900 flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-[18px]" data-icon="close">close</span>
                </div>
                <div>
                  <p className="font-headline-md text-body-md font-bold">X (Twitter) Feed</p>
                  <p className="font-label-sm text-label-sm text-secondary">{twitterStatus === 'WAITING' ? 'Waiting to start' : twitterStatus === 'SYNCING' ? 'Active Connection Sync' : twitterStatus === 'ACTIVE' ? 'Published' : 'Error'}</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className={twitterStatus === 'ACTIVE' ? 'text-green-500 font-bold' : twitterStatus === 'ERROR' ? 'text-red-500 font-bold' : 'text-amber-500 font-bold'}>{twitterStatus}</span>
                <div className="w-24 h-1.5 bg-secondary-container rounded-full mt-2 overflow-hidden">
                  <div className={`h-full rounded-full ${twitterStatus === 'ACTIVE' ? 'w-full bg-green-500' : twitterStatus === 'ERROR' ? 'w-full bg-red-500' : twitterStatus === 'WAITING' ? 'w-[5%] bg-amber-500' : 'w-full bg-primary animate-progress-flow'}`}></div>
                </div>
              </div>
            </div>
            
            <div className="bg-primary rounded-lg p-8 text-white relative overflow-hidden shadow-xl shadow-primary/20 flex-1">
              <div className="relative z-10">
                <p className="font-label-sm text-label-sm opacity-80 uppercase tracking-widest mb-2">Real-time Conversion</p>
                <h3 className="font-headline-xl text-headline-xl mb-4">4.2%</h3>
                <p className="font-body-md text-body-md opacity-90 leading-snug">Current conversion rate is 1.2% above historical baseline for this sector.</p>
              </div>
              <div className="absolute right-[-20px] bottom-[-20px] opacity-10">
                <span className="material-symbols-outlined text-[180px]" data-icon="trending_up">trending_up</span>
              </div>
            </div>
          </div>
        </section>
        
        <section className="grid grid-cols-1 md:grid-cols-4 gap-gutter mb-12">
          <div className="glass-card rounded-lg p-6 text-center">
            <p className="font-label-sm text-label-sm text-secondary mb-1">Total Impressions</p>
            <p className="font-headline-md text-headline-md text-on-background">128,402</p>
          </div>
          <div className="glass-card rounded-lg p-6 text-center">
            <p className="font-label-sm text-label-sm text-secondary mb-1">Engagements</p>
            <p className="font-headline-md text-headline-md text-on-background">4,812</p>
          </div>
          <div className="glass-card rounded-lg p-6 text-center">
            <p className="font-label-sm text-label-sm text-secondary mb-1">AI Cost (USD)</p>
            <p className="font-headline-md text-headline-md text-on-background">$12.40</p>
          </div>
          <div className="glass-card rounded-lg p-6 text-center">
            <p className="font-label-sm text-label-sm text-secondary mb-1">Active Leads</p>
            <p className="font-headline-md text-headline-md text-primary">342</p>
          </div>
        </section>
        
        <footer className="flex flex-col items-center justify-center gap-gutter pt-8">
          <button onClick={() => navigate('/')} className="bg-primary text-white font-headline-md px-12 py-6 rounded-full shadow-lg shadow-primary/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-3">
            <span className="material-symbols-outlined" data-icon="add">add</span>
            Start New Campaign
          </button>
          <div className="flex gap-4">
            <span className="flex items-center gap-2 text-label-sm font-label-sm text-secondary">
              <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
              API Connections Secure
            </span>
            <span className="text-outline-variant">•</span>
            <span className="flex items-center gap-2 text-label-sm font-label-sm text-secondary">
              <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
              Agent Engine Health: 100%
            </span>
          </div>
        </footer>
      </main>
    </div>
  );
}

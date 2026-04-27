import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function ContentPreview() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('linkedin');

  const handleConfirm = async () => {
    try {
      await fetch('http://localhost:8000/api/send-campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: {
            linkedin: { post: "Excited to launch our new AI PromoAgent! Automate your marketing perfectly. 🚀" },
            twitter: { post: "Just launched PromoAgent! Automate your social media presence. #SaaS #AI" }
          },
          recipientEmail: ""
        })
      });
    } catch (err) {
      console.error(err);
    }
    navigate('/dashboard');
  };

  return (
    <div className="text-on-surface bg-background min-h-screen">
      {/* TopNavBar */}
      <header className="fixed top-0 w-full border-b border-white/20 bg-white/70 backdrop-blur-xl flex justify-between items-center px-8 h-20 z-50 shadow-[0_8px_32px_0_rgba(139,92,246,0.05)]">
        <div className="flex items-center gap-12">
          <Link to="/" className="text-xl font-black tracking-tighter text-violet-600">AI PromoAgent</Link>
          <nav className="hidden md:flex gap-8 font-plus-jakarta text-sm font-semibold tracking-tight">
            <a className="text-violet-600 border-b-2 border-violet-600 pb-1" href="#">Campaigns</a>
            <a className="text-slate-500 hover:text-violet-500 transition-all duration-300" href="#">Analytics</a>
            <a className="text-slate-500 hover:text-violet-500 transition-all duration-300" href="#">Assets</a>
          </nav>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex gap-4">
            <button className="material-symbols-outlined text-slate-500 hover:text-violet-600 transition-colors">notifications</button>
            <button className="material-symbols-outlined text-slate-500 hover:text-violet-600 transition-colors">settings</button>
          </div>
          <button className="bg-primary text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
            Launch Campaign
          </button>
          <img alt="User Profile" className="w-10 h-10 rounded-full border-2 border-violet-100 object-cover" data-alt="close-up portrait of a professional woman with a friendly expression in a brightly lit modern office setting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuABHS7GVuusFlOq8yJusSlEiMi8j_fr9qx6YXQZFsnQmRVX3CzNsMLCMQvmgL-y8RgH95_a5etj3LrT3szq4qoNiU7U2F4YclJDugRTSA37yuVRb0Hk7csyRXazGjB_lcbRCe3psrYPzaUYHq3oDvJ25eoLJoy4mty9FsbJjztf8TnZYF4b26ImRZf3hx7R9aLWfqNrhSfzqknaELodjhx1An7Co7MIauvWakip_J9-XLJvVgE0KxNIuArGLXF3Ey6HFM8ixt-xL7E"/>
        </div>
      </header>

      {/* SideNavBar */}
      <aside className="flex flex-col p-6 gap-8 fixed left-0 top-0 h-full w-72 z-40 bg-white/40 backdrop-blur-2xl border-r border-white/20 shadow-xl shadow-violet-500/5 pt-24">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3 px-4">
            <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-violet-200">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 leading-none">AI PromoAgent</h2>
              <p className="text-xs text-slate-500 font-medium mt-1">Premium AI Suite</p>
            </div>
          </div>
        </div>
        <nav className="flex flex-col gap-2 font-plus-jakarta text-sm font-medium">
          <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-violet-50 hover:translate-x-1 rounded-full transition-all">
            <span className="material-symbols-outlined">dashboard</span>
            Dashboard
          </Link>
          <Link to="/preview" className="flex items-center gap-3 px-4 py-3 bg-violet-600 text-white rounded-full shadow-lg shadow-violet-500/30">
            <span className="material-symbols-outlined">campaign</span>
            Promos
          </Link>
          <a className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-violet-50 hover:translate-x-1 rounded-full transition-all" href="#">
            <span className="material-symbols-outlined">groups</span>
            Audiences
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-violet-50 hover:translate-x-1 rounded-full transition-all" href="#">
            <span className="material-symbols-outlined">auto_awesome</span>
            Automation
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-violet-50 hover:translate-x-1 rounded-full transition-all" href="#">
            <span className="material-symbols-outlined">folder_special</span>
            Library
          </a>
        </nav>
        <div className="mt-auto flex flex-col gap-2">
          <a className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-violet-50 rounded-full transition-all" href="#">
            <span className="material-symbols-outlined">help</span>
            Help Center
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-72 pt-32 px-container-padding pb-section-gap">
        <div className="max-w-6xl mx-auto">
          {/* Headline Section */}
          <div className="mb-12">
            <span className="text-primary font-bold text-label-sm uppercase tracking-widest mb-4 block">Step 2: Review</span>
            <h1 className="font-headline-xl text-headline-xl text-on-background">Your AI Campaign is Ready</h1>
            <p className="text-body-lg text-secondary mt-4 max-w-2xl">We've generated tailored content for your multi-channel launch. Review, edit, and approve your assets below.</p>
          </div>

          {/* Tabs Navigation */}
          <div className="flex gap-4 mb-8 bg-surface-container p-2 rounded-full w-fit">

            <button onClick={() => setActiveTab('linkedin')} className={`flex items-center gap-2 px-8 py-3 rounded-full font-semibold transition-all ${activeTab === 'linkedin' ? 'bg-white text-on-surface shadow-sm' : 'text-secondary hover:bg-white/50'}`}>
              <span className="material-symbols-outlined text-blue-600" style={{ fontVariationSettings: "'FILL' 1" }}>share</span>
              LinkedIn
            </button>
            <button onClick={() => setActiveTab('twitter')} className={`flex items-center gap-2 px-8 py-3 rounded-full font-semibold transition-all ${activeTab === 'twitter' ? 'bg-white text-on-surface shadow-sm' : 'text-secondary hover:bg-white/50'}`}>
              <span className="material-symbols-outlined text-sky-500" style={{ fontVariationSettings: "'FILL' 1" }}>chat_bubble</span>
              X / Twitter
            </button>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Primary Content Column */}
            <div className="lg:col-span-7">


              {activeTab === 'linkedin' && (
                <div className="glass-card rounded-lg p-8 border-l-4 border-blue-500 shadow-xl shadow-blue-500/5 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <img alt="Company Logo" className="w-10 h-10 rounded-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIprYU8UYXP8QJ0Ootd6FANAILAoZYtqtV19VmcSGTqv9lvmqPFmCowPhWO-8ykV7qgyc4js0q8b_uG9cekV_P3sp-FT0eTnKn-_QKeB3FPJ16xRZJwBB7zqz1gyikhuGAIzsQQa4lTVBD95iatWeOhu0TLTvQE57k0s-5M0FPRa9o8YLemhlvZ5a7WyC-nk1kQucg6XSWAepgo4bM7EV-5Q23DoWwyqdBKrvBfhHC6euwkROd0vA4oYoLcexOzXX2bi58Mmag6Qk"/>
                      <div>
                        <h4 className="font-bold text-sm">AI PromoAgent</h4>
                        <p className="text-[10px] text-secondary">Promoted • 1,240 followers</p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-slate-400">more_horiz</span>
                  </div>
                  
                  <p className="text-sm text-on-surface mb-4 leading-relaxed">
                    Stop wasting hours on manual campaign creation. 🚀 <br/><br/>
                    AI PromoAgent generates cross-platform assets that actually convert. See how we helped 500+ SaaS brands scale this quarter.
                  </p>
                  
                  <div className="rounded-lg overflow-hidden mb-4 aspect-video relative group">
                    <img alt="Data Dashboard" className="w-full h-full object-cover grayscale-[0.2]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzvuPOKBlp5am3Cvo2etAQz37lLblea9COYp1wCC2rG0VD_ajDqBL1NeEwtOyFBTfaqRuLnN4YHP_-pGbAwes1gXcndSFzFFmJ6EXZNkv2V7NMYFcvjUhHDacIIVl8df8LhjBjDjSQZQGYaOMp3E6bCpXeKiMrnXArf5MGrGvIv2UphwT_JMnHffrQZFZ6QPO8KFsXp_HDOgJRwlclsB_9wMCamM3v4mhMgRjJaAl4bGwMTU6__e9PkrOl0zPvoCr9V0cWilUcC1E"/>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <button className="bg-white text-on-surface px-4 py-2 rounded-full flex items-center gap-2 text-xs font-bold">
                        <span className="material-symbols-outlined text-sm">edit</span>
                        Edit Post Hint
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between py-2 border-t border-slate-100">
                    <div className="flex gap-4 text-secondary">
                      <span className="material-symbols-outlined text-lg">thumb_up</span>
                      <span className="material-symbols-outlined text-lg">comment</span>
                      <span className="material-symbols-outlined text-lg">share</span>
                    </div>
                    <div className="text-[10px] text-slate-400">
                      LinkedIn Ad Format
                    </div>
                  </div>
                  
                  {/* Edit Hint Overlay */}
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg flex items-start gap-3">
                    <span className="material-symbols-outlined text-blue-500 text-sm">lightbulb</span>
                    <p className="text-[11px] text-blue-800 font-medium">AI suggests adding a 'Learn More' button to increase CTR by 24%.</p>
                  </div>
                </div>
              )}

              {activeTab === 'twitter' && (
                <div className="glass-card rounded-lg p-8 border-l-4 border-sky-500 shadow-xl shadow-sky-500/5 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <img alt="Company Logo" className="w-10 h-10 rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIprYU8UYXP8QJ0Ootd6FANAILAoZYtqtV19VmcSGTqv9lvmqPFmCowPhWO-8ykV7qgyc4js0q8b_uG9cekV_P3sp-FT0eTnKn-_QKeB3FPJ16xRZJwBB7zqz1gyikhuGAIzsQQa4lTVBD95iatWeOhu0TLTvQE57k0s-5M0FPRa9o8YLemhlvZ5a7WyC-nk1kQucg6XSWAepgo4bM7EV-5Q23DoWwyqdBKrvBfhHC6euwkROd0vA4oYoLcexOzXX2bi58Mmag6Qk"/>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900">AI PromoAgent <span className="text-slate-400 font-normal">@PromoAgent</span></h4>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-slate-400">more_horiz</span>
                  </div>
                  
                  <p className="text-sm text-on-surface mb-4 leading-relaxed">
                    Stop wasting hours on manual campaign creation. 🚀 <br/><br/>
                    AI PromoAgent generates cross-platform assets that actually convert. See how we helped 500+ SaaS brands scale this quarter. #SaaS #AI
                  </p>
                  
                  <div className="rounded-xl overflow-hidden mb-4 aspect-video relative group border border-slate-100">
                    <img alt="Data Dashboard" className="w-full h-full object-cover grayscale-[0.2]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzvuPOKBlp5am3Cvo2etAQz37lLblea9COYp1wCC2rG0VD_ajDqBL1NeEwtOyFBTfaqRuLnN4YHP_-pGbAwes1gXcndSFzFFmJ6EXZNkv2V7NMYFcvjUhHDacIIVl8df8LhjBjDjSQZQGYaOMp3E6bCpXeKiMrnXArf5MGrGvIv2UphwT_JMnHffrQZFZ6QPO8KFsXp_HDOgJRwlclsB_9wMCamM3v4mhMgRjJaAl4bGwMTU6__e9PkrOl0zPvoCr9V0cWilUcC1E"/>
                  </div>
                  
                  <div className="flex items-center justify-between py-2 text-slate-500">
                    <span className="flex items-center gap-2 text-xs hover:text-sky-500 cursor-pointer"><span className="material-symbols-outlined text-[18px]">chat_bubble</span> 12</span>
                    <span className="flex items-center gap-2 text-xs hover:text-green-500 cursor-pointer"><span className="material-symbols-outlined text-[18px]">repeat</span> 45</span>
                    <span className="flex items-center gap-2 text-xs hover:text-pink-500 cursor-pointer"><span className="material-symbols-outlined text-[18px]">favorite</span> 1.2k</span>
                    <span className="flex items-center gap-2 text-xs hover:text-blue-500 cursor-pointer"><span className="material-symbols-outlined text-[18px]">bar_chart</span> 14k</span>
                  </div>
                </div>
              )}
            </div>

            {/* Secondary Column */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              {/* Small Insight Card */}
              <div className="bg-primary-container p-6 rounded-lg text-white shadow-lg shadow-primary/20">
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-on-primary-container">auto_graph</span>
                  <h4 className="font-bold text-sm">Projected Reach</h4>
                </div>
                <div className="text-3xl font-black mb-2">42.5k+</div>
                <p className="text-xs text-white/80 leading-relaxed">Based on current audience segments and campaign timing optimization.</p>
              </div>
            </div>
          </div>
          
          {/* Bottom Actions */}
          <div className="fixed bottom-0 left-72 right-0 bg-white/80 backdrop-blur-xl border-t border-white/20 p-8 flex items-center justify-between z-40 px-container-padding">
            <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
              <button onClick={() => navigate(-1)} className="px-8 py-3 rounded-full border-2 border-outline-variant text-on-surface font-bold hover:bg-surface-container transition-all flex items-center gap-2">
                <span className="material-symbols-outlined">arrow_back</span>
                Back
              </button>
              <div className="flex items-center gap-6">
                <p className="text-sm text-secondary hidden md:block">2 Assets Selected</p>
                <button onClick={handleConfirm} className="bg-gradient-to-r from-primary to-primary-container text-white px-10 py-4 rounded-full font-bold shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-3">
                  Confirm &amp; Post All
                  <span className="material-symbols-outlined">send</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

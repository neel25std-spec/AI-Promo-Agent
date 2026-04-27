import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/preview');
  };

  return (
    <div className="text-on-surface antialiased overflow-x-hidden min-h-screen flex flex-col">
      {/* TopNavBar */}
      <header className="fixed top-0 w-full border-b border-white/20 bg-white/70 backdrop-blur-xl flex justify-between items-center px-8 h-20 z-50 shadow-[0_8px_32px_0_rgba(139,92,246,0.05)]">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-xl font-black tracking-tighter text-violet-600">AI PromoAgent</Link>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a className="font-plus-jakarta text-sm font-semibold tracking-tight text-slate-500 hover:text-violet-500 transition-all duration-300" href="#">Campaigns</a>
          <a className="font-plus-jakarta text-sm font-semibold tracking-tight text-slate-500 hover:text-violet-500 transition-all duration-300" href="#">Analytics</a>
          <a className="font-plus-jakarta text-sm font-semibold tracking-tight text-slate-500 hover:text-violet-500 transition-all duration-300" href="#">Assets</a>
        </nav>
        <div className="flex items-center gap-4">
          <button className="p-2 text-slate-500 hover:bg-white/50 transition-all duration-300 rounded-full">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="p-2 text-slate-500 hover:bg-white/50 transition-all duration-300 rounded-full">
            <span className="material-symbols-outlined">settings</span>
          </button>
          <button className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-label-sm text-label-sm hover:scale-95 active:scale-90 transition-transform shadow-lg shadow-violet-500/20">
            Launch Campaign
          </button>
        </div>
      </header>
      
      <main className="relative flex-grow pt-32 pb-section-gap px-container-padding flex flex-col items-center">
        {/* Decoration Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 blur-[120px] rounded-full -z-10"></div>
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mb-16">
          <h1 className="font-headline-xl text-headline-xl text-on-background mb-4">
            Launch Your Product. <span className="text-primary">Everywhere.</span>
          </h1>
          <p className="font-body-lg text-body-lg text-secondary max-w-xl mx-auto">
            Upload your product details and let our AI agents handle the multi-channel distribution, landing page optimization, and outreach.
          </p>
        </div>
        
        {/* Form Card Container */}
        <div className="w-full max-w-4xl glass-panel p-12 rounded-lg shadow-xl shadow-violet-500/5 relative overflow-hidden">
          {/* Subtle Grain Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDUYv9o-Juy6TYVvfy878VaDQ_vUgExyN2T6ZlARJzsuuMJb6wtZs3TJd43eyp9D7RBgB8eN88wtocij8L82NpEHIcHWvdKXKLNaFyaedmtb69PmM_YyWcze0tp6iIGmlELoFBoBYwcc08C5_POHW_W870K8Ry1pcdAOb3FWy6oDOsz2CiXbpvRWHKYU0fPlLQdacc5x-VbyA1qMWnlaJHGQBQRWivzofHilSdYV1fFJE1Zp-c9BLGTfI4lhDthsiwW6SoZPuMIxHc')" }}></div>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-x-gutter gap-y-8 relative z-10" onSubmit={handleSubmit}>
            {/* Product Name */}
            <div className="flex flex-col gap-2">
              <label className="font-label-sm text-label-sm text-on-surface-variant px-2">Product Name</label>
              <input className="w-full h-14 bg-white/50 border-white/20 rounded-lg px-6 py-4 font-body-md text-body-md focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 placeholder:text-slate-400" placeholder="e.g. NexusFlow AI" type="text" />
            </div>
            
            {/* Price */}
            <div className="flex flex-col gap-2">
              <label className="font-label-sm text-label-sm text-on-surface-variant px-2">Price ($)</label>
              <input className="w-full h-14 bg-white/50 border-white/20 rounded-lg px-6 py-4 font-body-md text-body-md focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 placeholder:text-slate-400" placeholder="0.00" type="number" />
            </div>
            
            {/* Description */}
            <div className="md:col-span-2 flex flex-col gap-2">
              <div className="flex justify-between items-center px-2">
                <label className="font-label-sm text-label-sm text-on-surface-variant">Description</label>
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">0 / 500 Characters</span>
              </div>
              <textarea className="w-full bg-white/50 border-white/20 rounded-lg px-6 py-4 font-body-md text-body-md focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 placeholder:text-slate-400 resize-none" placeholder="Describe your product's core value proposition..." rows={4}></textarea>
            </div>
            
            {/* Target Audience */}
            <div className="md:col-span-2 flex flex-col gap-2">
              <label className="font-label-sm text-label-sm text-on-surface-variant px-2">Target Audience</label>
              <input className="w-full h-14 bg-white/50 border-white/20 rounded-lg px-6 py-4 font-body-md text-body-md focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 placeholder:text-slate-400" placeholder="e.g. SaaS Founders, Fintech Developers, Digital Nomads" type="text" />
            </div>
            
            {/* Image Upload (Dashed Area) */}
            <div className="md:col-span-2">
              <label className="font-label-sm text-label-sm text-on-surface-variant px-2 mb-2 block">Product Imagery</label>
              <label className="w-full border-2 border-dashed border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors duration-300 rounded-lg p-10 flex flex-col items-center justify-center gap-4 cursor-pointer relative overflow-hidden min-h-[200px]">
                <input type="file" accept="image/png, image/jpeg, image/webp" className="hidden" onChange={handleImageChange} />
                {previewUrl ? (
                  <img src={previewUrl} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity" />
                ) : (
                  <>
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md shadow-violet-500/10 relative z-10">
                      <span className="material-symbols-outlined text-primary text-3xl">upload_file</span>
                    </div>
                    <div className="text-center relative z-10">
                      <p className="font-headline-md text-[18px] text-on-background">Click to upload your product screenshot</p>
                      <p className="font-body-md text-sm text-secondary">PNG, JPG or WebP up to 10MB</p>
                    </div>
                  </>
                )}
              </label>
            </div>
            

            
            {/* LinkedIn Profile URL */}
            <div className="flex flex-col gap-2">
              <label className="font-label-sm text-label-sm text-on-surface-variant px-2">LinkedIn Profile URL</label>
              <input className="w-full h-14 bg-white/50 border-white/20 rounded-lg px-6 py-4 font-body-md text-body-md focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 placeholder:text-slate-400" placeholder="linkedin.com/in/username" type="url" />
            </div>
            
            {/* Submit Button */}
            <div className="md:col-span-2 pt-8 flex justify-center">
              <button className="group relative bg-primary text-on-primary px-12 py-5 rounded-full font-headline-md text-headline-md shadow-2xl shadow-violet-500/40 hover:scale-[1.02] active:scale-95 transition-all duration-300 overflow-hidden" type="submit">
                <span className="relative z-10 flex items-center gap-3">
                  🚀 Launch AI Campaign
                </span>
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
            </div>
          </form>
        </div>
        
        {/* Visual Side Assets (Asymmetric Layout Elements) */}
        <div className="w-full max-w-6xl mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-panel p-8 rounded-lg flex items-center gap-6 group hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">auto_awesome</span>
            </div>
            <div>
              <h4 className="font-headline-md text-body-md font-bold mb-1">AI-Generated Content</h4>
              <p className="text-sm text-secondary">Our engine creates 15+ variations of your ad copy instantly.</p>
            </div>
          </div>
          
          <div className="glass-panel p-8 rounded-lg flex items-center gap-6 group hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-secondary">share_reviews</span>
            </div>
            <div>
              <h4 className="font-headline-md text-body-md font-bold mb-1">Multi-Channel Reach</h4>
              <p className="text-sm text-secondary">Distribute to ProductHunt, Reddit, and LinkedIn automatically.</p>
            </div>
          </div>
          
          <div className="glass-panel p-8 rounded-lg flex items-center gap-6 group hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 bg-tertiary/10 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-tertiary">query_stats</span>
            </div>
            <div>
              <h4 className="font-headline-md text-body-md font-bold mb-1">Real-time Analytics</h4>
              <p className="text-sm text-secondary">Monitor clicks and conversions from a unified dashboard.</p>
            </div>
          </div>
        </div>
      </main>
      
      {/* Side Decoration (Floating elements for depth) */}
      <div className="fixed top-1/4 -left-20 w-40 h-40 bg-violet-400/10 rounded-full blur-3xl -z-20"></div>
      <div className="fixed bottom-1/4 -right-20 w-64 h-64 bg-indigo-400/10 rounded-full blur-3xl -z-20"></div>
      
      <footer className="w-full py-12 px-container-padding flex justify-between items-center border-t border-white/20 bg-white/10 backdrop-blur-md mt-auto">
        <p className="text-sm text-slate-500 font-plus-jakarta">© 2024 AI PromoAgent. All rights reserved.</p>
        <div className="flex gap-8">
          <a className="text-sm text-slate-500 hover:text-primary transition-colors" href="#">Privacy Policy</a>
          <a className="text-sm text-slate-500 hover:text-primary transition-colors" href="#">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
}

export default App;

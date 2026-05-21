export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-black/40 px-8 backdrop-blur-md">
      <div className="flex items-center">
        <h2 className="text-xs font-black uppercase tracking-widest text-slate-300">Live Mission Control</h2>
        <span className="ml-4 flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
      </div>
      <div className="flex items-center space-x-6">
        <div className="text-right">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Model</p>
          <p className="text-xs font-bold text-slate-300">Gemini 1.5 Pro</p>
        </div>
      </div>
    </header>
  );
}

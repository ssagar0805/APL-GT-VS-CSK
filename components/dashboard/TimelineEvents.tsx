import fs from 'fs';
import path from 'path';

export function TimelineEvents() {
  const filePath = path.join(process.cwd(), 'lib/data/gt-vs-csk-21may2026.json');
  let events = [];
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    events = data.timelineEvents || [];
  } catch (error) {
    console.error("Failed to load timeline events", error);
  }

  return (
    <div className="space-y-3 h-full overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
      {events.map((item: any, i: number) => {
        const isPositive = item.impact.includes('+');
        const isWicket = item.event === 'WICKET';
        
        return (
          <div key={i} className="flex justify-between items-center border-b border-white/5 pb-3 last:border-0 last:pb-0">
            <div>
               <div className="flex items-center space-x-2 mb-1">
                   <span className="text-[9px] font-mono font-bold text-slate-500 bg-black/40 px-1.5 py-0.5 rounded border border-white/5">Ov {item.over}</span>
                   <span className={`text-[10px] font-black tracking-widest ${isWicket ? 'text-red-500' : 'text-emerald-400'}`}>
                       {item.event}
                   </span>
               </div>
               <p className="text-[11px] text-slate-300">
                  <span className="text-white font-bold">{item.player}</span> 
                  {isWicket ? ' out to ' : ' off '} 
                  <span className="text-slate-400">{item.bowler}</span>
               </p>
            </div>
            <span className={`text-[10px] font-mono font-bold px-2 py-1 rounded bg-white/5 border border-white/5 ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
               {item.impact}
            </span>
          </div>
        );
      })}
    </div>
  );
}

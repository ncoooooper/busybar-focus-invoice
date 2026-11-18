import {desk,duration} from "@shared/desk";
import {wrap,rect,type Frame} from "@shared/surface";

function clockMark(running: boolean, hasTime: boolean): Frame {
  if (running) {
    return [0,1,2,3].map(i=>rect("play"+i,57+i*2,4+i,2,9-2*i,"#8BDCB0FF"));
  }
  if (!hasTime) return [];
  return [rect("pause-left",57,5,3,7,"#A6B2AEFF"),rect("pause-right",63,5,3,7,"#A6B2AEFF")];
}

let names=["Design","Research","Studio"],rate=60,block=15;
type S={at:number;active:string;since:number;totals:Record<string,number>;invoice:boolean};
function elapsed(s:S,p:string,now:number){return (s.totals[p]||0)+(s.active===p?Math.max(0,now-s.since):0);}
desk<S>({name:"Focus Invoice",accent:"#ECA64C",motion:{enabled:false},initial:()=>({at:0,active:"",since:0,totals:{},invoice:false}),
 configure:(s,v)=>{const n=String(v.projects||"").split(",").map(i=>i.trim()).filter(Boolean);if(n.length)names=n;s.at=wrap(s.at,names.length);rate=Math.max(0,Number(v.rate??60));block=Math.max(1,Number(v.block??15));},
 ticking:s=>!!s.active,render:(s,now)=>{const p=names[s.at],ms=elapsed(s,p,now),minutes=Math.ceil(ms/(block*60000))*block;
 return {marks:clockMark(s.active===p,ms>0),title:p,value:s.invoice?(minutes*rate/60).toFixed(2):duration(ms),lines:[p+(s.active===p?" / CLOCKING":""),"Raw "+duration(ms)+" / bill "+minutes+" min","Rate "+rate+"/h / block "+block+" min","Amount "+(minutes*rate/60).toFixed(2),"Click: invoice / Wheel: project","Start: clock in or out"]};},
 action:(s,k,now)=>{if(k==="up"||k==="down")s.at=wrap(s.at+(k==="up"?1:-1),names.length);
 if(k==="ok")s.invoice=!s.invoice;if(k==="start"){const next=names[s.at],prior=s.active;if(prior)s.totals[prior]=elapsed(s,prior,now);s.active=next===prior?"":next;s.since=now;}}});

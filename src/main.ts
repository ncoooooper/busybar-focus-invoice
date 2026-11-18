import {desk,duration} from "@shared/desk";
import {wrap} from "@shared/surface";
let names=["Design","Research","Studio"],rate=60,block=15;
type S={at:number;active:string;since:number;totals:Record<string,number>;invoice:boolean};
function elapsed(s:S,p:string,now:number){return (s.totals[p]||0)+(s.active===p?Math.max(0,now-s.since):0);}
desk<S>({name:"Focus Invoice",accent:"#ECA64C",motion:{"motif":"interval","color":"#ECA64C","shine":"#FFF0BB"},initial:()=>({at:0,active:"",since:0,totals:{},invoice:false}),
 configure:(s,v)=>{const n=String(v.projects||"").split(",").map(i=>i.trim()).filter(Boolean);if(n.length)names=n;s.at=wrap(s.at,names.length);rate=Math.max(0,Number(v.rate??60));block=Math.max(1,Number(v.block??15));},
 ticking:s=>!!s.active,render:(s,now)=>{const p=names[s.at],ms=elapsed(s,p,now),minutes=Math.ceil(ms/(block*60000))*block;
 return {title:p,value:s.invoice?(minutes*rate/60).toFixed(2):duration(ms),lines:[p+(s.active===p?" / CLOCKING":""),"Raw "+duration(ms)+" / bill "+minutes+" min","Rate "+rate+"/h / block "+block+" min","Amount "+(minutes*rate/60).toFixed(2),"Click: invoice / Wheel: project","Start: clock in or out"]};},
 action:(s,k,now)=>{if(k==="up"||k==="down")s.at=wrap(s.at+(k==="up"?1:-1),names.length);
 if(k==="ok")s.invoice=!s.invoice;if(k==="start"){const next=names[s.at],prior=s.active;if(prior)s.totals[prior]=elapsed(s,prior,now);s.active=next===prior?"":next;s.since=now;}}});

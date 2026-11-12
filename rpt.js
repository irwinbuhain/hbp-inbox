/* HomeBuyer+ Inbox – Reports screen: easy-to-read numbers, approve suggestions, send instructions to Claude. */
(function(){
const css=`
#rpView{position:fixed;inset:0;z-index:20;background:#000;display:flex;flex-direction:column;transform:translateX(100%);transition:transform .42s cubic-bezier(.32,.72,0,1)}
#rpView.on{transform:none}
#rpView .rh{display:grid;grid-template-columns:auto 1fr auto;gap:8px;align-items:center;padding:calc(8px + var(--tg-safe-area-inset-top,0px) + var(--tg-content-safe-area-inset-top,0px)) 16px 8px;border-bottom:1px solid #262629;background:rgba(11,11,13,.96)}
#rpView .rh .t{text-align:center;min-width:0}#rpView .rh b{display:block;font-size:15px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}#rpView .rh span{font-size:12px;color:#8e8e93}
.rpb{flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch;padding:12px 16px 24px}
.kgrid{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.kt{background:#1c1c1e;border-radius:14px;padding:12px}
.kt .l{font-size:12px;color:#8e8e93;text-transform:uppercase;letter-spacing:.4px}
.kt .v{font-size:28px;font-weight:700;font-variant-numeric:tabular-nums;margin-top:2px}
.kt .a{font-size:12px;color:#8e8e93;margin-top:2px}.kt .a .up{color:#30d158}.kt .a .dn{color:#ff453a}
.rsec{color:#8e8e93;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;margin:18px 0 6px 2px}
.rcard{background:#1c1c1e;border-radius:14px;padding:12px 14px;font-size:15px;line-height:1.4}
.rcard .ln+.ln{border-top:1px solid #2c2c2e;margin-top:8px;padding-top:8px}
.sug{background:#1c1c1e;border-radius:14px;padding:12px 14px;margin:8px 0}
.sug .tx{font-size:15px;font-weight:600;line-height:1.35}.sug .wy{font-size:13px;color:#a1a1a6;margin-top:4px;line-height:1.35}
.sug .bt{display:flex;gap:8px;margin-top:10px}.sug .bt button{flex:1;border-radius:12px;padding:10px;font:600 15px system-ui;border:1px solid #3a3a3c;background:#2c2c2e;color:#fff}
.sug .bt .ap{background:#0a84ff;border-color:#0a84ff}.sug .bt .sk{color:#ff453a}
.sug .st{margin-top:10px;font-size:13px;color:#8e8e93}.sug .st b{color:#fff}
.sug textarea,.rdock textarea{width:100%;box-sizing:border-box;background:#000;border:1px solid #3a3a3c;border-radius:10px;color:#fff;font:15px system-ui;padding:9px;margin-top:8px;resize:none}
.act{background:#111;border-radius:12px;padding:10px 12px;margin:6px 0;font-size:14px}.act .k{font-size:11px;color:#8e8e93;text-transform:uppercase;letter-spacing:.4px}
.act .r{margin-top:4px;color:#c7c7cc;font-size:13px}
.pill{display:inline-block;font-size:11px;font-weight:700;border-radius:999px;padding:2px 8px;margin-left:6px;background:#2c2c2e;color:#e5e5ea}
.pill.new{background:#0a1f3d;color:#7fb2ff}.pill.done{background:#0f3d1e;color:#5be37f}.pill.need{background:#3d2a07;color:#ffbf47}.pill.dec{background:#2c1a17;color:#ff9f8a}
.rdock{background:rgba(11,11,13,.96);border-top:1px solid #262629;padding:8px 16px calc(8px + max(env(safe-area-inset-bottom,0px),var(--tg-safe-area-inset-bottom,0px)));display:flex;gap:8px;align-items:flex-end}
.rdock textarea{margin:0;flex:1}
.rdock .snd{width:34px;height:34px;border-radius:50%;border:0;background:#0a84ff;color:#fff;font-size:18px;flex:none}.rdock .snd:disabled{background:#3a3a3c;color:#8e8e93}
`;
const st=document.createElement("style");st.textContent=css;document.head.appendChild(st);
const $=id=>document.getElementById(id);
const E=(tag,attrs={},...kids)=>{const n=document.createElement(tag);for(const[k,v]of Object.entries(attrs)){if(k==="class")n.className=v;else if(k==="text")n.textContent=v;else if(k.startsWith("on"))n.addEventListener(k.slice(2),v);else if(v!=null&&v!==false)n.setAttribute(k,v);}for(const c of kids)if(c!=null&&c!==false)n.append(c);return n;};
const view=E("section",{id:"rpView","aria-label":"Report"});document.body.appendChild(view);
let R=null;const api=()=>window.__uwApi;
function fmtNum(v,u){if(v===""||v==null)return"–";const n=Number(v);if(!isFinite(n))return String(v)+(u||"");const s=Math.abs(n)>=1000?n.toLocaleString("en-US",{maximumFractionDigits:0}):String(Math.round(n*10)/10);return(u==="$"?"$"+s:s+(u&&u!=="$"?u:""));}
function kpiTile(k){const n=Number(k.value),a=Number(k.avg7);let cmp=null;
  if(isFinite(n)&&isFinite(a)&&k.avg7!==""&&k.avg7!=null){const up=n>a,eq=n===a;const good=eq?null:(k.better==="down"?!up:up);cmp=E("span",{class:good==null?"":good?"up":"dn",text:eq?"= 7-day avg":(up?"▲ ":"▼ ")+"vs 7-day avg "+fmtNum(a,k.unit)});}
  return E("div",{class:"kt"},E("div",{class:"l",text:k.label}),E("div",{class:"v",text:fmtNum(k.value,k.unit)}),E("div",{class:"a"},cmp));}
function stClass(s){return/done/i.test(s)?"done":/need/i.test(s)?"need":/declin/i.test(s)?"dec":"new";}
let _rpLast=null;
function render(){if(R&&R.id)cput(R);
  /* Irwin (Nov 9): approving/skipping a suggestion (or a background refresh) keeps you where you were – only a different report starts at the top */
  const _old=view.querySelector(".rpb"),_keep=(_old&&_rpLast===R.id)?_old.scrollTop:0;_rpLast=R.id;
  const d=R.data||{},acts=R.actions||[];
  const body=E("div",{class:"rpb"});
  if((d.kpis||[]).length)body.append(E("div",{class:"kgrid"},...d.kpis.map(kpiTile)));
  if(d.summary)body.append(E("div",{class:"rsec",text:"Summary"}),E("div",{class:"rcard",text:d.summary}));
  (d.sections||[]).forEach(s=>{if(!(s.lines||[]).length)return;body.append(E("div",{class:"rsec",text:s.title}),E("div",{class:"rcard"},...s.lines.map(l=>E("div",{class:"ln",text:l}))));});
  const sug=d.suggestions||[];
  if(sug.length){body.append(E("div",{class:"rsec",text:"💡 Suggestions"}));sug.forEach(s=>body.append(sugCard(s,acts.find(a=>a.kind==="Suggestion"&&a.text===s.text))));}
  const ins=acts.filter(a=>a.kind==="Instruction");
  if(ins.length){body.append(E("div",{class:"rsec",text:"Your instructions to Claude"}));ins.forEach(a=>body.append(E("div",{class:"act"},E("div",{class:"k"},a.when,E("span",{class:"pill "+stClass(a.status),text:a.status})),E("div",{text:a.text}),a.result?E("div",{class:"r",text:a.result}):null)));}
  const ta=E("textarea",{rows:"1",placeholder:"Tell Claude what to do about this report…"});const snd=E("button",{class:"snd",type:"button",disabled:"","aria-label":"Send to Claude"},"↑");
  ta.addEventListener("input",()=>{snd.disabled=!ta.value.trim();ta.style.height="auto";ta.style.height=Math.min(ta.scrollHeight,120)+"px";});
  snd.addEventListener("click",()=>{const v=ta.value.trim();if(v)act("Instruction",v,"");});
  view.replaceChildren(
    E("div",{class:"rh"},E("button",{class:"uwback",type:"button",onclick:close},"‹ Back"),E("div",{class:"t"},E("b",{text:`${R.bot} – ${R.title}`}),E("span",{text:R.date||R.created})),E("span")),
    body, api().isOwner()?E("div",{class:"rdock"},ta,snd):null);
  if(_keep){body.scrollTop=_keep;requestAnimationFrame(()=>{body.scrollTop=_keep;});}
}
function sugCard(s,a){
  const c=E("div",{class:"sug"},E("div",{class:"tx",text:s.text}),s.why?E("div",{class:"wy",text:s.why}):null);
  if(a){c.append(E("div",{class:"st"},a.status==="Declined"?"Skipped":"Approved – sent to Claude",E("span",{class:"pill "+stClass(a.status),text:a.status}),a.note?E("div",{text:"Your note: "+a.note}):null,a.result?E("div",{},E("b",{text:"Result: "}),a.result):null));return c;}
  if(!api().isOwner())return c;
  const note=E("textarea",{rows:"1",placeholder:"Optional note (e.g. only on weekdays)"});
  c.append(note,E("div",{class:"bt"},E("button",{class:"ap",type:"button",onclick:()=>act("Approve",s.text,note.value)},"Approve"),E("button",{class:"sk",type:"button",onclick:()=>act("Skip",s.text,note.value)},"Skip")));
  return c;
}
const DONE=new Set();
async function act(decision,text,note){
  const A=api();const prev=JSON.stringify(R.actions||[]);
  const _a={when:"now",kind:decision==="Instruction"?"Instruction":"Suggestion",text,note,by:A.me(),status:decision==="Skip"?"Declined":"New",result:""};
  (R.actions=R.actions||[]).push(_a);try{window.__ov&&window.__ov.addAct(R.id,_a);}catch(_){}cput(R);
  A.haptic("ok");A.toast(decision==="Skip"?"Skipped":"Sent to Claude");render();
  const left=()=>{const d=(R.actions||[]).filter(a=>a.kind==="Suggestion").map(a=>a.text);return ((R.data&&R.data.suggestions)||[]).filter(x=>d.indexOf(x.text)<0).length;};
  A.patch&&A.patch("rp",R.id,{open:left()});
  /* Irwin, Nov 9: once every suggestion in this report is decided, go to the next report that needs you */
  const me=R.id;if(left()===0){DONE.add(me);setTimeout(()=>{if(openId!==me)return;const n=window.__rpNextOpen&&window.__rpNextOpen(me,DONE);if(n){A.toast("Next report");open(n);view.classList.remove("rp-l","rp-r");void view.offsetWidth;view.classList.add("rp-l");}else{A.toast("All reports reviewed");close();}},900);}
  try{const r=await A.run("reportAction",R.id,decision,text,note||"");if(!r||!r.ok)throw new Error((r&&r.reason)||"failed");A.refresh&&A.refresh();}
  catch(e){try{window.__ov&&window.__ov.dropAct(R.id,text);}catch(_){}R.actions=JSON.parse(prev);cput(R);A.haptic("err");A.toast(String(e.message)==="IRWIN_ONLY"?"Only Irwin can do this":"Couldn't save – try again");render();A.patch&&A.patch("rp",R.id,{open:left()});}
}
/* cache: reports open instantly from memory/localStorage, then refresh in the background */
const MEM={};
function cget(id){if(MEM[id])return MEM[id];try{const v=JSON.parse(localStorage.getItem("hbp-rp:"+id)||"null");if(v){MEM[id]=v;return v;}}catch(e){}return null;}
function cput(r){if(!r||!r.id)return;MEM[r.id]=r;try{localStorage.setItem("hbp-rp:"+r.id,JSON.stringify(r));const ks=Object.keys(localStorage).filter(k=>k.indexOf("hbp-rp:")===0);if(ks.length>12)ks.slice(0,ks.length-12).forEach(k=>localStorage.removeItem(k));}catch(e){}}
let openId=null;
async function open(id){
  const A=api();openId=id;const c=cget(id);
  view.classList.add("on");A.backOn();view.style.transform="";
  if(c){try{window.__ov&&window.__ov.mergeActs(c);}catch(_){}R=c;render();}
  else view.replaceChildren(E("div",{class:"rh"},E("button",{class:"uwback",type:"button",onclick:close},"‹ Back"),E("div",{class:"t"},E("b",{text:"Loading report…"})),E("span")));
  try{const f=await A.run("getReport",id);if(!f)throw new Error("GONE");try{window.__ov&&window.__ov.mergeActs(f);}catch(_){}cput(f);
    if(openId===id&&view.classList.contains("on")&&(!c||JSON.stringify(f)!==JSON.stringify(c))&&!(document.activeElement&&document.activeElement.tagName==="TEXTAREA"&&view.contains(document.activeElement))){R=f;render();}}
  catch(e){if(!c){A.toast("Couldn't load the report");close();}}
}
function close(){openId=null;view.classList.remove("on");view.style.transform="";api().backOff();}
let pf=false;
async function prefetch(ids){if(pf)return;pf=true;try{for(const id of (ids||[]).slice(0,8)){if(MEM[id])continue;try{const f=await api().run("getReport",id);if(f)cput(f);}catch(e){}}}finally{pf=false;}}
/* swipes (Irwin, Nov 9): left = next report, right = previous report; right on the first report – or from the left edge – goes back to the list */
function nav(step){const ord=(window.__rpOrder&&window.__rpOrder())||[];const i=ord.indexOf(openId);if(i<0)return false;const j=i+step;if(j<0||j>=ord.length)return false;open(ord[j]);
  view.classList.remove("rp-l","rp-r");void view.offsetWidth;view.classList.add(step>0?"rp-l":"rp-r");api().haptic&&api().haptic();return true;}
(function(){let x0=null,y0=null,t0=0,mode=null,dx=0,edge=false;
  const st=document.createElement("style");st.textContent="@keyframes rpl{from{transform:translateX(60px);opacity:.4}to{transform:none;opacity:1}}@keyframes rpr{from{transform:translateX(-60px);opacity:.4}to{transform:none;opacity:1}}#rpView.rp-l{animation:rpl .22s ease-out}#rpView.rp-r{animation:rpr .22s ease-out}";document.head.appendChild(st);
  view.addEventListener("touchstart",e=>{if(e.touches.length!==1){x0=null;return;}const t=e.target;if(t.closest&&t.closest("textarea,input")){x0=null;return;}x0=e.touches[0].clientX;y0=e.touches[0].clientY;edge=x0<28;t0=Date.now();mode=null;dx=0;},{passive:true});
  view.addEventListener("touchmove",e=>{if(x0===null)return;dx=e.touches[0].clientX-x0;const dy=e.touches[0].clientY-y0;
    if(!mode){if(Math.abs(dx)<10&&Math.abs(dy)<10)return;mode=Math.abs(dx)>Math.abs(dy)*1.2?(edge&&dx>0?"exit":"page"):"none";}
    if(mode==="exit"){view.style.transition="none";view.style.transform=`translateX(${Math.max(0,dx)}px)`;}
    else if(mode==="page"){view.style.transition="none";view.style.transform=`translateX(${dx*0.35}px)`;}},{passive:true});
  view.addEventListener("touchend",()=>{if(x0===null)return;x0=null;const m=mode;mode=null;if(m!=="exit"&&m!=="page")return;view.style.transition="";
    const far=Math.abs(dx)>view.clientWidth*0.22||(Date.now()-t0<300&&Math.abs(dx)>50);
    if(m==="exit"){if(far&&dx>0){api().haptic&&api().haptic();close();}else view.style.transform="";return;}
    view.style.transform="";if(!far)return;
    if(dx<0){if(!nav(1))api().toast&&api().toast("That's the last report");}
    else if(!nav(-1)){api().haptic&&api().haptic();close();}},{passive:true});
})();
window.__rp={open,close,prefetch,isOpen:()=>view.classList.contains("on")};
})();

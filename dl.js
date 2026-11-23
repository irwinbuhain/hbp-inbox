/* HomeBuyer+ Inbox – Watch deal page.
   Irwin, Nov 23 2026 3:02 PM: "If I click the deal it opens to a page that gives me a summary of what has been done and what we are waiting for?
   remove the call button. Any deal actions go into the summary page". */
(function(){
const css=`
#dlView{position:fixed;inset:0;z-index:19;background:#000;display:flex;flex-direction:column;transform:translateX(100%);transition:transform .42s cubic-bezier(.32,.72,0,1)}
#dlView.on{transform:none}
#dlView .rh{display:grid;grid-template-columns:auto 1fr auto;gap:8px;align-items:center;padding:calc(8px + var(--tg-safe-area-inset-top,0px) + var(--tg-content-safe-area-inset-top,0px)) 16px 8px;border-bottom:1px solid #262629;background:rgba(11,11,13,.96)}
#dlView .rh .t{text-align:center;min-width:0}#dlView .rh b{display:block;font-size:15px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}#dlView .rh span{font-size:12px;color:#8e8e93}
#dlView .dlb{flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch;padding:12px 16px calc(24px + env(safe-area-inset-bottom,0px))}
.dlhero{background:#1c1c1e;border-radius:14px;padding:12px 14px}
.dlhero .w{font-size:15px;font-weight:600}.dlhero .c{font-size:13px;color:#8e8e93;margin-top:2px}
.dlchips{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}
.dlchip{font-size:12px;border-radius:999px;padding:3px 9px;background:#2c2c2e;color:#e5e5ea}
.dlchip.gold{background:#3a2e0b;color:#e3b341}.dlchip.blue{background:#0a1f3d;color:#7fb2ff}
.dlsec{color:#8e8e93;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;margin:18px 0 6px 2px}
.dlwait{background:#2a2108;border:1px solid #4a3a0e;border-radius:14px;padding:4px 14px}
.dlwait .it{padding:9px 0;font-size:15px;line-height:1.35;display:flex;gap:10px}.dlwait .it+.it{border-top:1px solid #4a3a0e}
.dlwait .it i{font-style:normal;flex:none}.dlwait .it small{display:block;color:#c9b27a;font-size:13px;margin-top:2px}
.dlwait.ok{background:#0f2416;border-color:#1d4a2b}.dlwait.ok .it+.it{border-color:#1d4a2b}.dlwait.ok .it small{color:#8fc9a0}
.dlacts{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.dlacts a,.dlacts button{display:flex;align-items:center;justify-content:center;gap:6px;border-radius:12px;padding:12px 8px;font:600 15px system-ui;border:1px solid #3a3a3c;background:#1c1c1e;color:#fff;text-decoration:none}
.dlacts .pri{background:#0a84ff;border-color:#0a84ff}.dlacts .dead{color:#ff453a;grid-column:1/-1}.dlacts .dead.arm{background:#ff453a;color:#fff;border-color:#ff453a}
.dlnote{background:#1c1c1e;border-radius:14px;padding:12px 14px;font-size:14px;line-height:1.45;white-space:pre-wrap;color:#e5e5ea}
.dlnote .d{font-size:12px;color:#8e8e93;margin-bottom:4px;white-space:normal}.dlnote+.dlnote{margin-top:8px}
.dlnote.cut{max-height:150px;overflow:hidden;position:relative}.dlnote.cut:after{content:"";position:absolute;left:0;right:0;bottom:0;height:40px;background:linear-gradient(transparent,#1c1c1e)}
.dltl{background:#1c1c1e;border-radius:14px;padding:4px 14px}
.dltl .ev{display:grid;grid-template-columns:22px 1fr;gap:8px;padding:9px 0;font-size:14px;line-height:1.35}.dltl .ev+.ev{border-top:1px solid #2c2c2e}
.dltl .ev .k{font-size:12px;color:#8e8e93;margin-top:2px}.dltl .ev .q{color:#c7c7cc}
.dlmore{display:block;width:100%;margin-top:8px;background:none;border:0;color:#0a84ff;font:600 14px system-ui;padding:6px}
.dltx{display:flex;flex-direction:column;gap:6px}.dltx .bb{max-width:82%;padding:8px 12px;border-radius:16px;font-size:14px;line-height:1.35;white-space:pre-wrap;word-wrap:break-word}.dltx .bb small{display:block;font-size:11px;opacity:.65;margin-top:3px}.dltx .in{align-self:flex-start;background:#2c2c2e;border-bottom-left-radius:5px}.dltx .out{align-self:flex-end;background:#0a84ff;border-bottom-right-radius:5px}
.dlload{color:#8e8e93;font-size:14px;text-align:center;padding:18px}
`;
const st=document.createElement("style");st.textContent=css;document.head.appendChild(st);
const E=(tag,attrs={},...kids)=>{const n=document.createElement(tag);for(const[k,v]of Object.entries(attrs)){if(k==="class")n.className=v;else if(k==="text")n.textContent=v;else if(k.startsWith("on"))n.addEventListener(k.slice(2),v);else if(v!=null&&v!==false)n.setAttribute(k,v);}for(const c of kids)if(c!=null&&c!==false)n.append(c);return n;};
const view=E("section",{id:"dlView","aria-label":"Deal"});document.body.appendChild(view);
const api=()=>window.__uwApi;const W=()=>window.__dlHelp||{};
const MEM={};let openId=null,D=null,full=null,showAll=false,showTx=false,armed=false;
function cget(id){if(MEM[id])return MEM[id];try{const c=JSON.parse(localStorage.getItem("hbp-dl-"+id)||"null");if(c)MEM[id]=c;return c;}catch(e){return null;}}
function cput(id,f){MEM[id]=f;try{localStorage.setItem("hbp-dl-"+id,JSON.stringify(f));}catch(e){}}
const LOC="jUXoUgmaQ8JWrlfCiATk";
function age(t){if(!t)return "";const h=(Date.now()-t)/36e5;if(h<1)return "just now";if(h<24)return Math.round(h)+"h ago";const d=Math.round(h/24);return d+(d===1?" day ago":" days ago");}
function when(t){if(!t)return "";const d=new Date(t);return d.toLocaleDateString("en-US",{month:"short",day:"numeric"})+" · "+d.toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit"});}
function tParse(s){if(typeof s==="number")return s;const t=Date.parse(String(s||"").replace(" ","T"));return isNaN(t)?0:t;}
function money(n){n=Number(String(n==null?"":n).replace(/[^0-9.]/g,""))||0;return n?"$"+Math.round(n).toLocaleString("en-US"):"";}
const DONE=/^(resolved|done|fyi|approved|sent|closed|skipped|dismissed)/i;
function first(x){return String(x.who||"").split(/\s+/)[0]||"they";}
function titleOf(x,u){const s=u?String(u.address||"").split(",")[0]:"";const n=String(x.name||"");const m=/[–-]\s*(\d.+)$/.exec(n);return s||(m?m[1].split(",")[0]:"")||(/^\d/.test(n)?n.split(",")[0]:"")||x.who||n||"Deal";}
function latestUw(f,x){const L=(f&&f.uw&&f.uw.length)?f.uw:((W().uw&&W().uw(x))?[W().uw(x)]:[]);return L.find(u=>!/^(Stopped|Passed)/i.test(u.status||""))||L[0]||null;}

/* what we are waiting for – the answer at the top of the page */
function waiting(x,f){const out=[];const who=first(x);const msgs=(f&&f.msgs)||[];
  const last=msgs[0]||(x.last?{t:x.last,dir:x.dir,body:x.body}:null);
  if(last&&last.dir==="inbound")out.push({i:"💬",t:`Your reply – ${who} texted ${age(last.t)}`,s:last.body?`“${last.body}”`:""});
  (f&&f.tasks||[]).filter(k=>!DONE.test(k.status||"")).slice(0,3).forEach(k=>out.push({i:"📥",t:"Open task: "+k.title,s:(k.bot||"")+(k.t?" · "+k.t:"")}));
  const n0=(f&&f.notes||[])[0];if(n0&&Date.now()-n0.t<10*864e5){String(n0.body||"").split("\n").filter(l=>/^\s*[•\-*]/.test(l)).slice(0,4).forEach(l=>out.push({i:"☑️",t:l.replace(/^\s*[•\-*]\s*/,""),s:"From your call note "+age(n0.t)}));}
  const u=latestUw(f,x);if(u&&/^draft/i.test(u.status||""))out.push({i:"🧮",t:"Your OK on the underwriting",s:u.address||""});
  if(last&&last.dir!=="inbound"&&last.t)out.push({i:"⏳",t:`${who} to answer our text from ${age(last.t)}`,s:last.body?`“${last.body}”`:""});
  const nx=(W().next||{})[x.stage];if(nx)out.push({i:"➡️",t:"Next step: "+nx,s:`${x.stage}${x.since?" since "+age(x.since).replace(" ago",""):""}`});
  return out;}

/* everything that has happened, newest first */
function events(x,f){const ev=[];if(!f)return ev;
  (f.cards||[]).forEach(c=>{ev.push({t:c.created,i:"🗂",h:`Card created in ${c.pipe||"GHL"}`,k:c.name});
    if(c.moved&&c.moved-c.created>60000)ev.push({t:c.moved,i:c.status==="lost"?"✖️":c.status==="won"?"🏁":"➡️",h:`Moved to ${c.stage||"a new stage"}${c.pipe?" ("+c.pipe+")":""}`,k:c.status&&c.status!=="open"?"Card is "+c.status:""});});
  (f.uw||[]).forEach(u=>{ev.push({t:tParse(u.created),i:"🧮",h:"Underwriting done – "+(u.address||""),k:[u.arv?"ARV "+money(u.arv):"",u.rehab?"rehab "+money(u.rehab):"",u.max?"MAX "+money(u.max):""].filter(Boolean).join(" · ")});
    if(u.decidedAt)ev.push({t:tParse(u.decidedAt),i:/^(Stopped|Passed)/i.test(u.status)?"✋":"✅",h:`Underwriting ${String(u.status||"").toLowerCase()}${u.decidedBy?" by "+u.decidedBy:""}`,k:u.open?"Opening offer "+money(u.open):""});});
  (f.tasks||[]).forEach(k=>ev.push({t:tParse(k.t),i:"📥",h:k.title,k:[k.bot,k.status].filter(Boolean).join(" · ")}));
  (f.notes||[]).forEach(n=>ev.push({t:n.t,i:"📝",h:"Call note added",k:String(n.body||"").split("\n")[0].slice(0,120)}));
  return ev.filter(e=>e.t).sort((a,b)=>b.t-a.t);}

function render(){if(!D)return;const x=D,f=full,A=api();const u=latestUw(f,x);
  const keep=view.querySelector(".dlb");const top=keep?keep.scrollTop:0;
  const title=titleOf(x,u);
  const head=E("div",{class:"rh"},E("button",{class:"uwback",type:"button",onclick:close},"‹ Back"),E("div",{class:"t"},E("b",{text:title}),E("span",{text:`${x.stage} · ${x.pipe}`})),E("span"));
  const b=E("div",{class:"dlb"});
  const live=u&&!/^(Stopped|Passed)/i.test(u.status||"")?u:null;const ov=live?(Number(String(live.open||"").replace(/[^0-9]/g,""))||0):0;
  const ct=(()=>{const k=(f&&f.tasks||[]).map(k=>/\$([\d,]{5,})\s+contract/i.exec(k.title||"")).find(Boolean);return k?k[1]:"";})();
  const ph=String(x.phone||"").replace(/\D/g,"").slice(-10);const phone=ph.length===10?`(${ph.slice(0,3)}) ${ph.slice(3,6)}-${ph.slice(6)}`:x.phone;
  b.append(E("div",{class:"dlhero"},E("div",{class:"w",text:[x.who,x.company].filter(Boolean).join(" · ")||x.name}),
    phone?E("div",{class:"c",text:phone}):null,
    E("div",{class:"dlchips"},ct?E("span",{class:"dlchip gold",text:"Contract "+money(ct)}):ov?E("span",{class:"dlchip gold",text:"Offer "+money(ov)}):(live&&live.max?E("span",{class:"dlchip gold",text:"MAX "+money(live.max)}):(x.value>1000?E("span",{class:"dlchip gold",text:money(x.value)}):null)),
      E("span",{class:"dlchip blue",text:x.stage}),x.since?E("span",{class:"dlchip",text:"in stage "+age(x.since).replace(" ago","")}):null,
      x.last?E("span",{class:"dlchip",text:"last text "+age(x.last)}):null)));
  /* waiting on */
  const wt=waiting(x,f);const urgent=wt.some(w=>w.i==="💬"||w.i==="📥"||w.i==="🧮");
  b.append(E("div",{class:"dlsec",text:"Waiting on"}),E("div",{class:"dlwait"+(urgent?"":" ok")},...wt.map(w=>E("div",{class:"it"},E("i",{text:w.i}),E("div",{},w.t,w.s?E("small",{text:w.s}):null)))));
  /* actions */
  const tel=String(x.phone||"").replace(/[^0-9+]/g,"");
  const acts=E("div",{class:"dlacts"},
    tel?E("a",{class:"pri",href:"tel:"+tel},"📞 Call"):null,
    tel?E("a",{href:"sms:"+tel},"💬 Text"):null,
    u?E("button",{type:"button",onclick:()=>{window.__uw&&window.__uw.open(u.id);}},"🧮 Underwriting"):null,
    x.cid?E("a",{href:`https://app.gohighlevel.com/v2/location/${LOC}/contacts/detail/${x.cid}`,target:"_blank",rel:"noopener"},"↗ Open in GHL"):null,
    A&&A.isOwner&&A.isOwner()?E("button",{type:"button",class:"dead"+(armed?" arm":""),onclick:kill},armed?"Tap again – mark lost in GHL & remove":"✖ Cancelled / dead"):null);
  b.append(E("div",{class:"dlsec",text:"Actions"}),acts);
  /* recent texts – chat bubbles, oldest at the top */
  const tx=(f&&f.msgs||[]).filter(m=>!/^Opportunity updated$/i.test(m.body)).slice(0,showTx?12:5).reverse();
  if(tx.length){b.append(E("div",{class:"dlsec",text:"Recent texts"}),E("div",{class:"dltx"},...tx.map(m=>E("div",{class:"bb "+(m.dir==="inbound"?"in":"out")},m.body,E("small",{text:when(m.t)})))));
    if(!showTx&&(f.msgs||[]).length>5)b.append(E("button",{class:"dlmore",type:"button",onclick:()=>{showTx=true;render();}},"Show more texts"));}
  /* call notes */
  if(f&&f.notes&&f.notes.length){b.append(E("div",{class:"dlsec",text:"Call notes"}));
    f.notes.slice(0,showAll?8:2).forEach((n,i)=>{const cut=!showAll&&String(n.body).length>320;b.append(E("div",{class:"dlnote"+(cut?" cut":""),onclick:cut?()=>{showAll=true;render();}:null},E("div",{class:"d",text:when(n.t)}),n.body));});}
  /* what's been done */
  b.append(E("div",{class:"dlsec",text:"What's been done"}));
  if(!f)b.append(E("div",{class:"dlload",text:"Loading the history…"}));
  else{const ev=events(x,f);if(!ev.length)b.append(E("div",{class:"dlload",text:"Nothing recorded yet"}));
    else{const L=showAll?ev:ev.slice(0,12);b.append(E("div",{class:"dltl"},...L.map(e=>E("div",{class:"ev"},E("span",{text:e.i}),E("div",{},E("div",{text:e.h}),e.q?E("div",{class:"q",text:"“"+e.q+"”"}):null,E("div",{class:"k",text:[when(e.t),e.k].filter(Boolean).join(" · ")}))))));
      if(!showAll&&ev.length>12)b.append(E("button",{class:"dlmore",type:"button",onclick:()=>{showAll=true;render();}},`Show all ${ev.length}`));}}
  view.replaceChildren(head,b);b.scrollTop=top;}

async function kill(){const A=api();if(!armed){armed=true;A.haptic&&A.haptic();render();setTimeout(()=>{if(armed){armed=false;render();}},4000);return;}
  armed=false;const id=D.id;
  try{const r=await A.run("watchHide",id,"cancelled",true);A.haptic&&A.haptic("ok");A.toast(r&&r.lost?"Marked lost in GHL and removed from Watch":"Removed from Watch");
    window.__dlRemoved&&window.__dlRemoved(id);close();}
  catch(e){A.toast("Couldn't update – try again");render();}}

async function open(x){openId=x.id;D=x;showAll=false;showTx=false;armed=false;full=cget(x.id);
  view.classList.add("on");const A=api();A.backOn&&A.backOn();render();
  try{const f=await A.run("getWatchDeal",x.id);if(openId!==x.id)return;if(f){cput(x.id,f);if(f.deal)D=Object.assign({},x,f.deal);full=f;render();}
    else if(!full){full={cards:[],notes:[],msgs:[],tasks:[],uw:[]};render();}}
  catch(e){if(openId===x.id&&!full){view.querySelector(".dlload")&&(view.querySelector(".dlload").textContent="Couldn't load the history – pull down on the list and try again");}}}
function close(){openId=null;view.classList.remove("on");view.style.transform="";const A=api();A.backOff&&A.backOff();}
/* swipe right (from anywhere) goes back to the list */
(function(){let x0=null,y0=null,t0=0,mode=null,dx=0;
  view.addEventListener("touchstart",e=>{if(e.touches.length!==1){x0=null;return;}x0=e.touches[0].clientX;y0=e.touches[0].clientY;t0=Date.now();mode=null;dx=0;},{passive:true});
  view.addEventListener("touchmove",e=>{if(x0===null)return;dx=e.touches[0].clientX-x0;const dy=e.touches[0].clientY-y0;
    if(!mode){if(Math.abs(dx)<10&&Math.abs(dy)<10)return;mode=Math.abs(dx)>Math.abs(dy)*1.2&&dx>0?"exit":"none";}
    if(mode==="exit"){view.style.transition="none";view.style.transform=`translateX(${Math.max(0,dx)}px)`;}},{passive:true});
  view.addEventListener("touchend",()=>{if(x0===null)return;x0=null;const m=mode;mode=null;if(m!=="exit")return;view.style.transition="";
    const far=dx>view.clientWidth*0.22||(Date.now()-t0<300&&dx>50);if(far){api().haptic&&api().haptic();close();}else view.style.transform="";},{passive:true});
})();
window.__dl={open,close,isOpen:()=>view.classList.contains("on")};
})();

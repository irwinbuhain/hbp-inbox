/* HomeBuyer+ Inbox – Underwriting review screen (map, comps with photos, repair list with photos). Loaded by app.js. */
(function(){
const css=`
#uwView{position:fixed;inset:0;z-index:20;background:#000;display:flex;flex-direction:column;transform:translateX(100%);transition:transform .42s cubic-bezier(.32,.72,0,1);will-change:transform}
#uwView.on{transform:none}
#uwView .uwhead{display:grid;grid-template-columns:auto 1fr auto;gap:8px;align-items:center;padding:calc(8px + var(--tg-safe-area-inset-top,0px) + var(--tg-content-safe-area-inset-top,0px)) 16px 8px;background:rgba(11,11,13,.96);border-bottom:1px solid #262629}
#uwView .uwhead .t{min-width:0;text-align:center}
#uwView .uwhead .t b{display:block;font-size:15px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#uwView .uwhead .t span{font-size:12px;color:#8e8e93}
.uwback{background:none;border:0;color:#0a84ff;font-size:17px;padding:6px 0;display:flex;align-items:center;gap:2px}
.uwback svg{width:12px;height:20px}
.uwst{font-size:11px;font-weight:700;border-radius:999px;padding:4px 9px;background:#2c2c2e;color:#e5e5ea;white-space:nowrap}
.uwst.ok{background:#0f3d1e;color:#5be37f}.uwst.chg{background:#3d2a07;color:#ffbf47}
.uwbody{flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch}
#uwMap{height:36vh;min-height:220px;background:#111}
.uwsum{display:flex;gap:8px;overflow-x:auto;padding:12px 16px 4px;scrollbar-width:none}.uwsum::-webkit-scrollbar{display:none}
.orow{display:flex;align-items:center;gap:10px;min-width:0}
.orow label{font-size:13px;color:#8e8e93;font-weight:600;flex:none}
.ofield{flex:1;min-width:0;display:flex;align-items:center;gap:4px;border:1px solid #3a3a3c;border-radius:12px;background:#000;padding:0 12px;min-height:40px}
.ofield span{color:#e3b341;font-weight:700;font-size:18px}
.ofield input{flex:1;min-width:0;width:100%;background:transparent;border:0;outline:none;color:#e3b341;font:700 18px/1.2 -apple-system,BlinkMacSystemFont,system-ui,sans-serif;font-variant-numeric:tabular-nums;padding:8px 0}
.ofield:focus-within{border-color:#e3b341}
.oreset{flex:none;background:none;border:0;color:#0a84ff;font-size:14px;padding:6px 0;cursor:pointer}
.ohint{font-size:12px;color:#8e8e93;flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.hrow{display:flex;align-items:center;gap:8px;margin-top:-4px;min-width:0}
.pvtog{flex:none;background:none;border:0;color:#0a84ff;font-size:12px;font-weight:600;padding:2px 0;cursor:pointer}
.ohint.warn{color:#ff9f0a}
.opvl{font-size:12px;color:#8e8e93;margin-top:2px}
.opv{background:#0b3d2a;color:#e5e5ea;border-radius:14px;padding:8px 12px;font-size:13px;line-height:1.35;white-space:pre-wrap;max-height:28vh;overflow-y:auto}
.opv[hidden]{display:none}
.uwk{flex:none;background:#1c1c1e;border-radius:12px;padding:8px 12px;min-width:86px}
.uwk span{display:block;font-size:11px;color:#8e8e93;text-transform:uppercase;letter-spacing:.4px}
.uwk b{font-size:17px;font-variant-numeric:tabular-nums}
.uwk.gold b{color:#e3b341}
.uwk.neg b{color:#ff453a}
.uwk.neg{box-shadow:inset 0 0 0 1px #5a2a24}
.uwnote{margin:6px 16px 0;font-size:12px;color:#ff9f8a}
.uwtabs{position:sticky;top:0;z-index:5;background:#000;padding:10px 16px 8px}
.uwtabs .seg{display:flex;background:#1c1c1e;border-radius:9px;padding:2px;gap:2px}
.uwtabs .seg button{flex:1;border:0;background:transparent;color:#fff;font-size:13px;font-weight:600;padding:8px 4px;border-radius:7px}
.uwtabs .seg button[aria-pressed=true]{background:#636366}
.uwpane{padding:4px 16px 24px}
.ccard{display:flex;gap:12px;background:#1c1c1e;border-radius:16px;padding:10px;margin:10px 0;border:0;color:inherit;width:100%;text-align:left;font:inherit}
.ccard img,.ccard .noimg{width:96px;height:96px;border-radius:10px;object-fit:cover;flex:none;background:#2c2c2e}
.ccard .ci{min-width:0;flex:1}
.ccard .n{display:inline-grid;place-items:center;width:20px;height:20px;border-radius:50%;background:#0a84ff;color:#fff;font-size:11px;font-weight:700;margin-right:6px;vertical-align:1px}
.ccard .p{font-size:18px;font-weight:700}
.ccard .a{font-size:13px;color:#e5e5ea;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin:2px 0}
.ccard .m{font-size:12px;color:#8e8e93}
.flag{display:inline-block;font-size:11px;color:#ffbf47;background:#3d2a07;border-radius:6px;padding:1px 6px;margin:4px 4px 0 0}
.grp{margin:16px 0 6px;display:flex;justify-content:space-between;color:#8e8e93;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.5px}
.rl{display:flex;gap:12px;background:#1c1c1e;padding:10px;border-radius:14px;margin:8px 0}
.rl img,.rl .noimg{width:72px;height:72px;border-radius:10px;object-fit:cover;flex:none;background:#2c2c2e}
.rl .noimg{display:grid;place-items:center;color:#636366;font-size:11px;text-align:center}
.rl .ri{flex:1;min-width:0}
.rl .rt{display:flex;justify-content:space-between;gap:8px;font-weight:600;font-size:15px}
.rl .rt b{font-variant-numeric:tabular-nums;color:#e3b341;white-space:nowrap}
.rl .rr{font-size:14px;color:#c7c7cc;margin-top:3px;line-height:1.35}
.rl .rs{font-size:11px;color:#636366;margin-top:4px}
.cmap{height:190px;border-radius:14px;overflow:hidden;margin-top:12px;background:#111}
.backcomp{display:block;width:100%;background:#1c1c1e;border:1px solid #3a3a3c;color:#0a84ff;border-radius:12px;padding:10px;font:600 14px system-ui;margin:0 0 12px}
.sb .backcomp:last-child{margin:16px 0 0}
.rl.removed{opacity:.5}.rl.removed .rt span,.rl.removed .rt b{text-decoration:line-through}.rl.removed .rr{color:#ff9f8a}
.rbtn{display:block;width:100%;margin-top:14px;background:#2c1a17;border:1px solid #5a2a24;color:#ff6961;border-radius:12px;padding:12px;font:600 15px system-ui}
.rbtn:disabled{opacity:.45}
.rbtn.edit{background:#0a1f3d;border-color:#1f4f99;color:#7fb2ff}
.money{display:flex;align-items:center;gap:6px;background:#000;border:1px solid #3a3a3c;border-radius:10px;padding:0 10px}
.money span{color:#8e8e93;font-size:20px}
.money input{flex:1;background:transparent;border:0;color:#fff;font:600 22px system-ui;padding:10px 0;outline:none;min-width:0}
.oc{color:#8e8e93;font-size:13px;margin-right:6px;font-weight:500}
.cedit{margin-top:14px;background:#0a1f3d;border:1px solid #1f4f99;border-radius:14px;padding:12px;color:#dbe9ff;font-size:14px}.cedit b{display:block;color:#7fb2ff;margin-bottom:4px}.rbtn.ok{background:#0f3d1e;border-color:#1f6b36;color:#5be37f}
.rform{margin-top:14px;background:#1c1c1e;border-radius:14px;padding:12px}
.rform .lbl{color:#8e8e93;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.4px;margin-bottom:8px}
.rform textarea{width:100%;box-sizing:border-box;background:#000;border:1px solid #3a3a3c;border-radius:10px;color:#fff;font:15px system-ui;padding:10px;margin-top:8px;resize:none}
.qchips{display:flex;flex-wrap:wrap;gap:6px}.qchips button{background:#2c2c2e;border:0;color:#e5e5ea;border-radius:999px;padding:6px 10px;font:13px system-ui}
.rcancel{display:block;margin:10px auto 0;background:none;border:0;color:#8e8e93;font:14px system-ui}
.rmd{margin-top:14px;background:#2c1a17;border:1px solid #5a2a24;border-radius:14px;padding:12px;color:#ffd7d2;font-size:14px}.rmd b{display:block;color:#ff6961;margin-bottom:4px}
.pnav{display:flex;align-items:center;justify-content:space-between;margin:18px 0 6px;color:#8e8e93;font-size:13px}
.pnav button{background:#1c1c1e;border:1px solid #3a3a3c;color:#0a84ff;border-radius:999px;padding:8px 14px;font:600 14px system-ui}
.pnav button:disabled{color:#48484a}
.rbig{display:block;width:100%;height:62vw;max-height:380px;object-fit:cover;border-radius:14px;background:#1c1c1e}
.rbig.noimg{display:grid;place-items:center;color:#636366;font-size:14px}
.rhead{display:flex;justify-content:space-between;align-items:baseline;margin-top:12px;color:#8e8e93;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.5px}
.rhead b{color:#e3b341;font-size:22px;letter-spacing:0}
.ritem{font-size:20px;font-weight:700;margin:2px 0 4px}
.rl{cursor:pointer}
.skip{font-size:14px;color:#8e8e93;padding:8px 0;border-top:1px solid #1c1c1e}
.skip b{color:#c7c7cc;font-weight:600}
.tot{display:flex;justify-content:space-between;font-weight:700;font-size:17px;padding:14px 2px 4px;border-top:1px solid #2c2c2e;margin-top:10px}
.tot b{color:#e3b341}
.kv{display:grid;grid-template-columns:auto 1fr;gap:6px 14px;background:#1c1c1e;border-radius:14px;padding:12px 14px;font-size:14px;margin:10px 0}
.kv span{color:#8e8e93}.kv b{font-weight:500;text-align:right}
.ptxt{background:#1c1c1e;border-radius:14px;padding:12px 14px;font-size:14px;line-height:1.4;margin:10px 0;color:#e5e5ea}
.ptxt .lbl{display:block;color:#8e8e93;font-size:12px;font-weight:600;margin-bottom:3px;text-transform:uppercase;letter-spacing:.4px}
.car{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;gap:6px;scrollbar-width:none;border-radius:14px}
.car::-webkit-scrollbar{display:none}
.car img{flex:none;width:100%;height:58vw;max-height:340px;object-fit:cover;scroll-snap-align:center;border-radius:14px;background:#1c1c1e}
.carn{text-align:center;color:#8e8e93;font-size:12px;margin:6px 0}
.sheet{position:fixed;inset:0;z-index:30;background:#000;display:flex;flex-direction:column;transform:translateY(100%);transition:transform .4s cubic-bezier(.32,.72,0,1)}
.sheet.on{transform:none}
html{overflow:hidden}
.sheet{width:100%;max-width:100vw;overflow:hidden}
.sheet .sb{overflow-x:hidden}
.sheet .grab{width:38px;height:5px;border-radius:3px;background:#3a3a3c;margin:6px auto 0}
.sheet .sh{display:flex;justify-content:space-between;align-items:center;padding:calc(10px + var(--tg-safe-area-inset-top,0px) + var(--tg-content-safe-area-inset-top,0px)) 16px 10px;border-bottom:1px solid #262629}
.sheet .sh b{font-size:15px;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.sheet .sb{flex:1;overflow-y:auto;padding:12px 16px 30px}
.xbtn{background:#2c2c2e;border:0;color:#fff;border-radius:999px;padding:6px 12px;font-size:14px;font-weight:600;flex:none}
.lightbox{position:fixed;inset:0;z-index:40;background:#000;display:flex;align-items:center;justify-content:center;opacity:0;pointer-events:none;transition:opacity .2s}
.lightbox.on{opacity:1;pointer-events:auto}
.lightbox img{max-width:100%;max-height:80vh;object-fit:contain}
.lbs{display:flex;width:100%;height:100%;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none}.lbs::-webkit-scrollbar{display:none}
.lbs>div{flex:none;width:100%;height:100%;display:flex;align-items:center;justify-content:center;scroll-snap-align:center;scroll-snap-stop:always}
.lbn{position:absolute;top:calc(14px + env(safe-area-inset-top,0px));left:0;right:0;text-align:center;color:#e5e5ea;font-size:14px;font-weight:600;pointer-events:none}
.lbx{position:absolute;top:calc(8px + env(safe-area-inset-top,0px));right:12px;width:36px;height:36px;border-radius:18px;background:rgba(255,255,255,.14);color:#fff;font-size:20px;display:flex;align-items:center;justify-content:center}
.carall{display:block;margin:6px auto 0;background:none;border:0;color:#0a84ff;font-size:14px;font-weight:600;padding:4px 8px}
.lightbox .cap{position:absolute;left:16px;right:16px;bottom:calc(24px + env(safe-area-inset-bottom,0px));color:#e5e5ea;font-size:14px;text-align:center}
.uwdock{background:rgba(11,11,13,.96);border-top:1px solid #262629;padding:8px 16px calc(8px + max(env(safe-area-inset-bottom,0px),var(--tg-safe-area-inset-bottom,0px)));display:flex;flex-direction:column;gap:8px}
.uwbtn{display:flex;align-items:center;justify-content:space-between;width:100%;background:#1c1c1e;border:1px solid #3a3a3c;color:#fff;border-radius:14px;padding:12px 14px;font:600 15px var(--f,system-ui);margin:8px 0}
.uwbtn span{color:#8e8e93;font-weight:500;font-size:13px}
.uwpin{background:#0a84ff;color:#fff;border:2px solid #fff;border-radius:50%;width:24px!important;height:24px!important;display:grid!important;place-items:center;font:700 12px system-ui;box-shadow:0 2px 6px rgba(0,0,0,.5)}
.uwpin.s{background:#e3b341;color:#1a1407;width:30px!important;height:30px!important;font-size:14px}
.hoodtip{background:#1c1c1e!important;color:#fff!important;border:0!important;font:600 12px system-ui!important;box-shadow:0 2px 8px rgba(0,0,0,.6)!important}
.hoodtip:before{display:none}
.leaflet-container{background:#111!important}
.leaflet-control-attribution{background:rgba(0,0,0,.6)!important;color:#8e8e93!important;font-size:9px!important}
.leaflet-control-attribution a{color:#8e8e93!important}
`;
const st=document.createElement("style");st.textContent=css;document.head.appendChild(st);

const $=id=>document.getElementById(id);
const E=(tag,attrs={},...kids)=>{const n=document.createElement(tag);for(const[k,v]of Object.entries(attrs)){if(k==="class")n.className=v;else if(k==="text")n.textContent=v;else if(k.startsWith("on"))n.addEventListener(k.slice(2),v);else if(v!=null&&v!==false)n.setAttribute(k,v);}for(const c of kids)if(c!=null&&c!==false)n.append(c);return n;};
const $$=n=>{const x=Number(n);return isFinite(x)&&x>0?"$"+x.toLocaleString("en-US",{maximumFractionDigits:0}):"–";};
const k=n=>{if(n===""||n==null)return"–";const x=Number(n);if(!isFinite(x))return"–";const a=Math.abs(x),t=a>=1000?"$"+(Math.round(a/100)/10).toLocaleString("en-US")+"k":"$"+a;return x<0?"−"+t:t;};
const negc=n=>Number(n)<0?" neg":"";
const img=(src,cls,alt)=>src?E("img",{src,class:cls||"",alt:alt||"",loading:"lazy",referrerpolicy:"no-referrer",onerror:function(){this.replaceWith(E("div",{class:"noimg",text:"no photo"}));}}):E("div",{class:"noimg",text:"no photo"});

const view=E("section",{id:"uwView","aria-label":"Underwriting"});
document.body.appendChild(view);
const lb=E("div",{class:"lightbox",onclick:()=>lb.classList.remove("on")});document.body.appendChild(lb);
function lightbox(src,cap,list,idx){
  if(!Array.isArray(list)||list.length<2){lb.replaceChildren(E("img",{src,referrerpolicy:"no-referrer"}),cap?E("div",{class:"cap",text:cap}):null);lb.classList.add("on");return;}
  const st=E("div",{class:"lbs"});const n=E("div",{class:"lbn"});
  list.forEach((p,i)=>st.append(E("div",{},E("img",{src:p,loading:Math.abs(i-(idx||0))<2?"eager":"lazy",referrerpolicy:"no-referrer",alt:cap||""}))));
  const upd=()=>{const i=Math.round(st.scrollLeft/(st.clientWidth||1));n.textContent=`${i+1} / ${list.length}`;};
  st.addEventListener("scroll",()=>requestAnimationFrame(upd),{passive:true});
  lb.replaceChildren(st,n,E("div",{class:"lbx",text:"×"}),cap?E("div",{class:"cap",text:cap}):null);lb.classList.add("on");
  requestAnimationFrame(()=>{st.scrollLeft=(idx||0)*st.clientWidth;upd();});
}

let U=null,tab="subject",map=null,sheet=null;
let lfP=null;function loadLeaflet(){if(window.L)return Promise.resolve();if(lfP)return lfP;return lfP=new Promise((res,rej)=>{const l=document.createElement("link");l.rel="stylesheet";l.href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";document.head.appendChild(l);const s=document.createElement("script");s.src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";s.onload=res;s.onerror=rej;document.head.appendChild(s);});}

function carousel(photos,label){
  const wrap=E("div");const c=E("div",{class:"car"});const n=E("div",{class:"carn"});
  (photos||[]).forEach((p,i)=>c.append(E("img",{src:p,loading:i<2?"eager":"lazy",referrerpolicy:"no-referrer",alt:label||"",onclick:()=>lightbox(p,label,photos,i)})));
  const upd=()=>{const i=Math.round(c.scrollLeft/(c.clientWidth+6));n.textContent=photos&&photos.length?`${i+1} / ${photos.length} · tap to enlarge`:"No photos";};
  c.addEventListener("scroll",()=>requestAnimationFrame(upd),{passive:true});setTimeout(upd,0);
  wrap.append(c,n);if(photos&&photos.length>1)wrap.append(E("button",{class:"carall",text:`See all ${photos.length} photos`,onclick:()=>lightbox(photos[0],label,photos,0)}));return wrap;
}
function kv(pairs){const g=E("div",{class:"kv"});pairs.filter(p=>p[1]!=null&&p[1]!==""&&p[1]!=="–").forEach(([a,b])=>g.append(E("span",{text:a}),E("b",{text:String(b)})));return g;}
function ptxt(label,text){return text?E("div",{class:"ptxt"},E("span",{class:"lbl",text:label}),text):null;}

function makeSheet(title,body,onDown,onUp){
  const sh=E("div",{class:"sheet"},E("div",{style:"padding-top:calc(var(--tg-safe-area-inset-top,0px) + var(--tg-content-safe-area-inset-top,0px))"},E("div",{class:"grab"})),E("div",{class:"sh",style:"padding-top:8px"},E("b",{text:title}),E("button",{class:"xbtn",type:"button",onclick:closeSheet},"Done")),E("div",{class:"sb"},...body));
  sh._onDown=onDown||null;sh._onUp=onUp||null;sheetSwipe(sh);return sh;}
function openSheet(title,body,onDown){
  sheet&&sheet.remove();
  sheet=makeSheet(title,body,onDown);document.body.appendChild(sheet);const s=sheet;requestAnimationFrame(()=>requestAnimationFrame(()=>s.classList.add("on")));
  window.__uwHaptic&&window.__uwHaptic();
}
/* replace the top sheet by one underneath, sliding the top one down (comp → subject) */
function revealUnder(title,body,onDown,onUp){
  const top=sheet;const under=makeSheet(title,body,onDown,onUp);under.style.transition="none";under.classList.add("on");under.style.zIndex="29";
  document.body.appendChild(under);sheet=under;
  if(top){top.style.transition="";top.style.transform="";top.classList.remove("on");setTimeout(()=>{top.remove();under.style.zIndex="";under.style.transition="";},420);}
  window.__uwHaptic&&window.__uwHaptic();
}
function closeSheet(){if(cmap){try{cmap.remove();}catch(e){}cmap=null;}if(!sheet)return;const s=sheet;sheet=null;s.classList.remove("on");setTimeout(()=>s.remove(),420);}

/* pager: one item per page in a sheet; swipe left/right (or the arrows) to move between items */
let pagerCur=()=>null,pagerPaint=()=>{},pagerClose=()=>{};
function openPager(items,idx,titleOf,bodyOf,onDown){
  let i=idx;pagerCur=()=>items[i];const sb=()=>sheet&&sheet.querySelector(".sb");
  const nav=()=>E("div",{class:"pnav"},E("button",{type:"button",disabled:i<=0?"":null,onclick:()=>go(-1)},"‹ Prev"),E("span",{text:`${i+1} of ${items.length}`}),E("button",{type:"button",disabled:i>=items.length-1?"":null,onclick:()=>go(1)},"Next ›"));
  const paint=()=>{const b=sb();if(!b)return;sheet.querySelector(".sh b").textContent=titleOf(items[i],i);b.replaceChildren(...bodyOf(items[i],i),nav());b.scrollTop=0;};
  function go(d){const j=i+d;if(j<0||j>=items.length){window.__uwApi.toast(d>0?"That's the last one":"That's the first one");return false;}const b=sb();
    b.style.transition="transform .18s ease-in,opacity .18s";b.style.transform=`translateX(${d>0?-60:60}px)`;b.style.opacity="0";
    setTimeout(()=>{i=j;paint();b.style.transition="none";b.style.transform=`translateX(${d>0?60:-60}px)`;void b.offsetWidth;b.style.transition="transform .3s cubic-bezier(.32,.72,0,1),opacity .25s";b.style.transform="";b.style.opacity="";},170);
    window.__uwHaptic&&window.__uwHaptic();return true;}
  pagerPaint=paint;pagerClose=closeSheet;
  openSheet(titleOf(items[i],i),[...bodyOf(items[i],i),nav()],onDown);
  const sh=sheet,b=sb();let x0=null,y0=null,t0=0,mode=null,dx=0;
  let car=null;
  b.addEventListener("touchstart",e=>{if(e.touches.length!==1)return;const t=e.target;if(t.closest&&t.closest(".leaflet-container")){x0=null;return;}car=t.closest&&t.closest(".car");if(car&&car.children.length<2)car=null;x0=e.touches[0].clientX;y0=e.touches[0].clientY;t0=Date.now();mode=null;dx=0;},{passive:true});
  b.addEventListener("touchmove",e=>{if(x0===null)return;dx=e.touches[0].clientX-x0;const dy=e.touches[0].clientY-y0;if(!mode){if(Math.abs(dx)<8&&Math.abs(dy)<8)return;mode=Math.abs(dx)>Math.abs(dy)?"page":"none";
      /* on the photo strip: swipe the photos, and only page to the next comp once you're at the last (or first) photo */
      if(mode==="page"&&car){const atEnd=car.scrollLeft+car.clientWidth>=car.scrollWidth-4,atStart=car.scrollLeft<=4;if(!((dx<0&&atEnd)||(dx>0&&atStart))){mode="none";x0=null;return;}}}
    if(mode==="page"){e.preventDefault();b.style.transition="none";b.style.transform=`translateX(${dx*0.7}px)`;}},{passive:false});
  b.addEventListener("touchend",()=>{if(x0===null)return;x0=null;if(mode!=="page")return;const ok=(Math.abs(dx)>70||(Date.now()-t0<300&&Math.abs(dx)>35))&&go(dx<0?1:-1);
    if(!ok){b.style.transition="transform .3s cubic-bezier(.32,.72,0,1)";b.style.transform="";}mode=null;},{passive:true});
}
let cmap=null;
function compMap(c){
  const d=E("div",{class:"cmap"});const s=U.subject||{};
  if(!(c.lat&&c.lng))return null;
  setTimeout(async()=>{try{await loadLeaflet();}catch(e){d.textContent="Map couldn't load";return;}if(!d.isConnected)return;
    if(cmap){try{cmap.remove();}catch(e){}cmap=null;}
    cmap=L.map(d,{zoomControl:false,attributionControl:false,dragging:false,touchZoom:false,doubleClickZoom:false,scrollWheelZoom:false,boxZoom:false,keyboard:false,tap:false});
    L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}",{maxZoom:16}).addTo(cmap);
    L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}",{maxZoom:16}).addTo(cmap);
    const pts=[[c.lat,c.lng]];
    if(s.lat&&s.lng){pts.push([s.lat,s.lng]);L.polyline(pts,{color:"#8e8e93",weight:2,dashArray:"4 6"}).addTo(cmap);L.marker([s.lat,s.lng],{icon:L.divIcon({className:"uwpin s",html:"★",iconSize:[30,30]}),zIndexOffset:1000,interactive:false}).addTo(cmap);}
    L.marker([c.lat,c.lng],{icon:L.divIcon({className:"uwpin",html:String(c.n),iconSize:[24,24]}),interactive:false}).addTo(cmap);
    if(pts.length>1)cmap.fitBounds(pts,{padding:[34,34],maxZoom:16});else cmap.setView(pts[0],15);
    setTimeout(()=>cmap&&cmap.invalidateSize(),300);},0);
  return E("div",{},d,E("div",{class:"carn",text:`★ Subject · ${c.n} This comp${c.distanceMi!=null?" · "+c.distanceMi+" mi apart":""}`}));
}
function compBody(c){return[
    carousel(c.photos,c.address),compMap(c),
    kv([["Type",c.type||"–"],["Sold",`${$$(c.soldPrice)}${c.soldDate?" · "+c.soldDate:""}`],["$ / sq ft",c.ppsf?"$"+Math.round(c.ppsf):"–"],["Beds / baths",`${c.beds??"–"} / ${c.baths??"–"}`],["Sq ft",c.sqft?Number(c.sqft).toLocaleString():"–"],["Year built",c.yearBuilt||"–"],["Siding",c.siding||"–"],["Distance",c.distanceMi!=null?`${c.distanceMi} mi`:"–"],["Neighborhood",c._hood||"–"]]),
    ptxt("Condition",c.condition),ptxt("Why it counts",c.why),
    (c.flags&&c.flags.length)?E("div",{},...c.flags.map(f=>E("span",{class:"flag",text:f}))):null,
    c.url?E("a",{class:"uwbtn",href:c.url,target:"_blank",rel:"noopener"},"Open listing",E("span",{text:"↗"})):null
  ].filter(Boolean);}
function compSheet(c){const L=U.comps||[];openPager(L,Math.max(0,L.indexOf(c)),x=>`Comp ${x.n} · ${String(x.address||"").split(",")[0]}`,x=>compBody(x),()=>{const s=U.subject||{},cur=pagerCur();revealUnder("Subject · "+String(s.address||"").split(",")[0],[E("button",{class:"backcomp",type:"button",onclick:()=>backToComp(cur)},`↑ Back to Comp ${cur.n} · swipe up`),...subjectBody(),E("button",{class:"backcomp",type:"button",onclick:()=>backToComp(cur)},`↑ Back to Comp ${cur.n}`)],null,()=>backToComp(cur));});}
function backToComp(c){const L=U.comps||[];const under=sheet;openPager(L,Math.max(0,L.indexOf(c)),x=>`Comp ${x.n} · ${String(x.address||"").split(",")[0]}`,x=>compBody(x),compSheetDown);}
function compSheetDown(){const s=U.subject||{},cur=pagerCur();revealUnder("Subject · "+String(s.address||"").split(",")[0],[E("button",{class:"backcomp",type:"button",onclick:()=>backToComp(cur)},`↑ Back to Comp ${cur.n} · swipe up`),...subjectBody(),E("button",{class:"backcomp",type:"button",onclick:()=>backToComp(cur)},`↑ Back to Comp ${cur.n}`)],null,()=>backToComp(cur));}
function recalc(d){const lines=(d.rehab&&d.rehab.lines)||[];const before=Number((d.rehab||{}).total)||0;const total=lines.filter(l=>!l.removed).reduce((a,l)=>a+(Number(l.cost)||0),0);d.rehab.total=total;
  const o=d.offer||{},arv=Number((d.arv||{}).value)||0;if(o.originalMin===undefined){o.originalMin=o.min;o.originalMax=o.max;o.originalRehab=before;if(o.holdMax!=null)o.originalHoldMax=o.holdMax;}
  if(arv&&typeof o.max==="number"&&typeof o.min==="number"){const ask=Number(o.asking||(d.subject||{}).asking)||0;let max=Math.round(.72*arv-total-10000);if(ask)max=Math.min(max,ask-25000);let min=Math.round(.67*arv-total-10000);min=Math.min(min,max-10000);o.max=max;o.min=min;}
  if(typeof o.originalHoldMax==="number")o.holdMax=Math.round(o.originalHoldMax+(Number(o.originalRehab)-total));d.offer=o;return d;}
async function editLine(l,action,reason,newCost){
  const api=window.__uwApi;if(!api.isOwner()){api.toast("Only Irwin can change the repair budget");return;}
  const idx=(U.rehab.lines||[]).indexOf(l);const snap=JSON.stringify(U);
  if(action==="remove")l.removed={by:api.me(),at:"now",reason};else if(action==="restore")delete l.removed;
  else{const from=Number(l.cost)||0;if(l.originalCost===undefined)l.originalCost=from;l.cost=Math.round(Number(newCost));l.costEdit={by:api.me(),at:"now",reason,from};}
  recalc(U);api.haptic("ok");api.toast((action==="remove"?"Removed":action==="restore"?"Restored":"Cost updated")+` – rehab now ${$$(U.rehab.total)}`);
  pagerPaint();refreshNumbers();
  try{const r=await api.run("editRepair",curRec.id,idx,l.item,action,reason||"",action==="cost"?Number(newCost):null);if(!r||!r.ok)throw new Error((r&&r.reason)||"failed");curRec.data=r.data;U=r.data;refreshNumbers();}
  catch(e){const d=JSON.parse(snap);curRec.data=d;U=d;api.haptic("err");api.toast(String(e.message)==="IRWIN_ONLY"?"Only Irwin can change the repair budget":"Couldn't save – try again");pagerClose();refreshNumbers();}
}
const QUICK=["Already updated","Working condition","Rental-ready as is","Comps don't have it","Tenant/seller handles it","Covered by another line"];
function removeBox(l){
  if(!window.__uwApi.isOwner())return null;
  if(l.removed)return E("div",{class:"rmd"},E("b",{text:"Removed from the budget"}),E("div",{text:l.removed.reason||""}),E("button",{class:"rbtn ok",type:"button",onclick:()=>editLine(l,"restore","")},"Restore this repair"));
  const wrap=E("div",{});const open=E("button",{class:"rbtn",type:"button",onclick:()=>{open.replaceWith(form);setTimeout(()=>ta.focus(),50);}},"Remove from budget");
  const ta=E("textarea",{rows:"2",placeholder:"Why don't we need this? (the AI learns from this)"});
  const save=E("button",{class:"rbtn",type:"button",disabled:"",onclick:()=>{const v=ta.value.trim();if(v)editLine(l,"remove",v);}},`Remove ${$$(l.cost)}`);
  ta.addEventListener("input",()=>{save.disabled=!ta.value.trim();});
  const chips=E("div",{class:"qchips"},...QUICK.map(q=>E("button",{type:"button",onclick:()=>{ta.value=ta.value.trim()?ta.value.trim()+" – "+q:q;save.disabled=false;}},q)));
  const form=E("div",{class:"rform"},E("div",{class:"lbl",text:"Why don't we need this repair?"}),chips,ta,save,E("button",{class:"rcancel",type:"button",onclick:()=>form.replaceWith(open)},"Cancel"));
  wrap.append(open);
  /* edit cost */
  const CQ=["Smaller scope than estimated","Partial repair only","Our contractor's price","Cheat sheet price is lower","Cheat sheet price is higher","Needs more work than estimated"];
  const eb=E("button",{class:"rbtn edit",type:"button",onclick:()=>{eb.replaceWith(cf);setTimeout(()=>num.focus(),50);}},"Edit cost");
  const num=E("input",{type:"text",inputmode:"numeric",placeholder:String(Number(l.cost)||0),"aria-label":"New cost"});
  const cta=E("textarea",{rows:"2",placeholder:"Why is this the right cost? (the AI learns from this)"});
  const csave=E("button",{class:"rbtn edit",type:"button",disabled:""},"Save new cost");
  const val=()=>{const n=Number(String(num.value).replace(/[^0-9.]/g,""));return num.value.trim()!==""&&isFinite(n)?Math.round(n):null;};
  const upd=()=>{const n=val();csave.disabled=!(n!=null&&n!==Number(l.cost)&&cta.value.trim());csave.textContent=n!=null?`Save ${$$(l.cost)} → ${n===0?"$0":$$(n)}`:"Save new cost";};
  num.addEventListener("input",upd);cta.addEventListener("input",upd);
  csave.addEventListener("click",()=>{const n=val();if(n!=null&&cta.value.trim())editLine(l,"cost",cta.value.trim(),n);});
  const cchips=E("div",{class:"qchips"},...CQ.map(q=>E("button",{type:"button",onclick:()=>{cta.value=cta.value.trim()?cta.value.trim()+" – "+q:q;upd();}},q)));
  const cf=E("div",{class:"rform"},E("div",{class:"lbl",text:"New cost"}),E("div",{class:"money"},E("span",{text:"$"}),num),E("div",{class:"lbl",style:"margin-top:12px",text:"Why?"}),cchips,cta,csave,E("button",{class:"rcancel",type:"button",onclick:()=>cf.replaceWith(eb)},"Cancel"));
  const edited=l.costEdit?E("div",{class:"cedit"},E("b",{text:`Cost changed from ${$$(l.originalCost!=null?l.originalCost:l.costEdit.from)}`}),E("div",{text:l.costEdit.reason||""})):null;
  return E("div",{},edited,eb,wrap);
}
function repairLines(){const lines=(U.rehab&&U.rehab.lines)||[];const order=[];const g={};lines.forEach(l=>{const a=l.area||"Other";if(!g[a]){g[a]=[];order.push(a);}g[a].push(l);});return order.flatMap(a=>g[a]);}
function repairBody(l){return[
  l.photo?E("img",{class:"rbig",src:l.photo,referrerpolicy:"no-referrer",alt:l.item,onclick:()=>lightbox(l.photo,`${l.item} – ${l.photoNote||""}`)}):E("div",{class:"rbig noimg",text:"No photo for this line"}),
  l.photoNote?E("div",{class:"carn",text:"Look at: "+l.photoNote}):null,
  E("div",{class:"rhead"},E("span",{text:l.area||""}),E("span",{},(l.originalCost!=null&&Number(l.originalCost)!==Number(l.cost))?E("s",{class:"oc",text:$$(l.originalCost)}):null,E("b",{text:$$(l.cost)}))),
  E("div",{class:"ritem",text:l.item}),
  ptxt("Why it needs work",l.reason),ptxt("Priced from",l.source),removeBox(l)].filter(Boolean);}
function repairSheet(l){const L=repairLines();openPager(L,Math.max(0,L.indexOf(l)),(x,i)=>`Repair ${i+1} · ${x.item}`,x=>repairBody(x));}
function subjectBody(){const s=U.subject||{};return[carousel(s.photos,s.address),subjectDetails()];}
function subjectSheet(){const s=U.subject||{};openSheet("Subject · "+String(s.address||"").split(",")[0],subjectBody());}
function subjectDetails(){const s=U.subject||{};return E("div",{},
  kv([["Type",s.type||"–"],["Units",s.units?(s.units+(s.unitMix?" · "+s.unitMix:"")):"–"],["Asking",$$(s.asking)],["Cash-on-cash target",U.offer&&U.offer.cashOnCashTarget?String(U.offer.cashOnCashTarget):"–"],["Beds / baths",`${s.beds??"–"} / ${s.baths??"–"}`],["Sq ft",s.sqft?Number(s.sqft).toLocaleString():"–"],["Year built",s.yearBuilt||"–"],["Lot",s.lotSqft?Number(s.lotSqft).toLocaleString()+" sq ft":"–"],["Siding",s.siding||"–"],["Neighborhood",[s.neighborhood,s.grade&&s.grade!=="unknown"?`(${s.grade})`:""].filter(Boolean).join(" ")||"–"]]),
  ptxt("Condition",s.condition),
  (s.notes&&s.notes.length)?E("div",{class:"ptxt"},E("span",{class:"lbl",text:"Notes"}),...s.notes.map(x=>E("div",{text:"• "+x}))):null,
  ptxt("How ARV was set",U.arv&&U.arv.method),ptxt("Offer formula",U.offer&&U.offer.formula),
  (U.openQuestions&&U.openQuestions.length)?E("div",{class:"ptxt"},E("span",{class:"lbl",text:"Confirm with the realtor"}),...U.openQuestions.map(x=>E("div",{text:"• "+x}))):null,
  s.listingUrl?E("a",{class:"uwbtn",href:s.listingUrl,target:"_blank",rel:"noopener"},"Open listing",E("span",{text:"↗"})):null);}

function paneComps(){
  const p=E("div",{class:"uwpane"});
  (U.comps||[]).forEach(c=>p.append(E("button",{class:"ccard",type:"button",onclick:()=>compSheet(c)},
    img((c.photos||[])[0],"",c.address),
    E("div",{class:"ci"},E("div",{class:"p"},E("span",{class:"n",text:String(c.n)}),$$(c.soldPrice)),E("div",{class:"a",text:c.address}),
      E("div",{class:"m",text:[c.type||"",`${c.beds??"–"}bd/${c.baths??"–"}ba`,c.sqft?Number(c.sqft).toLocaleString()+" sf":"",c.ppsf?"$"+Math.round(c.ppsf)+"/sf":"",c.distanceMi!=null?c.distanceMi+" mi":"",c.soldDate||""].filter(Boolean).join(" · ")}),c._hood?E("div",{class:"m",text:"Area "+c._hood}):null,
      ...(c.flags||[]).map(f=>E("span",{class:"flag",text:f}))))));
  if(U.rejected&&U.rejected.length){p.append(E("div",{class:"grp"},E("span",{text:`Not used · ${U.rejected.length}`})));U.rejected.forEach(r=>p.append(E("div",{class:"skip"},E("b",{text:r.address}),` – ${r.reason}`)));}
  return p;
}
function paneRepairs(){
  const p=E("div",{class:"uwpane"});const lines=(U.rehab&&U.rehab.lines)||[];const groups={};
  lines.forEach(l=>{(groups[l.area||"Other"]=groups[l.area||"Other"]||[]).push(l);});
  Object.entries(groups).forEach(([area,ls])=>{
    p.append(E("div",{class:"grp"},E("span",{text:area}),E("span",{text:$$(ls.filter(x=>!x.removed).reduce((a,b)=>a+Number(b.cost||0),0))})));
    ls.forEach(l=>p.append(E("div",{class:"rl"+(l.removed?" removed":""),role:"button",tabindex:"0",onclick:()=>repairSheet(l)},
      l.photo?E("img",{src:l.photo,loading:"lazy",referrerpolicy:"no-referrer",alt:l.item}):E("div",{class:"noimg",text:"no photo"}),
      E("div",{class:"ri"},E("div",{class:"rt"},E("span",{text:l.item}),E("span",{},(l.originalCost!=null&&Number(l.originalCost)!==Number(l.cost))?E("s",{class:"oc",text:$$(l.originalCost)}):null,E("b",{text:$$(l.cost)}))),E("div",{class:"rr",text:l.removed?("Removed: "+(l.removed.reason||"")):(l.reason||"")}),(l.photoNote||l.source)?E("div",{class:"rs",text:[l.photoNote,l.source].filter(Boolean).join(" · ")}):null))));
  });
  p.append(E("div",{class:"tot"},E("span",{text:"Rehab total"}),E("b",{text:$$(U.rehab&&U.rehab.total)})));
  const sk=(U.rehab&&U.rehab.skipped)||[];
  if(sk.length){p.append(E("div",{class:"grp"},E("span",{text:"Not included"})));sk.forEach(s=>p.append(E("div",{class:"skip"},E("b",{text:s.item}),` – ${s.reason}`)));}
  return p;
}
function paneSubject(){const p=E("div",{class:"uwpane"});p.append(carousel((U.subject||{}).photos,(U.subject||{}).address),subjectDetails());return p;}

function renderPane(){const b=$("uwPane");b.replaceChildren(tab==="comps"?paneComps():tab==="repairs"?paneRepairs():paneSubject());
  [...document.querySelectorAll("#uwTabs button")].forEach(x=>x.setAttribute("aria-pressed",String(x.dataset.t===tab)));}

async function drawMap(){
  try{await loadLeaflet();}catch(e){$("uwMap").textContent="Map couldn't load";return;}
  const s=U.subject||{};if(map){map.remove();map=null;}
  map=L.map("uwMap",{zoomControl:false,attributionControl:true,tap:true});
  L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}",{maxZoom:16,attribution:"Esri, HERE, OpenStreetMap"}).addTo(map);
  L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}",{maxZoom:16}).addTo(map);
  drawHoods();
  const pts=[];
  if(s.lat&&s.lng){pts.push([s.lat,s.lng]);L.marker([s.lat,s.lng],{icon:L.divIcon({className:"uwpin s",html:"★",iconSize:[30,30]}),zIndexOffset:1000}).addTo(map).on("click",subjectSheet);}
  (U.comps||[]).forEach(c=>{if(c.lat&&c.lng){pts.push([c.lat,c.lng]);L.marker([c.lat,c.lng],{icon:L.divIcon({className:"uwpin",html:String(c.n),iconSize:[24,24]})}).addTo(map).on("click",()=>compSheet(c));}});
  if(pts.length>1)map.fitBounds(pts,{padding:[30,30],maxZoom:15});else if(pts.length)map.setView(pts[0],15);
  setTimeout(()=>map&&map.invalidateSize(),450);
}

let hoods=null,hoodLayer=null;
const inRing=(pt,ring)=>{let c=false;for(let i=0,j=ring.length-1;i<ring.length;j=i++){const[yi,xi]=ring[i],[yj,xj]=ring[j];if(((yi>pt[0])!=(yj>pt[0]))&&(pt[1]<(xj-xi)*(pt[0]-yi)/(yj-yi)+xi))c=!c;}return c;};
function hoodAt(lat,lng){if(!Array.isArray(hoods)||!lat)return null;return hoods.find(h=>h.r.some(r=>inRing([lat,lng],r)))||null;}
async function drawHoods(){
  try{
    if(!hoods){try{const c=JSON.parse(localStorage.getItem("hbp-hoods")||"null");if(c&&Date.now()-c.t<6*3600e3)hoods=c.d;}catch(e){}}
    if(!hoods){hoods=await window.__uwApi.run("getNeighborhoods");try{localStorage.setItem("hbp-hoods",JSON.stringify({t:Date.now(),d:hoods}));}catch(e){}}
    if(!map||!hoods)return;
    hoodLayer=L.layerGroup().addTo(map);
    hoods.forEach(h=>{const pg=L.polygon(h.r,{color:h.c,weight:1,opacity:.8,fillColor:h.c,fillOpacity:.22,interactive:true}).addTo(hoodLayer);pg.bindTooltip(`${h.g||"?"} · ${h.n}`,{sticky:true,className:"hoodtip"});pg.bringToBack();});
    const s=U.subject||{},h=hoodAt(s.lat,s.lng);const gk=$("uwGrade");
    if(gk&&h){gk.querySelector("b").textContent=h.g||"–";gk.title=h.n;gk.style.borderColor=h.c;}
    (U.comps||[]).forEach(c=>{const ch=hoodAt(c.lat,c.lng);c._hood=ch?`${ch.g} · ${ch.n}`:"";});
    if(tab==="comps")renderPane();
  }catch(e){}
}
function sumEl(){return E("div",{class:"uwsum",id:"uwSum"},E("div",{class:"uwk",id:"uwGrade",style:"border:1px solid transparent"},E("span",{text:"Grade"}),E("b",{text:(U.subject&&U.subject.grade&&U.subject.grade!=="unknown")?U.subject.grade:"…"})),E("div",{class:"uwk gold"},E("span",{text:"ARV"}),E("b",{text:k(U.arv&&U.arv.value)})),E("div",{class:"uwk"},E("span",{text:"Rehab"}),E("b",{text:k(U.rehab&&U.rehab.total)})),E("div",{class:"uwk"+negc(U.offer&&U.offer.min)},E("span",{text:"MIN offer"}),E("b",{text:k(U.offer&&U.offer.min)})),E("div",{class:"uwk"+negc(U.offer&&U.offer.max)},E("span",{text:"MAX offer"}),E("b",{text:k(U.offer&&U.offer.max)})),(U.offer&&U.offer.holdMax!=null)?E("div",{class:"uwk"+negc(U.offer.holdMax)},E("span",{text:"Hold max"}),E("b",{text:k(U.offer.holdMax)})):null,E("div",{class:"uwk"},E("span",{text:"Asking"}),E("b",{text:k((U.offer&&U.offer.asking)||s.asking)})),E("div",{class:"uwk"},E("span",{text:"Offer"}),E("b",{text:k(U.offer&&U.offer.current)})));}
function noteEl(){return E("div",{id:"uwNote"},(Number(U.offer&&U.offer.max)<0)?E("div",{class:"uwnote",text:"MAX is below $0 – the numbers don't work at this rehab. See Subject › Offer formula."}):null);}
function refreshNumbers(){window.__uwSyncOpen&&window.__uwSyncOpen();const a=$("uwSum");if(a){const sl=a.scrollLeft;const n=sumEl();a.replaceWith(n);n.scrollLeft=sl;}const b=$("uwNote");if(b)b.replaceWith(noteEl());
  const gk=$("uwGrade"),h=hoodAt((U.subject||{}).lat,(U.subject||{}).lng);if(gk&&h){gk.querySelector("b").textContent=h.g||"–";gk.style.borderColor=h.c;}if(tab==="repairs")renderPane();}
let curRec=null,openEdited=false;
let openEl=null;function openVal(){const el=openEl||document.getElementById("uwOpen");const n=el?Number(el.value.replace(/[^0-9]/g,"")):0;return n>0?n:0;}
function render(rec){curRec=rec;cput(rec);
  U=rec.data;const s=U.subject||{},st=rec.status||"Draft";
  const stCls="uwst";const stCol=(window.__uwColor||(()=>"#e5e5ea"))(st);
  view.replaceChildren(
    E("div",{class:"uwhead"},E("button",{class:"uwback",type:"button",onclick:close},"‹ Back"),E("div",{class:"t"},E("b",{text:s.address||"Underwriting"}),E("span",{text:[s.type,`${s.beds??"–"}bd/${s.baths??"–"}ba`,U.confidence?U.confidence+" confidence":""].filter(Boolean).join(" · ")})),E("span",{class:stCls,style:`color:${stCol};box-shadow:inset 0 0 0 1px ${stCol}55;background:${stCol}1f`,text:st})),
    E("div",{class:"uwbody"},
      E("div",{id:"uwMap"}),
      sumEl(),
      noteEl(),
      E("div",{class:"uwtabs",id:"uwTabs"},E("div",{class:"seg"},...[["subject","Subject"],["comps",`Comps (${(U.comps||[]).length})`],["repairs","Repairs"]].map(([t,l])=>E("button",{type:"button","data-t":t,"aria-pressed":"false",onclick:()=>{tab=t;renderPane();window.__uwHaptic&&window.__uwHaptic();}},l)))),
      E("div",{id:"uwPane"})),
    dock(rec));
  renderPane();drawMap();
}
function dock(rec){
  const d=E("div",{class:"uwdock"});const api=window.__uwApi;
  if((window.__uwPost||(x=>/approv/i.test(x)))(rec.status||"")){const m=/OPENING_OFFER:\s*(\d+)/.exec(rec.note||"");const ov=rec.openingOffer||(m?Number(m[1]):0);
    d.append(E("div",{style:"text-align:center;color:#8e8e93;font-size:13px",text:`Approved by ${rec.decidedBy||""} · ${rec.decidedAt||""}`+(ov?(/approv/i.test(rec.status||"")?` · opening offer ${$$(ov)} – drafting, you'll approve the text`:` · opening offer ${$$(ov)}`):/OPENING_OFFER:\s*none/.test(rec.note||"")?" · no offer":"")}));return d;}
  /* Opening offer: always starts at MIN (Irwin, Nov 6); editable before approving */
  const oi=E("input",{type:"text",inputmode:"numeric",autocomplete:"off","aria-label":"Opening offer",id:"uwOpen",size:"1"});openEl=oi;
  const reset=E("button",{type:"button",class:"oreset",hidden:"",onclick:()=>{openEdited=false;syncOpen();oi.focus();}},"Use MIN");
  oi.addEventListener("input",()=>{const n=oi.value.replace(/[^0-9]/g,"");oi.value=n?Number(n).toLocaleString("en-US"):"";openEdited=true;reset.hidden=false;window.__uwOpenHint&&window.__uwOpenHint();});
  const hint=E("div",{class:"ohint",id:"uwOpenHint"});
  window.__uwOpenHint=()=>{const v=openVal(),mn=(U.offer||{}).min,mx=(U.offer||{}).max;hint.className="ohint";const pvx=window.__uwPv;if(pvx&&U.offerTemplate)pvx.textContent=v?String(U.offerTemplate).split("{AMOUNT}").join($$(v)):"No offer will be sent";
    if(!v){hint.textContent=(typeof mn==="number"&&mn<=0)?"MIN is below zero – type an offer, or approve with no offer":"No offer will be drafted";hint.classList.add("warn");}
    else if(typeof mx==="number"&&v>mx){hint.textContent=`Above MAX (${$$(mx)})`;hint.classList.add("warn");}
    else if(typeof mn==="number"&&v===mn&&!openEdited){hint.textContent=(U.offerTemplate&&U.contact)?"MIN · texts "+(U.contact&&(U.contact.firstName||U.contact.name)||"the realtor")+" when you approve":"MIN offer – the bot drafts the text, you approve it before it sends";}
    else{hint.textContent=(U.offerTemplate&&U.contact)?"Your number · texts "+(U.contact&&(U.contact.firstName||U.contact.name)||"the realtor")+" when you approve":"Your number – the bot drafts the text, you approve it before it sends";}};
  window.__uwSyncOpen=syncOpen;
  function syncOpen(){if(openEdited)return;const mn=(U.offer||{}).min;oi.value=(typeof mn==="number"&&mn>0)?Math.round(mn).toLocaleString("en-US"):"";reset.hidden=true;window.__uwOpenHint();}
  openEdited=false;
  const canText=!!(U.offerTemplate&&U.contact&&U.contact.contactId);
  /* compact dock (Irwin, Nov 6): the text preview is collapsed so the dock never covers the underwriting */
  const pv=E("div",{class:"opv",hidden:""});window.__uwPv=canText?pv:null;
  const who=canText?(U.contact.name||U.contact.firstName||"the realtor"):"";
  const tog=E("button",{type:"button",class:"pvtog",onclick:()=>{pv.hidden=!pv.hidden;tog.textContent=pv.hidden?"Preview text ▸":"Hide text ▾";}},"Preview text ▸");
  if(canText)tog.setAttribute("aria-label",`Preview the text to ${who}`);
  d.append(E("div",{class:"orow"},E("label",{for:"uwOpen",text:"Opening offer"}),E("div",{class:"ofield"},E("span",{text:"$"}),oi),reset),E("div",{class:"hrow"},hint,...(canText?[tog]:[])));
  if(canText)d.append(pv);
  syncOpen();
  let armed=false;const ab=E("button",{class:"act approve",type:"button",style:"flex:1",onclick:async()=>{
    if(!api.isOwner()){api.toast("Only Irwin approves underwriting");return;}
    const v=openVal();
    if(!armed){armed=true;const tx=!!(U.offerTemplate&&U.contact&&U.contact.contactId);ab.textContent=v?(tx?`Tap to confirm · text ${$$(v)} now`:`Tap to confirm · open at ${$$(v)}`):"Tap to confirm · no offer";ab.classList.add("confirm");setTimeout(()=>{armed=false;ab.textContent=(U.offerTemplate&&U.contact)?"Approve & send offer":"Approve underwriting";ab.classList.remove("confirm");},4000);return;}
    const mn=(U.offer||{}).min;
    const note=v?`OPENING_OFFER: ${v}\nOpening offer ${$$(v)}${(typeof mn==="number"&&v!==Math.round(mn))?` (edited by Irwin – MIN was ${$$(mn)})`:" (MIN)"}`:"OPENING_OFFER: none\nApproved with no opening offer";
    rec.openingOffer=v||0;
    await decide(rec,"Approve",note);}},"Approve underwriting");
  if(U.offerTemplate&&U.contact)ab.textContent="Approve & send offer";if(!api.isOwner()){ab.disabled=true;ab.textContent="Irwin approves underwriting";oi.disabled=true;}
  d.append(E("div",{class:"acts"},ab));
  const ta=E("textarea",{rows:"1",placeholder:"Change underwriting…","aria-label":"Change underwriting"});
  const send=E("button",{class:"send",type:"button","aria-label":"Send change",disabled:""});
  send.innerHTML='<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 13V3M3.5 7.5 8 3l4.5 4.5"/></svg>';
  ta.addEventListener("input",()=>{send.disabled=!ta.value.trim();ta.style.height="auto";ta.style.height=Math.min(ta.scrollHeight,120)+"px";});
  send.addEventListener("click",()=>{const v=ta.value.trim();if(v)decide(rec,"Change",v);});
  d.append(E("div",{class:"comp"},E("div",{class:"field"},ta,send)));
  return d;
}
async function decide(rec,decision,note){
  const api=window.__uwApi;const prev=rec.status;
  rec.status=decision==="Approve"?"Approved":"Change requested";rec.decidedBy=api.me();rec.decidedAt="now";
  api.haptic("ok");api.toast(decision==="Approve"?"Underwriting approved":"Sent to the bot");render(rec);
  api.patch&&api.patch("uw",rec.id,{status:rec.status,decidedBy:rec.decidedBy});
  const still=()=>curRec&&curRec.id===rec.id;
  /* Irwin, Nov 9: after approving or changing, go straight to the next underwriting to review */
  setTimeout(()=>{if(!still())return;const q=(window.__uwQueue&&window.__uwQueue())||[];const n=q.find(id=>id!==rec.id);if(sheet)closeSheet();if(n){api.toast("Next underwriting");open(n);}else{api.toast("All underwritings reviewed");close();}},900);
  try{const r=await api.run("decideUnderwriting",rec.id,decision,note);if(!r||!r.ok)throw new Error((r&&r.reason)||"failed");if(r.offer){if(r.offer.sent){api.toast("Offer texted ✓");rec.status="Sent";api.patch&&api.patch("uw",rec.id,{status:"Sent"});cput(rec);if(still())render(rec);}else api.toast("Approved – offer not sent yet, check the inbox");}api.refresh&&api.refresh();}
  catch(e){rec.status=prev;api.haptic("err");api.toast("Couldn't save – "+(decision==="Approve"?"underwriting not approved":"change not sent")+", try again");cput(rec);if(still())render(rec);api.patch&&api.patch("uw",rec.id,{status:prev});}
}
let opening=false;
/* cache: underwritings open instantly from memory/localStorage, then refresh in the background */
const MEM={};
function cget(k){if(MEM[k])return MEM[k];try{const v=JSON.parse(localStorage.getItem("hbp-uw:"+k)||"null");if(v){MEM[k]=v;return v;}}catch(e){}return null;}
function cput(rec,key){if(!rec||!rec.id)return;const keys=[rec.id].concat((rec.data&&rec.data.inboxIds)||[]);if(key)keys.push(key);keys.forEach(k=>MEM[k]=rec);
  try{localStorage.setItem("hbp-uw:"+rec.id,JSON.stringify(rec));(((rec.data&&rec.data.inboxIds)||[]).concat(key&&key!==rec.id?[key]:[])).forEach(k=>localStorage.setItem("hbp-uw:"+k,JSON.stringify(rec)));
    const ks=Object.keys(localStorage).filter(k=>k.indexOf("hbp-uw:")===0);if(ks.length>24)ks.slice(0,ks.length-24).forEach(k=>localStorage.removeItem(k));}catch(e){}}
let openKey=null;
async function open(key){
  if(opening)return;opening=true;const api=window.__uwApi;openKey=key;const c=cget(key);
  view.style.transform="";view.classList.add("on");api.backOn(close);
  if(c){tab="subject";render(c);}
  else view.replaceChildren(E("div",{class:"uwhead"},E("button",{class:"uwback",type:"button",onclick:close},"‹ Back"),E("div",{class:"t"},E("b",{text:"Loading underwriting…"})),E("span")),E("div",{class:"uwbody"},E("div",{id:"uwMap"})));
  opening=false;
  try{const rec=await api.run("getUnderwriting",key);if(!rec)throw new Error("NOT_FOUND");cput(rec,key);
    const busy=sheet||lb.classList.contains("on")||(document.activeElement&&/TEXTAREA|INPUT/.test(document.activeElement.tagName)&&view.contains(document.activeElement));
    if(openKey===key&&view.classList.contains("on")&&!busy&&(!c||JSON.stringify(rec)!==JSON.stringify(c))){const t=tab;render(rec);if(t!==tab){tab=t;renderPane();}}}
  catch(e){if(!c){api.toast("Couldn't load the underwriting");close();}}
}
let pf=false;
async function prefetch(keys){if(pf)return;pf=true;try{loadLeaflet().catch(()=>{});for(const k of (keys||[]).slice(0,8)){if(MEM[k])continue;try{const rec=await window.__uwApi.run("getUnderwriting",k);if(rec)cput(rec,k);}catch(e){}}}finally{pf=false;}}
function close(){if(lb.classList.contains("on")){lb.classList.remove("on");return;}if(sheet){closeSheet();return;}openKey=null;view.classList.remove("on");view.style.transform="";window.__uwApi.backOff();setTimeout(()=>{if(map){map.remove();map=null;}},450);}
const TABS=["subject","comps","repairs"];
function goTab(dir){const i=TABS.indexOf(tab),j=i+dir;if(j<0||j>=TABS.length)return false;tab=TABS[j];const p=$("uwPane");renderPane();
  p.style.transition="none";p.style.transform=`translateX(${dir>0?40:-40}px)`;p.style.opacity=".3";void p.offsetWidth;p.style.transition="transform .3s cubic-bezier(.32,.72,0,1),opacity .25s";p.style.transform="";p.style.opacity="";
  const tb=$("uwTabs");if(tb){const b=view.querySelector(".uwbody");if(b.scrollTop>tb.offsetTop)b.scrollTop=tb.offsetTop;}window.__uwHaptic&&window.__uwHaptic();return true;}
(function(){let x0=null,y0=null,t0=0,mode=null,dx=0,edge=false;
  view.addEventListener("touchstart",e=>{if(e.touches.length!==1||sheet||lb.classList.contains("on")){x0=null;return;}const t=e.target;const cx=e.touches[0].clientX;edge=cx<28;if(!edge&&t.closest&&t.closest("#uwMap,.car,.uwsum,.uwdock,textarea,input")){x0=null;return;}if(t.closest&&t.closest("textarea,input")){x0=null;return;}x0=cx;y0=e.touches[0].clientY;t0=Date.now();mode=null;dx=0;},{passive:true});
  view.addEventListener("touchmove",e=>{if(x0===null)return;dx=e.touches[0].clientX-x0;const dy=e.touches[0].clientY-y0;if(!mode){if(Math.abs(dx)<10&&Math.abs(dy)<10)return;if(Math.abs(dx)>Math.abs(dy))mode=(dx>0&&(edge||TABS.indexOf(tab)===0))?"exit":"tab";else mode="scroll";}
    if(mode==="exit"){e.preventDefault();view.style.transition="none";view.style.transform=`translateX(${Math.max(0,dx)}px)`;}
    else if(mode==="tab"){e.preventDefault();const p=$("uwPane");if(p){p.style.transition="none";p.style.transform=`translateX(${dx*0.6}px)`;}}},{passive:false});
  view.addEventListener("touchend",()=>{if(x0===null)return;x0=null;if(mode==="exit"){mode=null;view.style.transition="";if(dx>view.clientWidth*0.3||(Date.now()-t0<300&&dx>50)){window.__uwApi.haptic&&window.__uwApi.haptic();close();}else view.style.transform="";return;}if(mode!=="tab")return;const p=$("uwPane");const go=Math.abs(dx)>70||(Date.now()-t0<300&&Math.abs(dx)>35);
    if(!(go&&goTab(dx<0?1:-1))&&p){p.style.transition="transform .3s cubic-bezier(.32,.72,0,1)";p.style.transform="";}mode=null;},{passive:true});
})();
function sheetSwipe(sh){let x0=null,y0=null,dy=0,t0=0,active=false;
  sh.addEventListener("touchstart",e=>{if(e.touches.length!==1)return;x0=e.touches[0].clientX;y0=e.touches[0].clientY;dy=0;t0=Date.now();active=false;},{passive:true});
  sh.addEventListener("touchmove",e=>{if(y0===null)return;const body=sh.querySelector(".sb");dy=e.touches[0].clientY-y0;const dx=e.touches[0].clientX-x0;
    const atBottom=body.scrollTop+body.clientHeight>=body.scrollHeight-2;
    if(!active){if(Math.abs(dx)>8&&Math.abs(dx)>Math.abs(dy)){y0=null;return;}if(dy>8&&body.scrollTop<=0)active="down";else if(dy<-8&&sh._onUp&&atBottom)active="up";else if(Math.abs(dy)>8){y0=null;return;}}
    if(active==="down"){e.preventDefault();sh.style.transition="none";sh.style.transform=`translateY(${Math.max(0,dy)}px)`;}
    else if(active==="up"){e.preventDefault();sh.style.transition="none";sh.style.transform=`translateY(${Math.min(0,dy)*0.35}px)`;}},{passive:false});
  sh.addEventListener("touchend",()=>{if(y0===null)return;y0=null;if(!active)return;sh.style.transition="";
    const was=active;active=false;
    if(was==="up"){sh.style.transform="";if(dy<-90||(Date.now()-t0<300&&dy<-45))sh._onUp();return;}
    if(dy>110||(Date.now()-t0<300&&dy>50)){if(sh._onDown)sh._onDown();else{sh.style.transform="";closeSheet();}}else sh.style.transform="";},{passive:true});}
window.__uw={open,close,prefetch,isOpen:()=>view.classList.contains("on")};
})();

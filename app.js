/* HomeBuyer+ Inbox – Telegram Mini App. Loaded fresh on every open by index.html. */
(function(){
const st=document.createElement("style");st.textContent="\n[hidden]{display:none!important}\nbody{margin:0}\n\n/* Layout: an iMessage-style app. List of task \"conversations\"; tapping one opens a thread with bubbles,\n   a sticky action row and a \"Change or reply\" composer at the bottom. Swipe left/right between tasks.\n   Deliberately single-theme: black, like iMessage dark. */\n:root{\n  color-scheme:dark;\n  --bg:#000000; --bar:#0b0b0d; --row:#000000; --sep:#262629; --ink:#ffffff; --muted:#8e8e93; --muted2:#636366;\n  --bubble-in:#26252a; --bubble-out:#0a84ff; --bubble-ok:#30d158; --field:#1c1c1e; --field-line:#3a3a3c;\n  --gold:#e3b341; --gold-ink:#1a1407; --red:#ff453a; --orange:#ff9f0a; --blue:#0a84ff;\n  --f:-apple-system,BlinkMacSystemFont,\"SF Pro Text\",\"Helvetica Neue\",system-ui,\"Segoe UI\",Roboto,sans-serif;\n}\n*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}\nhtml,body{height:100%;background:var(--bg)}\nbody{color:var(--ink);font-family:var(--f);font-size:16px;line-height:1.35;overflow:hidden}\nbutton{font-family:inherit}\nbutton:focus-visible,textarea:focus-visible,.row:focus-visible{outline:2px solid var(--blue);outline-offset:2px}\n.gut{padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px))}\n.app{height:100%;display:flex;flex-direction:column;max-width:760px;margin:0 auto;position:relative}\n.view{position:absolute;inset:0;display:flex;flex-direction:column;background:var(--bg);will-change:transform;transition:transform .42s cubic-bezier(.32,.72,0,1),filter .42s cubic-bezier(.32,.72,0,1)}\n.view.drag{transition:none}\n#threadView{box-shadow:-8px 0 24px rgba(0,0,0,.6);z-index:2}\n#threadView.off{transform:translateX(100%);pointer-events:none;box-shadow:none}\n#listView.under{transform:translateX(-28%);filter:brightness(.55);pointer-events:none}\n.msgs{will-change:transform,opacity}\n\n/* ---------- list ---------- */\n.lhead{padding-block:calc(10px + var(--tg-safe-area-inset-top,0px) + var(--tg-content-safe-area-inset-top,0px)) 6px;background:var(--bg)}\n.ltop{display:none}\n.ptr{height:0;overflow:hidden;display:flex;align-items:flex-end;justify-content:center;color:var(--muted);font-size:13px;transition:height .2s ease}\n.ptr.pulling{transition:none}\n.ptr{transition:height .35s cubic-bezier(.32,.72,0,1)}\n.ptr .sp{position:relative;width:24px;height:24px;margin-bottom:12px}\n.ptr .sp i{position:absolute;left:10.75px;top:0;width:2.5px;height:7px;border-radius:2px;background:#8e8e93;transform-origin:1.25px 12px;opacity:0;transition:opacity .12s linear}\n.ptr.loading .sp{animation:spin 1s steps(12) infinite}\n.sec{color:var(--muted2);font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.6px;margin:14px 0 4px 4px}\n.sec.r{text-align:right;margin-right:4px}\n.notes{align-self:stretch;background:#1c1c1e;border-radius:16px;padding:4px 14px;font-size:15px;line-height:1.38}\n.notes .it{padding:9px 0;white-space:pre-wrap;overflow-wrap:anywhere}\n.notes .it+.it{border-top:1px solid #2c2c2e}\n.notes .lbl{display:block;color:var(--muted);font-size:12px;font-weight:600;margin-bottom:2px}\n.uwopen{align-self:stretch;display:flex;align-items:center;justify-content:space-between;gap:10px;background:linear-gradient(135deg,#2a2208,#1c1c1e);border:1px solid #6b5418;border-radius:16px;padding:12px 14px;margin:10px 0 2px;color:#fff;text-align:left;font:inherit;cursor:pointer}\n.uwopen b{display:block;color:#e3b341;font-size:16px}\n.uwopen small{display:block;color:#a8a29a;font-size:12px;margin-top:2px}\n.uwopen .chev{color:#e3b341;font-size:26px;line-height:1}\n.uwav{object-fit:cover}\n.negt{color:#ff453a}\n.need{align-self:stretch;background:#0a1f3d;border:1px solid #1f4f99;border-radius:16px;padding:10px 14px;font-size:15px;line-height:1.38;color:#dbe9ff}\n.need .lbl{display:block;color:#7fb2ff;font-size:12px;font-weight:600;margin-bottom:2px;text-transform:uppercase;letter-spacing:.5px}\n#listView.drag{transition:none}\n@keyframes spin{to{transform:rotate(360deg)}}\n.lnk{background:none;border:0;color:var(--blue);font-size:16px;padding:6px 0;cursor:pointer}\n.lnk:disabled{opacity:.4}\nh1{font-size:32px;font-weight:700;letter-spacing:.2px;margin:4px 0 8px}\n.seg{display:flex;background:var(--field);border-radius:9px;padding:2px;gap:2px}\n.seg button{flex:1;border:0;background:transparent;color:var(--ink);font-size:13px;font-weight:600;padding:7px 4px;border-radius:7px;cursor:pointer}\n.seg button[aria-pressed=\"true\"]{background:#636366}\n.chips{display:flex;gap:6px;overflow-x:auto;padding-top:8px;scrollbar-width:none}\n.chips::-webkit-scrollbar{display:none}\n.chip{flex:none;border:1px solid var(--field-line);background:transparent;color:var(--muted);border-radius:999px;padding:5px 11px;font-size:13px;cursor:pointer}\n.chip[aria-pressed=\"true\"]{color:var(--ink);border-color:var(--ink)}\n.lbody{flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch;padding-bottom:env(safe-area-inset-bottom,0px)}\n.sect{color:var(--muted);font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:.4px;padding:16px 0 6px}\n.row{display:flex;gap:12px;align-items:flex-start;padding:10px 0;cursor:pointer;position:relative;border:0;background:none;color:inherit;width:100%;text-align:left}\n.row+.row .rtext{border-top:1px solid var(--sep)}\n.row .rtext{flex:1;min-width:0;padding-top:2px}\n.dot{width:10px;flex:none;align-self:center;display:flex;justify-content:center}\n.dot i{width:10px;height:10px;border-radius:50%;background:var(--blue);display:block}\n.av{width:46px;height:46px;border-radius:50%;flex:none;display:grid;place-items:center;font-weight:600;font-size:17px;color:#fff;background:linear-gradient(180deg,#8e8e93,#636366)}\n.av.offer{background:linear-gradient(180deg,#f2c75c,#c99a2e);color:var(--gold-ink)}\n.av.call{background:linear-gradient(180deg,#5ac8fa,#0a84ff)}\n.av.problem{background:linear-gradient(180deg,#ff6961,#d70015)}\n.rline{display:flex;justify-content:space-between;gap:8px;align-items:baseline}\n.rname{font-weight:600;font-size:16px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n.rtime{color:var(--muted);font-size:14px;white-space:nowrap;flex:none}\n.rprev{color:var(--muted);font-size:15px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;margin-top:1px}\n.rtag{display:inline-block;font-size:12px;color:var(--muted2);margin-top:3px}\n.rtag b{color:var(--gold);font-weight:600}\n.empty{color:var(--muted);text-align:center;padding:60px 20px}\n.empty strong{display:block;color:var(--ink);font-size:18px;margin-bottom:6px}\n.banner{background:#2c1a17;border:1px solid #5a2a24;color:#ffd7d2;border-radius:12px;padding:12px 14px;margin:10px 0;font-size:14px}\n.banner b{display:block;color:#fff;margin-bottom:2px}\n\n/* ---------- thread ---------- */\n.thead{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding-block:calc(6px + var(--tg-safe-area-inset-top,0px) + var(--tg-content-safe-area-inset-top,0px)) 6px;background:rgba(11,11,13,.94);border-bottom:1px solid var(--sep);backdrop-filter:blur(12px)}\n.back{justify-self:start;display:flex;align-items:center;gap:2px;background:none;border:0;color:var(--blue);font-size:17px;cursor:pointer;padding:6px 0}\n.back svg{width:12px;height:20px}\n.who{display:flex;flex-direction:column;align-items:center;gap:2px;min-width:0;max-width:62vw}\n.who .av{width:38px;height:38px;font-size:15px}\n.who .n{font-size:12px;color:var(--ink);font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}\n.pos{justify-self:end;color:var(--muted);font-size:13px;font-variant-numeric:tabular-nums}\n.msgs{flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch;padding-block:10px 14px;display:flex;flex-direction:column;gap:3px;touch-action:pan-y}\n.stamp{color:var(--muted);font-size:12px;text-align:center;margin:10px 0 6px}\n.stamp b{color:var(--muted);font-weight:600}\n.sys{color:var(--muted);font-size:13px;text-align:center;margin:8px 18px;line-height:1.35}\n.sys strong{color:var(--ink);font-weight:600}\n.from{color:var(--muted);font-size:12px;margin:8px 0 2px 14px}\n.from.r{text-align:right;margin:8px 14px 2px 0}\n.b{max-width:78%;padding:8px 13px;border-radius:19px;font-size:16px;line-height:1.32;white-space:pre-wrap;overflow-wrap:anywhere;position:relative}\n.b.in{align-self:flex-start;background:var(--bubble-in);color:var(--ink);border-bottom-left-radius:6px}\n.b.out{align-self:flex-end;background:var(--bubble-out);color:#fff;border-bottom-right-radius:6px}\n.b.out.draft{background:transparent;border:1.5px dashed #3d8ff5;color:#cfe3ff}\n.b.out.ok{background:var(--bubble-ok);color:#00230e}\n.b.out.no{background:#3a3a3c;color:#e5e5ea}\n.b.card{align-self:flex-start;background:var(--bubble-in);font-family:ui-monospace,\"SF Mono\",Menlo,monospace;font-size:13px;line-height:1.5;max-width:88%;border-bottom-left-radius:6px}\n.b.card .t{font-family:var(--f);font-size:12px;color:var(--muted);text-transform:uppercase;letter-spacing:.4px;display:block;margin-bottom:4px}\n.under{font-size:12px;color:var(--muted);align-self:flex-end;margin:2px 6px 0 0}\n.under.l{align-self:flex-start;margin:2px 0 0 6px}\n.amt{align-self:center;background:var(--gold);color:var(--gold-ink);font-weight:700;font-size:15px;border-radius:999px;padding:5px 14px;margin:8px 0 4px;font-variant-numeric:tabular-nums}\n.linkb{align-self:flex-start;color:var(--blue);font-size:14px;margin:4px 0 0 6px;text-decoration:none}\n\n.dock{background:rgba(11,11,13,.96);border-top:1px solid var(--sep);padding-block:8px calc(8px + max(env(safe-area-inset-bottom,0px),var(--tg-safe-area-inset-bottom,0px)));display:flex;flex-direction:column;gap:8px;backdrop-filter:blur(12px)}\n.acts{display:flex;gap:8px}\n.act{flex:1;min-height:40px;border-radius:20px;border:1px solid var(--field-line);background:var(--field);color:var(--ink);font-size:15px;font-weight:600;cursor:pointer;padding:0 10px;white-space:nowrap}\n.act.approve{background:var(--blue);border-color:var(--blue);color:#fff}\n.act.approve.offer{background:var(--gold);border-color:var(--gold);color:var(--gold-ink)}\n.act.approve.confirm{background:var(--bubble-ok);border-color:var(--bubble-ok);color:#00230e}\n.act.skip{color:var(--red)}\n.act:disabled{opacity:.45;cursor:default}\n.comp{display:flex;align-items:flex-end;gap:8px}\n.field{flex:1;display:flex;align-items:flex-end;border:1px solid var(--field-line);border-radius:20px;background:#000;padding:4px 4px 4px 14px;min-height:38px}\n.field textarea{flex:1;background:transparent;border:0;color:var(--ink);font:16px/1.3 var(--f);resize:none;outline:none;padding:5px 0;max-height:120px}\n.field textarea::placeholder{color:var(--muted2)}\n.send{width:30px;height:30px;border-radius:50%;border:0;background:var(--blue);color:#fff;display:grid;place-items:center;cursor:pointer;flex:none}\n.send:disabled{background:#3a3a3c;color:#8e8e93;cursor:default}\n.send svg{width:16px;height:16px}\n.hint{color:var(--muted2);font-size:12px;text-align:center}\n.slide-l{animation:sl .22s ease-out}.slide-r{animation:sr .22s ease-out}\n@keyframes sl{from{transform:translateX(40px);opacity:.3}to{transform:none;opacity:1}}\n@keyframes sr{from{transform:translateX(-40px);opacity:.3}to{transform:none;opacity:1}}\n@media (prefers-reduced-motion:reduce){.slide-l,.slide-r{animation:none}}\n.toast{position:fixed;left:50%;transform:translateX(-50%);top:calc(12px + max(env(safe-area-inset-top,0px),var(--tg-safe-area-inset-top,0px)) + var(--tg-content-safe-area-inset-top,0px));background:#2c2c2e;color:#fff;padding:9px 16px;border-radius:999px;font-size:14px;font-weight:600;z-index:30;max-width:calc(100% - 32px);box-shadow:0 6px 24px rgba(0,0,0,.5)}\n.skel{height:64px;border-radius:12px;background:#111;margin:10px 0}\n";document.head.appendChild(st);
document.body.innerHTML="\n\n\n<div class=\"app\">\n  <section class=\"view\" id=\"listView\" aria-label=\"Inbox\">\n    <div class=\"lhead gut\">\n      <div class=\"ltop\">\n        <span class=\"sub\" id=\"sub\" style=\"color:var(--muted);font-size:13px\">Connecting\u2026</span>\n        <button class=\"lnk\" id=\"refresh\" type=\"button\">Refresh</button>\n      </div>\n      <h1>Inbox</h1>\n      <div class=\"seg\" id=\"whoSeg\" role=\"group\" aria-label=\"Who it's for\"></div>\n      <div class=\"chips\" id=\"botChips\" role=\"group\" aria-label=\"Desk\"></div>\n    </div>\n    <div class=\"ptr\" id=\"ptr\" aria-hidden=\"true\"><div class=\"sp\" id=\"ptrSp\"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div></div>\n    <div class=\"lbody gut\" id=\"list\"><div class=\"skel\"></div><div class=\"skel\"></div><div class=\"skel\"></div></div>\n  </section>\n\n  <section class=\"view off\" id=\"threadView\" aria-label=\"Task\">\n    <div class=\"thead gut\">\n      <button class=\"back\" id=\"back\" type=\"button\" aria-label=\"Back to inbox\"><svg viewBox=\"0 0 12 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M10 2 2 10l8 8\"/></svg><span id=\"backLbl\">Inbox</span></button>\n      <div class=\"who\" id=\"who\"></div>\n      <div class=\"pos\" id=\"pos\"></div>\n    </div>\n    <div class=\"msgs gut\" id=\"msgs\"></div>\n    <div class=\"dock gut\" id=\"dock\"></div>\n  </section>\n</div>\n<div class=\"toast\" id=\"toast\" hidden></div>\n\n\n";
})();

let INIT="",START="";
const API="https://script.google.com/macros/s/AKfycbykCG7yoEWTX2L2HSR_S_Nzr31srzqjXCbwl-ZU-GVrqpFqDD-9HTeE6e_N7VQdH2wT/exec";
const TG=window.Telegram&&window.Telegram.WebApp;
async function run(fn,...a){const r=await fetch(API,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({fn,args:a})});const j=await r.json();if(j.error)throw new Error(j.error);return j.result;}
function haptic(k){try{if(k==="ok")TG.HapticFeedback.notificationOccurred("success");else if(k==="err")TG.HapticFeedback.notificationOccurred("error");else TG.HapticFeedback.impactOccurred("light");}catch(e){}}
const COLS = ["id","created","bot","forWho","kind","lead","phone","property","headline","message","draft","amount","details","action","status","decision","note","decidedBy","decidedAt","botRef","resolvedAt","link","notified"];
const S = { pending: 0, curSig: "", rows: [], who: null, bot: "all", me: "Irwin", isOwner: false, ready: false, busy: false, cur: null, confirm: false, error: null, lastLoad: null, view: "list" };
try { const s = JSON.parse(localStorage.getItem("hbp-inbox2") || "{}"); if (s.who) S.who = s.who; if (s.bot) S.bot = s.bot; } catch (e) {}
const $ = (id) => document.getElementById(id);
const el = (tag, attrs = {}, ...kids) => { const n = document.createElement(tag); for (const [k, v] of Object.entries(attrs)) { if (k === "class") n.className = v; else if (k === "text") n.textContent = v; else if (k.startsWith("on")) n.addEventListener(k.slice(2), v); else if (v !== null && v !== undefined && v !== false) n.setAttribute(k, v); } for (const k of kids) if (k) n.append(k); return n; };
function toast(m){const t=$("toast");t.textContent=m;t.hidden=false;clearTimeout(toast._t);toast._t=setTimeout(()=>t.hidden=true,2200);}
function save(){try{localStorage.setItem("hbp-inbox2",JSON.stringify({who:S.who,bot:S.bot}));}catch(e){}}
function nowT(){const p=new Intl.DateTimeFormat("en-CA",{timeZone:"America/Toronto",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:false}).formatToParts(new Date());const g=t=>p.find(x=>x.type===t).value;return `${g("year")}-${g("month")}-${g("day")} ${g("hour")==="24"?"00":g("hour")}:${g("minute")}`;}
function parseT(s){
  s=String(s||"");let m=/^(\d{4})-(\d{2})-(\d{2})[ T](\d{1,2}):(\d{2})/.exec(s);if(m)return{y:+m[1],mo:+m[2],d:+m[3],h:+m[4],mi:+m[5]};
  m=/^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{2})(?::\d{2})?\s*(AM|PM)?/i.exec(s);if(m){let h=+m[4];if(m[6]){const pm=/pm/i.test(m[6]);h=h%12+(pm?12:0);}return{y:+m[3],mo:+m[1],d:+m[2],h,mi:+m[5]};}
  return null;}
function sortKey(s){const t=parseT(s);return t?`${t.y}${String(t.mo).padStart(2,"0")}${String(t.d).padStart(2,"0")}${String(t.h).padStart(2,"0")}${String(t.mi).padStart(2,"0")}`:String(s||"");}
const MON=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
function hm(t){let h=t.h;const ap=h>=12?"PM":"AM";h=h%12||12;return `${h}:${String(t.mi).padStart(2,"0")} ${ap}`;}
function shortTime(s){const t=parseT(s);if(!t)return"";const today=nowT().slice(0,10)===`${t.y}-${String(t.mo).padStart(2,"0")}-${String(t.d).padStart(2,"0")}`;return today?hm(t):`${MON[t.mo-1]} ${t.d}`;}
function longTime(s){const t=parseT(s);if(!t)return s||"";const today=nowT().slice(0,10)===`${t.y}-${String(t.mo).padStart(2,"0")}-${String(t.d).padStart(2,"0")}`;return `${today?"Today":MON[t.mo-1]+" "+t.d} ${hm(t)}`;}
function money(a){const n=Number(String(a).replace(/[^0-9.]/g,""));return isFinite(n)&&n>0?"$"+n.toLocaleString("en-US",{maximumFractionDigits:0}):"";}
const kindKey=k=>(k||"fyi").toLowerCase().split(/\s/)[0];
const isOffer=r=>kindKey(r.kind)==="offer"||money(r.amount)!=="";
const forMatch=(r,w)=>{const f=(r.forWho||"").toUpperCase();if(w==="all")return true;return f.includes(w.toUpperCase());};
function initials(r){const src=(r.lead||r.property||r.bot||"?").replace(/[^A-Za-z0-9 ]/g," ").trim().split(/\s+/);return ((src[0]||"?")[0]+((src[1]||"")[0]||"")).toUpperCase();}
function avClass(r){const k=kindKey(r.kind);return "av"+(isOffer(r)?" offer":k==="call"?" call":k==="problem"?" problem":"");}
function title(r){return r.lead||r.property||r.bot||r.id;}

function parse(values){const out=[];(values||[]).slice(1).forEach((row,i)=>{const r={};COLS.forEach((c,j)=>r[c]=row[j]==null?"":String(row[j]));r.rowNum=i+2;if(r.id)out.push(r);});return out;}
async function load(manual){
  if(!S.ready||S.pending>0)return;
  try{const d=await run("getData",INIT);if(S.pending>0)return;S.me=d.me;S.isOwner=d.isIrwin;S.rows=parse(d.values);S.uw=d.uw||[];S.reports=d.reports||[];S.lastLoad=nowT();S.error=null;
    try{localStorage.setItem("hbp-cache",JSON.stringify({me:S.me,isOwner:S.isOwner,values:d.values,uw:S.uw,reports:S.reports}));}catch(e){}}
  catch(e){S.error=e;}
  if(S.view==="thread"&&S.cur&&!S.rows.find(r=>r.id===S.cur)){closeThread();return;}
  renderList();
  prefetchDetails();
  if(S.view==="thread"&&S.cur&&!(document.activeElement&&document.activeElement.tagName==="TEXTAREA")){const r=S.rows.find(x=>x.id===S.cur);const sig=JSON.stringify(r);if(sig!==S.curSig){renderThread();}}
}

/* warm the underwriting + report screens in the background so they open instantly */
let pfT=0;function prefetchDetails(){clearTimeout(pfT);pfT=setTimeout(()=>{
  const uw=(S.uw||[]).slice().sort((a,b)=>(uwPost(a.status)-uwPost(b.status))||String(b.created||"").localeCompare(String(a.created||""))).map(u=>u.id);
  const rp=(S.reports||[]).map(r=>r.id);
  if(window.__uw&&window.__uw.prefetch)window.__uw.prefetch(uw).then(()=>window.__rp&&window.__rp.prefetch&&window.__rp.prefetch(rp));
  else if(window.__rp&&window.__rp.prefetch)window.__rp.prefetch(rp);
  if(!window.__uw||!window.__rp)prefetchDetails();},window.__uw&&window.__rp?400:800);}
function scope(){const w=S.who||(S.isOwner?"irwin":"dandy");return S.rows.filter(r=>forMatch(r,w)&&(S.bot==="all"||r.bot===S.bot));}
function openQueue(){return scope().filter(r=>r.status==="Open").sort((a,b)=>(isOffer(b)-isOffer(a))||sortKey(a.created).localeCompare(sortKey(b.created)));}
function navQueue(){const s=scope();const open=openQueue();const fyi=s.filter(r=>r.status==="FYI").sort((a,b)=>sortKey(b.created).localeCompare(sortKey(a.created)));const dec=s.filter(r=>r.status==="Decided").sort((a,b)=>sortKey(b.decidedAt).localeCompare(sortKey(a.decidedAt)));return open.concat(fyi,dec);}

function render(){ syncBack(); renderList(); if(S.view==="thread"&&S.cur)renderThread(); }
function syncBack(){try{if(TG&&TG.BackButton){if(S.view==="thread"&&S.cur)TG.BackButton.show();else TG.BackButton.hide();}}catch(e){}}

function errorBox(e){const m=String((e&&e.message)||e||"");const t=/NOT_ALLOWED/.test(m)?["Not allowed","This inbox is only for Irwin and Dandy."]:/NOT_TELEGRAM|BAD_SIGNATURE|EXPIRED/.test(m)?["Open this from Telegram","Use the Open inbox button on a bot alert in Telegram."]:["Couldn't reach the inbox","Tap Refresh to try again."];return el("div",{class:"banner"},el("b",{text:t[0]}),t[1],el("div",{style:"opacity:.6;font-size:12px;margin-top:6px",text:"Code: "+m.replace(/^Error:\s*/,"").slice(0,160)}));}
function modeSeg(){
  let ms=$("modeSeg");if(!ms){ms=el("div",{class:"seg",id:"modeSeg",style:"margin-bottom:8px"});$("whoSeg").before(ms);}
  const openSug=(S.reports||[]).reduce((n,r)=>n+(Number(r.open)||0),0);
  ms.replaceChildren(...[["tasks","Tasks"],["reports",`Reports${openSug?" · "+openSug:""}`]].map(([k,l])=>el("button",{type:"button","aria-pressed":String((S.mode||"tasks")===k),onclick:()=>{S.mode=k;haptic();render();}},l)));
}
function renderReports(){
  $("whoSeg").hidden=true;$("botChips").hidden=true;
  const list=$("list");list.replaceChildren();
  const R=S.reports||[];
  if(!R.length){list.append(el("div",{class:"empty"},el("strong",{text:"No reports yet"}),"End-of-day and morning reports from each bot will show up here."));return;}
  const today=nowT().slice(0,10);const groups={};R.forEach(r=>{const d=(r.date||r.created||"").slice(0,10);(groups[d]=groups[d]||[]).push(r);});
  Object.keys(groups).sort().reverse().forEach(d=>{list.append(el("div",{class:"sect",text:d===today?"Today":d}));
    groups[d].forEach(r=>list.append(el("button",{class:"row",type:"button",onclick:()=>window.__rp&&window.__rp.open(r.id)},
      el("span",{class:"dot"},Number(r.open)>0?el("i"):null),
      el("span",{class:"av",text:String(r.bot||"?").replace(/[^A-Za-z ]/g,"").split(/\s+/).map(w=>w[0]||"").join("").slice(0,2).toUpperCase()}),
      el("span",{class:"rtext"},el("span",{class:"rline"},el("span",{class:"rname",text:`${r.bot} – ${r.title}`}),el("span",{class:"rtime",text:shortTime(r.created)})),
        el("span",{class:"rprev",text:(r.kpis||[]).map(k=>`${k.label} ${k.value}${k.unit&&k.unit!=="$"?k.unit:""}`).join(" · ")}),
        Number(r.open)>0?el("span",{class:"rtag"},el("b",{text:`${r.open} suggestion${r.open>1?"s":""} to review`})):null))));});
}
function renderList(){
  modeSeg();
  if(S.mode==="reports"){renderReports();return;}
  $("whoSeg").hidden=false;
  const w=S.who||(S.isOwner?"irwin":"dandy");
  $("sub").textContent=S.lastLoad?`${S.me} · updated ${longTime(S.lastLoad)}`:S.me;
  const seg=$("whoSeg");seg.replaceChildren();
  const cnt=k=>S.rows.filter(r=>r.status==="Open"&&forMatch(r,k)).length;
  [["irwin","Irwin"],["dandy","Dandy"],["all","Everyone"]].forEach(([k,l])=>seg.append(el("button",{type:"button","aria-pressed":String(w===k),onclick:()=>{S.who=k;save();render();}},`${l} (${cnt(k)})`)));
  const bots=[...new Set(S.rows.map(r=>r.bot).filter(Boolean))].sort();
  const bc=$("botChips");bc.replaceChildren();bc.hidden=bots.length<2;
  [["all","All desks"]].concat(bots.map(b=>[b,b])).forEach(([k,l])=>bc.append(el("button",{class:"chip",type:"button","aria-pressed":String(S.bot===k),onclick:()=>{S.bot=k;save();render();}},l)));
  const list=$("list");list.replaceChildren();
  if(S.error)list.append(errorBox(S.error));
  const s=scope();const open=openQueue();
  const fyi=s.filter(r=>r.status==="FYI").sort((a,b)=>sortKey(b.created).localeCompare(sortKey(a.created)));
  const dec=s.filter(r=>r.status==="Decided").sort((a,b)=>sortKey(b.decidedAt).localeCompare(sortKey(a.decidedAt)));
  if(!open.length&&!fyi.length&&!dec.length&&!S.error&&!(S.uw||[]).length){list.append(el("div",{class:"empty"},el("strong",{text:"All caught up"}),"When a bot needs you, it shows up here like a new message."));return;}
  const section=(label,rows,unread)=>{if(!rows.length)return;list.append(el("div",{class:"sect",text:label}));rows.forEach(r=>list.append(rowEl(r,unread)));};
  const uws=(S.uw||[]).filter(u=>!/^(drafting|error)/i.test(String(u.status||"").trim())).sort((x,y)=>String(y.created||"").localeCompare(String(x.created||"")));
  const uwOpen=uws.filter(u=>!uwPost(u.status)),uwDone=uws.filter(u=>uwPost(u.status));
  if(uwOpen.length){list.append(el("div",{class:"sect",text:`Underwriting to review · ${uwOpen.length}`}));uwOpen.forEach(u=>list.append(uwRow(u)));}
  section(`Needs a reply · ${open.length}`,open,true);
  section("FYI",fyi,false);
  section("Sent to the bot",dec,false);
  if(uwDone.length){list.append(el("div",{class:"sect",text:"Approved underwriting · deals"}));uwDone.forEach(u=>list.append(uwRow(u)));}
}
/* underwriting deal stage → colour (Irwin: Approved yellow, Sent green, Negotiating orange, Accepted green, Declined red) */
const UWC={approved:"#e3b341",sent:"#30d158",negotiating:"#ff9f0a",accepted:"#30d158",declined:"#ff453a","change requested":"#ff9f0a",draft:"#8e8e93"};
function uwColor(st){const k=String(st||"Draft").toLowerCase().trim();return UWC[k]||(/declin|dead|pass/.test(k)?UWC.declined:/negot|counter/.test(k)?UWC.negotiating:/accept|contract/.test(k)?UWC.accepted:/sent/.test(k)?UWC.sent:/approv/.test(k)?UWC.approved:"#8e8e93");}
function uwPost(st){return /approv|sent|negotiat|accept|declin/i.test(String(st||""));}
window.__uwColor=uwColor;window.__uwPost=uwPost;
function kfmt(n){if(n===""||n==null)return"–";const x=Number(n);if(!isFinite(x))return"–";const a=Math.abs(x),t=a>=1000?"$"+(Math.round(a/100)/10)+"k":"$"+a;return x<0?"−"+t:t;}
function uwRow(u){
  return el("button",{class:"row",type:"button",onclick:()=>window.__uw&&window.__uw.open(u.id)},
    el("span",{class:"dot"},!uwPost(u.status)?el("i",{style:"background:#e3b341"}):null),
    u.photo?el("img",{class:"av uwav",src:u.photo,alt:"",referrerpolicy:"no-referrer"}):el("span",{class:"av offer",text:"UW"}),
    el("span",{class:"rtext"},
      el("span",{class:"rline"},el("span",{class:"rname",text:String(u.address||"").split(",")[0]}),el("span",{class:"rtime",style:`color:${uwColor(u.status)};font-weight:600`,text:u.status||"Draft"})),
      el("span",{class:"rprev",text:[u.type,u.grade&&u.grade!=="unknown"?"Grade "+u.grade:"",u.comps?u.comps+" comps":""].filter(Boolean).join(" · ")}),
      el("span",{class:"rtag"},el("b",{text:`ARV ${kfmt(u.arv)} · Rehab ${kfmt(u.rehab)} · `}),el("span",{class:Number(u.max)<0?"negt":"",text:`MIN ${kfmt(u.min)} / MAX ${kfmt(u.max)}`}))));
}
function rowEl(r,unread){
  const prev=r.status==="Decided"?`You: ${r.decision}${r.note?` – ${r.note}`:""}`:(r.headline||r.message||"");
  return el("button",{class:"row",type:"button",onclick:()=>openThread(r.id)},
    el("span",{class:"dot"},unread?el("i"):null),
    el("span",{class:avClass(r),"aria-hidden":"true",text:initials(r)}),
    el("span",{class:"rtext"},
      el("span",{class:"rline"},el("span",{class:"rname",text:title(r)}),el("span",{class:"rtime",text:shortTime(r.created)})),
      el("span",{class:"rprev",text:prev}),
      el("span",{class:"rtag"},isOffer(r)&&money(r.amount)?el("b",{text:money(r.amount)+" · "}):null,`${r.bot||""}${r.property&&r.lead?" · "+r.property:""}`)));
}

function openThread(id,dir){
  const fromList=S.view!=="thread";
  if(dir&&!fromList){slideTo(dir,()=>{S.cur=id;S.confirm=false;renderThread();});return;}
  S.cur=id;S.view="thread";S.confirm=false;syncBack();renderThread();
  const tv=$("threadView"),lv=$("listView"),m=$("msgs");m.style.transform="";m.style.opacity="";m.scrollTop=m.scrollHeight;
  tv.classList.remove("drag");lv.classList.remove("drag");
  requestAnimationFrame(()=>{tv.classList.remove("off");lv.classList.add("under");});
}
function closeThread(){
  S.view="list";S.cur=null;syncBack();renderList();
  const tv=$("threadView"),lv=$("listView");tv.classList.remove("drag");lv.classList.remove("drag");tv.style.transform="";lv.style.transform="";lv.style.filter="";
  tv.classList.add("off");lv.classList.remove("under");
  const a=document.activeElement;if(a&&a.blur)a.blur();
}
/* iMessage-like slide between tasks: current one slides out, next slides in */
function slideTo(dir,swap,fromDx){
  const m=$("msgs"),w=m.clientWidth||360,ease="cubic-bezier(.32,.72,0,1)";
  m.style.transition=`transform .2s ${ease}, opacity .2s ease`;
  m.style.transform=`translateX(${dir>0?-w:w}px)`;m.style.opacity="0";
  setTimeout(()=>{swap();m.style.transition="none";m.style.transform=`translateX(${dir>0?w*0.35:-w*0.35}px)`;m.style.opacity="0";m.scrollTop=m.scrollHeight;void m.offsetWidth;
    m.style.transition=`transform .34s ${ease}, opacity .25s ease`;m.style.transform="translateX(0)";m.style.opacity="1";},190);
}
function step(dir,dx){const q=navQueue();const i=q.findIndex(r=>r.id===S.cur);if(i<0)return false;const j=i+dir;if(j<0||j>=q.length){toast(dir>0?"That's the last one":"That's the first one");return false;}haptic();openThread(q[j].id,dir);return true;}

/* split bot notes into readable sections: "a | b | c", new lines, and long runs of sentences */
function splitNotes(t){
  let parts=String(t||"").split(/\s*\|\s*|\n+/).map(x=>x.trim()).filter(Boolean);
  const out=[];parts.forEach(p=>{if(p.length>220){p.split(/(?<=[.!?)])\s+(?=(?:[A-Z][a-z]|[A-Z]{2,}|Irwin|Dandy|Offer|Step|MIN|MAX|ARV)\b)/).forEach(x=>out.push(x.trim()));}else out.push(p);});
  return out.filter(Boolean);
}
function notesCard(t){
  const c=el("div",{class:"notes"});
  splitNotes(t).forEach(p=>{const m=/^([A-Z][A-Za-z0-9 #/&'’().-]{1,38}?):\s+([\s\S]+)$/.exec(p);
    c.append(m?el("div",{class:"it"},el("span",{class:"lbl",text:m[1]}),m[2]):el("div",{class:"it",text:p}));});
  return c;
}
function streetKey(s){return String(s||"").toLowerCase().split(",")[0].replace(/\b(street|st|avenue|ave|road|rd|drive|dr|boulevard|blvd|court|ct|lane|ln|place|pl)\b\.?/g,"").replace(/[^a-z0-9]/g,"");}
function uwFor(r){const L=S.uw||[];return L.find(u=>(u.inboxIds||[]).indexOf(r.id)>=0)||(r.property?L.find(u=>streetKey(u.address)&&streetKey(u.address)===streetKey(r.property)):null)||null;}
function onBack(){if(window.__rp&&window.__rp.isOpen()){window.__rp.close();return;}if(window.__uw&&window.__uw.isOpen()){window.__uw.close();return;}closeThread();}
function renderThread(){
  const r=S.rows.find(x=>x.id===S.cur);if(!r){closeThread();return;}S.curSig=JSON.stringify(r);
  const q=navQueue();const i=q.findIndex(x=>x.id===r.id);
  $("backLbl").textContent=openQueue().length?String(openQueue().length):"Inbox";
  $("pos").textContent=i>=0?`${i+1} of ${q.length}`:"";
  $("who").replaceChildren(el("span",{class:avClass(r),text:initials(r)}),el("span",{class:"n",text:`${title(r)} ›`}));
  const m=$("msgs");m.replaceChildren();
  m.append(el("div",{class:"stamp"},el("b",{text:r.bot||"Bot"}),` · ${r.id} · ${longTime(r.created)}`));
  if(r.property||r.phone)m.append(el("div",{class:"sys",text:[r.property,r.phone].filter(Boolean).join(" · ")}));
  if(r.headline)m.append(el("div",{class:"sys"},el("strong",{text:r.headline})));
  if(r.message){m.append(el("div",{class:"sec",text:`Message from ${r.lead||"them"}`}));m.append(el("div",{class:"b in",text:r.message}));}
  if(r.details){m.append(el("div",{class:"sec",text:isOffer(r)?"Underwriting & history":"Notes"}));m.append(notesCard(r.details));}
  const uwr=uwFor(r);if(uwr)m.append(el("button",{class:"uwopen",type:"button",onclick:()=>window.__uw&&window.__uw.open(uwr.id)},el("span",{},el("b",{text:"Review underwriting"}),el("small",{},`Map · ${uwr.comps||""} comps · repair list`,uwr.status?el("span",{style:`color:${uwColor(uwr.status)};font-weight:600`,text:" · "+uwr.status}):null)),el("span",{class:"chev",text:"›"})));
  if(r.link)m.append(el("a",{class:"linkb",href:r.link,target:"_blank",rel:"noopener",text:"Open link ↗"}));
  if(isOffer(r)&&money(r.amount))m.append(el("div",{class:"amt",text:`Offer ${money(r.amount)}`}));
  if(r.draft){m.append(el("div",{class:"sec r",text:"Draft – sends only when approved"}));m.append(el("div",{class:"b out draft",text:r.draft}));}
  if(r.action){m.append(el("div",{class:"sec",text:"What's needed"}));m.append(el("div",{class:"need"},r.action));}
  if(r.status==="Decided"||r.status==="Resolved")m.append(el("div",{class:"sec r",text:"Your decision"}));
  if(r.status==="Decided"||r.status==="Resolved"){
    const ok=r.decision==="Approve";const txt=r.decision==="Approve"?"Approved ✓":r.decision==="Skip"?"Skipped":r.decision==="Done"?"Done ✓":(r.note||r.decision);
    m.append(el("div",{class:"b out "+(ok?"ok":r.decision==="Skip"?"no":""),text:txt}));
    m.append(el("div",{class:"under",text:`${r.decidedBy||""} · ${longTime(r.decidedAt)} · ${r.status==="Resolved"?"done by the bot":"waiting for the bot's next run"}`}));
  }
  renderDock(r);
}

function renderDock(r){
  const d=$("dock");d.replaceChildren();
  const closed=r.status!=="Open"&&r.status!=="FYI";
  if(closed){d.append(el("div",{class:"hint",text:"Already decided · swipe for the next task"}));return;}
  const offer=isOffer(r);const acts=el("div",{class:"acts"});
  if(r.status==="Open"&&(r.draft||offer)){
    if(offer&&!S.isOwner){acts.append(el("button",{class:"act",type:"button",disabled:""},"Irwin approves offers"));}
    else{
      const label=S.confirm?`Tap to confirm${offer&&money(r.amount)?" "+money(r.amount):""}`:offer&&money(r.amount)?`Approve ${money(r.amount)}`:"Approve";
      acts.append(el("button",{class:"act approve"+(offer?" offer":"")+(S.confirm?" confirm":""),type:"button",disabled:S.busy?"":null,onclick:()=>{if(!S.confirm){S.confirm=true;renderDock(r);clearTimeout(renderDock._t);renderDock._t=setTimeout(()=>{if(S.confirm){S.confirm=false;const rr=S.rows.find(x=>x.id===S.cur);if(rr)renderDock(rr);}},5000);}else{S.confirm=false;decide(r,"Approve","");}}},label));
    }
  }
  if(r.status==="Open")acts.append(el("button",{class:"act skip",type:"button",disabled:S.busy?"":null,onclick:()=>decide(r,"Skip","")},"Skip"));
  acts.append(el("button",{class:"act",type:"button",disabled:S.busy?"":null,onclick:()=>decide(r,"Done","")},"Done"));
  d.append(acts);
  let draft="";try{draft=sessionStorage.getItem("c-"+r.id)||"";}catch(e){}
  const ta=el("textarea",{id:"reply",rows:"1",placeholder:"Change or reply","aria-label":"Change or reply"});ta.value=draft;
  const send=el("button",{class:"send",type:"button","aria-label":"Send to the bot",disabled:draft.trim()?null:""});
  send.innerHTML='<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 13V3M3.5 7.5 8 3l4.5 4.5"/></svg>';
  const grow=()=>{ta.style.height="auto";ta.style.height=Math.min(ta.scrollHeight,120)+"px";};
  ta.addEventListener("input",()=>{send.disabled=!ta.value.trim();try{sessionStorage.setItem("c-"+r.id,ta.value);}catch(e){}grow();});
  ta.addEventListener("keydown",e=>{if(e.key==="Enter"&&!e.shiftKey&&!/Mobi|Android/i.test(navigator.userAgent)){e.preventDefault();send.click();}});
  send.addEventListener("click",()=>{const v=ta.value.trim();if(!v)return;decide(r,(r.status==="Open"&&(r.draft||offer))?"Change":"Note",v);});
  d.append(el("div",{class:"comp"},el("div",{class:"field"},ta,send)));
  setTimeout(grow,0);
}

async function decide(r,decision,note){
  if(isOffer(r)&&decision==="Approve"&&!S.isOwner){haptic("err");toast("Only Irwin can approve offers");return;}
  const before={...r},expect={status:r.status,draft:r.draft,amount:r.amount};
  Object.assign(r,{status:(r.status==="FYI"&&decision==="Done")?"Resolved":"Decided",decision,note:note||"",decidedBy:S.me,decidedAt:nowT()});
  try{sessionStorage.removeItem("c-"+r.id);}catch(e){}
  haptic("ok");toast(decision==="Approve"?"Approved":decision==="Skip"?"Skipped":decision==="Done"?"Done":"Sent to the bot");
  const next=openQueue().find(x=>x.id!==r.id);
  if(S.view==="thread"&&S.cur===r.id){if(next)openThread(next.id,1);else{renderThread();setTimeout(closeThread,350);}}else render();
  S.pending=(S.pending||0)+1;
  try{
    const res=await run("decide",INIT,r.id,decision,note||"",expect);
    S.pending--;
    if(!res.ok){haptic("err");S.rows=parse(res.values);toast(res.reason==="GONE"?"That task is gone":res.reason==="IRWIN_ONLY"?"Only Irwin can approve offers":"Not saved – that task changed, check it again");render();return;}
    if(S.pending===0){S.rows=parse(res.values);renderList();try{const c=JSON.parse(localStorage.getItem("hbp-cache")||"null");if(c){c.values=res.values;localStorage.setItem("hbp-cache",JSON.stringify(c));}}catch(e){}}
  }catch(e){S.pending--;Object.assign(r,before);haptic("err");toast("Couldn't save – try again");render();}
}

/* pull down to refresh the list – iOS-style spinner */
(function(){
  const list=$("list"),ptr=$("ptr"),sp=$("ptrSp"),bars=[...sp.querySelectorAll("i")];let y0=null,dy=0,busy=false,raf=0,ready=false;
  bars.forEach((b,i)=>{b.style.transform=`rotate(${i*30}deg)`;});
  const paint=n=>bars.forEach((b,i)=>{b.style.opacity=i<n?String(0.25+0.75*((i+1)/12)):"0";});
  const live=()=>bars.forEach((b,i)=>{b.style.opacity=String(0.2+0.8*(((i+1)%12)/12));});
  list.addEventListener("touchstart",e=>{if(busy||list.scrollTop>0||e.touches.length!==1){y0=null;return;}y0=e.touches[0].clientY;dy=0;ready=false;},{passive:true});
  list.addEventListener("touchmove",e=>{if(y0===null)return;dy=e.touches[0].clientY-y0;
    cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{const h=Math.max(0,Math.min(dy*0.5,80));ptr.classList.add("pulling");ptr.style.height=h+"px";
      const n=Math.min(12,Math.floor(h/56*12));paint(n);if(n>=12&&!ready){ready=true;haptic();}if(n<12)ready=false;});},{passive:true});
  list.addEventListener("touchend",async()=>{if(y0===null)return;y0=null;cancelAnimationFrame(raf);ptr.classList.remove("pulling");
    if(ready){busy=true;live();ptr.style.height="52px";ptr.classList.add("loading");const t0=Date.now();await load(true);await new Promise(r=>setTimeout(r,Math.max(0,600-(Date.now()-t0))));ptr.classList.remove("loading");busy=false;}
    ptr.style.height="0px";setTimeout(()=>{if(!busy)paint(0);},350);ready=false;},{passive:true});
})();

/* inbox page: swipe left/right between Tasks and Reports; swipe right on Tasks (the left end) goes back to Telegram */
(function(){
  const lv=$("listView");let x0=null,y0=null,t0=0,mode=null,dx=0;
  const body=()=>$("list");
  lv.addEventListener("touchstart",e=>{if(S.view!=="list"||e.touches.length!==1){x0=null;return;}const t=e.target;if(t.closest&&t.closest(".chips")){x0=null;return;}x0=e.touches[0].clientX;y0=e.touches[0].clientY;t0=Date.now();mode=null;dx=0;},{passive:true});
  lv.addEventListener("touchmove",e=>{if(x0===null)return;dx=e.touches[0].clientX-x0;const dy=e.touches[0].clientY-y0;
    if(!mode){if(Math.abs(dx)<10&&Math.abs(dy)<10)return;if(Math.abs(dx)>Math.abs(dy)*1.3){const rep=S.mode==="reports";mode=dx>0?(rep?"toTasks":"exit"):(rep?"none":"toReports");}else mode="none";}
    if(mode==="exit"){lv.classList.add("drag");lv.style.transform=`translateX(${Math.max(0,dx)}px)`;}
    else if(mode==="toReports"||mode==="toTasks"){const b=body();if(b){b.style.transition="none";b.style.transform=`translateX(${dx*0.85}px)`;b.style.opacity=String(1-Math.min(Math.abs(dx)/(lv.clientWidth*1.2),.6));}}},{passive:true});
  lv.addEventListener("touchend",()=>{if(x0===null)return;x0=null;const m=mode;mode=null;const fast=Date.now()-t0<300;
    if(m==="exit"){const go=dx>lv.clientWidth*0.3||(fast&&dx>60);lv.classList.remove("drag");
      if(go){lv.style.transform="translateX(100%)";haptic();setTimeout(()=>{try{TG.close();}catch(e){}lv.style.transform="";},260);}else lv.style.transform="";return;}
    if(m==="toReports"||m==="toTasks"){const b=body();const go=Math.abs(dx)>70||(fast&&Math.abs(dx)>35);
      if(b){b.style.transition="";b.style.transform="";b.style.opacity="";}
      if(go){S.mode=m==="toReports"?"reports":"tasks";haptic();render();const nb=body();if(nb){nb.classList.remove("slide-l","slide-r");void nb.offsetWidth;nb.classList.add(m==="toReports"?"slide-l":"slide-r");}}
      else if(b){b.style.transition="transform .3s cubic-bezier(.32,.72,0,1), opacity .3s";requestAnimationFrame(()=>{b.style.transform="";b.style.opacity="";});}}
  },{passive:true});
})();

/* gestures: drag left/right between tasks (follows your finger), swipe from the left edge to go back */
(function(){
  const v=$("threadView"),lv=$("listView"),m=$("msgs");let x0=null,y0=null,t0=0,mode=null,dx=0;
  v.addEventListener("touchstart",e=>{if(e.touches.length!==1)return;const t=e.target;if(t.closest&&t.closest("textarea,.dock,a")){x0=null;return;}x0=e.touches[0].clientX;y0=e.touches[0].clientY;t0=Date.now();mode=x0<28?"edge":null;dx=0;},{passive:true});
  v.addEventListener("touchmove",e=>{if(x0===null)return;dx=e.touches[0].clientX-x0;const dy=e.touches[0].clientY-y0;
    if(!mode){if(Math.abs(dx)<8&&Math.abs(dy)<8)return;mode=Math.abs(dx)>Math.abs(dy)*1.2?"task":"scroll";}
    if(mode==="edge"){const w=v.clientWidth,d=Math.max(0,dx),p=d/w;v.classList.add("drag");lv.classList.add("drag");v.style.transform=`translateX(${d}px)`;lv.style.transform=`translateX(${-28+28*p}%)`;lv.style.filter=`brightness(${.55+.45*p})`;}
    else if(mode==="task"){m.style.transition="none";m.style.transform=`translateX(${dx*0.85}px)`;m.style.opacity=String(1-Math.min(Math.abs(dx)/(m.clientWidth*1.2),.6));}
  },{passive:true});
  v.addEventListener("touchend",()=>{if(x0===null)return;const fast=Date.now()-t0<300;x0=null;
    if(mode==="edge"){if(dx>v.clientWidth*0.35||(fast&&dx>50)){closeThread();}else{v.classList.remove("drag");lv.classList.remove("drag");v.style.transform="";lv.style.transform="";lv.style.filter="";}}
    else if(mode==="task"){const go=Math.abs(dx)>70||(fast&&Math.abs(dx)>35);if(!(go&&step(dx<0?1:-1))){m.style.transition="transform .3s cubic-bezier(.32,.72,0,1), opacity .3s";m.style.transform="translateX(0)";m.style.opacity="1";}}
    mode=null;},{passive:true});
  document.addEventListener("keydown",e=>{if(S.view!=="thread")return;if(document.activeElement&&document.activeElement.tagName==="TEXTAREA")return;if(e.key==="ArrowRight")step(1);else if(e.key==="ArrowLeft")step(-1);else if(e.key==="Escape")closeThread();});
})();

(async function boot(){
    $("back").addEventListener("click",closeThread);
  if(TG){
    try{TG.ready();TG.expand();}catch(e){}
    try{TG.setHeaderColor("#000000");TG.setBackgroundColor("#000000");TG.setBottomBarColor&&TG.setBottomBarColor("#000000");}catch(e){}
    try{if(TG.isVersionAtLeast("8.0")&&!TG.isFullscreen)TG.requestFullscreen();}catch(e){}
    try{if(TG.isVersionAtLeast("7.7"))TG.disableVerticalSwipes();}catch(e){}
    try{TG.BackButton.onClick(onBack);}catch(e){}
    INIT=TG.initData||"";START=(TG.initDataUnsafe&&TG.initDataUnsafe.start_param)||"";
  }
  if(!START){try{START=new URLSearchParams(location.search).get("task")||"";}catch(e){}}
  window.__uwApi={run:(fn,...x)=>run(fn,INIT,...x),isOwner:()=>S.isOwner,me:()=>S.me,toast,haptic,
    /* instant list updates after acting in the underwriting / report screens */
    patch:(kind,id,fields)=>{const L=kind==="uw"?S.uw:S.reports;const it=(L||[]).find(x=>x.id===id||(x.inboxIds||[]).indexOf(id)>=0);if(it)Object.assign(it,fields);renderList();
      try{const c=JSON.parse(localStorage.getItem("hbp-cache")||"null");if(c){c.uw=S.uw;c.reports=S.reports;localStorage.setItem("hbp-cache",JSON.stringify(c));}}catch(e){}},
    refresh:()=>{setTimeout(()=>load(false),300);},
backOn:()=>{try{TG.BackButton.show();}catch(e){}},backOff:()=>syncBack()};
  window.__uwHaptic=()=>haptic();
  {const u=document.createElement("script");u.src="uw.js?v="+Date.now();document.body.appendChild(u);const r=document.createElement("script");r.src="rpt.js?v="+Date.now();document.body.appendChild(r);}
  S.ready=true;
  if(!INIT){$("sub").textContent="";$("list").replaceChildren(errorBox(new Error("NOT_TELEGRAM")));return;}
  try{const c=JSON.parse(localStorage.getItem("hbp-cache")||"null");if(c&&c.values){S.me=c.me;S.isOwner=c.isOwner;S.rows=parse(c.values);S.uw=c.uw||[];S.reports=c.reports||[];renderList();}}catch(e){}
  if(/^RPT-/.test(START)){S.mode="reports";const t=setInterval(()=>{if(window.__rp){clearInterval(t);window.__rp.open(START);}},100);}
  if(/^UW-/.test(START)){const t=setInterval(()=>{if(window.__uw){clearInterval(t);window.__uw.open(START);}},100);}
  if(START&&S.rows.find(r=>r.id===START))openThread(START);
  await load(false);
  if(START&&S.view!=="thread"&&S.rows.find(r=>r.id===START))openThread(START);
  setInterval(()=>{if(document.visibilityState==="visible"&&!S.busy&&!(document.activeElement&&document.activeElement.tagName==="TEXTAREA"))load(false);},60000);
  document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible")load(false);});
})();


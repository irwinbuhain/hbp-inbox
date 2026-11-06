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
.sheet .grab{width:38px;height:5px;border-radius:3px;background:#3a3a3c;margin:6px auto 0}
.sheet .sh{display:flex;justify-content:space-between;align-items:center;padding:calc(10px + var(--tg-safe-area-inset-top,0px) + var(--tg-content-safe-area-inset-top,0px)) 16px 10px;border-bottom:1px solid #262629}
.sheet .sh b{font-size:15px;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.sheet .sb{flex:1;overflow-y:auto;padding:12px 16px 30px}
.xbtn{background:#2c2c2e;border:0;color:#fff;border-radius:999px;padding:6px 12px;font-size:14px;font-weight:600;flex:none}
.lightbox{position:fixed;inset:0;z-index:40;background:rgba(0,0,0,.96);display:flex;align-items:center;justify-content:center;opacity:0;pointer-events:none;transition:opacity .2s}
.lightbox.on{opacity:1;pointer-events:auto}
.lightbox img{max-width:100%;max-height:80vh;object-fit:contain}
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
function lightbox(src,cap){lb.replaceChildren(E("img",{src,referrerpolicy:"no-referrer"}),cap?E("div",{class:"cap",text:cap}):null);lb.classList.add("on");}

let U=null,tab="comps",map=null,sheet=null;
function loadLeaflet(){if(window.L)return Promise.resolve();return new Promise((res,rej)=>{const l=document.createElement("link");l.rel="stylesheet";l.href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";document.head.appendChild(l);const s=document.createElement("script");s.src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";s.onload=res;s.onerror=rej;document.head.appendChild(s);});}

function carousel(photos,label){
  const wrap=E("div");const c=E("div",{class:"car"});const n=E("div",{class:"carn"});
  (photos||[]).forEach((p,i)=>c.append(E("img",{src:p,loading:i<2?"eager":"lazy",referrerpolicy:"no-referrer",alt:label||"",onclick:()=>lightbox(p,label)})));
  const upd=()=>{const i=Math.round(c.scrollLeft/(c.clientWidth+6));n.textContent=photos&&photos.length?`${i+1} / ${photos.length} · tap to enlarge`:"No photos";};
  c.addEventListener("scroll",()=>requestAnimationFrame(upd),{passive:true});setTimeout(upd,0);
  wrap.append(c,n);return wrap;
}
function kv(pairs){const g=E("div",{class:"kv"});pairs.filter(p=>p[1]!=null&&p[1]!==""&&p[1]!=="–").forEach(([a,b])=>g.append(E("span",{text:a}),E("b",{text:String(b)})));return g;}
function ptxt(label,text){return text?E("div",{class:"ptxt"},E("span",{class:"lbl",text:label}),text):null;}

function openSheet(title,body){
  sheet&&sheet.remove();
  sheet=E("div",{class:"sheet"},E("div",{style:"padding-top:calc(var(--tg-safe-area-inset-top,0px) + var(--tg-content-safe-area-inset-top,0px))"},E("div",{class:"grab"})),E("div",{class:"sh",style:"padding-top:8px"},E("b",{text:title}),E("button",{class:"xbtn",type:"button",onclick:closeSheet},"Done")),E("div",{class:"sb"},...body));
  sheetSwipe(sheet);document.body.appendChild(sheet);requestAnimationFrame(()=>requestAnimationFrame(()=>sheet.classList.add("on")));
  window.__uwHaptic&&window.__uwHaptic();
}
function closeSheet(){if(!sheet)return;const s=sheet;sheet=null;s.classList.remove("on");setTimeout(()=>s.remove(),420);}

function compSheet(c){
  openSheet(`Comp ${c.n} · ${c.address}`,[
    carousel(c.photos,c.address),
    kv([["Type",c.type||"–"],["Sold",`${$$(c.soldPrice)}${c.soldDate?" · "+c.soldDate:""}`],["$ / sq ft",c.ppsf?"$"+Math.round(c.ppsf):"–"],["Beds / baths",`${c.beds??"–"} / ${c.baths??"–"}`],["Sq ft",c.sqft?Number(c.sqft).toLocaleString():"–"],["Year built",c.yearBuilt||"–"],["Siding",c.siding||"–"],["Distance",c.distanceMi!=null?`${c.distanceMi} mi`:"–"],["Neighborhood",c._hood||"–"]]),
    ptxt("Condition",c.condition),ptxt("Why it counts",c.why),
    (c.flags&&c.flags.length)?E("div",{},...c.flags.map(f=>E("span",{class:"flag",text:f}))):null,
    c.url?E("a",{class:"uwbtn",href:c.url,target:"_blank",rel:"noopener"},"Open listing",E("span",{text:"↗"})):null
  ]);
}
function subjectSheet(){const s=U.subject||{};openSheet(s.address||"Subject",[carousel(s.photos,s.address),subjectDetails()]);}
function subjectDetails(){const s=U.subject||{};return E("div",{},
  kv([["Type",s.type||"–"],["Asking",$$(s.asking)],["Beds / baths",`${s.beds??"–"} / ${s.baths??"–"}`],["Sq ft",s.sqft?Number(s.sqft).toLocaleString():"–"],["Year built",s.yearBuilt||"–"],["Lot",s.lotSqft?Number(s.lotSqft).toLocaleString()+" sq ft":"–"],["Siding",s.siding||"–"],["Neighborhood",[s.neighborhood,s.grade&&s.grade!=="unknown"?`(${s.grade})`:""].filter(Boolean).join(" ")||"–"]]),
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
    p.append(E("div",{class:"grp"},E("span",{text:area}),E("span",{text:$$(ls.reduce((a,b)=>a+Number(b.cost||0),0))})));
    ls.forEach(l=>p.append(E("div",{class:"rl"},
      l.photo?E("img",{src:l.photo,loading:"lazy",referrerpolicy:"no-referrer",alt:l.item,onclick:()=>lightbox(l.photo,`${l.item} – ${l.photoNote||l.reason||""}`)}):E("div",{class:"noimg",text:"no photo"}),
      E("div",{class:"ri"},E("div",{class:"rt"},E("span",{text:l.item}),E("b",{text:$$(l.cost)})),E("div",{class:"rr",text:l.reason||""}),(l.photoNote||l.source)?E("div",{class:"rs",text:[l.photoNote,l.source].filter(Boolean).join(" · ")}):null))));
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
function hoodAt(lat,lng){if(!hoods||!lat)return null;return hoods.find(h=>h.r.some(r=>inRing([lat,lng],r)))||null;}
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
function render(rec){
  U=rec.data;const s=U.subject||{},st=rec.status||"Draft";
  const stCls=/approv/i.test(st)?"uwst ok":/change/i.test(st)?"uwst chg":"uwst";
  view.replaceChildren(
    E("div",{class:"uwhead"},E("button",{class:"uwback",type:"button",onclick:close},"‹ Back"),E("div",{class:"t"},E("b",{text:s.address||"Underwriting"}),E("span",{text:[s.type,`${s.beds??"–"}bd/${s.baths??"–"}ba`,U.confidence?U.confidence+" confidence":""].filter(Boolean).join(" · ")})),E("span",{class:stCls,text:st})),
    E("div",{class:"uwbody"},
      E("div",{id:"uwMap"}),
      E("div",{class:"uwsum"},E("div",{class:"uwk",id:"uwGrade",style:"border:1px solid transparent"},E("span",{text:"Grade"}),E("b",{text:(U.subject&&U.subject.grade&&U.subject.grade!=="unknown")?U.subject.grade:"…"})),E("div",{class:"uwk gold"},E("span",{text:"ARV"}),E("b",{text:k(U.arv&&U.arv.value)})),E("div",{class:"uwk"},E("span",{text:"Rehab"}),E("b",{text:k(U.rehab&&U.rehab.total)})),E("div",{class:"uwk"+negc(U.offer&&U.offer.min)},E("span",{text:"MIN offer"}),E("b",{text:k(U.offer&&U.offer.min)})),E("div",{class:"uwk"+negc(U.offer&&U.offer.max)},E("span",{text:"MAX offer"}),E("b",{text:k(U.offer&&U.offer.max)})),E("div",{class:"uwk"},E("span",{text:"Asking"}),E("b",{text:k((U.offer&&U.offer.asking)||s.asking)})),E("div",{class:"uwk"},E("span",{text:"Offer"}),E("b",{text:k(U.offer&&U.offer.current)}))),
      (Number(U.offer&&U.offer.max)<0)?E("div",{class:"uwnote",text:"MAX is below $0 – the numbers don't work at this rehab. See Subject › Offer formula."}):null,
      E("div",{class:"uwtabs",id:"uwTabs"},E("div",{class:"seg"},...[["comps",`Comps (${(U.comps||[]).length})`],["subject","Subject"],["repairs","Repairs"]].map(([t,l])=>E("button",{type:"button","data-t":t,"aria-pressed":"false",onclick:()=>{tab=t;renderPane();window.__uwHaptic&&window.__uwHaptic();}},l)))),
      E("div",{id:"uwPane"})),
    dock(rec));
  renderPane();drawMap();
}
function dock(rec){
  const d=E("div",{class:"uwdock"});const api=window.__uwApi;
  if(/approv/i.test(rec.status||"")){d.append(E("div",{style:"text-align:center;color:#8e8e93;font-size:13px",text:`Approved by ${rec.decidedBy||""} · ${rec.decidedAt||""}`}));return d;}
  let armed=false;const ab=E("button",{class:"act approve",type:"button",style:"flex:1",onclick:async()=>{
    if(!api.isOwner()){api.toast("Only Irwin approves underwriting");return;}
    if(!armed){armed=true;ab.textContent="Tap to confirm";ab.classList.add("confirm");setTimeout(()=>{armed=false;ab.textContent="Approve underwriting";ab.classList.remove("confirm");},4000);return;}
    await decide(rec,"Approve","");}},"Approve underwriting");
  if(!api.isOwner()){ab.disabled=true;ab.textContent="Irwin approves underwriting";}
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
  try{const r=await api.run("decideUnderwriting",rec.id,decision,note);if(!r||!r.ok)throw new Error((r&&r.reason)||"failed");}
  catch(e){rec.status=prev;api.haptic("err");api.toast("Couldn't save – try again");render(rec);}
}
let opening=false;
async function open(key){
  if(opening)return;opening=true;const api=window.__uwApi;
  view.replaceChildren(E("div",{class:"uwhead"},E("button",{class:"uwback",type:"button",onclick:close},"‹ Back"),E("div",{class:"t"},E("b",{text:"Loading underwriting…"})),E("span")),E("div",{class:"uwbody"},E("div",{id:"uwMap"})));
  view.classList.add("on");api.backOn(close);
  try{const rec=await api.run("getUnderwriting",key);if(!rec)throw new Error("NOT_FOUND");tab="comps";render(rec);}
  catch(e){api.toast("Couldn't load the underwriting");close();}
  opening=false;
}
function close(){if(lb.classList.contains("on")){lb.classList.remove("on");return;}if(sheet){closeSheet();return;}view.classList.remove("on");window.__uwApi.backOff();setTimeout(()=>{if(map){map.remove();map=null;}},450);}
const TABS=["comps","subject","repairs"];
function goTab(dir){const i=TABS.indexOf(tab),j=i+dir;if(j<0||j>=TABS.length)return false;tab=TABS[j];const p=$("uwPane");renderPane();
  p.style.transition="none";p.style.transform=`translateX(${dir>0?40:-40}px)`;p.style.opacity=".3";void p.offsetWidth;p.style.transition="transform .3s cubic-bezier(.32,.72,0,1),opacity .25s";p.style.transform="";p.style.opacity="";
  const tb=$("uwTabs");if(tb){const b=view.querySelector(".uwbody");if(b.scrollTop>tb.offsetTop)b.scrollTop=tb.offsetTop;}window.__uwHaptic&&window.__uwHaptic();return true;}
(function(){let x0=null,y0=null,t0=0,mode=null,dx=0;
  view.addEventListener("touchstart",e=>{if(e.touches.length!==1||sheet){x0=null;return;}const t=e.target;if(t.closest&&t.closest("#uwMap,.car,.uwsum,.uwdock,textarea")){x0=null;return;}x0=e.touches[0].clientX;y0=e.touches[0].clientY;t0=Date.now();mode=null;dx=0;},{passive:true});
  view.addEventListener("touchmove",e=>{if(x0===null)return;dx=e.touches[0].clientX-x0;const dy=e.touches[0].clientY-y0;if(!mode){if(Math.abs(dx)<10&&Math.abs(dy)<10)return;mode=Math.abs(dx)>Math.abs(dy)*1.3?"tab":"scroll";}
    if(mode==="tab"){const p=$("uwPane");if(p){p.style.transition="none";p.style.transform=`translateX(${dx*0.6}px)`;}}},{passive:true});
  view.addEventListener("touchend",()=>{if(x0===null)return;x0=null;if(mode!=="tab")return;const p=$("uwPane");const go=Math.abs(dx)>70||(Date.now()-t0<300&&Math.abs(dx)>35);
    if(!(go&&goTab(dx<0?1:-1))&&p){p.style.transition="transform .3s cubic-bezier(.32,.72,0,1)";p.style.transform="";}mode=null;},{passive:true});
})();
function sheetSwipe(sh){const body=sh.querySelector(".sb");let y0=null,dy=0,t0=0,active=false;
  sh.addEventListener("touchstart",e=>{if(e.touches.length!==1)return;const t=e.target;if(t.closest&&t.closest(".car")&&false)return;y0=e.touches[0].clientY;dy=0;t0=Date.now();active=false;},{passive:true});
  sh.addEventListener("touchmove",e=>{if(y0===null)return;dy=e.touches[0].clientY-y0;if(!active){if(dy>8&&body.scrollTop<=0)active=true;else if(Math.abs(dy)>8){y0=null;return;}}
    if(active){sh.style.transition="none";sh.style.transform=`translateY(${Math.max(0,dy)}px)`;}},{passive:true});
  sh.addEventListener("touchend",()=>{if(y0===null)return;y0=null;if(!active)return;sh.style.transition="";if(dy>110||(Date.now()-t0<300&&dy>50)){sh.style.transform="";closeSheet();}else sh.style.transform="";active=false;},{passive:true});}
window.__uw={open,close,isOpen:()=>view.classList.contains("on")};
})();

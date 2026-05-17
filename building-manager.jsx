import { useState, useMemo } from "react";

const DEMO_APTS = [
  { id:"a1", number:"101", floor:1, area:65, balcony:8, leases:[{tenant:"כהן משפחה",start:"2023-01-01",end:"2024-12-31",rent:4200,vaad:350,notes:""}], customFields:{} },
  { id:"a2", number:"102", floor:1, area:40, balcony:5, leases:[{tenant:"לוי דוד",start:"2023-06-01",end:"2025-05-31",rent:2800,vaad:250,notes:""}], customFields:{} },
  { id:"a3", number:"201", floor:2, area:65, balcony:8, leases:[{tenant:"ישראלי רון",start:"2024-01-01",end:"2024-06-30",rent:4400,vaad:350,notes:""},{tenant:"מזרחי אבי",start:"2024-09-01",end:"2026-08-31",rent:4600,vaad:360,notes:""}], customFields:{} },
  { id:"a4", number:"202", floor:2, area:40, balcony:0, leases:[], customFields:{} },
  { id:"a5", number:"301", floor:3, area:85, balcony:12, leases:[{tenant:"פרידמן עמית",start:"2022-03-01",end:"2025-02-28",rent:5500,vaad:420,notes:""}], customFields:{} },
  { id:"a6", number:"302", floor:3, area:40, balcony:5, leases:[], customFields:{} },
];

const DEMO_STORAGES = [
  { id:"s1", number:"מ-1", linkedApt:"101", floor:-1, area:6,  leases:[{tenant:"כהן משפחה",start:"2023-01-01",end:"2024-12-31",rent:180,notes:""}], customFields:{} },
  { id:"s2", number:"מ-2", linkedApt:"102", floor:-1, area:5,  leases:[], customFields:{} },
  { id:"s3", number:"מ-3", linkedApt:"",    floor:-1, area:8,  leases:[{tenant:"גולדברג שרה",start:"2023-09-01",end:"2025-08-31",rent:220,notes:"שוכר חיצוני"}], customFields:{} },
  { id:"s4", number:"מ-4", linkedApt:"202", floor:-1, area:6,  leases:[], customFields:{} },
  { id:"s5", number:"מ-5", linkedApt:"301", floor:-1, area:10, leases:[{tenant:"פרידמן עמית",start:"2022-03-01",end:"2025-02-28",rent:300,notes:""}], customFields:{} },
];

const TABS = ["דירות","מחסנים","ניתוח ודוחות","השוואה","הגדרות"];

const fmtDate = d => d ? new Date(d).toLocaleDateString("he-IL") : "—";
const daysBetween = (a,b) => Math.max(0, Math.round((new Date(b)-new Date(a))/86400000));
const monthsBetween = (a,b) => { const d1=new Date(a),d2=new Date(b); return Math.max(0,(d2.getFullYear()-d1.getFullYear())*12+d2.getMonth()-d1.getMonth()); };
const calcOcc = (asset,from,to) => { const tot=daysBetween(from,to); if(!tot) return 0; let occ=0; for(const l of asset.leases){const s=l.start>from?l.start:from,e=l.end<to?l.end:to; if(s<e)occ+=daysBetween(s,e);} return Math.min(100,Math.round(occ/tot*100)); };
const getActive = (asset,date) => asset.leases.find(l=>l.start<=date&&l.end>=date)||null;
const totalMonths = asset => asset.leases.reduce((s,l)=>s+monthsBetween(l.start,l.end),0);

const S = {
  input: { padding:"6px 10px", border:"0.5px solid var(--color-border-secondary)", borderRadius:"var(--border-radius-md)", background:"var(--color-background-primary)", color:"var(--color-text-primary)", fontSize:13, width:"100%" },
  btnPrimary: { padding:"7px 18px", background:"var(--color-background-info)", color:"var(--color-text-info)", border:"0.5px solid var(--color-border-info)", borderRadius:"var(--border-radius-md)", cursor:"pointer", fontSize:13, fontWeight:500 },
  btnSec: { padding:"7px 14px", background:"transparent", border:"0.5px solid var(--color-border-secondary)", borderRadius:"var(--border-radius-md)", cursor:"pointer", fontSize:13, color:"var(--color-text-secondary)" },
  btnDanger: { padding:"5px 10px", background:"transparent", border:"0.5px solid var(--color-border-danger)", borderRadius:"var(--border-radius-md)", cursor:"pointer", fontSize:12, color:"var(--color-text-danger)" },
  card: { background:"var(--color-background-primary)", border:"0.5px solid var(--color-border-tertiary)", borderRadius:"var(--border-radius-lg)", padding:"1rem 1.25rem", marginBottom:12 },
  lbl: { fontSize:12, color:"var(--color-text-secondary)", marginBottom:3, display:"block" },
  badge: c => ({ fontSize:11, padding:"2px 8px", borderRadius:20, background:`var(--color-background-${c})`, color:`var(--color-text-${c})`, display:"inline-block", whiteSpace:"nowrap" }),
  metric: { background:"var(--color-background-secondary)", borderRadius:"var(--border-radius-md)", padding:"12px 16px", textAlign:"center" },
};

const EMPTY_LEASE = { tenant:"", start:"", end:"", rent:"", vaad:"", notes:"" };

function AssetManager({ assets, setAssets, type, aptNumbers, reportFrom, reportTo, customFieldDefs, updateCustomField }) {
  const today = new Date().toISOString().slice(0,10);
  const isApt = type==="apt";
  const typeLabel = isApt ? "דירה" : "מחסן";
  const [filterArea, setFilterArea] = useState("all");
  const [filterFloor, setFilterFloor] = useState("all");
  const [selected, setSelected] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [showAddLease, setShowAddLease] = useState(false);
  const [newAsset, setNewAsset] = useState({ number:"", floor:"", area:"", balcony:"", linkedApt:"" });
  const [newLease, setNewLease] = useState(EMPTY_LEASE);
  const [editLease, setEditLease] = useState(null);

  const uniqueAreas = useMemo(()=>[...new Set(assets.map(a=>a.area))].sort((a,b)=>a-b),[assets]);
  const uniqueFloors = useMemo(()=>[...new Set(assets.map(a=>a.floor))].sort((a,b)=>a-b),[assets]);
  const filtered = useMemo(()=>assets.filter(a=>(filterArea==="all"||a.area===Number(filterArea))&&(filterFloor==="all"||a.floor===Number(filterFloor))),[assets,filterArea,filterFloor]);

  const addAsset = () => {
    if(!newAsset.number||!newAsset.floor||!newAsset.area) return;
    const cf={}; customFieldDefs.forEach(f=>cf[f.name]="");
    setAssets(prev=>[...prev,{id:Date.now()+"",number:newAsset.number,floor:Number(newAsset.floor),area:Number(newAsset.area),balcony:Number(newAsset.balcony||0),linkedApt:newAsset.linkedApt||"",leases:[],customFields:cf}]);
    setNewAsset({number:"",floor:"",area:"",balcony:"",linkedApt:""});
    setShowAdd(false);
  };
  const deleteAsset = id => { setAssets(prev=>prev.filter(a=>a.id!==id)); if(selected?.id===id) setSelected(null); };
  const addLease = assetId => {
    if(!newLease.tenant||!newLease.start||!newLease.end||!newLease.rent) return;
    setAssets(prev=>prev.map(a=>a.id===assetId?{...a,leases:[...a.leases,{...newLease,rent:Number(newLease.rent),vaad:Number(newLease.vaad||0)}]}:a));
    setNewLease(EMPTY_LEASE); setShowAddLease(false);
  };
  const deleteLease = (assetId,idx) => setAssets(prev=>prev.map(a=>a.id===assetId?{...a,leases:a.leases.filter((_,i)=>i!==idx)}:a));
  const saveEdit = () => {
    if(!editLease) return;
    setAssets(prev=>prev.map(a=>a.id===editLease.assetId?{...a,leases:a.leases.map((l,i)=>i===editLease.idx?{...editLease.data,rent:Number(editLease.data.rent),vaad:Number(editLease.data.vaad||0)}:l)}:a));
    setEditLease(null);
  };

  const leaseFields = [["שם שוכר","tenant","text"],["מתאריך","start","date"],["עד תאריך","end","date"],["שכ\"ד ₪","rent","number"],...(isApt?[["ועד בית ₪","vaad","number"]]:[]),["הערות","notes","text"]];

  return (
    <div>
      <div style={{display:"flex",gap:8,marginBottom:12,flexWrap:"wrap",alignItems:"flex-end"}}>
        <div><span style={S.lbl}>שטח</span>
          <select value={filterArea} onChange={e=>setFilterArea(e.target.value)} style={{...S.input,width:110,cursor:"pointer"}}>
            <option value="all">הכל</option>{uniqueAreas.map(a=><option key={a} value={a}>{a} מ"ר</option>)}
          </select>
        </div>
        <div><span style={S.lbl}>קומה</span>
          <select value={filterFloor} onChange={e=>setFilterFloor(e.target.value)} style={{...S.input,width:110,cursor:"pointer"}}>
            <option value="all">הכל</option>{uniqueFloors.map(f=><option key={f} value={f}>{f<0?`מרתף ${Math.abs(f)}`:`קומה ${f}`}</option>)}
          </select>
        </div>
        <div style={{marginRight:"auto"}}>
          <button onClick={()=>setShowAdd(v=>!v)} style={S.btnPrimary}>
            <i className="ti ti-plus" aria-hidden="true"></i> הוסף {typeLabel}
          </button>
        </div>
      </div>

      {showAdd && (
        <div style={{...S.card,border:"0.5px solid var(--color-border-info)",marginBottom:16}}>
          <p style={{fontWeight:500,fontSize:14,margin:"0 0 12px"}}>{typeLabel} חדש</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:10,marginBottom:10}}>
            <div><span style={S.lbl}>מס' {typeLabel}</span><input value={newAsset.number} onChange={e=>setNewAsset(p=>({...p,number:e.target.value}))} style={S.input}/></div>
            <div><span style={S.lbl}>קומה</span><input type="number" value={newAsset.floor} onChange={e=>setNewAsset(p=>({...p,floor:e.target.value}))} style={S.input}/></div>
            <div><span style={S.lbl}>שטח מ"ר</span><input type="number" value={newAsset.area} onChange={e=>setNewAsset(p=>({...p,area:e.target.value}))} style={S.input}/></div>
            {isApt && <div><span style={S.lbl}>מרפסת מ"ר</span><input type="number" value={newAsset.balcony} onChange={e=>setNewAsset(p=>({...p,balcony:e.target.value}))} style={S.input}/></div>}
            {!isApt && <div><span style={S.lbl}>קשור לדירה</span>
              <select value={newAsset.linkedApt} onChange={e=>setNewAsset(p=>({...p,linkedApt:e.target.value}))} style={{...S.input,cursor:"pointer"}}>
                <option value="">ללא</option>{aptNumbers.map(n=><option key={n} value={n}>דירה {n}</option>)}
              </select>
            </div>}
          </div>
          <div style={{display:"flex",gap:8}}>
            <button onClick={addAsset} style={S.btnPrimary}>שמור</button>
            <button onClick={()=>setShowAdd(false)} style={S.btnSec}>ביטול</button>
          </div>
        </div>
      )}

      {filtered.map(asset => {
        const active = getActive(asset,today);
        const occ = calcOcc(asset,reportFrom,reportTo);
        const isSelected = selected?.id===asset.id;
        return (
          <div key={asset.id} style={{...S.card,cursor:"pointer",borderColor:isSelected?"var(--color-border-info)":"var(--color-border-tertiary)"}}
            onClick={()=>setSelected(s=>s?.id===asset.id?null:asset)}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:42,height:42,borderRadius:"var(--border-radius-md)",background:"var(--color-background-secondary)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:500,fontSize:13,flexShrink:0,textAlign:"center",lineHeight:1.2}}>
                {asset.number}
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap"}}>
                  <span style={{fontWeight:500,fontSize:14}}>{typeLabel} {asset.number}</span>
                  <span style={S.badge("secondary")}>{asset.floor<0?`מרתף ${Math.abs(asset.floor)}`:`קומה ${asset.floor}`}</span>
                  <span style={S.badge("secondary")}>{asset.area} מ"ר</span>
                  {isApt && asset.balcony>0 && <span style={S.badge("secondary")}>מרפסת {asset.balcony} מ"ר</span>}
                  {!isApt && asset.linkedApt && <span style={S.badge("secondary")}>דירה {asset.linkedApt}</span>}
                  {active ? <span style={S.badge("success")}>מושכר</span> : <span style={S.badge("warning")}>פנוי</span>}
                </div>
                <div style={{fontSize:12,color:"var(--color-text-secondary)",marginTop:3}}>
                  {active ? `${active.tenant} | ₪${active.rent.toLocaleString()}${isApt&&active.vaad?` + ועד ₪${active.vaad}`:""}` : "אין חוזה פעיל"}
                  {" · "}תפוסה: {occ}% · סה"כ {totalMonths(asset)} חודשים מושכר
                </div>
              </div>
              <div style={{display:"flex",gap:8,alignItems:"center",flexShrink:0}}>
                {active && <span style={{fontSize:13,color:"var(--color-text-secondary)"}}>₪{(active.rent/asset.area).toFixed(0)}/מ"ר</span>}
                <button onClick={e=>{e.stopPropagation();deleteAsset(asset.id);}} style={S.btnDanger}>מחק</button>
              </div>
            </div>

            {isSelected && (
              <div style={{marginTop:14,borderTop:"0.5px solid var(--color-border-tertiary)",paddingTop:12}} onClick={e=>e.stopPropagation()}>
                {customFieldDefs.length>0 && (
                  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:8,marginBottom:12}}>
                    {customFieldDefs.map(f=>(
                      <div key={f.name}><span style={S.lbl}>{f.name}</span>
                        {f.type==="checkbox"
                          ? <input type="checkbox" checked={!!asset.customFields[f.name]} onChange={e=>updateCustomField(asset.id,f.name,e.target.checked,type)}/>
                          : <input type={f.type} value={asset.customFields[f.name]||""} onChange={e=>updateCustomField(asset.id,f.name,e.target.value,type)} style={S.input}/>}
                      </div>
                    ))}
                  </div>
                )}

                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                  <p style={{fontWeight:500,fontSize:13,margin:0}}>חוזי שכירות ({asset.leases.length})</p>
                  <button onClick={()=>setShowAddLease(v=>!v)} style={S.btnSec}>
                    <i className="ti ti-plus" aria-hidden="true"></i> הוסף חוזה
                  </button>
                </div>

                {showAddLease && (
                  <div style={{background:"var(--color-background-secondary)",borderRadius:"var(--border-radius-md)",padding:12,marginBottom:10}}>
                    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:8,marginBottom:8}}>
                      {leaseFields.map(([l,k,t])=>(<div key={k}><span style={S.lbl}>{l}</span><input type={t} value={newLease[k]||""} onChange={e=>setNewLease(p=>({...p,[k]:e.target.value}))} style={S.input}/></div>))}
                    </div>
                    <div style={{display:"flex",gap:8}}>
                      <button onClick={()=>addLease(asset.id)} style={S.btnPrimary}>שמור חוזה</button>
                      <button onClick={()=>setShowAddLease(false)} style={S.btnSec}>ביטול</button>
                    </div>
                  </div>
                )}

                {asset.leases.length===0 && <p style={{fontSize:12,color:"var(--color-text-tertiary)"}}>אין חוזים עדיין</p>}
                {asset.leases.map((l,i)=>{
                  const isEditing = editLease?.assetId===asset.id&&editLease?.idx===i;
                  const isActiveLease = l.start<=today&&l.end>=today;
                  const expiring = !isActiveLease&&l.end>=today&&daysBetween(today,l.end)<=60;
                  return isEditing ? (
                    <div key={i} style={{background:"var(--color-background-secondary)",borderRadius:"var(--border-radius-md)",padding:12,marginBottom:6}}>
                      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:8,marginBottom:8}}>
                        {leaseFields.map(([l2,k,t])=>(<div key={k}><span style={S.lbl}>{l2}</span><input type={t} value={editLease.data[k]||""} onChange={e=>setEditLease(p=>({...p,data:{...p.data,[k]:e.target.value}}))} style={S.input}/></div>))}
                      </div>
                      <div style={{display:"flex",gap:8}}>
                        <button onClick={saveEdit} style={S.btnPrimary}>שמור</button>
                        <button onClick={()=>setEditLease(null)} style={S.btnSec}>ביטול</button>
                      </div>
                    </div>
                  ) : (
                    <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 12px",background:"var(--color-background-secondary)",borderRadius:"var(--border-radius-md)",marginBottom:6,fontSize:13,borderRight:`3px solid ${isActiveLease?"var(--color-border-success)":expiring?"var(--color-border-warning)":"var(--color-border-tertiary)"}`}}>
                      <div style={{minWidth:0}}>
                        <div style={{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap"}}>
                          <span style={{fontWeight:500}}>{l.tenant}</span>
                          {isActiveLease && <span style={S.badge("success")}>פעיל</span>}
                          {expiring && <span style={S.badge("warning")}>פג בקרוב</span>}
                          {!isActiveLease&&!expiring&&l.end<today && <span style={S.badge("secondary")}>הסתיים</span>}
                          {!isActiveLease&&!expiring&&l.start>today && <span style={S.badge("info")}>עתידי</span>}
                        </div>
                        <div style={{fontSize:11,color:"var(--color-text-secondary)",marginTop:2}}>
                          {fmtDate(l.start)} — {fmtDate(l.end)} · {monthsBetween(l.start,l.end)} חודשים
                          {l.notes && <span style={{marginRight:8,fontStyle:"italic"}}>{l.notes}</span>}
                        </div>
                      </div>
                      <div style={{display:"flex",gap:8,alignItems:"center",flexShrink:0}}>
                        <div style={{textAlign:"left"}}>
                          <div style={{fontWeight:500}}>₪{l.rent.toLocaleString()}/חודש</div>
                          {isApt&&l.vaad>0 && <div style={{fontSize:11,color:"var(--color-text-secondary)"}}>ועד ₪{l.vaad}</div>}
                          <div style={{fontSize:11,color:"var(--color-text-secondary)"}}>₪{(l.rent/asset.area).toFixed(0)}/מ"ר</div>
                        </div>
                        <button onClick={()=>setEditLease({assetId:asset.id,idx:i,data:{...l}})} style={{...S.btnSec,padding:"4px 8px",fontSize:12}}>
                          <i className="ti ti-edit" aria-hidden="true"></i>
                        </button>
                        <button onClick={()=>deleteLease(asset.id,i)} style={S.btnDanger}>מחק</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function App() {
  const today = new Date().toISOString().slice(0,10);
  const [tab, setTab] = useState("דירות");
  const [apts, setApts] = useState(DEMO_APTS);
  const [storages, setStorages] = useState(DEMO_STORAGES);
  const [reportFrom, setReportFrom] = useState("2024-01-01");
  const [reportTo, setReportTo] = useState("2024-12-31");
  const [compareType, setCompareType] = useState("apt");
  const [compareArea, setCompareArea] = useState("all");
  const [aptCF, setAptCF] = useState([]);
  const [storCF, setStorCF] = useState([]);
  const [newFName, setNewFName] = useState({apt:"",stor:""});
  const [newFType, setNewFType] = useState({apt:"text",stor:"text"});

  const aptNumbers = useMemo(()=>apts.map(a=>a.number),[apts]);

  const updateCustomField = (assetId,fieldName,value,type) => {
    (type==="apt"?setApts:setStorages)(prev=>prev.map(a=>a.id===assetId?{...a,customFields:{...a.customFields,[fieldName]:value}}:a));
  };
  const addCF = type => {
    const name = newFName[type].trim(); if(!name) return;
    (type==="apt"?setAptCF:setStorCF)(prev=>[...prev,{name,type:newFType[type]}]);
    (type==="apt"?setApts:setStorages)(prev=>prev.map(a=>({...a,customFields:{...a.customFields,[name]:""}})));
    setNewFName(p=>({...p,[type]:""}));
  };
  const removeCF = (type,name) => (type==="apt"?setAptCF:setStorCF)(prev=>prev.filter(f=>f.name!==name));

  const aptOccAvg = useMemo(()=>apts.length?Math.round(apts.reduce((s,a)=>s+calcOcc(a,reportFrom,reportTo),0)/apts.length):0,[apts,reportFrom,reportTo]);
  const storOccAvg = useMemo(()=>storages.length?Math.round(storages.reduce((s,a)=>s+calcOcc(a,reportFrom,reportTo),0)/storages.length):0,[storages,reportFrom,reportTo]);
  const income = useMemo(()=>{
    const a=apts.reduce((s,a)=>{const l=getActive(a,today);return s+(l?l.rent+(l.vaad||0):0);},0);
    const st=storages.reduce((s,a)=>{const l=getActive(a,today);return s+(l?l.rent:0);},0);
    return {apt:a,stor:st,total:a+st};
  },[apts,storages,today]);

  const cmpAssets = useMemo(()=>{const src=compareType==="apt"?apts:storages;return compareArea==="all"?src:src.filter(a=>a.area===Number(compareArea));},[compareType,compareArea,apts,storages]);
  const cmpAreas = useMemo(()=>[...new Set((compareType==="apt"?apts:storages).map(a=>a.area))].sort((a,b)=>a-b),[compareType,apts,storages]);

  const tabStyle = active=>({padding:"7px 16px",background:active?"var(--color-background-primary)":"transparent",border:active?"0.5px solid var(--color-border-tertiary)":"0.5px solid transparent",borderBottom:active?"0.5px solid var(--color-background-primary)":"none",borderRadius:"var(--border-radius-md) var(--border-radius-md) 0 0",cursor:"pointer",fontSize:13,fontWeight:active?500:400,color:active?"var(--color-text-primary)":"var(--color-text-secondary)",marginBottom:-1});

  return (
    <div style={{fontFamily:"var(--font-sans)",direction:"rtl",padding:"1rem 0",maxWidth:860,margin:"0 auto"}}>
      <h2 style={{fontSize:20,fontWeight:500,margin:"0 0 0.25rem"}}>
        <i className="ti ti-building" style={{fontSize:20,marginLeft:8}} aria-hidden="true"></i>
        מערכת ניהול בניין
      </h2>
      <p style={{fontSize:13,color:"var(--color-text-secondary)",margin:"0 0 1.25rem"}}>נכון ל‑{fmtDate(today)}</p>

      <div style={{display:"flex",gap:4,marginBottom:"1.25rem",borderBottom:"0.5px solid var(--color-border-tertiary)"}}>
        {TABS.map(t=><button key={t} onClick={()=>setTab(t)} style={tabStyle(tab===t)}>{t}</button>)}
      </div>

      {tab==="דירות" && (
        <AssetManager assets={apts} setAssets={setApts} type="apt"
          aptNumbers={aptNumbers} reportFrom={reportFrom} reportTo={reportTo}
          customFieldDefs={aptCF} updateCustomField={updateCustomField}/>
      )}

      {tab==="מחסנים" && (
        <AssetManager assets={storages} setAssets={setStorages} type="stor"
          aptNumbers={aptNumbers} reportFrom={reportFrom} reportTo={reportTo}
          customFieldDefs={storCF} updateCustomField={updateCustomField}/>
      )}

      {tab==="ניתוח ודוחות" && (
        <div>
          <div style={{display:"flex",gap:10,marginBottom:16,alignItems:"flex-end",flexWrap:"wrap"}}>
            <div><span style={S.lbl}>מתאריך</span><input type="date" value={reportFrom} onChange={e=>setReportFrom(e.target.value)} style={{...S.input,width:140}}/></div>
            <div><span style={S.lbl}>עד תאריך</span><input type="date" value={reportTo} onChange={e=>setReportTo(e.target.value)} style={{...S.input,width:140}}/></div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:10,marginBottom:22}}>
            {[
              ["ti-home",`${apts.filter(a=>getActive(a,today)).length}/${apts.length}`,"דירות מושכרות"],
              ["ti-box",`${storages.filter(a=>getActive(a,today)).length}/${storages.length}`,"מחסנים מושכרים"],
              ["ti-chart-bar",`${aptOccAvg}%`,"תפוסה דירות"],
              ["ti-chart-bar",`${storOccAvg}%`,"תפוסה מחסנים"],
              ["ti-cash",`₪${income.apt.toLocaleString()}`,"הכנסה דירות"],
              ["ti-cash",`₪${income.stor.toLocaleString()}`,"הכנסה מחסנים"],
              ["ti-coins",`₪${income.total.toLocaleString()}`,"סה\"כ חודשי"],
            ].map(([icon,val,lbl])=>(
              <div key={lbl} style={S.metric}>
                <i className={`ti ${icon}`} style={{fontSize:16,color:"var(--color-text-secondary)",display:"block",marginBottom:4}} aria-hidden="true"></i>
                <div style={{fontSize:20,fontWeight:500}}>{val}</div>
                <div style={{fontSize:11,color:"var(--color-text-secondary)",marginTop:2}}>{lbl}</div>
              </div>
            ))}
          </div>

          {[{assets:apts,label:"דירות",isApt:true},{assets:storages,label:"מחסנים",isApt:false}].map(({assets,label,isApt})=>(
            <div key={label} style={{marginBottom:24}}>
              <p style={{fontWeight:500,fontSize:14,margin:"0 0 8px"}}>{label}</p>
              <div style={{overflowX:"auto"}}>
                <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
                  <thead><tr style={{borderBottom:"0.5px solid var(--color-border-secondary)"}}>
                    {[isApt?"דירה":"מחסן","קומה","שטח",isApt?"מרפסת":"דירה קשורה","תפוסה%","חודשים","שכ\"ד",isApt?"ועד":"","₪/מ\"ר"].filter(Boolean).map(h=>(
                      <th key={h} style={{padding:"6px 10px",textAlign:"right",fontWeight:500,color:"var(--color-text-secondary)",fontSize:12}}>{h}</th>
                    ))}
                  </tr></thead>
                  <tbody>
                    {assets.map((a,i)=>{
                      const active=getActive(a,today);
                      const occ=calcOcc(a,reportFrom,reportTo);
                      return <tr key={a.id} style={{borderBottom:"0.5px solid var(--color-border-tertiary)",background:i%2?"var(--color-background-secondary)":"transparent"}}>
                        <td style={{padding:"7px 10px",fontWeight:500}}>{a.number}</td>
                        <td style={{padding:"7px 10px"}}>{a.floor<0?`מרתף ${Math.abs(a.floor)}`:a.floor}</td>
                        <td style={{padding:"7px 10px"}}>{a.area} מ"ר</td>
                        <td style={{padding:"7px 10px"}}>{isApt?(a.balcony>0?`${a.balcony} מ"ר`:"—"):(a.linkedApt?`דירה ${a.linkedApt}`:"—")}</td>
                        <td style={{padding:"7px 10px"}}>
                          <div style={{display:"flex",alignItems:"center",gap:5}}>
                            <div style={{width:44,height:5,background:"var(--color-background-tertiary)",borderRadius:3,overflow:"hidden"}}>
                              <div style={{width:`${occ}%`,height:"100%",background:occ>=80?"var(--color-text-success)":occ>=50?"var(--color-text-warning)":"var(--color-text-danger)"}}></div>
                            </div>{occ}%
                          </div>
                        </td>
                        <td style={{padding:"7px 10px"}}>{totalMonths(a)}</td>
                        <td style={{padding:"7px 10px"}}>{active?`₪${active.rent.toLocaleString()}`:<span style={{color:"var(--color-text-tertiary)"}}>פנוי</span>}</td>
                        {isApt && <td style={{padding:"7px 10px"}}>{active?`₪${active.vaad}`:"—"}</td>}
                        <td style={{padding:"7px 10px"}}>{active?`₪${(active.rent/a.area).toFixed(0)}`:"—"}</td>
                      </tr>;
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab==="השוואה" && (
        <div>
          <div style={{display:"flex",gap:10,marginBottom:16,alignItems:"flex-end",flexWrap:"wrap"}}>
            <div><span style={S.lbl}>סוג נכס</span>
              <select value={compareType} onChange={e=>{setCompareType(e.target.value);setCompareArea("all");}} style={{...S.input,width:120,cursor:"pointer"}}>
                <option value="apt">דירות</option>
                <option value="stor">מחסנים</option>
              </select>
            </div>
            <div><span style={S.lbl}>שטח</span>
              <select value={compareArea} onChange={e=>setCompareArea(e.target.value)} style={{...S.input,width:130,cursor:"pointer"}}>
                <option value="all">כל הגדלים</option>
                {cmpAreas.map(a=><option key={a} value={a}>{a} מ"ר</option>)}
              </select>
            </div>
            <p style={{fontSize:12,color:"var(--color-text-secondary)",margin:"0 0 7px"}}>{cmpAssets.length} נכסים</p>
          </div>

          {cmpAssets.filter(a=>getActive(a,today)).length>0 && (
            <div style={{...S.card,background:"var(--color-background-secondary)",marginBottom:16}}>
              <p style={{fontWeight:500,fontSize:13,margin:"0 0 10px"}}>ממוצעים — {compareType==="apt"?"דירות":"מחסנים"}{compareArea!=="all"?` ${compareArea} מ"ר`:""}</p>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:8}}>
                {[
                  ["שכ\"ד ממוצע",`₪${Math.round(cmpAssets.filter(a=>getActive(a,today)).reduce((s,a)=>s+getActive(a,today).rent,0)/(cmpAssets.filter(a=>getActive(a,today)).length||1)).toLocaleString()}`],
                  ["₪/מ\"ר ממוצע",`₪${(cmpAssets.filter(a=>getActive(a,today)).reduce((s,a)=>s+getActive(a,today).rent/a.area,0)/(cmpAssets.filter(a=>getActive(a,today)).length||1)).toFixed(0)}`],
                  ["תפוסה ממוצעת",`${Math.round(cmpAssets.reduce((s,a)=>s+calcOcc(a,reportFrom,reportTo),0)/(cmpAssets.length||1))}%`],
                ].map(([l,v])=>(
                  <div key={l} style={S.metric}><div style={{fontSize:18,fontWeight:500}}>{v}</div><div style={{fontSize:11,color:"var(--color-text-secondary)",marginTop:2}}>{l}</div></div>
                ))}
              </div>
            </div>
          )}

          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:12}}>
            {cmpAssets.map(a=>{
              const active=getActive(a,today);
              const occ=calcOcc(a,reportFrom,reportTo);
              const isApt=compareType==="apt";
              return (
                <div key={a.id} style={{...S.card,margin:0}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                    <span style={{fontWeight:500,fontSize:14}}>{isApt?"דירה":"מחסן"} {a.number}</span>
                    {active?<span style={S.badge("success")}>מושכר</span>:<span style={S.badge("warning")}>פנוי</span>}
                  </div>
                  {active && <div style={{fontSize:12,color:"var(--color-text-secondary)",marginBottom:8}}>{active.tenant}</div>}
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:5}}>
                    {[
                      ["קומה",a.floor<0?`מרתף ${Math.abs(a.floor)}`:a.floor],
                      ["שטח",`${a.area} מ"ר`],
                      ...(isApt&&a.balcony>0?[["מרפסת",`${a.balcony} מ"ר`]]:[]),
                      ...(!isApt&&a.linkedApt?[["דירה קשורה",a.linkedApt]]:[]),
                      ["שכ\"ד",active?`₪${active.rent.toLocaleString()}`:"פנוי"],
                      ["₪/מ\"ר",active?`₪${(active.rent/a.area).toFixed(0)}`:"—"],
                      ...(isApt&&active&&active.vaad?[["ועד",`₪${active.vaad}`]]:[]),
                      ["תפוסה",`${occ}%`],
                      ["חוזים",a.leases.length],
                      ["חודשים מושכר",totalMonths(a)],
                    ].map(([l,v])=>(
                      <div key={l} style={{padding:"5px 8px",background:"var(--color-background-secondary)",borderRadius:"var(--border-radius-md)"}}>
                        <div style={{fontSize:10,color:"var(--color-text-secondary)"}}>{l}</div>
                        <div style={{fontSize:13,fontWeight:500}}>{v}</div>
                      </div>
                    ))}
                  </div>
                  {active && (
                    <div style={{marginTop:8,paddingTop:8,borderTop:"0.5px solid var(--color-border-tertiary)",fontSize:11,color:"var(--color-text-secondary)"}}>
                      {fmtDate(active.start)} — {fmtDate(active.end)} · {monthsBetween(active.start,active.end)} חודשים
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {tab==="הגדרות" && (
        <div>
          {[{type:"apt",label:"דירות",icon:"ti-home"},{type:"stor",label:"מחסנים",icon:"ti-box"}].map(({type,label,icon})=>(
            <div key={type} style={{...S.card,marginBottom:16}}>
              <p style={{fontWeight:500,fontSize:14,margin:"0 0 4px"}}>
                <i className={`ti ${icon}`} style={{marginLeft:6}} aria-hidden="true"></i>שדות מותאמים — {label}
              </p>
              <p style={{fontSize:12,color:"var(--color-text-secondary)",margin:"0 0 12px"}}>יופיעו בכל הרשומות תחת סוג זה</p>
              <div style={{display:"flex",gap:8,alignItems:"flex-end",flexWrap:"wrap",marginBottom:10}}>
                <div><span style={S.lbl}>שם השדה</span>
                  <input value={newFName[type]} onChange={e=>setNewFName(p=>({...p,[type]:e.target.value}))} placeholder="לדוג': חניה, מיזוג..." style={{...S.input,width:160}}/>
                </div>
                <div><span style={S.lbl}>סוג</span>
                  <select value={newFType[type]} onChange={e=>setNewFType(p=>({...p,[type]:e.target.value}))} style={{...S.input,width:100,cursor:"pointer"}}>
                    <option value="text">טקסט</option>
                    <option value="number">מספר</option>
                    <option value="checkbox">כן/לא</option>
                  </select>
                </div>
                <button onClick={()=>addCF(type)} style={S.btnSec}><i className="ti ti-plus" aria-hidden="true"></i> הוסף</button>
              </div>
              <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                {(type==="apt"?aptCF:storCF).map(f=>(
                  <span key={f.name} style={{...S.badge("secondary"),display:"inline-flex",alignItems:"center",gap:6,fontSize:12}}>
                    {f.name} ({f.type})
                    <button onClick={()=>removeCF(type,f.name)} style={{background:"none",border:"none",cursor:"pointer",padding:0,fontSize:11,color:"var(--color-text-danger)"}}>✕</button>
                  </span>
                ))}
                {(type==="apt"?aptCF:storCF).length===0 && <span style={{fontSize:12,color:"var(--color-text-tertiary)"}}>אין שדות עדיין</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

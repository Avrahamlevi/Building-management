<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>מערכת ניהול בניין</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.10.0/dist/tabler-icons.min.css"/>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:system-ui,-apple-system,Arial,sans-serif;background:#f8f7f4;color:#1a1a18;direction:rtl;font-size:14px}
  #root{max-width:900px;margin:0 auto;padding:1.5rem 1rem 4rem}
  input,select,button{font-family:inherit;font-size:13px}
  input[type=text],input[type=number],input[type=date],select{
    padding:6px 10px;border:1px solid #ccc;border-radius:8px;background:#fff;
    color:#1a1a18;width:100%;outline:none}
  input:focus,select:focus{border-color:#6b7fd7}
  button{cursor:pointer;border-radius:8px;border:1px solid #ccc;background:#fff;padding:6px 14px;transition:background .15s}
  button:hover{background:#f0f0ec}
  .btn-primary{background:#e6f1fb;color:#185fa5;border-color:#b5d4f4;font-weight:500}
  .btn-primary:hover{background:#b5d4f4}
  .btn-danger{color:#a32d2d;border-color:#f7c1c1;background:#fff}
  .btn-danger:hover{background:#fcebeb}
  .btn-edit{color:#5f5e5a;border-color:#d3d1c7}
  .card{background:#fff;border:1px solid #e0dfd8;border-radius:12px;padding:1rem 1.25rem;margin-bottom:12px}
  .card-info{border-color:#b5d4f4}
  .badge{font-size:11px;padding:2px 8px;border-radius:20px;display:inline-block;white-space:nowrap;font-weight:400}
  .badge-secondary{background:#f1efe8;color:#5f5e5a}
  .badge-success{background:#eaf3de;color:#3b6d11}
  .badge-warning{background:#faeeda;color:#854f0b}
  .badge-info{background:#e6f1fb;color:#185fa5}
  .badge-danger{background:#fcebeb;color:#a32d2d}
  .metric{background:#f8f7f4;border-radius:8px;padding:12px 16px;text-align:center}
  .metric .val{font-size:20px;font-weight:500;margin:4px 0 2px}
  .metric .lbl{font-size:11px;color:#888780}
  .lbl{font-size:12px;color:#888780;margin-bottom:3px;display:block}
  .grid-metrics{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px;margin-bottom:20px}
  .grid-compare{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px}
  .grid-form{display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:10px;margin-bottom:10px}
  .grid-fields{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:8px;margin-bottom:12px}
  .row{display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap;margin-bottom:12px}
  .row-between{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}
  table{width:100%;border-collapse:collapse;font-size:13px}
  th{padding:6px 10px;text-align:right;font-weight:500;color:#888780;font-size:12px;border-bottom:1px solid #d3d1c7}
  td{padding:7px 10px;border-bottom:1px solid #e0dfd8}
  tr:nth-child(even) td{background:#f8f7f4}
  .tabs{display:flex;gap:4px;margin-bottom:1.25rem;border-bottom:1px solid #d3d1c7}
  .tab{padding:7px 14px;background:transparent;border:1px solid transparent;border-bottom:none;border-radius:8px 8px 0 0;cursor:pointer;font-size:13px;color:#888780;margin-bottom:-1px}
  .tab.active{background:#fff;border-color:#d3d1c7;color:#1a1a18;font-weight:500;border-bottom-color:#fff}
  .asset-card{cursor:pointer;transition:border-color .15s}
  .asset-card:hover{border-color:#b5d4f4}
  .asset-card.selected{border-color:#378add}
  .asset-num{width:42px;height:42px;border-radius:8px;background:#f1efe8;display:flex;align-items:center;justify-content:center;font-weight:500;font-size:12px;flex-shrink:0;text-align:center;line-height:1.2}
  .lease-row{display:flex;justify-content:space-between;align-items:center;padding:8px 12px;background:#f8f7f4;border-radius:8px;margin-bottom:6px;font-size:13px;border-right:3px solid #d3d1c7}
  .lease-row.active{border-right-color:#639922}
  .lease-row.expiring{border-right-color:#ba7517}
  .occ-bar{width:44px;height:5px;background:#e0dfd8;border-radius:3px;overflow:hidden;display:inline-block;vertical-align:middle;margin-left:4px}
  .occ-fill{height:100%}
  .section-title{font-weight:500;font-size:14px;margin:0 0 8px}
  .empty-msg{font-size:12px;color:#b4b2a9;padding:8px 0}
  .avg-card{background:#f8f7f4;border-radius:8px;padding:1rem 1.25rem;margin-bottom:16px;border:1px solid #e0dfd8}
  .flex-gap{display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap}
  .ml-auto{margin-right:auto}
  .tag{display:inline-flex;align-items:center;gap:6px;font-size:12px;padding:2px 8px;border-radius:20px;background:#f1efe8;color:#5f5e5a}
  .tag-remove{background:none;border:none;cursor:pointer;padding:0;font-size:11px;color:#a32d2d;line-height:1}
  .text-muted{color:#888780}
  .text-small{font-size:11px}
  .text-danger{color:#a32d2d}
  .mr-auto{margin-right:auto}
  .overflow-x{overflow-x:auto}
  .mb-1{margin-bottom:8px}
  .mb-2{margin-bottom:16px}
  .mb-3{margin-bottom:24px}
  .mt-1{margin-top:8px}
  .p-2{padding:12px}
  .border-top{border-top:1px solid #e0dfd8;padding-top:12px;margin-top:14px}
  .compare-cell{padding:5px 8px;background:#f8f7f4;border-radius:8px}
  .compare-grid{display:grid;grid-template-columns:1fr 1fr;gap:5px}
  .compare-lbl{font-size:10px;color:#888780}
  .compare-val{font-size:13px;font-weight:500}
  .filter-row{display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap;align-items:flex-end}
  h2{font-size:20px;font-weight:500;margin-bottom:4px}
  .subtitle{font-size:13px;color:#888780;margin-bottom:1.25rem}
  .form-card{background:#e6f1fb1a;border:1px solid #b5d4f4;border-radius:12px;padding:1rem 1.25rem;margin-bottom:16px}
  .add-lease-form{background:#f8f7f4;border-radius:8px;padding:12px;margin-bottom:10px}
  .settings-desc{font-size:12px;color:#888780;margin:0 0 12px}
  .no-fields{font-size:12px;color:#b4b2a9}
  .icon-sm{font-size:16px;vertical-align:-2px;margin-left:6px}
</style>
</head>
<body>
<div id="root"></div>

<script src="https://cdn.jsdelivr.net/npm/react@18/umd/react.production.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/react-dom@18/umd/react-dom.production.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@babel/standalone@7/babel.min.js"></script>
<script type="text/babel">
const { useState, useMemo } = React;

const DEMO_APTS = [
  {id:"a1",number:"101",floor:1,area:65,balcony:8,leases:[{tenant:"כהן משפחה",start:"2023-01-01",end:"2024-12-31",rent:4200,vaad:350,notes:""}],customFields:{}},
  {id:"a2",number:"102",floor:1,area:40,balcony:5,leases:[{tenant:"לוי דוד",start:"2023-06-01",end:"2025-05-31",rent:2800,vaad:250,notes:""}],customFields:{}},
  {id:"a3",number:"201",floor:2,area:65,balcony:8,leases:[{tenant:"ישראלי רון",start:"2024-01-01",end:"2024-06-30",rent:4400,vaad:350,notes:""},{tenant:"מזרחי אבי",start:"2024-09-01",end:"2026-08-31",rent:4600,vaad:360,notes:""}],customFields:{}},
  {id:"a4",number:"202",floor:2,area:40,balcony:0,leases:[],customFields:{}},
  {id:"a5",number:"301",floor:3,area:85,balcony:12,leases:[{tenant:"פרידמן עמית",start:"2022-03-01",end:"2025-02-28",rent:5500,vaad:420,notes:""}],customFields:{}},
  {id:"a6",number:"302",floor:3,area:40,balcony:5,leases:[],customFields:{}},
];
const DEMO_STORAGES = [
  {id:"s1",number:"מ-1",linkedApt:"101",floor:-1,area:6,leases:[{tenant:"כהן משפחה",start:"2023-01-01",end:"2024-12-31",rent:180,notes:""}],customFields:{}},
  {id:"s2",number:"מ-2",linkedApt:"102",floor:-1,area:5,leases:[],customFields:{}},
  {id:"s3",number:"מ-3",linkedApt:"",floor:-1,area:8,leases:[{tenant:"גולדברג שרה",start:"2023-09-01",end:"2025-08-31",rent:220,notes:"שוכר חיצוני"}],customFields:{}},
  {id:"s4",number:"מ-4",linkedApt:"202",floor:-1,area:6,leases:[],customFields:{}},
  {id:"s5",number:"מ-5",linkedApt:"301",floor:-1,area:10,leases:[{tenant:"פרידמן עמית",start:"2022-03-01",end:"2025-02-28",rent:300,notes:""}],customFields:{}},
];

const TABS = ["דירות","מחסנים","ניתוח ודוחות","השוואה"];
const APT_FLOORS = [0,1,2,3,4,5,6,7];
const STOR_FLOORS = [-1,-2];
const EMPTY_LEASE = {tenant:"",start:"",end:"",rent:"",vaad:"",notes:""};

const fmtDate = d => d ? new Date(d).toLocaleDateString("he-IL") : "—";
const fmtFloor = f => f===0 ? "קומת קרקע" : f<0 ? `קומה מינוס ${Math.abs(f)}` : `קומה ${f}`;
const daysBetween = (a,b) => Math.max(0,Math.round((new Date(b)-new Date(a))/86400000));
const monthsBetween = (a,b) => { const d1=new Date(a),d2=new Date(b); return Math.max(0,(d2.getFullYear()-d1.getFullYear())*12+d2.getMonth()-d1.getMonth()); };
const calcOcc = (asset,from,to) => { const tot=daysBetween(from,to); if(!tot) return 0; let occ=0; for(const l of asset.leases){const s=l.start>from?l.start:from,e=l.end<to?l.end:to; if(s<e)occ+=daysBetween(s,e);} return Math.min(100,Math.round(occ/tot*100)); };
const getActive = (asset,date) => asset.leases.find(l=>l.start<=date&&l.end>=date)||null;
const totalMonths = asset => asset.leases.reduce((s,l)=>s+monthsBetween(l.start,l.end),0);

function OccBar({pct}) {
  const color = pct>=80?"#639922":pct>=50?"#ba7517":"#a32d2d";
  return <span className="occ-bar"><span className="occ-fill" style={{width:`${pct}%`,background:color}}></span></span>;
}

function Badge({type,children}) { return <span className={`badge badge-${type}`}>{children}</span>; }

function LeaseStatus({l,today}) {
  const isActive = l.start<=today&&l.end>=today;
  const expiring = !isActive&&l.end>=today&&daysBetween(today,l.end)<=60;
  const ended = l.end<today;
  const future = l.start>today;
  if(isActive) return <Badge type="success">פעיל</Badge>;
  if(expiring) return <Badge type="warning">פג בקרוב</Badge>;
  if(ended) return <Badge type="secondary">הסתיים</Badge>;
  if(future) return <Badge type="info">עתידי</Badge>;
  return null;
}

function AssetManager({assets,setAssets,type,aptNumbers,reportFrom,reportTo,customFieldDefs,updateCustomField}) {
  const today = new Date().toISOString().slice(0,10);
  const isApt = type==="apt";
  const typeLabel = isApt?"דירה":"מחסן";
  const floorOptions = isApt?APT_FLOORS:STOR_FLOORS;

  const [filterArea,setFilterArea] = useState("all");
  const [filterFloor,setFilterFloor] = useState("all");
  const [selected,setSelected] = useState(null);
  const [showAdd,setShowAdd] = useState(false);
  const [showAddLease,setShowAddLease] = useState(false);
  const [newAsset,setNewAsset] = useState({number:"",floor:"",area:"",balcony:"",linkedApt:""});
  const [newLease,setNewLease] = useState(EMPTY_LEASE);
  const [editLease,setEditLease] = useState(null);

  const uniqueAreas = useMemo(()=>[...new Set(assets.map(a=>a.area))].sort((a,b)=>a-b),[assets]);
  const filtered = useMemo(()=>assets.filter(a=>(filterArea==="all"||a.area===Number(filterArea))&&(filterFloor==="all"||a.floor===Number(filterFloor))),[assets,filterArea,filterFloor]);

  const addAsset = () => {
    if(!newAsset.number||newAsset.floor===""||!newAsset.area) return;
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
      <div className="filter-row">
        <div style={{minWidth:100}}>
          <span className="lbl">שטח</span>
          <select value={filterArea} onChange={e=>setFilterArea(e.target.value)} style={{width:110}}>
            <option value="all">הכל</option>
            {uniqueAreas.map(a=><option key={a} value={a}>{a} מ"ר</option>)}
          </select>
        </div>
        <div style={{minWidth:130}}>
          <span className="lbl">קומה</span>
          <select value={filterFloor} onChange={e=>setFilterFloor(e.target.value)} style={{width:140}}>
            <option value="all">הכל</option>
            {floorOptions.map(f=><option key={f} value={f}>{fmtFloor(f)}</option>)}
          </select>
        </div>
        <div className="ml-auto" style={{paddingBottom:1}}>
          <button className="btn-primary" onClick={()=>setShowAdd(v=>!v)}>
            <i className="ti ti-plus icon-sm"></i> הוסף {typeLabel}
          </button>
        </div>
      </div>

      {showAdd && (
        <div className="form-card mb-2">
          <p style={{fontWeight:500,fontSize:14,marginBottom:12}}>{typeLabel} חדש</p>
          <div className="grid-form">
            <div><span className="lbl">מס' {typeLabel}</span><input value={newAsset.number} onChange={e=>setNewAsset(p=>({...p,number:e.target.value}))}/></div>
            <div><span className="lbl">קומה</span>
              <select value={newAsset.floor} onChange={e=>setNewAsset(p=>({...p,floor:e.target.value}))}>
                <option value="">בחר</option>
                {floorOptions.map(f=><option key={f} value={f}>{fmtFloor(f)}</option>)}
              </select>
            </div>
            <div><span className="lbl">שטח מ"ר</span><input type="number" value={newAsset.area} onChange={e=>setNewAsset(p=>({...p,area:e.target.value}))}/></div>
            {isApt && <div><span className="lbl">מרפסת מ"ר</span><input type="number" value={newAsset.balcony} onChange={e=>setNewAsset(p=>({...p,balcony:e.target.value}))}/></div>}
            {!isApt && <div><span className="lbl">קשור לדירה</span>
              <select value={newAsset.linkedApt} onChange={e=>setNewAsset(p=>({...p,linkedApt:e.target.value}))}>
                <option value="">ללא</option>
                {aptNumbers.map(n=><option key={n} value={n}>דירה {n}</option>)}
              </select>
            </div>}
          </div>
          <div style={{display:"flex",gap:8}}>
            <button className="btn-primary" onClick={addAsset}>שמור</button>
            <button onClick={()=>setShowAdd(false)}>ביטול</button>
          </div>
        </div>
      )}

      {filtered.map(asset => {
        const active = getActive(asset,today);
        const occ = calcOcc(asset,reportFrom,reportTo);
        const isSelected = selected?.id===asset.id;
        const isActiveLease = (l) => l.start<=today&&l.end>=today;
        const isExpiringLease = (l) => !isActiveLease(l)&&l.end>=today&&daysBetween(today,l.end)<=60;
        return (
          <div key={asset.id} className={`card asset-card${isSelected?" selected":""}`}
            onClick={()=>setSelected(s=>s?.id===asset.id?null:asset)}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div className="asset-num">{asset.number}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap",marginBottom:3}}>
                  <span style={{fontWeight:500,fontSize:14}}>{typeLabel} {asset.number}</span>
                  <Badge type="secondary">{fmtFloor(asset.floor)}</Badge>
                  <Badge type="secondary">{asset.area} מ"ר</Badge>
                  {isApt&&asset.balcony>0 && <Badge type="secondary">מרפסת {asset.balcony} מ"ר</Badge>}
                  {!isApt&&asset.linkedApt && <Badge type="secondary">דירה {asset.linkedApt}</Badge>}
                  {active ? <Badge type="success">מושכר</Badge> : <Badge type="warning">פנוי</Badge>}
                </div>
                <div className="text-small text-muted">
                  {active ? `${active.tenant} | ₪${active.rent.toLocaleString()}${isApt&&active.vaad?` + ועד ₪${active.vaad}`:""}` : "אין חוזה פעיל"}
                  {" · "}תפוסה: {occ}% · סה"כ {totalMonths(asset)} חודשים מושכר
                </div>
              </div>
              <div style={{display:"flex",gap:8,alignItems:"center",flexShrink:0}}>
                {active && <span className="text-muted" style={{fontSize:13}}>₪{(active.rent/asset.area).toFixed(0)}/מ"ר</span>}
                <button className="btn-danger" onClick={e=>{e.stopPropagation();if(confirm(`למחוק ${typeLabel} ${asset.number}?`)) deleteAsset(asset.id);}}>מחק</button>
              </div>
            </div>

            {isSelected && (
              <div className="border-top" onClick={e=>e.stopPropagation()}>
                {customFieldDefs.length>0 && (
                  <div className="grid-fields">
                    {customFieldDefs.map(f=>(
                      <div key={f.name}><span className="lbl">{f.name}</span>
                        {f.type==="checkbox"
                          ? <input type="checkbox" checked={!!asset.customFields[f.name]} onChange={e=>updateCustomField(asset.id,f.name,e.target.checked,type)}/>
                          : <input type={f.type} value={asset.customFields[f.name]||""} onChange={e=>updateCustomField(asset.id,f.name,e.target.value,type)}/>}
                      </div>
                    ))}
                  </div>
                )}

                <div className="row-between">
                  <span style={{fontWeight:500,fontSize:13}}>חוזי שכירות ({asset.leases.length})</span>
                  <button onClick={()=>setShowAddLease(v=>!v)}>
                    <i className="ti ti-plus icon-sm"></i> הוסף חוזה
                  </button>
                </div>

                {showAddLease && (
                  <div className="add-lease-form mb-1">
                    <div className="grid-form">
                      {leaseFields.map(([l,k,t])=>(
                        <div key={k}><span className="lbl">{l}</span>
                          <input type={t} value={newLease[k]||""} onChange={e=>setNewLease(p=>({...p,[k]:e.target.value}))}/>
                        </div>
                      ))}
                    </div>
                    <div style={{display:"flex",gap:8,marginTop:8}}>
                      <button className="btn-primary" onClick={()=>addLease(asset.id)}>שמור חוזה</button>
                      <button onClick={()=>setShowAddLease(false)}>ביטול</button>
                    </div>
                  </div>
                )}

                {asset.leases.length===0 && <p className="empty-msg">אין חוזים עדיין</p>}
                {asset.leases.map((l,i)=>{
                  const editing = editLease?.assetId===asset.id&&editLease?.idx===i;
                  return editing ? (
                    <div key={i} className="add-lease-form mb-1">
                      <div className="grid-form">
                        {leaseFields.map(([l2,k,t])=>(
                          <div key={k}><span className="lbl">{l2}</span>
                            <input type={t} value={editLease.data[k]||""} onChange={e=>setEditLease(p=>({...p,data:{...p.data,[k]:e.target.value}}))}/>
                          </div>
                        ))}
                      </div>
                      <div style={{display:"flex",gap:8,marginTop:8}}>
                        <button className="btn-primary" onClick={saveEdit}>שמור שינויים</button>
                        <button onClick={()=>setEditLease(null)}>ביטול</button>
                      </div>
                    </div>
                  ) : (
                    <div key={i} className={`lease-row${isActiveLease(l)?" active":isExpiringLease(l)?" expiring":""}`}>
                      <div>
                        <div style={{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap",marginBottom:2}}>
                          <span style={{fontWeight:500}}>{l.tenant}</span>
                          <LeaseStatus l={l} today={today}/>
                        </div>
                        <div className="text-small text-muted">
                          {fmtDate(l.start)} — {fmtDate(l.end)} · {monthsBetween(l.start,l.end)} חודשים
                          {l.notes && <span style={{marginRight:8,fontStyle:"italic"}}>{l.notes}</span>}
                        </div>
                      </div>
                      <div style={{display:"flex",gap:8,alignItems:"center",flexShrink:0}}>
                        <div style={{textAlign:"left"}}>
                          <div style={{fontWeight:500}}>₪{l.rent.toLocaleString()}/חודש</div>
                          {isApt&&l.vaad>0 && <div className="text-small text-muted">ועד ₪{l.vaad}</div>}
                          <div className="text-small text-muted">₪{(l.rent/asset.area).toFixed(0)}/מ"ר</div>
                        </div>
                        <button className="btn-edit" onClick={()=>setEditLease({assetId:asset.id,idx:i,data:{...l}})}>
                          <i className="ti ti-edit"></i>
                        </button>
                        <button className="btn-danger" onClick={()=>{if(confirm("למחוק חוזה זה?")) deleteLease(asset.id,i);}}>מחק</button>
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

function App() {
  const today = new Date().toISOString().slice(0,10);
  const [tab,setTab] = useState("דירות");
  const [apts,setApts] = useState(DEMO_APTS);
  const [storages,setStorages] = useState(DEMO_STORAGES);
  const [reportFrom,setReportFrom] = useState("2024-01-01");
  const [reportTo,setReportTo] = useState("2024-12-31");
  const [compareType,setCompareType] = useState("apt");
  const [compareArea,setCompareArea] = useState("all");
  const aptNumbers = useMemo(()=>apts.map(a=>a.number),[apts]);
  const updateCustomField = (id,fn,val,type) => (type==="apt"?setApts:setStorages)(prev=>prev.map(a=>a.id===id?{...a,customFields:{...a.customFields,[fn]:val}}:a));

  const aptOccAvg = useMemo(()=>apts.length?Math.round(apts.reduce((s,a)=>s+calcOcc(a,reportFrom,reportTo),0)/apts.length):0,[apts,reportFrom,reportTo]);
  const storOccAvg = useMemo(()=>storages.length?Math.round(storages.reduce((s,a)=>s+calcOcc(a,reportFrom,reportTo),0)/storages.length):0,[storages,reportFrom,reportTo]);
  const income = useMemo(()=>{
    const a=apts.reduce((s,a)=>{const l=getActive(a,today);return s+(l?l.rent+(l.vaad||0):0);},0);
    const st=storages.reduce((s,a)=>{const l=getActive(a,today);return s+(l?l.rent:0);},0);
    return {apt:a,stor:st,total:a+st};
  },[apts,storages,today]);

  const cmpAssets = useMemo(()=>{const src=compareType==="apt"?apts:storages;return compareArea==="all"?src:src.filter(a=>a.area===Number(compareArea));},[compareType,compareArea,apts,storages]);
  const cmpAreas = useMemo(()=>[...new Set((compareType==="apt"?apts:storages).map(a=>a.area))].sort((a,b)=>a-b),[compareType,apts,storages]);

  return (
    <div>
      <h2><i className="ti ti-building icon-sm"></i>מערכת ניהול בניין</h2>
      <p className="subtitle">נכון ל‑{fmtDate(today)}</p>

      <div className="tabs">
        {TABS.map(t=><button key={t} className={`tab${tab===t?" active":""}`} onClick={()=>setTab(t)}>{t}</button>)}
      </div>

      {tab==="דירות" && <AssetManager assets={apts} setAssets={setApts} type="apt" aptNumbers={aptNumbers} reportFrom={reportFrom} reportTo={reportTo} customFieldDefs={[]} updateCustomField={updateCustomField}/>}
      {tab==="מחסנים" && <AssetManager assets={storages} setAssets={setStorages} type="stor" aptNumbers={aptNumbers} reportFrom={reportFrom} reportTo={reportTo} customFieldDefs={[]} updateCustomField={updateCustomField}/>}

      {tab==="ניתוח ודוחות" && (
        <div>
          <div className="flex-gap mb-2">
            <div><span className="lbl">מתאריך</span><input type="date" value={reportFrom} onChange={e=>setReportFrom(e.target.value)} style={{width:140}}/></div>
            <div><span className="lbl">עד תאריך</span><input type="date" value={reportTo} onChange={e=>setReportTo(e.target.value)} style={{width:140}}/></div>
          </div>
          <div className="grid-metrics">
            {[
              ["ti-home",`${apts.filter(a=>getActive(a,today)).length}/${apts.length}`,"דירות מושכרות"],
              ["ti-box",`${storages.filter(a=>getActive(a,today)).length}/${storages.length}`,"מחסנים מושכרים"],
              ["ti-chart-bar",`${aptOccAvg}%`,"תפוסה דירות"],
              ["ti-chart-bar",`${storOccAvg}%`,"תפוסה מחסנים"],
              ["ti-cash",`₪${income.apt.toLocaleString()}`,"הכנסה דירות"],
              ["ti-cash",`₪${income.stor.toLocaleString()}`,"הכנסה מחסנים"],
              ["ti-coins",`₪${income.total.toLocaleString()}`,'סה"כ חודשי'],
            ].map(([icon,val,lbl])=>(
              <div key={lbl} className="metric">
                <i className={`ti ${icon}`} style={{fontSize:16,color:"#888780",display:"block"}}></i>
                <div className="val">{val}</div>
                <div className="lbl" style={{marginBottom:0}}>{lbl}</div>
              </div>
            ))}
          </div>

          {[{assets:apts,label:"דירות",isApt:true},{assets:storages,label:"מחסנים",isApt:false}].map(({assets,label,isApt})=>(
            <div key={label} className="mb-3">
              <p className="section-title">{label}</p>
              <div className="overflow-x">
                <table>
                  <thead><tr>
                    {[isApt?"דירה":"מחסן","קומה",'שטח',isApt?"מרפסת":"דירה קשורה","תפוסה%","חודשים",'שכ"ד',isApt?"ועד":"",`₪/מ"ר`].filter(h=>h!=="").map(h=>(
                      <th key={h}>{h}</th>
                    ))}
                  </tr></thead>
                  <tbody>
                    {assets.map(a=>{
                      const active=getActive(a,today);
                      const occ=calcOcc(a,reportFrom,reportTo);
                      return <tr key={a.id}>
                        <td style={{fontWeight:500}}>{a.number}</td>
                        <td>{fmtFloor(a.floor)}</td>
                        <td>{a.area} מ"ר</td>
                        <td>{isApt?(a.balcony>0?`${a.balcony} מ"ר`:"—"):(a.linkedApt?`דירה ${a.linkedApt}`:"—")}</td>
                        <td><OccBar pct={occ}/> {occ}%</td>
                        <td>{totalMonths(a)}</td>
                        <td>{active?`₪${active.rent.toLocaleString()}`:<span className="text-muted">פנוי</span>}</td>
                        {isApt&&<td>{active?`₪${active.vaad}`:"—"}</td>}
                        <td>{active?`₪${(active.rent/a.area).toFixed(0)}`:"—"}</td>
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
          <div className="flex-gap mb-2">
            <div><span className="lbl">סוג נכס</span>
              <select value={compareType} onChange={e=>{setCompareType(e.target.value);setCompareArea("all");}} style={{width:120}}>
                <option value="apt">דירות</option>
                <option value="stor">מחסנים</option>
              </select>
            </div>
            <div><span className="lbl">שטח</span>
              <select value={compareArea} onChange={e=>setCompareArea(e.target.value)} style={{width:130}}>
                <option value="all">כל הגדלים</option>
                {cmpAreas.map(a=><option key={a} value={a}>{a} מ"ר</option>)}
              </select>
            </div>
            <span className="text-muted text-small" style={{alignSelf:"flex-end",paddingBottom:8}}>{cmpAssets.length} נכסים</span>
          </div>

          {cmpAssets.filter(a=>getActive(a,today)).length>0 && (
            <div className="avg-card mb-2">
              <p style={{fontWeight:500,fontSize:13,marginBottom:10}}>ממוצעים — {compareType==="apt"?"דירות":"מחסנים"}{compareArea!=="all"?` ${compareArea} מ"ר`:""}</p>
              <div className="grid-metrics">
                {(()=>{
                  const active=cmpAssets.filter(a=>getActive(a,today));
                  const n=active.length||1;
                  return [
                    [`שכ"ד ממוצע`,`₪${Math.round(active.reduce((s,a)=>s+getActive(a,today).rent,0)/n).toLocaleString()}`],
                    [`₪/מ"ר ממוצע`,`₪${(active.reduce((s,a)=>s+getActive(a,today).rent/a.area,0)/n).toFixed(0)}`],
                    ["תפוסה ממוצעת",`${Math.round(cmpAssets.reduce((s,a)=>s+calcOcc(a,reportFrom,reportTo),0)/(cmpAssets.length||1))}%`],
                  ];
                })().map(([l,v])=>(
                  <div key={l} className="metric"><div className="val">{v}</div><div className="lbl" style={{marginBottom:0}}>{l}</div></div>
                ))}
              </div>
            </div>
          )}

          <div className="grid-compare">
            {cmpAssets.map(a=>{
              const active=getActive(a,today);
              const occ=calcOcc(a,reportFrom,reportTo);
              const isApt=compareType==="apt";
              const rows=[
                ["קומה",fmtFloor(a.floor)],
                ["שטח",`${a.area} מ"ר`],
                ...(isApt&&a.balcony>0?[["מרפסת",`${a.balcony} מ"ר`]]:[]),
                ...(!isApt&&a.linkedApt?[["דירה קשורה",a.linkedApt]]:[]),
                [`שכ"ד`,active?`₪${active.rent.toLocaleString()}`:"פנוי"],
                [`₪/מ"ר`,active?`₪${(active.rent/a.area).toFixed(0)}`:"—"],
                ...(isApt&&active&&active.vaad?[["ועד",`₪${active.vaad}`]]:[]),
                ["תפוסה",`${occ}%`],
                ["חוזים",a.leases.length],
                ["חודשים מושכר",totalMonths(a)],
              ];
              return (
                <div key={a.id} className="card">
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                    <span style={{fontWeight:500,fontSize:14}}>{isApt?"דירה":"מחסן"} {a.number}</span>
                    {active?<Badge type="success">מושכר</Badge>:<Badge type="warning">פנוי</Badge>}
                  </div>
                  {active&&<div className="text-small text-muted" style={{marginBottom:8}}>{active.tenant}</div>}
                  <div className="compare-grid">
                    {rows.map(([l,v])=>(
                      <div key={l} className="compare-cell">
                        <div className="compare-lbl">{l}</div>
                        <div className="compare-val">{v}</div>
                      </div>
                    ))}
                  </div>
                  {active&&<div className="text-small text-muted" style={{marginTop:8,paddingTop:8,borderTop:"1px solid #e0dfd8"}}>{fmtDate(active.start)} — {fmtDate(active.end)} · {monthsBetween(active.start,active.end)} חודשים</div>}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
</script>
</body>
</html>

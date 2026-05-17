import { useState, useMemo } from "react";

const INITIAL_APARTMENTS = [
  { id: 1, number: "101", floor: 1, area: 65, balcony: 8, storage: "מ-1", leases: [{ tenant: "כהן משפחה", start: "2023-01-01", end: "2024-12-31", rent: 4200, vaad: 350 }], customFields: {} },
  { id: 2, number: "102", floor: 1, area: 40, balcony: 5, storage: "מ-2", leases: [{ tenant: "לוי דוד", start: "2023-06-01", end: "2025-05-31", rent: 2800, vaad: 250 }], customFields: {} },
  { id: 3, number: "201", floor: 2, area: 65, balcony: 8, storage: "", leases: [{ tenant: "ישראלי רון", start: "2024-01-01", end: "2024-06-30", rent: 4400, vaad: 350 }, { tenant: "אבי מזרחי", start: "2024-09-01", end: "2026-08-31", rent: 4600, vaad: 360 }], customFields: {} },
  { id: 4, number: "202", floor: 2, area: 40, balcony: 0, storage: "מ-4", leases: [], customFields: {} },
  { id: 5, number: "301", floor: 3, area: 85, balcony: 12, storage: "מ-5", leases: [{ tenant: "פרידמן עמית", start: "2022-03-01", end: "2025-02-28", rent: 5500, vaad: 420 }], customFields: {} },
  { id: 6, number: "302", floor: 3, area: 40, balcony: 5, storage: "", leases: [{ tenant: "גולדברג שרה", start: "2023-09-01", end: "2024-08-31", rent: 2900, vaad: 250 }], customFields: {} },
];

const TABS = ["דירות", "חוזים", "ניתוח ודוחות", "השוואה", "הגדרות"];

function formatDate(d) { if (!d) return "—"; return new Date(d).toLocaleDateString("he-IL"); }
function daysBetween(a, b) { return Math.max(0, Math.round((new Date(b) - new Date(a)) / 86400000)); }
function monthsBetween(a, b) { const d1 = new Date(a), d2 = new Date(b); return Math.max(0, (d2.getFullYear() - d1.getFullYear()) * 12 + d2.getMonth() - d1.getMonth()); }

function calcOccupancy(apt, fromDate, toDate) {
  const total = daysBetween(fromDate, toDate);
  if (total === 0) return 0;
  let occupied = 0;
  for (const l of apt.leases) {
    const s = l.start > fromDate ? l.start : fromDate;
    const e = l.end < toDate ? l.end : toDate;
    if (s < e) occupied += daysBetween(s, e);
  }
  return Math.min(100, Math.round((occupied / total) * 100));
}

function getActiveLease(apt, date = new Date().toISOString().slice(0, 10)) {
  return apt.leases.find(l => l.start <= date && l.end >= date) || null;
}

function totalRentedMonths(apt) {
  let months = 0;
  for (const l of apt.leases) months += monthsBetween(l.start, l.end);
  return months;
}

export default function App() {
  const [tab, setTab] = useState("דירות");
  const [apts, setApts] = useState(INITIAL_APARTMENTS);
  const [customFieldDefs, setCustomFieldDefs] = useState([]);
  const [newFieldName, setNewFieldName] = useState("");
  const [newFieldType, setNewFieldType] = useState("text");
  const [selectedApt, setSelectedApt] = useState(null);
  const [showAddApt, setShowAddApt] = useState(false);
  const [showAddLease, setShowAddLease] = useState(false);
  const [filterArea, setFilterArea] = useState("all");
  const [filterFloor, setFilterFloor] = useState("all");
  const [compareArea, setCompareArea] = useState("all");
  const [reportFrom, setReportFrom] = useState("2024-01-01");
  const [reportTo, setReportTo] = useState("2024-12-31");

  const [newApt, setNewApt] = useState({ number: "", floor: "", area: "", balcony: "", storage: "" });
  const [newLease, setNewLease] = useState({ tenant: "", start: "", end: "", rent: "", vaad: "" });

  // מיפוי דירה → מחסן + מרפסת
  const [aptMapping, setAptMapping] = useState({
    "101": { storage: "מ-1", balcony: 8 },
    "102": { storage: "מ-2", balcony: 5 },
    "201": { storage: "", balcony: 8 },
    "202": { storage: "מ-4", balcony: 0 },
    "301": { storage: "מ-5", balcony: 12 },
    "302": { storage: "", balcony: 5 },
  });
  const [newMappingRow, setNewMappingRow] = useState({ number: "", storage: "", balcony: "" });

  const today = new Date().toISOString().slice(0, 10);

  const uniqueAreas = useMemo(() => [...new Set(apts.map(a => a.area))].sort((a, b) => a - b), [apts]);
  const uniqueFloors = useMemo(() => [...new Set(apts.map(a => a.floor))].sort((a, b) => a - b), [apts]);

  const filteredApts = useMemo(() => apts.filter(a =>
    (filterArea === "all" || a.area === Number(filterArea)) &&
    (filterFloor === "all" || a.floor === Number(filterFloor))
  ), [apts, filterArea, filterFloor]);

  function handleAptNumberChange(val) {
    const mapped = aptMapping[val.trim()];
    if (mapped) {
      setNewApt(p => ({ ...p, number: val, storage: mapped.storage || "", balcony: String(mapped.balcony ?? "") }));
    } else {
      setNewApt(p => ({ ...p, number: val }));
    }
  }

  function addApartment() {
    if (!newApt.number || !newApt.floor || !newApt.area) return;
    const customFields = {};
    customFieldDefs.forEach(f => customFields[f.name] = "");
    setApts(prev => [...prev, { id: Date.now(), number: newApt.number, floor: Number(newApt.floor), area: Number(newApt.area), balcony: Number(newApt.balcony || 0), storage: newApt.storage || "", leases: [], customFields }]);
    setNewApt({ number: "", floor: "", area: "", balcony: "", storage: "" });
    setShowAddApt(false);
  }

  function addLease(aptId) {
    if (!newLease.tenant || !newLease.start || !newLease.end || !newLease.rent) return;
    setApts(prev => prev.map(a => a.id === aptId ? { ...a, leases: [...a.leases, { ...newLease, rent: Number(newLease.rent), vaad: Number(newLease.vaad || 0) }] } : a));
    setNewLease({ tenant: "", start: "", end: "", rent: "", vaad: "" });
    setShowAddLease(false);
  }

  function deleteApt(id) { setApts(prev => prev.filter(a => a.id !== id)); if (selectedApt?.id === id) setSelectedApt(null); }
  function deleteLease(aptId, idx) { setApts(prev => prev.map(a => a.id === aptId ? { ...a, leases: a.leases.filter((_, i) => i !== idx) } : a)); }

  function addCustomField() {
    if (!newFieldName.trim()) return;
    const name = newFieldName.trim();
    setCustomFieldDefs(prev => [...prev, { name, type: newFieldType }]);
    setApts(prev => prev.map(a => ({ ...a, customFields: { ...a.customFields, [name]: "" } })));
    setNewFieldName("");
  }

  function updateCustomField(aptId, fieldName, value) {
    setApts(prev => prev.map(a => a.id === aptId ? { ...a, customFields: { ...a.customFields, [fieldName]: value } } : a));
  }

  const buildingOccupancy = useMemo(() => {
    if (!apts.length) return 0;
    return Math.round(apts.reduce((sum, a) => sum + calcOccupancy(a, reportFrom, reportTo), 0) / apts.length);
  }, [apts, reportFrom, reportTo]);

  const compareApts = useMemo(() => compareArea === "all" ? apts : apts.filter(a => a.area === Number(compareArea)), [apts, compareArea]);

  const inputStyle = { padding: "6px 10px", border: "0.5px solid var(--color-border-secondary)", borderRadius: "var(--border-radius-md)", background: "var(--color-background-primary)", color: "var(--color-text-primary)", fontSize: 13, width: "100%" };
  const btnPrimary = { padding: "7px 18px", background: "var(--color-background-info)", color: "var(--color-text-info)", border: "0.5px solid var(--color-border-info)", borderRadius: "var(--border-radius-md)", cursor: "pointer", fontSize: 13, fontWeight: 500 };
  const btnSecondary = { padding: "7px 14px", background: "transparent", border: "0.5px solid var(--color-border-secondary)", borderRadius: "var(--border-radius-md)", cursor: "pointer", fontSize: 13, color: "var(--color-text-secondary)" };
  const btnDanger = { padding: "5px 10px", background: "transparent", border: "0.5px solid var(--color-border-danger)", borderRadius: "var(--border-radius-md)", cursor: "pointer", fontSize: 12, color: "var(--color-text-danger)" };
  const card = { background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-lg)", padding: "1rem 1.25rem", marginBottom: 12 };
  const metricCard = { background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-md)", padding: "12px 16px", textAlign: "center" };
  const selectStyle = { ...inputStyle, cursor: "pointer" };
  const label = { fontSize: 12, color: "var(--color-text-secondary)", marginBottom: 3, display: "block" };
  const badge = (color) => ({ fontSize: 11, padding: "2px 8px", borderRadius: 20, background: `var(--color-background-${color})`, color: `var(--color-text-${color})`, display: "inline-block" });

  return (
    <div style={{ fontFamily: "var(--font-sans)", direction: "rtl", padding: "1rem 0", maxWidth: 820, margin: "0 auto" }}>
      <h2 style={{ fontSize: 20, fontWeight: 500, margin: "0 0 0.25rem", color: "var(--color-text-primary)" }}>
        <i className="ti ti-building" style={{ fontSize: 20, marginLeft: 8 }} aria-hidden="true"></i>
        מערכת ניהול בניין
      </h2>
      <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: "0 0 1.25rem" }}>נכון ל‑{formatDate(today)}</p>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: "1.25rem", borderBottom: "0.5px solid var(--color-border-tertiary)", paddingBottom: 0 }}>
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: "7px 16px", background: tab === t ? "var(--color-background-primary)" : "transparent", border: tab === t ? "0.5px solid var(--color-border-tertiary)" : "0.5px solid transparent", borderBottom: tab === t ? "0.5px solid var(--color-background-primary)" : "none", borderRadius: "var(--border-radius-md) var(--border-radius-md) 0 0", cursor: "pointer", fontSize: 13, fontWeight: tab === t ? 500 : 400, color: tab === t ? "var(--color-text-primary)" : "var(--color-text-secondary)", marginBottom: -1 }}>
            {t}
          </button>
        ))}
      </div>

      {/* ===== TAB: דירות ===== */}
      {tab === "דירות" && (
        <div>
          <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap", alignItems: "flex-end" }}>
            <div>
              <span style={label}>סינון לפי שטח (מ"ר)</span>
              <select value={filterArea} onChange={e => setFilterArea(e.target.value)} style={{ ...selectStyle, width: 110 }}>
                <option value="all">הכל</option>
                {uniqueAreas.map(a => <option key={a} value={a}>{a} מ"ר</option>)}
              </select>
            </div>
            <div>
              <span style={label}>סינון לפי קומה</span>
              <select value={filterFloor} onChange={e => setFilterFloor(e.target.value)} style={{ ...selectStyle, width: 90 }}>
                <option value="all">הכל</option>
                {uniqueFloors.map(f => <option key={f} value={f}>קומה {f}</option>)}
              </select>
            </div>
            <div style={{ marginRight: "auto" }}>
              <button onClick={() => setShowAddApt(v => !v)} style={btnPrimary}>
                <i className="ti ti-plus" aria-hidden="true"></i> הוסף דירה
              </button>
            </div>
          </div>

          {showAddApt && (
            <div style={{ ...card, border: "0.5px solid var(--color-border-info)", marginBottom: 16 }}>
              <p style={{ fontWeight: 500, fontSize: 14, margin: "0 0 12px" }}>דירה חדשה</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", gap: 10, marginBottom: 10 }}>
                {[["מס' דירה", "number", "text"], ["קומה", "floor", "number"], ['שטח (מ"ר)', "area", "number"], ['שטח מרפסת (מ"ר)', "balcony", "number"], ["מס' מחסן", "storage", "text"]].map(([lbl, key, type]) => (
                  <div key={key}>
                    <span style={label}>
                      {lbl}
                      {(key === "balcony" || key === "storage") && aptMapping[newApt.number] && (
                        <span style={{ marginRight: 4, fontSize: 10, color: "var(--color-text-success)" }}>✓ אוטו</span>
                      )}
                    </span>
                    <input
                      type={type}
                      value={newApt[key]}
                      onChange={e => key === "number" ? handleAptNumberChange(e.target.value) : setNewApt(p => ({ ...p, [key]: e.target.value }))}
                      style={{ ...inputStyle, borderColor: (key === "balcony" || key === "storage") && aptMapping[newApt.number] ? "var(--color-border-success)" : undefined }}
                    />
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={addApartment} style={btnPrimary}>שמור</button>
                <button onClick={() => setShowAddApt(false)} style={btnSecondary}>ביטול</button>
              </div>
            </div>
          )}

          {/* Custom fields manager moved to הגדרות tab */}

          {filteredApts.map(apt => {
            const active = getActiveLease(apt, today);
            const occ = calcOccupancy(apt, reportFrom, reportTo);
            return (
              <div key={apt.id} style={{ ...card, cursor: "pointer", borderColor: selectedApt?.id === apt.id ? "var(--color-border-info)" : "var(--color-border-tertiary)" }}
                onClick={() => setSelectedApt(s => s?.id === apt.id ? null : apt)}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "var(--border-radius-md)", background: "var(--color-background-secondary)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 500, fontSize: 15, flexShrink: 0 }}>
                    {apt.number}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                      <span style={{ fontWeight: 500, fontSize: 14 }}>דירה {apt.number}</span>
                      <span style={{ ...badge("secondary"), fontSize: 11 }}>קומה {apt.floor}</span>
                      <span style={{ ...badge("secondary"), fontSize: 11 }}>{apt.area} מ"ר</span>
                      {apt.balcony > 0 && <span style={{ ...badge("secondary"), fontSize: 11 }}>מרפסת {apt.balcony} מ"ר</span>}
                      {apt.storage && <span style={{ ...badge("secondary"), fontSize: 11 }}>מחסן {apt.storage}</span>}
                      {active ? <span style={badge("success")}>מושכרת</span> : <span style={badge("warning")}>פנויה</span>}
                    </div>
                    <div style={{ fontSize: 12, color: "var(--color-text-secondary)", marginTop: 3 }}>
                      {active ? `שוכר: ${active.tenant} | שכ"ד: ₪${active.rent.toLocaleString()} | ועד: ₪${active.vaad}` : "אין חוזה פעיל"}
                      {" | "}תפוסה ({reportFrom.slice(0,4)}): {occ}%
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <span style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>
                      ₪{active ? (active.rent / apt.area).toFixed(0) : "—"}/מ"ר
                    </span>
                    <button onClick={e => { e.stopPropagation(); deleteApt(apt.id); }} style={btnDanger}>מחק</button>
                  </div>
                </div>

                {selectedApt?.id === apt.id && (
                  <div style={{ marginTop: 14, borderTop: "0.5px solid var(--color-border-tertiary)", paddingTop: 12 }} onClick={e => e.stopPropagation()}>
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 8 }}>
                        <div>
                          <span style={label}>מס' מחסן</span>
                          <input type="text" value={apt.storage || ""} onChange={e => setApts(prev => prev.map(a => a.id === apt.id ? { ...a, storage: e.target.value } : a))} style={inputStyle} placeholder="לדוג': מ-3" />
                        </div>
                        {customFieldDefs.map(f => (
                          <div key={f.name}>
                            <span style={label}>{f.name}</span>
                            {f.type === "checkbox"
                              ? <input type="checkbox" checked={!!apt.customFields[f.name]} onChange={e => updateCustomField(apt.id, f.name, e.target.checked)} />
                              : <input type={f.type} value={apt.customFields[f.name] || ""} onChange={e => updateCustomField(apt.id, f.name, e.target.value)} style={{ ...inputStyle }} />}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <p style={{ fontSize: 13, fontWeight: 500, margin: 0 }}>חוזי שכירות ({apt.leases.length})</p>
                      <button onClick={() => setShowAddLease(v => !v)} style={btnSecondary}>
                        <i className="ti ti-plus" aria-hidden="true"></i> הוסף חוזה
                      </button>
                    </div>

                    {showAddLease && (
                      <div style={{ background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-md)", padding: 12, marginBottom: 10 }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", gap: 8, marginBottom: 8 }}>
                          {[["שם שוכר", "tenant", "text"], ["מתאריך", "start", "date"], ["עד תאריך", "end", "date"], ["שכ\"ד ₪", "rent", "number"], ["ועד בית ₪", "vaad", "number"]].map(([lbl, key, type]) => (
                            <div key={key}>
                              <span style={label}>{lbl}</span>
                              <input type={type} value={newLease[key]} onChange={e => setNewLease(p => ({ ...p, [key]: e.target.value }))} style={inputStyle} />
                            </div>
                          ))}
                        </div>
                        <div style={{ display: "flex", gap: 8 }}>
                          <button onClick={() => addLease(apt.id)} style={btnPrimary}>שמור חוזה</button>
                          <button onClick={() => setShowAddLease(false)} style={btnSecondary}>ביטול</button>
                        </div>
                      </div>
                    )}

                    {apt.leases.length === 0 && <p style={{ fontSize: 12, color: "var(--color-text-tertiary)" }}>אין חוזים עדיין</p>}
                    {apt.leases.map((l, i) => (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 10px", background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-md)", marginBottom: 6, fontSize: 13 }}>
                        <div>
                          <span style={{ fontWeight: 500 }}>{l.tenant}</span>
                          <span style={{ color: "var(--color-text-secondary)", marginRight: 10 }}>{formatDate(l.start)} — {formatDate(l.end)}</span>
                          <span style={{ color: "var(--color-text-secondary)" }}>{monthsBetween(l.start, l.end)} חודשים</span>
                        </div>
                        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                          <span>₪{l.rent.toLocaleString()}/חודש</span>
                          <span style={{ color: "var(--color-text-secondary)" }}>ועד: ₪{l.vaad}</span>
                          <button onClick={() => deleteLease(apt.id, i)} style={btnDanger}>מחק</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ===== TAB: חוזים ===== */}
      {tab === "חוזים" && (
        <div>
          <p style={{ fontSize: 13, color: "var(--color-text-secondary)", marginBottom: 12 }}>כל חוזי השכירות בבניין</p>
          {apts.flatMap(a => a.leases.map((l, i) => ({ ...l, apt: a, leaseIdx: i }))).length === 0 && (
            <p style={{ color: "var(--color-text-tertiary)" }}>אין חוזים במערכת</p>
          )}
          {apts.flatMap(a => a.leases.map((l, i) => ({ ...l, apt: a, leaseIdx: i }))).sort((a, b) => b.start.localeCompare(a.start)).map((l, idx) => {
            const isActive = l.start <= today && l.end >= today;
            const isExpiring = !isActive && l.end >= today && daysBetween(today, l.end) <= 60;
            return (
              <div key={idx} style={{ ...card, borderRight: `3px solid ${isActive ? "var(--color-border-success)" : isExpiring ? "var(--color-border-warning)" : "var(--color-border-tertiary)"}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <span style={{ fontWeight: 500, fontSize: 14 }}>{l.tenant}</span>
                      <span style={{ ...badge("secondary"), fontSize: 11 }}>דירה {l.apt.number}</span>
                      {isActive && <span style={badge("success")}>פעיל</span>}
                      {isExpiring && <span style={badge("warning")}>פג בקרוב</span>}
                      {!isActive && !isExpiring && l.end < today && <span style={badge("secondary")}>הסתיים</span>}
                      {!isActive && !isExpiring && l.start > today && <span style={badge("info")}>עתידי</span>}
                    </div>
                    <div style={{ fontSize: 12, color: "var(--color-text-secondary)", marginTop: 4 }}>
                      {formatDate(l.start)} — {formatDate(l.end)} ({monthsBetween(l.start, l.end)} חודשים)
                    </div>
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontWeight: 500, fontSize: 15 }}>₪{l.rent.toLocaleString()}<span style={{ fontSize: 12, fontWeight: 400, color: "var(--color-text-secondary)" }}>/חודש</span></div>
                    <div style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>ועד: ₪{l.vaad} | סה"כ: ₪{(l.rent + l.vaad).toLocaleString()}</div>
                    <div style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>₪{(l.rent / l.apt.area).toFixed(0)}/מ"ר</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ===== TAB: ניתוח ===== */}
      {tab === "ניתוח ודוחות" && (
        <div>
          <div style={{ display: "flex", gap: 10, marginBottom: 16, alignItems: "flex-end", flexWrap: "wrap" }}>
            <div>
              <span style={label}>מתאריך</span>
              <input type="date" value={reportFrom} onChange={e => setReportFrom(e.target.value)} style={{ ...inputStyle, width: 140 }} />
            </div>
            <div>
              <span style={label}>עד תאריך</span>
              <input type="date" value={reportTo} onChange={e => setReportTo(e.target.value)} style={{ ...inputStyle, width: 140 }} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 10, marginBottom: 20 }}>
            {[
              ["סה\"כ דירות", apts.length, "ti-building"],
              ["דירות מושכרות כעת", apts.filter(a => getActiveLease(a)).length, "ti-key"],
              ["תפוסה ממוצעת בניין", `${buildingOccupancy}%`, "ti-chart-bar"],
              ["הכנסה חודשית", `₪${apts.reduce((s, a) => { const l = getActiveLease(a); return s + (l ? l.rent + l.vaad : 0); }, 0).toLocaleString()}`, "ti-cash"],
            ].map(([lbl, val, icon]) => (
              <div key={lbl} style={metricCard}>
                <i className={`ti ${icon}`} style={{ fontSize: 18, color: "var(--color-text-secondary)", display: "block", marginBottom: 4 }} aria-hidden="true"></i>
                <div style={{ fontSize: 22, fontWeight: 500 }}>{val}</div>
                <div style={{ fontSize: 11, color: "var(--color-text-secondary)", marginTop: 2 }}>{lbl}</div>
              </div>
            ))}
          </div>

          <p style={{ fontWeight: 500, fontSize: 14, margin: "0 0 10px" }}>פירוט לפי דירה</p>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: "0.5px solid var(--color-border-secondary)" }}>
                  {["דירה", "קומה", "שטח", "מרפסת", "מחסן", "תפוסה%", "חודשים מושכרת", "שכ\"ד נוכחי", "₪/מ\"ר", "ועד בית"].map(h => (
                    <th key={h} style={{ padding: "6px 10px", textAlign: "right", fontWeight: 500, color: "var(--color-text-secondary)", fontSize: 12 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {apts.map((a, i) => {
                  const active = getActiveLease(a);
                  const occ = calcOccupancy(a, reportFrom, reportTo);
                  const rentedM = totalRentedMonths(a);
                  return (
                    <tr key={a.id} style={{ borderBottom: "0.5px solid var(--color-border-tertiary)", background: i % 2 === 0 ? "transparent" : "var(--color-background-secondary)" }}>
                      <td style={{ padding: "8px 10px", fontWeight: 500 }}>{a.number}</td>
                      <td style={{ padding: "8px 10px" }}>{a.floor}</td>
                      <td style={{ padding: "8px 10px" }}>{a.area} מ"ר</td>
                      <td style={{ padding: "8px 10px" }}>{a.balcony > 0 ? `${a.balcony} מ"ר` : "—"}</td>
                      <td style={{ padding: "8px 10px" }}>{a.storage || "—"}</td>
                      <td style={{ padding: "8px 10px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <div style={{ width: 50, height: 6, background: "var(--color-background-tertiary)", borderRadius: 3, overflow: "hidden" }}>
                            <div style={{ width: `${occ}%`, height: "100%", background: occ >= 80 ? "var(--color-text-success)" : occ >= 50 ? "var(--color-text-warning)" : "var(--color-text-danger)", borderRadius: 3 }}></div>
                          </div>
                          {occ}%
                        </div>
                      </td>
                      <td style={{ padding: "8px 10px" }}>{rentedM}</td>
                      <td style={{ padding: "8px 10px" }}>{active ? `₪${active.rent.toLocaleString()}` : <span style={{ color: "var(--color-text-tertiary)" }}>פנויה</span>}</td>
                      <td style={{ padding: "8px 10px" }}>{active ? `₪${(active.rent / a.area).toFixed(0)}` : "—"}</td>
                      <td style={{ padding: "8px 10px" }}>{active ? `₪${active.vaad}` : "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ===== TAB: השוואה ===== */}
      {tab === "השוואה" && (
        <div>
          <div style={{ display: "flex", gap: 10, marginBottom: 16, alignItems: "flex-end" }}>
            <div>
              <span style={label}>השווה דירות לפי שטח</span>
              <select value={compareArea} onChange={e => setCompareArea(e.target.value)} style={{ ...selectStyle, width: 140 }}>
                <option value="all">כל הדירות</option>
                {uniqueAreas.map(a => <option key={a} value={a}>{a} מ"ר</option>)}
              </select>
            </div>
            <p style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: "0 0 7px" }}>
              {compareArea !== "all" ? `מציג ${compareApts.length} דירות בשטח ${compareArea} מ"ר` : `מציג כל ${compareApts.length} הדירות`}
            </p>
          </div>

          {compareArea !== "all" && compareApts.length > 1 && (
            <div style={{ ...card, marginBottom: 16, background: "var(--color-background-secondary)" }}>
              <p style={{ fontSize: 13, fontWeight: 500, margin: "0 0 10px" }}>ממוצעים לדירות {compareArea} מ"ר</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 8 }}>
                {[
                  ["שכ\"ד ממוצע", `₪${Math.round(compareApts.filter(a => getActiveLease(a)).reduce((s, a) => s + getActiveLease(a).rent, 0) / (compareApts.filter(a => getActiveLease(a)).length || 1)).toLocaleString()}`],
                  ["מחיר/מ\"ר ממוצע", `₪${Math.round(compareApts.filter(a => getActiveLease(a)).reduce((s, a) => s + getActiveLease(a).rent / a.area, 0) / (compareApts.filter(a => getActiveLease(a)).length || 1)).toFixed(0)}`],
                  ["תפוסה ממוצעת", `${Math.round(compareApts.reduce((s, a) => s + calcOccupancy(a, reportFrom, reportTo), 0) / (compareApts.length || 1))}%`],
                ].map(([lbl, val]) => (
                  <div key={lbl} style={metricCard}>
                    <div style={{ fontSize: 18, fontWeight: 500 }}>{val}</div>
                    <div style={{ fontSize: 11, color: "var(--color-text-secondary)", marginTop: 2 }}>{lbl}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
            {compareApts.map(a => {
              const active = getActiveLease(a);
              const occ = calcOccupancy(a, reportFrom, reportTo);
              return (
                <div key={a.id} style={{ ...card, margin: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontWeight: 500, fontSize: 15 }}>דירה {a.number}</span>
                    {active ? <span style={badge("success")}>מושכרת</span> : <span style={badge("warning")}>פנויה</span>}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                    {[
                      ["קומה", a.floor],
                      ["שטח", `${a.area} מ"ר`],
                      ["מרפסת", a.balcony > 0 ? `${a.balcony} מ"ר` : "—"],
                      ["מחסן", a.storage || "—"],
                      ["שכ\"ד", active ? `₪${active.rent.toLocaleString()}` : "—"],
                      ["₪/מ\"ר", active ? `₪${(active.rent / a.area).toFixed(0)}` : "—"],
                      ["תפוסה", `${occ}%`],
                      ["ועד בית", active ? `₪${active.vaad}` : "—"],
                      ["חוזים", a.leases.length],
                    ].map(([lbl, val]) => (
                      <div key={lbl} style={{ padding: "5px 8px", background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-md)" }}>
                        <div style={{ fontSize: 10, color: "var(--color-text-secondary)" }}>{lbl}</div>
                        <div style={{ fontSize: 13, fontWeight: 500 }}>{val}</div>
                      </div>
                    ))}
                  </div>
                  {a.leases.length > 0 && (
                    <div style={{ marginTop: 8, borderTop: "0.5px solid var(--color-border-tertiary)", paddingTop: 8 }}>
                      <div style={{ fontSize: 11, color: "var(--color-text-secondary)" }}>
                        סה"כ {totalRentedMonths(a)} חודשים מושכרים
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
      {/* ===== TAB: הגדרות ===== */}
      {tab === "הגדרות" && (
        <div>
          <p style={{ fontSize: 13, color: "var(--color-text-secondary)", marginBottom: 16 }}>
            הגדר כאן את הקישור בין מספר דירה למספר מחסן ושטח מרפסת. כשתוסיף דירה חדשה, הערכים יתמלאו אוטומטית.
          </p>

          <div style={card}>
            <p style={{ fontWeight: 500, fontSize: 14, margin: "0 0 12px" }}>טבלת מיפוי דירות</p>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: "0.5px solid var(--color-border-secondary)" }}>
                    {['מס\' דירה', 'מס\' מחסן', 'שטח מרפסת (מ"ר)', ''].map(h => (
                      <th key={h} style={{ padding: "6px 10px", textAlign: "right", fontWeight: 500, color: "var(--color-text-secondary)", fontSize: 12 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(aptMapping).sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true })).map(([num, vals], i) => (
                    <tr key={num} style={{ borderBottom: "0.5px solid var(--color-border-tertiary)", background: i % 2 === 0 ? "transparent" : "var(--color-background-secondary)" }}>
                      <td style={{ padding: "6px 10px", fontWeight: 500 }}>{num}</td>
                      <td style={{ padding: "6px 10px" }}>
                        <input
                          type="text"
                          value={vals.storage}
                          onChange={e => setAptMapping(prev => ({ ...prev, [num]: { ...prev[num], storage: e.target.value } }))}
                          style={{ ...inputStyle, width: 100 }}
                          placeholder="לדוג' מ-1"
                        />
                      </td>
                      <td style={{ padding: "6px 10px" }}>
                        <input
                          type="number"
                          value={vals.balcony}
                          onChange={e => setAptMapping(prev => ({ ...prev, [num]: { ...prev[num], balcony: Number(e.target.value) } }))}
                          style={{ ...inputStyle, width: 80 }}
                        />
                      </td>
                      <td style={{ padding: "6px 10px" }}>
                        <button onClick={() => setAptMapping(prev => { const n = { ...prev }; delete n[num]; return n; })} style={btnDanger}>
                          <i className="ti ti-trash" aria-hidden="true"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ marginTop: 14, paddingTop: 12, borderTop: "0.5px solid var(--color-border-tertiary)" }}>
              <p style={{ fontSize: 13, fontWeight: 500, margin: "0 0 10px" }}>הוסף שורת מיפוי חדשה</p>
              <div style={{ display: "flex", gap: 8, alignItems: "flex-end", flexWrap: "wrap" }}>
                <div>
                  <span style={label}>מס' דירה</span>
                  <input type="text" value={newMappingRow.number} onChange={e => setNewMappingRow(p => ({ ...p, number: e.target.value }))} style={{ ...inputStyle, width: 90 }} placeholder="לדוג' 401" />
                </div>
                <div>
                  <span style={label}>מס' מחסן</span>
                  <input type="text" value={newMappingRow.storage} onChange={e => setNewMappingRow(p => ({ ...p, storage: e.target.value }))} style={{ ...inputStyle, width: 100 }} placeholder="מ-6" />
                </div>
                <div>
                  <span style={label}>שטח מרפסת</span>
                  <input type="number" value={newMappingRow.balcony} onChange={e => setNewMappingRow(p => ({ ...p, balcony: e.target.value }))} style={{ ...inputStyle, width: 80 }} placeholder="0" />
                </div>
                <button onClick={() => {
                  if (!newMappingRow.number.trim()) return;
                  setAptMapping(prev => ({ ...prev, [newMappingRow.number.trim()]: { storage: newMappingRow.storage, balcony: Number(newMappingRow.balcony || 0) } }));
                  setNewMappingRow({ number: "", storage: "", balcony: "" });
                }} style={btnPrimary}>הוסף</button>
              </div>
            </div>
          </div>

          <div style={card}>
            <p style={{ fontWeight: 500, fontSize: 14, margin: "0 0 8px" }}>שדות מותאמים אישית</p>
            <p style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: "0 0 12px" }}>הוסף שדות נוספים שיופיעו בכל הדירות</p>
            <div style={{ display: "flex", gap: 8, alignItems: "flex-end", flexWrap: "wrap" }}>
              <div>
                <span style={label}>שם השדה</span>
                <input value={newFieldName} onChange={e => setNewFieldName(e.target.value)} placeholder="לדוג': חניה, מיזוג..." style={{ ...inputStyle, width: 160 }} />
              </div>
              <div>
                <span style={label}>סוג</span>
                <select value={newFieldType} onChange={e => setNewFieldType(e.target.value)} style={{ ...selectStyle, width: 100 }}>
                  <option value="text">טקסט</option>
                  <option value="number">מספר</option>
                  <option value="checkbox">כן/לא</option>
                </select>
              </div>
              <button onClick={addCustomField} style={btnSecondary}>
                <i className="ti ti-plus" aria-hidden="true"></i> הוסף שדה
              </button>
            </div>
            {customFieldDefs.length > 0 && (
              <div style={{ marginTop: 10, display: "flex", gap: 6, flexWrap: "wrap" }}>
                {customFieldDefs.map(f => (
                  <span key={f.name} style={{ ...badge("secondary"), fontSize: 12, display: "inline-flex", alignItems: "center", gap: 4 }}>
                    {f.name} ({f.type})
                    <button onClick={() => setCustomFieldDefs(prev => prev.filter(x => x.name !== f.name))} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: 11, color: "var(--color-text-danger)" }}>✕</button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

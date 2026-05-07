// Sites Information screen — add / edit / delete sites, then proceed to Review.

function emptySite() {
  return { siteName: '', siteAddress: '', siteType: '', processes: [], numberOfPeople: '', standards: [] };
}

function validSite(s) {
  return (
    s.siteName.trim() &&
    s.siteAddress.trim() &&
    s.siteType &&
    (s.processes || []).length > 0 &&
    (s.numberOfPeople || '').trim() &&
    (s.standards || []).length > 0
  );
}

// ── Site form card (used for both new-site entry and in-line editing) ──────────

function HFSiteForm({ draft, setDraft, availableStandards, availableSiteTypes, openField, setOpenField, sectionId, title, onRemove, onSave, canSave, saveLabel }) {
  const update     = (k, v)    => setDraft({ ...draft, [k]: v });
  const toggleMulti = (k, o)  => {
    const cur = draft[k] || [];
    update(k, cur.includes(o) ? cur.filter((x) => x !== o) : [...cur, o]);
  };

  return (
    <div style={{ ...hfStyles.cardPadded, marginBottom: 16 }}>
      {/* Card header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: '1px solid #f0f0f0', background: '#fafaf9' }}>
        <div style={{ fontSize: 14, fontWeight: 600 }}>{title}</div>
        {onRemove && (
          <button style={{ ...hfStyles.btn, ...hfStyles.btnGhost, padding: '6px 10px', fontSize: 13 }} onClick={onRemove}>
            <HFX size={10} /> Remove
          </button>
        )}
      </div>

      {/* Fields */}
      {window.CGI_SITE_FIELDS.map((f, i) => {
        const fid    = `${sectionId}:${f.key}`;
        const isLast = i === window.CGI_SITE_FIELDS.length - 1;
        return (
          <div key={f.key} style={{ ...hfStyles.field, ...(isLast ? hfStyles.fieldLast : {}) }}>
            <div>
              <div style={hfStyles.fieldLabel}>{f.label}</div>
              <div style={hfStyles.fieldHint}>
                {f.kind === 'text' || f.kind === 'textarea'
                  ? 'Required'
                  : f.kind === 'single'
                  ? 'Required · single select'
                  : 'Required · multi-select'}
                {f.key === 'standards' ? '\n(from Applying Standards)' : ''}
              </div>
            </div>

            {f.kind === 'text' && (
              <input
                style={hfStyles.input}
                placeholder={f.placeholder}
                value={draft[f.key]}
                onChange={(e) => update(f.key, e.target.value)}
                onFocus={(e)  => { e.target.style.borderColor = '#0a0a0a'; e.target.style.boxShadow = '0 0 0 3px rgba(10,10,10,0.06)'; }}
                onBlur={(e)   => { e.target.style.borderColor = '#e5e5e5'; e.target.style.boxShadow = 'none'; }}
              />
            )}
            {f.kind === 'textarea' && (
              <textarea
                style={hfStyles.textarea}
                placeholder={f.placeholder}
                value={draft[f.key]}
                onChange={(e) => update(f.key, e.target.value)}
                onFocus={(e)  => { e.target.style.borderColor = '#0a0a0a'; e.target.style.boxShadow = '0 0 0 3px rgba(10,10,10,0.06)'; }}
                onBlur={(e)   => { e.target.style.borderColor = '#e5e5e5'; e.target.style.boxShadow = 'none'; }}
              />
            )}
            {f.kind === 'single' && (
              <HFSingleSelect
                id={fid}
                value={draft[f.key]}
                options={f.key === 'siteType' && availableSiteTypes ? availableSiteTypes : window.CGI_OPTIONS[f.source]}
                onChange={(v) => update(f.key, v)}
                open={openField === fid}
                setOpen={setOpenField}
              />
            )}
            {f.kind === 'multi' && (
              <HFMultiSelect
                id={fid}
                values={draft[f.key]}
                options={f.key === 'standards' ? availableStandards : window.CGI_OPTIONS[f.source]}
                onToggle={(o) => toggleMulti(f.key, o)}
                open={openField === fid}
                setOpen={setOpenField}
                placeholder={
                  f.key === 'standards' && availableStandards.length === 0
                    ? 'Go back to Products to pick standards first'
                    : 'Select one or more…'
                }
              />
            )}
          </div>
        );
      })}

      {/* Form footer */}
      <div style={{ padding: '16px 24px', borderTop: '1px solid #f0f0f0', display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
        <button
          style={{ ...hfStyles.btn, ...(canSave ? hfStyles.btnPrimary : hfStyles.btnDisabled) }}
          onClick={() => canSave && onSave()}
        >
          {saveLabel || <><HFPlus /> Add site</>}
          {saveLabel && null}
        </button>
      </div>
    </div>
  );
}

// ── Sites screen ───────────────────────────────────────────────────────────────

function HFSites({ sites, setSites, availableStandards, onPrev, onNext }) {
  const [draft,      setDraft]      = React.useState(emptySite());
  const [openField,  setOpenField]  = React.useState(null);
  const [editIndex,  setEditIndex]  = React.useState(null);
  const [editDraft,  setEditDraft]  = React.useState(null);

  // Only one site can be "Main".
  const mainTakenBy    = sites.findIndex((s) => s.siteType === 'Main');
  const siteTypesForNew  = mainTakenBy === -1
    ? window.CGI_OPTIONS.siteType
    : window.CGI_OPTIONS.siteType.filter((t) => t !== 'Main');
  const siteTypesForEdit = (i) =>
    (mainTakenBy === -1 || mainTakenBy === i)
      ? window.CGI_OPTIONS.siteType
      : window.CGI_OPTIONS.siteType.filter((t) => t !== 'Main');

  const addSite = () => {
    if (!validSite(draft)) return;
    if (draft.siteType === 'Main' && mainTakenBy !== -1) return;
    setSites([...sites, draft]);
    setDraft(emptySite());
    setOpenField(null);
  };

  const startEdit = (i) => {
    setEditIndex(i);
    setEditDraft({ ...sites[i], processes: [...(sites[i].processes || [])], standards: [...(sites[i].standards || [])] });
    setOpenField(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const saveEdit = () => {
    if (!editDraft || !validSite(editDraft)) return;
    const next = sites.slice();
    next[editIndex] = editDraft;
    setSites(next);
    setEditIndex(null);
    setEditDraft(null);
    setOpenField(null);
  };

  const cancelEdit = () => {
    setEditIndex(null);
    setEditDraft(null);
    setOpenField(null);
  };

  const removeSite = (i) => {
    setSites(sites.filter((_, idx) => idx !== i));
    if (editIndex === i) { setEditIndex(null); setEditDraft(null); }
  };

  const canProceed = sites.length > 0;

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, marginBottom: 8 }}>
        <div>
          <div style={hfStyles.h1}>Sites Information</div>
          <div style={hfStyles.sub}>
            Add every site to be covered by this certification. Fill the form, click <b>Add site</b>, and repeat.
            {availableStandards.length === 0 && (
              <div style={{ marginTop: 10, fontSize: 13, color: '#b91c1c' }}>
                No standards available — go back to Products Information and select at least one.
              </div>
            )}
          </div>
        </div>
        <div style={{ ...hfStyles.countPill, marginBottom: 52 }}>{sites.length} saved</div>
      </div>

      {/* New-site form (hidden while editing an existing site) */}
      {editIndex === null && (
        <HFSiteForm
          draft={draft}
          setDraft={setDraft}
          availableStandards={availableStandards}
          availableSiteTypes={siteTypesForNew}
          openField={openField}
          setOpenField={setOpenField}
          sectionId="new"
          title="New site"
          onSave={addSite}
          canSave={validSite(draft) && !(draft.siteType === 'Main' && mainTakenBy !== -1)}
        />
      )}

      {/* Inline edit form */}
      {editIndex !== null && editDraft && (
        <>
          <HFSiteForm
            draft={editDraft}
            setDraft={setEditDraft}
            availableStandards={availableStandards}
            availableSiteTypes={siteTypesForEdit(editIndex)}
            openField={openField}
            setOpenField={setOpenField}
            sectionId={`edit-${editIndex}`}
            title={`Editing site — ${sites[editIndex]?.siteName || `#${editIndex + 1}`}`}
            onSave={saveEdit}
            canSave={validSite(editDraft) && !(editDraft.siteType === 'Main' && mainTakenBy !== -1 && mainTakenBy !== editIndex)}
            saveLabel="Save changes"
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: -8, marginBottom: 16 }}>
            <button style={hfStyles.btn} onClick={cancelEdit}>Cancel edit</button>
          </div>
        </>
      )}

      {/* Saved Sites table */}
      <div style={{ marginTop: 24 }}>
        <div style={hfStyles.sectionTitle}>Saved Sites</div>
        <div style={hfStyles.sectionSub}>Edit or remove rows as needed. At least one saved site is required to proceed.</div>

        <div style={hfStyles.cardPadded}>
          <div style={hfStyles.tableWrap}>
            <table style={hfStyles.table}>
              <thead>
                <tr>
                  <th style={hfStyles.th}>#</th>
                  <th style={hfStyles.th}>Site Name</th>
                  <th style={hfStyles.th}>Site Address</th>
                  <th style={hfStyles.th}>Site Type</th>
                  <th style={hfStyles.th}>Processes</th>
                  <th style={hfStyles.th}>No. of People</th>
                  <th style={hfStyles.th}>Standards</th>
                  <th style={{ ...hfStyles.th, ...hfStyles.thRight }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sites.length === 0 && (
                  <tr>
                    <td colSpan="8" style={hfStyles.emptyState}>
                      No sites added yet. Fill the form above and click <b>Add site</b>.
                    </td>
                  </tr>
                )}
                {sites.map((s, i) => (
                  <tr key={i}>
                    <td style={{ ...hfStyles.td, color: '#a3a3a3', fontVariantNumeric: 'tabular-nums' }}>{i + 1}</td>
                    <td style={{ ...hfStyles.td, fontWeight: 600 }}>{s.siteName}</td>
                    <td style={{ ...hfStyles.td, color: '#525252', maxWidth: 240 }}>{s.siteAddress}</td>
                    <td style={hfStyles.td}>{s.siteType}</td>
                    <td style={hfStyles.td}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                        {s.processes.map((p) => <span key={p} style={hfStyles.chip}>{p}</span>)}
                      </div>
                    </td>
                    <td style={hfStyles.td}>{s.numberOfPeople}</td>
                    <td style={hfStyles.td}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                        {s.standards.map((p) => <span key={p} style={hfStyles.chip}>{p}</span>)}
                      </div>
                    </td>
                    <td style={{ ...hfStyles.td, ...hfStyles.tdRight }}>
                      <button
                        style={hfStyles.iconBtn}
                        title="Edit"
                        onClick={() => startEdit(i)}
                        onMouseEnter={(e) => { e.currentTarget.style.background = '#fafaf9'; e.currentTarget.style.borderColor = '#0a0a0a'; e.currentTarget.style.color = '#0a0a0a'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = '#e5e5e5'; e.currentTarget.style.color = '#525252'; }}
                      >
                        <HFEdit />
                      </button>
                      <button
                        style={hfStyles.iconBtn}
                        title="Delete"
                        onClick={() => removeSite(i)}
                        onMouseEnter={(e) => { e.currentTarget.style.background = '#fef2f2'; e.currentTarget.style.borderColor = '#fecaca'; e.currentTarget.style.color = '#b91c1c'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = '#e5e5e5'; e.currentTarget.style.color = '#525252'; }}
                      >
                        <HFTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer navigation */}
      <div style={hfStyles.footer}>
        <button style={hfStyles.btn} onClick={onPrev}>
          <HFArrowLeft /> Previous
        </button>
        <div style={hfStyles.btnRow}>
          <button
            style={{ ...hfStyles.btn, ...(canProceed ? hfStyles.btnPrimary : hfStyles.btnDisabled) }}
            onClick={() => canProceed && onNext()}
          >
            Proceed to Overview <HFArrowRight />
          </button>
        </div>
      </div>
    </>
  );
}

window.HFSites = HFSites;

// Shared design-system primitives — modern minimal, whitespace-heavy, flat, strong type.

const hfStyles = {
  page: {
    width: '100%', minHeight: '100vh',
    background: '#fafaf9', padding: '56px 48px',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    color: '#0a0a0a', boxSizing: 'border-box',
  },
  wrap: { maxWidth: 1040, margin: '0 auto' },
  crumbs: {
    display: 'flex', alignItems: 'center', gap: 8,
    fontSize: 13, color: '#737373', marginBottom: 40, fontWeight: 500,
  },
  crumbSep: { color: '#d4d4d4' },
  crumbActive: { color: '#0a0a0a' },
  stepper: { display: 'flex', alignItems: 'center', gap: 0, marginBottom: 48 },
  step: {
    display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0',
    fontSize: 13, fontWeight: 500, color: '#a3a3a3', cursor: 'default',
  },
  stepClickable: { cursor: 'pointer' },
  stepActive: { color: '#0a0a0a' },
  stepDone: { color: '#0a0a0a' },
  stepNum: {
    width: 22, height: 22, borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 12, fontWeight: 600,
    border: '1px solid #e5e5e5', background: '#fff', color: '#a3a3a3',
  },
  stepNumActive: { background: '#0a0a0a', color: '#fff', border: '1px solid #0a0a0a' },
  stepNumDone:   { background: '#16a34a', color: '#fff', border: '1px solid #16a34a' },
  stepLine: { flex: 1, height: 1, background: '#e5e5e5', margin: '0 16px', minWidth: 40 },
  h1:  { fontSize: 36, fontWeight: 600, letterSpacing: -0.8, marginBottom: 8, lineHeight: 1.15 },
  sub: { fontSize: 16, color: '#737373', marginBottom: 48, lineHeight: 1.5, maxWidth: 600 },
  card:       { background: '#fff', border: '1px solid #ebebeb', borderRadius: 12, padding: '8px 0' },
  cardPadded: { background: '#fff', border: '1px solid #ebebeb', borderRadius: 12, padding: 0, overflow: 'hidden' },
  field: {
    display: 'grid', gridTemplateColumns: '280px 1fr',
    gap: 40, alignItems: 'start', padding: '24px 32px',
    borderBottom: '1px solid #f0f0f0',
  },
  fieldLast:  { borderBottom: 'none' },
  fieldLabel: { fontSize: 14, fontWeight: 600, color: '#0a0a0a', paddingTop: 10, letterSpacing: -0.1 },
  fieldHint:  { fontSize: 13, color: 'rgb(174,174,174)', fontWeight: 400, marginTop: 4, whiteSpace: 'pre-line' },
  input: {
    width: '100%', border: '1px solid #e5e5e5', borderRadius: 8,
    padding: '10px 12px', fontSize: 14, fontFamily: 'inherit',
    color: '#0a0a0a', background: '#fff', outline: 'none',
    transition: 'border-color .12s, box-shadow .12s', boxSizing: 'border-box',
  },
  textarea: {
    width: '100%', border: '1px solid #e5e5e5', borderRadius: 8,
    padding: '10px 12px', fontSize: 14, fontFamily: 'inherit',
    color: '#0a0a0a', background: '#fff', outline: 'none',
    transition: 'border-color .12s, box-shadow .12s',
    boxSizing: 'border-box', minHeight: 72, resize: 'vertical',
  },
  dropBox: {
    border: '1px solid #e5e5e5', borderRadius: 8,
    background: '#fff', padding: 6, minHeight: 40,
    display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center',
    position: 'relative', cursor: 'pointer',
    transition: 'border-color .12s, box-shadow .12s',
  },
  dropBoxFocus: { borderColor: '#0a0a0a', boxShadow: '0 0 0 3px rgba(10,10,10,0.06)' },
  chip: {
    display: 'inline-flex', alignItems: 'center', gap: 4,
    background: '#f5f5f4', border: '1px solid #e7e5e4', borderRadius: 6,
    padding: '3px 2px 3px 10px', fontSize: 13, fontWeight: 500,
    color: '#0a0a0a', lineHeight: 1.4,
  },
  chipX: {
    border: 'none', background: 'transparent', cursor: 'pointer',
    padding: '0 6px', color: '#737373', display: 'inline-flex',
    alignItems: 'center', justifyContent: 'center',
    borderRadius: 4, height: 18, width: 18,
    transition: 'background .1s, color .1s',
  },
  placeholder:  { color: '#a3a3a3', fontSize: 14, paddingLeft: 6 },
  singleValue:  { color: '#0a0a0a', fontSize: 14, paddingLeft: 6 },
  caret: { marginLeft: 'auto', color: '#737373', padding: '0 8px', display: 'flex' },
  menu: {
    position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0,
    background: '#fff', border: '1px solid #e5e5e5', borderRadius: 10,
    boxShadow: '0 12px 28px -8px rgba(0,0,0,0.12), 0 4px 8px -4px rgba(0,0,0,0.06)',
    padding: 4, zIndex: 30, maxHeight: 280, overflowY: 'auto',
  },
  menuHeader: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '8px 10px 6px', fontSize: 11, fontWeight: 600,
    color: '#a3a3a3', textTransform: 'uppercase', letterSpacing: 0.6,
  },
  menuItem: {
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '10px 10px', borderRadius: 6, cursor: 'pointer',
    fontSize: 14, fontWeight: 500, color: '#0a0a0a',
    transition: 'background .08s',
  },
  check: {
    width: 16, height: 16, borderRadius: 4,
    border: '1.5px solid #d4d4d4', display: 'inline-flex',
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    background: '#fff', transition: 'all .12s',
  },
  checkOn: { background: '#0a0a0a', borderColor: '#0a0a0a', color: '#fff' },
  footer:  { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 24, gap: 16, flexWrap: 'wrap' },
  help:    { fontSize: 13, color: '#737373' },
  btnRow:  { display: 'flex', gap: 10, flexWrap: 'wrap' },
  btn: {
    fontFamily: 'inherit', fontSize: 14, fontWeight: 500,
    padding: '11px 20px', borderRadius: 8, cursor: 'pointer',
    border: '1px solid #e5e5e5', background: '#fff', color: '#0a0a0a',
    transition: 'all .12s', display: 'inline-flex', alignItems: 'center', gap: 8,
    whiteSpace: 'nowrap',
  },
  btnPrimary:  { background: '#0a0a0a', color: '#fff', border: '1px solid #0a0a0a' },
  btnGhost:    { background: 'transparent', border: '1px solid transparent', color: '#525252' },
  btnDanger:   { background: '#fff', color: '#b91c1c', border: '1px solid #fecaca' },
  btnDisabled: { background: '#e5e5e5', color: '#a3a3a3', border: '1px solid #e5e5e5', cursor: 'not-allowed' },
  countPill:   { background: '#f5f5f4', color: '#57534e', padding: '4px 10px', borderRadius: 999, fontSize: 12, fontWeight: 600 },
  sectionTitle: { fontSize: 20, fontWeight: 600, letterSpacing: -0.3, marginBottom: 4 },
  sectionSub:   { fontSize: 13, color: '#737373', marginBottom: 20 },
  divider: {
    height: 1,
    background: 'linear-gradient(to right, transparent, #e5e5e5 20%, #e5e5e5 80%, transparent)',
    margin: '48px 0 32px',
  },
  tableWrap: { overflowX: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse', minWidth: 820 },
  th: {
    textAlign: 'left', padding: '14px 18px', fontSize: 11,
    fontWeight: 600, color: '#737373', textTransform: 'uppercase',
    letterSpacing: 0.8, borderBottom: '1px solid #ebebeb',
    background: '#fafaf9', whiteSpace: 'nowrap',
  },
  thRight: { textAlign: 'right' },
  td: {
    padding: '16px 18px', verticalAlign: 'top',
    borderBottom: '1px solid #f4f4f4', fontSize: 14, lineHeight: 1.5,
  },
  tdRight: { textAlign: 'right', whiteSpace: 'nowrap' },
  iconBtn: {
    border: '1px solid #e5e5e5', background: '#fff',
    width: 30, height: 30, borderRadius: 6, cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    color: '#525252', marginLeft: 6, transition: 'all .12s',
  },
  emptyState: {
    padding: '48px 24px', textAlign: 'center', color: '#a3a3a3',
    fontSize: 14, borderBottom: '1px solid #f4f4f4',
  },
};

// ── Icons ──────────────────────────────────────────────────────────────────────

function HFCheckIcon({ on }) {
  return (
    <span style={{ ...hfStyles.check, ...(on ? hfStyles.checkOn : {}) }}>
      {on && (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1.5 5.5l2 2L8.5 2.5" />
        </svg>
      )}
    </span>
  );
}

function HFCaret() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 4.5L6 7.5 9 4.5" />
    </svg>
  );
}

function HFX({ size = 10 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M1.5 1.5l7 7M8.5 1.5l-7 7" />
    </svg>
  );
}

function HFArrowRight() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 6h8M7 3l3 3-3 3" />
    </svg>
  );
}

function HFArrowLeft() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 6H2M5 3L2 6l3 3" />
    </svg>
  );
}

function HFPlus() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M6 1.5v9M1.5 6h9" />
    </svg>
  );
}

function HFEdit() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 2.5l3 3L5 12H2v-3L8.5 2.5z" />
    </svg>
  );
}

function HFTrash() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 3.5h9M5.5 3.5V2.5a1 1 0 011-1h1a1 1 0 011 1v1M4 3.5l.5 8a1 1 0 001 1h3a1 1 0 001-1l.5-8" />
    </svg>
  );
}

// ── Multi-select dropdown ──────────────────────────────────────────────────────

function HFMultiSelect({ id, values, options, onToggle, open, setOpen, placeholder, showSelectAll = true, disabled = false }) {
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(null); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const allSelected = options.length > 0 && values.length === options.length;

  return (
    <div
      ref={ref}
      style={{ ...hfStyles.dropBox, ...(open ? hfStyles.dropBoxFocus : {}), ...(disabled ? { background: '#f5f5f4', cursor: 'not-allowed', opacity: 0.7 } : {}) }}
      onClick={() => !disabled && setOpen(open ? null : id)}
    >
      {values.length === 0 && <span style={hfStyles.placeholder}>{placeholder || 'Select one or more…'}</span>}
      {values.map((v) => (
        <span key={v} style={hfStyles.chip}>
          {v}
          <button
            style={hfStyles.chipX}
            onClick={(e) => { e.stopPropagation(); onToggle(v); }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#e7e5e4'; e.currentTarget.style.color = '#0a0a0a'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#737373'; }}
            aria-label={`Remove ${v}`}
          >
            <HFX />
          </button>
        </span>
      ))}
      <span style={hfStyles.caret}><HFCaret /></span>

      {open && !disabled && (
        <div style={hfStyles.menu} onClick={(e) => e.stopPropagation()}>
          <div style={hfStyles.menuHeader}>
            <span>Options · {values.length}/{options.length}</span>
            {showSelectAll && (
              <button
                onClick={() => {
                  if (allSelected) options.forEach((o) => values.includes(o) && onToggle(o));
                  else options.forEach((o) => !values.includes(o) && onToggle(o));
                }}
                style={{ border: 'none', background: 'transparent', color: '#0a0a0a', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.6, cursor: 'pointer', padding: 0 }}
              >
                {allSelected ? 'Clear' : 'Select all'}
              </button>
            )}
          </div>
          {options.length === 0 && (
            <div style={{ padding: '12px 10px', fontSize: 13, color: '#a3a3a3', fontStyle: 'italic' }}>
              No options available.
            </div>
          )}
          {options.map((o) => {
            const checked = values.includes(o);
            return (
              <div
                key={o}
                style={hfStyles.menuItem}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#fafaf9')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                onClick={() => onToggle(o)}
              >
                <HFCheckIcon on={checked} />
                {o}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Single-select dropdown ─────────────────────────────────────────────────────

function HFSingleSelect({ id, value, options, onChange, open, setOpen, placeholder }) {
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(null); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div
      ref={ref}
      style={{ ...hfStyles.dropBox, ...(open ? hfStyles.dropBoxFocus : {}) }}
      onClick={() => setOpen(open ? null : id)}
    >
      {!value
        ? <span style={hfStyles.placeholder}>{placeholder || 'Select…'}</span>
        : <span style={hfStyles.singleValue}>{value}</span>}
      <span style={hfStyles.caret}><HFCaret /></span>
      {open && (
        <div style={hfStyles.menu} onClick={(e) => e.stopPropagation()}>
          {options.map((o) => (
            <div
              key={o}
              style={{ ...hfStyles.menuItem, ...(o === value ? { background: '#fafaf9' } : {}) }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#fafaf9')}
              onMouseLeave={(e) => (e.currentTarget.style.background = o === value ? '#fafaf9' : 'transparent')}
              onClick={() => { onChange(o); setOpen(null); }}
            >
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: o === value ? '#0a0a0a' : '#e5e5e5', flexShrink: 0 }} />
              {o}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Stepper ────────────────────────────────────────────────────────────────────

function HFStepper({ step, onGoTo, reachable }) {
  const steps = ['Basic', 'Products', 'Sites', 'Overview'];
  return (
    <div style={hfStyles.stepper}>
      {steps.map((s, i) => {
        const done   = i < step;
        const active = i === step;
        const canGo  = onGoTo && reachable && reachable(i);
        return (
          <React.Fragment key={s}>
            <div
              style={{ ...hfStyles.step, ...(active ? hfStyles.stepActive : done ? hfStyles.stepDone : {}), ...(canGo ? hfStyles.stepClickable : {}) }}
              onClick={() => canGo && onGoTo(i)}
            >
              <span style={{ ...hfStyles.stepNum, ...(active ? hfStyles.stepNumActive : done ? hfStyles.stepNumDone : {}) }}>
                {done ? (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1.5 5.5l2 2L8.5 2.5" />
                  </svg>
                ) : i + 1}
              </span>
              {s}
            </div>
            {i < steps.length - 1 && <div style={hfStyles.stepLine} />}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ── Page chrome ────────────────────────────────────────────────────────────────

function HFPageShell({ step, goTo, reachable, crumbActive = 'Detailed application', children }) {
  return (
    <div style={hfStyles.page}>
      <div style={hfStyles.wrap}>
        <div style={hfStyles.crumbs}>
          <span>Applications</span>
          <span style={hfStyles.crumbSep}>/</span>
          <span>New certification</span>
          <span style={hfStyles.crumbSep}>/</span>
          <span style={hfStyles.crumbActive}>{crumbActive}</span>
        </div>
        <HFStepper step={step} onGoTo={goTo} reachable={reachable} />
        {children}
      </div>
    </div>
  );
}

// ── Searchable single-select dropdown ─────────────────────────────────────────

function HFSearchableSelect({ id, value, options, onChange, open, setOpen, placeholder }) {
  const ref      = React.useRef(null);
  const inputRef = React.useRef(null);
  const [query, setQuery] = React.useState('');

  React.useEffect(() => {
    if (!open) { setQuery(''); return; }
    setTimeout(() => inputRef.current && inputRef.current.focus(), 0);
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(null); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const filtered = options.filter((o) => o.toLowerCase().includes(query.toLowerCase()));

  return (
    <div
      ref={ref}
      style={{ ...hfStyles.dropBox, ...(open ? hfStyles.dropBoxFocus : {}) }}
      onClick={() => setOpen(open ? null : id)}
    >
      {open ? (
        <input
          ref={inputRef}
          style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: 14, fontFamily: 'inherit', color: '#0a0a0a', flex: 1, minWidth: 0, paddingLeft: 6 }}
          placeholder="Search…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onClick={(e) => e.stopPropagation()}
        />
      ) : (
        !value
          ? <span style={hfStyles.placeholder}>{placeholder || 'Select…'}</span>
          : <span style={hfStyles.singleValue}>{value}</span>
      )}
      <span style={hfStyles.caret}><HFCaret /></span>
      {open && (
        <div style={hfStyles.menu} onClick={(e) => e.stopPropagation()}>
          {filtered.length === 0 && (
            <div style={{ padding: '12px 10px', fontSize: 13, color: '#a3a3a3', fontStyle: 'italic' }}>No matches.</div>
          )}
          {filtered.map((o) => (
            <div
              key={o}
              style={{ ...hfStyles.menuItem, ...(o === value ? { background: '#fafaf9' } : {}) }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#fafaf9')}
              onMouseLeave={(e) => (e.currentTarget.style.background = o === value ? '#fafaf9' : 'transparent')}
              onClick={() => { onChange(o); setOpen(null); }}
            >
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: o === value ? '#0a0a0a' : '#e5e5e5', flexShrink: 0 }} />
              {o}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

Object.assign(window, {
  hfStyles,
  HFCheckIcon, HFCaret, HFX, HFArrowRight, HFArrowLeft, HFPlus, HFEdit, HFTrash,
  HFMultiSelect, HFSingleSelect, HFSearchableSelect, HFStepper, HFPageShell,
});

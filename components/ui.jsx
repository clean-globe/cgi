// Shared UI components — icons, dropdowns, stepper, page shell.
// hfStyles lives in data.js (plain JS, no JSX needed).

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
  const [menuPos, setMenuPos] = React.useState(null);

  React.useEffect(() => {
    if (!open) return;
    if (ref.current) {
      const r = ref.current.getBoundingClientRect();
      setMenuPos({ top: r.bottom + 6, left: r.left, width: r.width });
    }
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

      {open && !disabled && menuPos && (
        <div style={{ ...hfStyles.menu, position: 'fixed', top: menuPos.top, left: menuPos.left, width: menuPos.width, right: 'auto' }} onClick={(e) => e.stopPropagation()}>
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
  const [menuPos, setMenuPos] = React.useState(null);

  React.useEffect(() => {
    if (!open) return;
    if (ref.current) {
      const r          = ref.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - r.bottom - 10;
      const spaceAbove = r.top - 10;
      const maxH       = 360;
      if (spaceBelow >= 150 || spaceBelow >= spaceAbove) {
        setMenuPos({ top: r.bottom + 6, bottom: 'auto', left: r.left, width: r.width, maxHeight: Math.min(maxH, Math.max(150, spaceBelow)) });
      } else {
        setMenuPos({ top: 'auto', bottom: window.innerHeight - r.top + 6, left: r.left, width: r.width, maxHeight: Math.min(maxH, Math.max(150, spaceAbove)) });
      }
    }
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
      {open && menuPos && (
        <div style={{ ...hfStyles.menu, position: 'fixed', top: menuPos.top, bottom: menuPos.bottom, left: menuPos.left, width: menuPos.width, right: 'auto', maxHeight: menuPos.maxHeight }} onClick={(e) => e.stopPropagation()}>
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

// ── Page shell ─────────────────────────────────────────────────────────────────

function HFTopNav() {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div style={{
      width: '100%', background: '#fff', borderBottom: '1px solid #ebebeb',
      display: 'flex', alignItems: 'center', height: 48, padding: '0 48px',
      position: 'sticky', top: 0, zIndex: 50, boxSizing: 'border-box',
    }}>
      <a
        href="index.html"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontSize: 13, fontWeight: 600, textDecoration: 'none',
          color: hovered ? '#0a0a0a' : '#525252',
          transition: 'color .12s',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 7l6-5 6 5" />
          <path d="M2.5 6v5.5a.5.5 0 00.5.5h2.5V9h3v3H11a.5.5 0 00.5-.5V6" />
        </svg>
        Home
      </a>
    </div>
  );
}

function HFPageShell({ step, goTo, reachable, crumbActive = 'Detailed application', children }) {
  return (
    <>
      <HFTopNav />
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
    </>
  );
}

// ── Searchable single-select dropdown ─────────────────────────────────────────

function HFSearchableSelect({ id, value, options, onChange, open, setOpen, placeholder }) {
  const ref      = React.useRef(null);
  const inputRef = React.useRef(null);
  const [query, setQuery] = React.useState('');
  const [menuPos, setMenuPos] = React.useState(null);

  React.useEffect(() => {
    if (!open) { setQuery(''); return; }
    if (ref.current) {
      const r = ref.current.getBoundingClientRect();
      setMenuPos({ top: r.bottom + 6, left: r.left, width: r.width });
    }
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
      {open && menuPos && (
        <div style={{ ...hfStyles.menu, position: 'fixed', top: menuPos.top, left: menuPos.left, width: menuPos.width, right: 'auto' }} onClick={(e) => e.stopPropagation()}>
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
  HFCheckIcon, HFCaret, HFX, HFArrowRight, HFArrowLeft, HFPlus, HFEdit, HFTrash,
  HFMultiSelect, HFSingleSelect, HFSearchableSelect, HFStepper, HFPageShell, HFTopNav,
});

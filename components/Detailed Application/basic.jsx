// Basic Information screen — first step of the Detailed Application flow.

// ── Hierarchical tree selector: Applying Certification Standards & Verifications ─
// Nodes WITH children are section headers only — expand/collapse, not selectable.
// Only leaf nodes (no children) have a checkbox and can be selected.

function HFStandardsTree({ values, onChange }) {
  const [open,     setOpen]     = React.useState(false);
  const [expanded, setExpanded] = React.useState({});
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (!open) return;
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [open]);

  const toggleExpand = (id) => setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  const toggleLeaf = (label) => {
    if (values.includes(label)) onChange(values.filter((v) => v !== label));
    else onChange([...values, label]);
  };

  const renderNode = (node, depth) => {
    const isParent = !!node.children;
    const isExp    = !!expanded[node.id || node.label];
    const checked  = !isParent && values.includes(node.label);
    const nodeKey  = node.id || node.label;

    return (
      <React.Fragment key={nodeKey}>
        <div
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: `7px 12px 7px ${12 + depth * 18}px`,
            cursor: 'pointer', userSelect: 'none',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#f5f5f4')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          onClick={() => isParent ? toggleExpand(nodeKey) : toggleLeaf(node.label)}
        >
          <span style={{ width: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#737373' }}>
            {isParent && (
              <svg
                width="10" height="10" viewBox="0 0 10 10" fill="none"
                stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                style={{ transition: 'transform .15s', transform: isExp ? 'rotate(90deg)' : 'rotate(0deg)' }}
              >
                <path d="M3 2l4 3-4 3" />
              </svg>
            )}
          </span>

          <span style={{
            flex: 1, fontSize: 13, lineHeight: 1.4,
            fontWeight: isParent ? 600 : 400,
            color: isParent ? '#0a0a0a' : '#262626',
          }}>
            {node.id && `${node.id}  `}{node.label}
          </span>

          {!isParent && (
            <span style={{ ...hfStyles.check, ...(checked ? hfStyles.checkOn : {}), flexShrink: 0 }}>
              {checked && (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1.5 5.5l2 2L8.5 2.5" />
                </svg>
              )}
            </span>
          )}
        </div>

        {isParent && isExp && node.children.map((child) => renderNode(child, depth + 1))}
      </React.Fragment>
    );
  };

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <div
        style={{ ...hfStyles.dropBox, ...(open ? hfStyles.dropBoxFocus : {}), cursor: 'pointer' }}
        onClick={() => setOpen((v) => !v)}
      >
        {values.length === 0
          ? <span style={hfStyles.placeholder}>Select standards…</span>
          : values.map((v) => (
              <span key={v} style={hfStyles.chip}>
                {v}
                <button
                  style={hfStyles.chipX}
                  onClick={(e) => { e.stopPropagation(); onChange(values.filter((x) => x !== v)); }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#e7e5e4'; e.currentTarget.style.color = '#0a0a0a'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#737373'; }}
                  aria-label={`Remove ${v}`}
                >
                  <HFX />
                </button>
              </span>
            ))
        }
        <span style={hfStyles.caret}><HFCaret /></span>
      </div>

      {open && (
        <div style={{ ...hfStyles.menu, padding: '4px 0' }}>
          <div style={hfStyles.menuHeader}>
            <span>Standards · {values.length} selected</span>
            {values.length > 0 && (
              <button
                onClick={() => onChange([])}
                style={{ border: 'none', background: 'transparent', color: '#0a0a0a', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.6, cursor: 'pointer', padding: 0 }}
              >
                Clear all
              </button>
            )}
          </div>
          {window.CGI_STANDARDS_TREE.map((node) => renderNode(node, 0))}
        </div>
      )}
    </div>
  );
}

// ── Basic screen ───────────────────────────────────────────────────────────────

function HFBasic({ values, onChange, onNext }) {
  const done = values.length > 0;

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, marginBottom: 8 }}>
        <div>
          <div style={hfStyles.h1}>Basic Information</div>
          <div style={hfStyles.sub}>Select the standards you are applying for before moving on to Products.</div>
        </div>
      </div>
      <div style={hfStyles.card}>
        <div style={{ ...hfStyles.field, ...hfStyles.fieldLast }}>
          <div>
            <div style={hfStyles.fieldLabel}>Applying Certification Standards &amp; Verifications</div>
            <div style={hfStyles.fieldHint}>Required · expand sections to select</div>
          </div>
          <HFStandardsTree values={values} onChange={onChange} />
        </div>
      </div>
      <div style={hfStyles.footer}>
        <div style={hfStyles.help}>
          {done ? '✓ All fields complete' : '1 field remaining'}
        </div>
        <div style={hfStyles.btnRow}>
          <button
            style={{ ...hfStyles.btn, ...(done ? hfStyles.btnPrimary : hfStyles.btnDisabled) }}
            onClick={() => done && onNext()}
          >
            Continue to Products <HFArrowRight />
          </button>
        </div>
      </div>
    </>
  );
}

Object.assign(window, { HFBasic, HFStandardsTree });

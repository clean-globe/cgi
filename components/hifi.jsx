// Products Information screen — first step of the Detailed Application flow.

// ── Compound input: Claimed Materials (Raw Material + Attribute pair) ──────────

function HFClaimedMaterialsInput({ values, onChange }) {
  const [rawMaterial, setRawMaterial] = React.useState('');
  const [attribute,   setAttribute]   = React.useState('');
  const [openDrop,    setOpenDrop]     = React.useState(null);

  const canAdd = rawMaterial && attribute;

  const addEntry = () => {
    if (!canAdd) return;
    // If attribute is "No attribute", only store the raw material value
    const entry = attribute === 'No attribute' ? rawMaterial : `${attribute} ${rawMaterial}`;
    if (!values.includes(entry)) onChange([...values, entry]);
    setRawMaterial('');
    setAttribute('');
    setOpenDrop(null);
  };

  const remove = (entry) => onChange(values.filter((v) => v !== entry));

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <HFSearchableSelect
            id="cm-raw"
            value={rawMaterial}
            options={window.CGI_OPTIONS.rawMaterial}
            onChange={setRawMaterial}
            open={openDrop === 'cm-raw'}
            setOpen={setOpenDrop}
            placeholder="Raw Material"
          />
        </div>
        <div style={{ flex: 1 }}>
          <HFSingleSelect
            id="cm-attr"
            value={attribute}
            options={window.CGI_OPTIONS.attribute}
            onChange={setAttribute}
            open={openDrop === 'cm-attr'}
            setOpen={setOpenDrop}
            placeholder="Attribute"
          />
        </div>
        <button
          style={{ ...hfStyles.btn, ...(canAdd ? {} : hfStyles.btnDisabled), padding: '10px 14px', flexShrink: 0 }}
          onClick={addEntry}
          title="Add"
        >
          <HFPlus /> Add
        </button>
      </div>

      {values.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
          {values.map((v) => (
            <span key={v} style={hfStyles.chip}>
              {v}
              <button
                style={hfStyles.chipX}
                onClick={() => remove(v)}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#e7e5e4'; e.currentTarget.style.color = '#0a0a0a'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#737373'; }}
                aria-label={`Remove ${v}`}
              >
                <HFX />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Hierarchical tree selector: Applying Standards ────────────────────────────
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
          {/* Expand caret (parents only) or spacer (leaves) */}
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

          {/* Label */}
          <span style={{
            flex: 1, fontSize: 13, lineHeight: 1.4,
            fontWeight: isParent ? 600 : 400,
            color: isParent ? '#0a0a0a' : '#262626',
          }}>
            {node.id && `${node.id}  `}{node.label}
          </span>

          {/* Checkbox on leaf nodes only */}
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

        {/* Children — shown only when this parent is expanded */}
        {isParent && isExp && node.children.map((child) => renderNode(child, depth + 1))}
      </React.Fragment>
    );
  };

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      {/* Trigger */}
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

      {/* Tree panel */}
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

// ── Products screen ────────────────────────────────────────────────────────────

function HFProducts({ values, onChange, onNext }) {
  const [openField, setOpenField] = React.useState(null);

  const toggle = (field, opt) => {
    const cur = values[field];
    onChange({ ...values, [field]: cur.includes(opt) ? cur.filter((x) => x !== opt) : [...cur, opt] });
  };

  const allFilled     = window.CGI_FIELDS.every((f) => values[f.key].length > 0);
  const totalSelected = window.CGI_FIELDS.reduce((n, f) => n + values[f.key].length, 0);
  const remaining     = window.CGI_FIELDS.filter((f) => values[f.key].length === 0).length;

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, marginBottom: 8 }}>
        <div>
          <div style={hfStyles.h1}>Products Information</div>
          <div style={hfStyles.sub}>
            Tell us what you produce and which standards you're applying for.
            You can select multiple values in every field.
          </div>
        </div>
        <div style={{ ...hfStyles.countPill, marginBottom: 52 }}>{totalSelected} selected</div>
      </div>

      <div style={hfStyles.card}>
        {window.CGI_FIELDS.map((f, i) => (
          <div key={f.key} style={{ ...hfStyles.field, ...(i === window.CGI_FIELDS.length - 1 ? hfStyles.fieldLast : {}) }}>
            <div>
              <div style={hfStyles.fieldLabel}>{f.label}</div>
              <div style={hfStyles.fieldHint}>
                {f.key === 'claimedMaterials'
                  ? 'Required · select Raw Material + Attribute, then Add'
                  : f.key === 'applyingStandards'
                  ? 'Required · expand sections to select'
                  : 'Required · multi-select'}
              </div>
            </div>

            {f.key === 'claimedMaterials' ? (
              <HFClaimedMaterialsInput
                values={values.claimedMaterials}
                onChange={(next) => onChange({ ...values, claimedMaterials: next })}
              />
            ) : f.key === 'applyingStandards' ? (
              <HFStandardsTree
                values={values.applyingStandards}
                onChange={(next) => onChange({ ...values, applyingStandards: next })}
              />
            ) : (
              <HFMultiSelect
                id={f.key}
                values={values[f.key]}
                options={window.CGI_OPTIONS[f.key]}
                onToggle={(o) => toggle(f.key, o)}
                open={openField === f.key}
                setOpen={setOpenField}
              />
            )}
          </div>
        ))}
      </div>

      <div style={hfStyles.footer}>
        <div style={hfStyles.help}>
          {allFilled ? '✓ All fields complete' : `${remaining} field${remaining === 1 ? '' : 's'} remaining`}
        </div>
        <div style={hfStyles.btnRow}>
          <button
            style={{ ...hfStyles.btn, ...(allFilled ? hfStyles.btnPrimary : hfStyles.btnDisabled) }}
            onClick={() => allFilled && onNext()}
          >
            Continue to Sites <HFArrowRight />
          </button>
        </div>
      </div>
    </>
  );
}

window.HFProducts = HFProducts;

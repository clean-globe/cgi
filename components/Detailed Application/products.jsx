// Products Information screen — second step of the Detailed Application flow.

// ── Compound input: Claimed Materials (Raw Material + Attribute pair) ──────────

function HFClaimedMaterialsInput({ values, onChange, applyingStandards }) {
  const [rawMaterial, setRawMaterial] = React.useState('');
  const [attribute,   setAttribute]   = React.useState('');
  const [openDrop,    setOpenDrop]     = React.useState(null);
  const [note,        setNote]         = React.useState('');

  const canAdd = rawMaterial && attribute;

  const addEntry = () => {
    if (!canAdd) return;

    // Validate attribute against the standards selected in Basic UI.
    if (attribute !== 'No attribute' && applyingStandards && applyingStandards.length > 0) {
      const attrMap     = window.CGI_ATTRIBUTE_STANDARDS || {};
      const supportedBy = attrMap[attribute] || [];
      const hasMatch    = supportedBy.length > 0 && applyingStandards.some(s => supportedBy.includes(s));
      if (supportedBy.length > 0 && !hasMatch) {
        setNote(
          `The "${attribute}" attribute requires one of: ${supportedBy.join(', ')}. ` +
          `None of your selected standards support this attribute.`
        );
        return;
      }
    }

    setNote('');
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
            onChange={(v) => { setAttribute(v); setNote(''); }}
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

      {note && (
        <div style={{ marginTop: 8, fontSize: 13, color: '#b91c1c' }}>
          <span style={{ fontWeight: 600 }}>Note:</span> {note}
        </div>
      )}

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

// ── Products screen ────────────────────────────────────────────────────────────

function HFProducts({ values, onChange, applyingStandards, onPrev, onNext }) {
  const [openField, setOpenField] = React.useState(null);

  const toggle = (field, opt) => {
    const cur = values[field];
    onChange({ ...values, [field]: cur.includes(opt) ? cur.filter((x) => x !== opt) : [...cur, opt] });
  };

  const allFilled     = window.CGI_FIELDS.every((f) => values[f.key].length > 0);
  const totalSelected = window.CGI_FIELDS.reduce((n, f) => n + values[f.key].length, 0);
  const remaining     = window.CGI_FIELDS.filter((f) => values[f.key].length === 0).length;

  // Determine which applying standards comply with the claimed material attributes.
  const { compliantStandards, nonCompliantStandards } = React.useMemo(() => {
    const claims  = values.claimedMaterials || [];
    const attrMap = window.CGI_ATTRIBUTE_STANDARDS || {};
    // Sort by descending length so longer attribute names match before shorter prefixes.
    const knownAttrs = [...window.CGI_OPTIONS.attribute]
      .filter(a => a !== 'No attribute')
      .sort((a, b) => b.length - a.length);

    const usedAttrs = new Set();
    claims.forEach(entry => {
      for (const attr of knownAttrs) {
        if (entry.startsWith(attr + ' ')) { usedAttrs.add(attr); break; }
      }
    });

    if (usedAttrs.size === 0) {
      return { compliantStandards: applyingStandards, nonCompliantStandards: [] };
    }

    const compliantSet = new Set();
    usedAttrs.forEach(attr => (attrMap[attr] || []).forEach(s => compliantSet.add(s)));

    return {
      compliantStandards:    applyingStandards.filter(s =>  compliantSet.has(s)),
      nonCompliantStandards: applyingStandards.filter(s => !compliantSet.has(s)),
    };
  }, [values.claimedMaterials, applyingStandards]);

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, marginBottom: 8 }}>
        <div>
          <div style={hfStyles.h1}>Products Information</div>
          <div style={hfStyles.sub}>
            Tell us what you produce. You can select multiple values in every field.
          </div>
        </div>
        <div style={{ ...hfStyles.countPill, marginBottom: 52 }}>{totalSelected} selected</div>
      </div>

      <div style={hfStyles.card}>
        {window.CGI_FIELDS.map((f, i) => (
          <React.Fragment key={f.key}>
            <div style={{ ...hfStyles.field, ...(i === window.CGI_FIELDS.length - 1 ? hfStyles.fieldLast : {}) }}>
              <div>
                <div style={hfStyles.fieldLabel}>{f.label}</div>
                <div style={hfStyles.fieldHint}>
                  {f.key === 'claimedMaterials'
                    ? 'Required · select Raw Material + Attribute, then Add'
                    : 'Required · multi-select'}
                </div>
              </div>

              {f.key === 'claimedMaterials' ? (
                <HFClaimedMaterialsInput
                  values={values.claimedMaterials}
                  onChange={(next) => onChange({ ...values, claimedMaterials: next })}
                  applyingStandards={applyingStandards}
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

            {f.key === 'productGroup' && applyingStandards && applyingStandards.length > 0 && (
              <div style={hfStyles.field}>
                <div>
                  <div style={hfStyles.fieldLabel}>Applying Standards</div>
                  <div style={hfStyles.fieldHint}>Selected in Basic — read only</div>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {applyingStandards.map((s) => (
                    <span key={s} style={hfStyles.chip}>{s}</span>
                  ))}
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div style={hfStyles.footer}>
        <button style={hfStyles.btn} onClick={onPrev}>
          <HFArrowLeft /> Previous
        </button>
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

Object.assign(window, { HFProducts });

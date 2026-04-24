// Products Information screen — first step of the Detailed Application flow.

function HFProducts({ values, onChange, onNext }) {
  const [openField, setOpenField] = React.useState(null);

  const toggle = (field, opt) => {
    const cur = values[field];
    onChange({
      ...values,
      [field]: cur.includes(opt) ? cur.filter((x) => x !== opt) : [...cur, opt],
    });
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
          <div
            key={f.key}
            style={{ ...hfStyles.field, ...(i === window.CGI_FIELDS.length - 1 ? hfStyles.fieldLast : {}) }}
          >
            <div>
              <div style={hfStyles.fieldLabel}>{f.label}</div>
              <div style={hfStyles.fieldHint}>Required · multi-select</div>
            </div>
            <HFMultiSelect
              id={f.key}
              values={values[f.key]}
              options={window.CGI_OPTIONS[f.key]}
              onToggle={(o) => toggle(f.key, o)}
              open={openField === f.key}
              setOpen={setOpenField}
            />
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

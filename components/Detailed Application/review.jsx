// Review screen — Products summary (single row) + Sites summary table + Submit.

function HFReview({ applyingStandards, products, sites, onPrev, onSubmit }) {
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, marginBottom: 8 }}>
        <div>
          <div style={hfStyles.h1}>Overview</div>
          <div style={hfStyles.sub}>Confirm your application details before submitting.</div>
        </div>
      </div>

      {/* Basic — Applying Standards */}
      <div style={hfStyles.sectionTitle}>Basic Information</div>
      <div style={hfStyles.sectionSub}>Standards selected for this application.</div>
      <div style={{ ...hfStyles.cardPadded, marginBottom: 40 }}>
        <div style={hfStyles.tableWrap}>
          <table style={hfStyles.table}>
            <thead>
              <tr><th style={hfStyles.th}>Applying Standards</th></tr>
            </thead>
            <tbody>
              <tr>
                <td style={hfStyles.td}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                    {(applyingStandards || []).length === 0
                      ? <span style={{ color: '#a3a3a3', fontStyle: 'italic' }}>—</span>
                      : applyingStandards.map((v) => <span key={v} style={hfStyles.chip}>{v}</span>)}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Products — single-row summary table */}
      <div style={hfStyles.sectionTitle}>Products Information</div>
      <div style={hfStyles.sectionSub}>A single row summarising your product selections.</div>
      <div style={hfStyles.cardPadded}>
        <div style={hfStyles.tableWrap}>
          <table style={hfStyles.table}>
            <thead>
              <tr>
                {window.CGI_FIELDS.map((f) => (
                  <th key={f.key} style={hfStyles.th}>{f.shortLabel}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {window.CGI_FIELDS.map((f) => (
                  <td key={f.key} style={hfStyles.td}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                      {(products[f.key] || []).length === 0
                        ? <span style={{ color: '#a3a3a3', fontStyle: 'italic' }}>—</span>
                        : products[f.key].map((v) => <span key={v} style={hfStyles.chip}>{v}</span>)}
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ height: 40 }} />

      {/* Sites summary table */}
      <div style={hfStyles.sectionTitle}>Sites Information</div>
      <div style={hfStyles.sectionSub}>{sites.length} site{sites.length === 1 ? '' : 's'} included.</div>
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
              </tr>
            </thead>
            <tbody>
              {sites.length === 0 && (
                <tr><td colSpan="7" style={hfStyles.emptyState}>No sites.</td></tr>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer navigation */}
      <div style={hfStyles.footer}>
        <button style={hfStyles.btn} onClick={onPrev}>
          <HFArrowLeft /> Previous
        </button>
        <div style={hfStyles.btnRow}>
          <button style={{ ...hfStyles.btn, ...hfStyles.btnPrimary }} onClick={onSubmit}>
            Submit application <HFArrowRight />
          </button>
        </div>
      </div>
    </>
  );
}

window.HFReview = HFReview;

// Shared options & fields across all screens.
window.CGI_OPTIONS = {
  productGroup:      ['Apparel', 'Fibers', 'Fabrics', 'Yarns'],
  rawMaterial:       ['Acetate', 'Acrylic', 'Acrylonitrile butadiene styrene (ABS)', 'Alpaca', 'Angora', 'Animal fiber other', 'Bamboo', 'Camel', 'Cashmere', 'Coir', 'Copper', 'Cotton', 'Cupro', 'Diacetate', 'Down', 'Dummy', 'Elastane (spandex)', 'Elastomultilester (elasterell-P)', 'Ethylene vinyl acetate', 'Feather', 'Flax (linen)', 'Glass', 'Grease', 'Guanaco', 'Hemp', 'Iron', 'Jute', 'Kapok', 'Lama', 'Latex', 'Leather bovine (cattle, calf)', 'Leather caprine (goat)', 'Leather fiber', 'Leather other', 'Leather ovine (sheep)', 'Leather porcine (pig)', 'Lyocell', 'Metal', 'Metallic fibers', 'Mixed down and feather', 'Mixed fibers', 'Modacrylic', 'Modal', 'Mohair', 'Natural rubber', 'Nettle', 'Other', 'Polyamide (nylon)', 'Polybutylene terephthalate (PBT)', 'Polycarbonate (PC)', 'Polycarbonate-acrylonitrile butadiene styrene (PC-ABS)', 'Polyester', 'Polyethylene', 'Polyethylene terephthalate (PET)', 'Polylactic acid (PLA)', 'Polypropylene', 'Polystyrene', 'Polyurethane', 'Protein', 'Ramie', 'Shearling', 'Silk', 'Sisal', 'Synthetic rubber', 'Thermoplastic elastomer (TPE)', 'Thermoplastic polyurethane (TPU)', 'Thermoplastic rubber (TPR)', 'Triacetate', 'Vicuna', 'Viscose (rayon)', 'Wood', 'Wool', 'Yak', 'Zinc'],
  attribute:         ['No attribute', 'In-conversion', 'Organic', 'Recycled pre/post-consumer', 'Recycled pre-consumer', 'Recycled post-consumer', 'Responsible', 'Sustainably sourced', 'Content claimed', 'Recycled pre-consumer organic', 'Reclaimed pre-consumer', 'Reclaimed post-consumer'],
  // applyingStandards options are now driven by CGI_STANDARDS_TREE (see below)
  inputMaterials:    ['Yarn', 'Fiber'],
  siteType:          ['Main', 'Facility', 'Associated Subcontractor', 'Independently Certified Subcontractor'],
  processes:         ['Manufacturing', 'Printing', 'Washing', 'Trading', 'Dyeing'],
};

window.CGI_FIELDS = [
  { key: 'productGroup',     label: 'Product Group (PG)',                               shortLabel: 'Product Group'     },
  { key: 'claimedMaterials', label: 'Claimed Materials',                                 shortLabel: 'Claimed Materials' },
  { key: 'inputMaterials',   label: 'Input Materials Purchase (Outside of the Scope)',    shortLabel: 'Input Materials'   },
];

// Hierarchical standards tree — leaf labels are what gets stored in applyingStandards[].
window.CGI_STANDARDS_TREE = [
  { label: 'GOTS' },
  { label: 'Sustainable Fibre Alliance (SFA) – Chain of Custody Standard' },
  {
    label: 'Textile Exchange Standards',
    children: [
      {label: 'Content Claim Standard (CCS)' },
      {label: 'Organic Content Standard (OCS)' },
      {label: 'Recycled Claim Standard (RCS)' },
      {label: 'Global Recycled Standard (GRS)' },
      {label: 'Responsible Down Standard (RDS) – Supply Chain' },
      {label: 'Materials Matter Standard (MMS)' },
      {
        label: 'Responsible Animal Fiber – Supply Chain',
        children: [
          { label: 'Responsible Wool Standard (RWS)' },
          { label: 'Responsible Mohair Standard (RMS)' },
          { label: 'Responsible Alpaca Standard (RAS)' },
        ],
      },
    ],
  },
  {
    label: 'Better Cotton',
    children: [
      { label: 'Better Cotton Chain of Custody Standard' },
      { label: 'Self Assessment' },
      { label: 'Better Cotton – Independent Assessment' },
    ],
  },
  {
    label: 'Ocean Bound Plastic Program (OBP)',
    children: [
      { label: 'OBP Collection Organization' },
      { label: 'OBP Recycling Organization' },
      { label: 'OBP Plastic User and Producer' },
    ],
  },
  { label: 'PDS' },
];

// Maps each claimed-material attribute to the standard labels it is compliant with.
// Source table (Standard → Attribute):
//   CCS  → Content claimed
//   GOTS → In-conversion, Organic, Recycled pre/post-consumer, Sustainably sourced, Recycled pre-consumer organic
//   GRS  → Recycled pre-consumer, Recycled post-consumer
//   OCS  → In-conversion, Organic
//   RAF  → Responsible  (leaf standards: RWS, RMS, RAS)
//   RCS  → Recycled pre-consumer, Recycled post-consumer
//   RDS  → Responsible
window.CGI_ATTRIBUTE_STANDARDS = {
  'In-conversion':              ['GOTS', 'Organic Content Standard (OCS)'],
  'Organic':                    ['GOTS', 'Organic Content Standard (OCS)'],
  'Recycled pre/post-consumer': ['GOTS'],
  'Sustainably sourced':        ['GOTS'],
  'Recycled pre-consumer organic': ['GOTS'],
  'Recycled pre-consumer':      ['Global Recycled Standard (GRS)', 'Recycled Claim Standard (RCS)'],
  'Recycled post-consumer':     ['Global Recycled Standard (GRS)', 'Recycled Claim Standard (RCS)'],
  'Responsible':                [
    'Responsible Down Standard (RDS) – Supply Chain',
    'Responsible Wool Standard (RWS)',
    'Responsible Mohair Standard (RMS)',
    'Responsible Alpaca Standard (RAS)',
  ],
  'Content claimed':            ['Content Claim Standard (CCS)'],
};

window.CGI_SITE_FIELDS = [
  { key: 'siteName',    label: 'Site Name',    kind: 'text',     placeholder: 'Site Name'  },
  { key: 'siteAddress', label: 'Site Address', kind: 'textarea', placeholder: 'Street, City, Country'   },
  { key: 'siteType',    label: 'Site Type',    kind: 'single',   source: 'siteType'                     },
  { key: 'processes',      label: 'Processes',                                                    kind: 'multi',    source: 'processes'                    },
  { key: 'numberOfPeople', label: 'No. of People Working (including contractors & staff)',    kind: 'text',     placeholder: 'Enter number'            },
  { key: 'standards',      label: 'Standards',                                                kind: 'multi',    source: 'applyingStandardsDynamic'     },
];

// ── Shared UI styles ──────────────────────────────────────────────────────────
// Plain JS object — no JSX needed. Loaded here so all screen components can
// reference window.hfStyles (or just hfStyles as a global) after data.js loads.
window.hfStyles = {
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
  stepDone:   { color: '#0a0a0a' },
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
    padding: 4, zIndex: 30, maxHeight: 360, overflowY: 'auto',
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

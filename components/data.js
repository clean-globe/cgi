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

window.CGI_SITE_FIELDS = [
  { key: 'siteName',    label: 'Site Name',    kind: 'text',     placeholder: 'Site Name'  },
  { key: 'siteAddress', label: 'Site Address', kind: 'textarea', placeholder: 'Street, City, Country'   },
  { key: 'siteType',    label: 'Site Type',    kind: 'single',   source: 'siteType'                     },
  { key: 'processes',   label: 'Processes',    kind: 'multi',    source: 'processes'                    },
  { key: 'standards',   label: 'Standards',    kind: 'multi',    source: 'applyingStandardsDynamic'     },
];

// Shared options & fields across all screens.
window.CGI_OPTIONS = {
  productGroup:      ['Apparel', 'Fibers', 'Fabrics', 'Yarns'],
  claimedMaterials:  ['Recycled Polyester', 'Organic Cotton'],
  applyingStandards: ['GRS', 'RCS', 'OCS'],
  inputMaterials:    ['Yarn', 'Fiber'],
  siteType:          ['Main', 'Facility', 'Associated Subcontractor', 'Independently Certified Subcontractor'],
  processes:         ['Manufacturing', 'Printing', 'Washing', 'Trading', 'Dyeing'],
};

window.CGI_FIELDS = [
  { key: 'productGroup',      label: 'Product Group (PG)',                               shortLabel: 'Product Group'      },
  { key: 'claimedMaterials',  label: 'Claimed Materials',                                 shortLabel: 'Claimed Materials'  },
  { key: 'applyingStandards', label: 'Applying Standards',                                shortLabel: 'Applying Standards' },
  { key: 'inputMaterials',    label: 'Input Materials Purchase (Outside of the Scope)',    shortLabel: 'Input Materials'    },
];

window.CGI_SITE_FIELDS = [
  { key: 'siteName',    label: 'Site Name',    kind: 'text',     placeholder: 'e.g. Colombo Main Unit'  },
  { key: 'siteAddress', label: 'Site Address', kind: 'textarea', placeholder: 'Street, City, Country'   },
  { key: 'siteType',    label: 'Site Type',    kind: 'single',   source: 'siteType'                     },
  { key: 'processes',   label: 'Processes',    kind: 'multi',    source: 'processes'                    },
  { key: 'standards',   label: 'Standards',    kind: 'multi',    source: 'applyingStandardsDynamic'     },
];

export const PARAMS = {
  organization: 'org',
  page: 'page',
  sort: 'sort'
}

export const PARAM_DEFAULTS = {
  [PARAMS.organization]: 'netflix',
  [PARAMS.page]: '1',
  [PARAMS.sort]: 'updated'
}

export const RESULTS_PER_PAGE = 100; // Github's API allows for a max of 100.

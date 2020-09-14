import { writable } from 'svelte/store';
import { PARAM_DEFAULTS } from './constants';


// These are separate to demo default Svelte stores.
// A better approach is to init an initialState{} via Immer
// and have these become fields of that state.
export const repos = writable([]);
export const organization = writable(PARAM_DEFAULTS.org);
export const listedOrg = writable(PARAM_DEFAULTS.org);
export const unsortedRepos = writable([]);
export const currentPage = writable('1');
export const sortBy = writable(PARAM_DEFAULTS.sort);
export const pageLinks = writable({});
export const fetching = writable(true);
export const fetchError = writable('');
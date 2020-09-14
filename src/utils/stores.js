import { writable } from 'svelte/store';
import { PARAM_DEFAULTS } from './constants';


export const repos = writable([]);
export const organization = writable(PARAM_DEFAULTS.org);
export const unsortedRepos = writable([]);
export const currentPage = writable(1);
export const sortBy = writable(PARAM_DEFAULTS.sort);
export const pageLinks = writable({});
export const fetching = writable(true);
export const fetchError = writable('');
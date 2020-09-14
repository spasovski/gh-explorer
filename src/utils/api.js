import { PARAMS, PARAM_DEFAULTS, RESULTS_PER_PAGE } from './constants';
import { pageLinks, repos, unsortedRepos, fetching, fetchError} from './stores';
import { getSortedRepos } from './utils';


export async function getRepos(url, org, page, sort) {
	let endpoint = url;
	if (!endpoint) {
		endpoint = `https://api.github.com/orgs/${org}/repos?per_page=${RESULTS_PER_PAGE}&sort=${PARAM_DEFAULTS[PARAMS.sort]}&page=${page}`;
	}

	fetching.set(true);
	fetchError.set('');
	const res = await fetch(endpoint);
	const json = await res.json();

	if (res.ok) {
		// pagination links are stored in the header so need to tokenize + extract
		const links = res.headers.get('link').split(',');
		const paginationLinks = {};
		links.forEach(link => {
			const tokens = link.split('; ');
			const url = tokens[0].replace(/<|>/g, '');
			const rel = tokens[1].split('=')[1].replace(/"/g, ''); // for example 'next' from rel="next"
			paginationLinks[rel] = url.trim(); // for example paginationLinks.next = 'https://...'
		});

		if (sort !== PARAM_DEFAULTS[PARAMS.sort]) {
			repos.set(getSortedRepos(json, sort));
		} else {
			repos.set(json);
		}
		unsortedRepos.set(json);
		pageLinks.set(paginationLinks);
		fetching.set(false);
	} else {
		fetching.set(false);
		fetchError.set(res.statusText);
	}
}

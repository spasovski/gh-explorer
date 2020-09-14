<script>
	import { onMount } from 'svelte';
	import OrganizationForm from './OrganizationForm.svelte';
	import RepoList from './RepoList.svelte';
	import Paginator from './Paginator.svelte';
	import { PARAMS, PARAM_DEFAULTS, RESULTS_PER_PAGE } from './utils/constants';
  import { updateURI } from './utils/url';
  import { getRepos } from './utils/api';
  import { currentPage, organization, sortBy, listedOrg} from './utils/stores';


	function populateInitialParamState() {
    const params = new URLSearchParams(window.location.search);

    // set local vars from url params if any
    for (let [name, value] of params.entries()) {
      if (name === PARAMS.organization) {
        $organization = value;
        $listedOrg = value;
      } else if (name === PARAMS.page) {
        $currentPage = value;
      } else if (name === PARAMS.sort) {
        $sortBy = value;
      }
		}
  }

	onMount(() => {
    populateInitialParamState();
    getRepos('', $organization, $currentPage, $sortBy);
  });
</script>

<div class="global-container">
	<header class="global-header">
		<h1>GitHub Explorer</h1>
	</header>

	<main>
    <OrganizationForm />
    <Paginator />
    <RepoList />
	</main>
</div>
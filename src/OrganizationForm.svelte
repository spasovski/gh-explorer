<script>
  import LoadingDots from './LoadingDots.svelte';
  import { currentPage, organization, fetching, repos, unsortedRepos, sortBy, fetchError} from './utils/stores';
  import { PARAMS, PARAM_DEFAULTS } from './utils/constants';
  import { updateURI } from './utils/url';
  import { getRepos } from './utils/api';


  let name = '';

  function changeOrgName(evt) {
    evt.preventDefault();
    $organization = name;
    $currentPage = 1;
    updateURI([{[PARAMS.organization]: $organization}, {[PARAMS.page]: $currentPage}]);
    getRepos('', $organization, $currentPage, $sortBy);
  }
</script>

<form class="org-form" on:submit={changeOrgName}>
  <label for="org-name-input">Organization Name</label>
  <input type="text" placeholder="enter github organization name" bind:value={name} class="org-name-input" id="org-name-input">
  <button type="submit" class="btn {$fetching ? 'loading' : ''}">
    {#if $fetching}
      <LoadingDots />
    {:else}
      show repos
    {/if}
  </button>
</form>

{#if $fetchError}<p class="error">Error fetching resource: {$fetchError}</p>{/if}

<style>
  .org-form {
    display: grid;
    grid-template-areas:
    'label label'
    'input button'
    'message message';
    grid-template-columns: 3fr 1fr;
    grid-template-rows: auto;
    gap: var(--grid-gap-medium);
    width: 60%;
    margin: 0 auto;
  }
  .org-form label {
    grid-area: label;
  }
  .org-name-input {
    height: var(--form-field-height-medium);
    border-radius: var(--border-radius-02);
    grid-area: input;
  }
  .org-name-input::placeholder {
    color: var(--input-placeholder-color);
    opacity: 1;
    font-weight: 500;
  }
  .btn {
    grid-area: button;
    transition: all 300ms;
  }
  .btn:not(.loading):hover {
    background-color: var(--btn-hover-color);
  }
  .btn.loading {
    pointer-events: none;
  }
</style>

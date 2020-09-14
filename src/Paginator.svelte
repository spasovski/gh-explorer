<script>
  import { currentPage, fetching, fetchError, pageLinks, organization, repos, unsortedRepos, sortBy} from './utils/stores';
  import LoadingDots from './LoadingDots.svelte';
  import { PARAMS, PARAM_DEFAULTS, RESULTS_PER_PAGE } from './utils/constants';
  import { updateURI } from './utils/url';
  import { getRepos } from './utils/api';


  const handlePageChange = (url) => {
    const params = new URLSearchParams(url);
		$currentPage = params.get(PARAMS.page);
    updateURI([{[PARAMS.page]: $currentPage}]);
    getRepos(url);
  }
</script>

{#if Object.keys($pageLinks).length}
  {#if $fetching}
    <div class="page-navigation">
      <div class="paginator">
        <LoadingDots />
      </div>
    </div>
  {:else}
    {#if !$fetchError}
      <nav class="page-navigation" aria-label="page navigation">
        <ul class="paginator">
          <li class="current-page">page <em>{$currentPage}</em></li>
          <li class="first">
            <button disabled={!$pageLinks.first} title="first page" on:click={() => handlePageChange($pageLinks.first)}>first</button>
          </li>
          <li class="prev">
            <button disabled={!$pageLinks.prev} title="previous page" on:click={() => handlePageChange($pageLinks.prev)}>previous</button>
          </li>
          <li class="next">
            <button disabled={!$pageLinks.next} title="next page" on:click={() => handlePageChange($pageLinks.next)}>next</button>
          </li>
          <li class="last">
            <button disabled={!$pageLinks.last} title="last page" on:click={() => handlePageChange($pageLinks.last)}>last</button>
          </li>
        </ul>
      </nav>
    {/if}
  {/if}
{/if}

<style>
  .page-navigation {
    position: relative;
  }
  .paginator {
    display: flex;
    grid-gap: var(--grid-gap-medium);
    align-items: center;
    font-weight: 400;
    font-size: var(--text-size-minor-label);
    justify-content: flex-end;
    position: absolute;
    top: 16px;
    right: 0;
  }
  .paginator button {
    height: var(--form-field-height-medium);
    min-width: var(--form-field-height-medium);
    border-radius: var(--border-radius-02);
    display: inline-block;
    line-height: var(--form-field-height-medium);
    text-align: center;
    background: transparent url('../img/icons/arrowhead_right.svg') no-repeat center;
    border: 1.5px solid var(--primary-text-color);
    cursor: pointer;
    text-indent: -99999em;
    overflow: hidden;
    opacity: 0.8;
    transition: all 300ms;
  }
  .paginator button:disabled {
    cursor: default;
    pointer-events: none;
    opacity: 0.4;
  }
  .paginator .current-page em {
    font-size: var(--btn-font-size-medium);
    font-style: normal;
    display: inline-block;
    border-radius: 16px;
    background-color: var(--btn-hover-color);
    width: 32px;
    height: 32px;
    vertical-align: middle;
    line-height: 32px;
    text-align: center;
    margin-left: var(--grid-gap-medium);
  }
  .paginator .first button,
  .paginator .last button {
    background: url('../img/icons/arrowhead_right.svg') no-repeat 10px, transparent url('../img/icons/arrowhead_right.svg') no-repeat 4px;
  }
  .paginator .first button,
  .paginator .prev button {
    transform: rotate(180deg);
  }
  .paginator li button:hover {
    background-color: var(--btn-hover-color);
  }
</style>
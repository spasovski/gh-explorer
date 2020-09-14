<script>
  import { fly } from 'svelte/transition';
  import { currentPage, fetching, organization, repos, unsortedRepos, sortBy, fetchError} from './utils/stores';
  import { PARAMS, PARAM_DEFAULTS } from './utils/constants';
  import { updateURI } from './utils/url';
  import { getSortedRepos } from './utils/utils';


  const togglePopularitySort = () => {
    if ($sortBy === 'leastpopular') {
      $sortBy = 'mostpopular';
    } else {
      $sortBy = 'leastpopular';
    }
    updateURI([{[PARAMS.sort]: $sortBy}]);
    $repos = getSortedRepos($repos, $sortBy);
  }

  $: reposToList = $sortBy === 'leastpopular' || $sortBy === 'mostpopular' ? $repos : $unsortedRepos;

  const getDateString = date => (new Date(date)).toLocaleDateString();
</script>

{#if !$fetchError}<h2>{$organization} repositories</h2>{/if}
{#if reposToList && !$fetching && !$fetchError}
  <table class="repo-table">
    <thead>
      <tr>
        <th>repository</th>
        <th>description</th>
        <th>updated</th>
        <th class="popularity-sort">
          {#if $sortBy === 'mostpopular' || $sortBy === 'leastpopular'}
            <button
              transition:fly={{ x: 200, duration: 300 }}
              class="reset-sort"
              on:click={() => {
                $sortBy = PARAM_DEFAULTS[PARAMS.sort];
                updateURI([{[PARAMS.sort]: $sortBy}]);
              }}
              title="Reset page results without popularity sort.">
                reset
              </button>
          {/if}
          <button
            class={$sortBy === 'updated' ? 'btn-sort' : $sortBy === 'mostpopular' ? 'btn-sort asc' : 'btn-sort desc'}
            on:click={togglePopularitySort}
            title="This only affects the current page since the GitHub API does not allow for sorting by # of forks."
          >
            forks
          </button>
        </th>
      </tr>
    </thead>
    <tbody>
      {#each reposToList as repo (repo.id)}
        <tr>
          <td class="name"><a href={repo.html_url} target="_blank">{repo.name}</a></td>
          <td class="description" title={repo.description ? repo.description : ''}>
            {#if repo.description}
              {repo.description}
            {:else}
              <em class="missing">none provided</em>
            {/if}
          </td>
          <td class="updated">{getDateString(repo.updated_at)}</td>
          <td class="forks">{repo.forks_count}</td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}

<style>
  h2 {
    text-transform: lowercase;
  }
  .repo-table thead {
    position: sticky;
    top: 0;
  }
  .repo-table thead tr {
    background: var(--digital-blue-650);
    border-radius: var(--border-radius-02);
  }
  .repo-table tr {
    display: grid;
    grid-auto-flow: row;
    grid-template-columns: 3fr 5fr 2fr 1fr;
    gap: var(--grid-gap-medium);
    line-height: var(--table-cell-height);
    margin-bottom: 1px;
  }
  .description {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .forks {
    text-align: right;
  }
  .repo-table tbody tr {
    background: linear-gradient(to right, rgba(255,255,255,0.12), rgba(255,255,255,0.04));
    padding: 0 var(--grid-gap-medium);
  }
  .repo-table tbody tr:nth-child(even) {
    background: linear-gradient(to left, rgba(255,255,255,0.12), rgba(255,255,255,0.04));
  }
  .repo-table tbody tr:hover {
    background: linear-gradient(to right, rgba(0, 0, 0, 0.15), rgba(0,0,0,0.05));
  }
  .repo-table tbody tr:first-child {
    border-radius: var(--border-radius-02) var(--border-radius-02) 0 0;
  }
  .repo-table tbody tr:last-child {
    border-radius: 0 0 var(--border-radius-02) var(--border-radius-02);
  }
  .missing {
    opacity: 0.6;
  }
  .name {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .updated {
    text-align: center;
  }
  .btn-sort,
  .reset-sort {
    background-color: transparent;
    border: 0;
    cursor: pointer;
    position: relative;
    color: var(--primary-text-color);
    font-size: 16px;
    font-weight: 700;
  }
  .btn-sort::after {
    content: "";
    background: var(--btn-hover-color) url('../img/icons/arrowhead_right.svg') no-repeat center;
    background-size: 10px 10px;
    position: absolute;
    height: 14px;
    width: 14px;
    top: 10px;
    right: -15px;
    transform: rotate(90deg);
    border-radius: 7px;
    opacity: 0;
    transition: all 300ms;
  }
  .btn-sort.asc::after {
    opacity: 1;
  }
  .btn-sort.desc::after {
    opacity: 1;
    transform: rotate(-90deg);
  }
  .btn-sort:hover {
    text-decoration: underline;
  }
  .popularity-sort {
    position: relative;
    padding-right: var(--grid-gap-medium);
  }
  .reset-sort {
    position: absolute;
    top: 8px;
    left: calc(100% + var(--grid-gap-medium));
    padding: 0 var(--grid-gap-medium);
    line-height: var(--space-scale-05);
    background-color: var(--btn-hover-color);
    border-radius: var(--border-radius-02);
    font-weight: 400;
  }
</style>
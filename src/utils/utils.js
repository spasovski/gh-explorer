export const getSortedRepos = (repos, sortBy) => {
  let sorted = [...repos];

  if (sortBy === 'mostpopular') {
    sorted.sort((a, b) => b.forks_count - a.forks_count);
  } else {
    sorted.sort((a, b) => a.forks_count - b.forks_count);
  }

  return sorted;
}

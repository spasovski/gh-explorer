
# GitHub Explorer

This is a Svelte front-end project to display a list of public repositories on GitHub for a given organization (defaults to Netflix).

For detailed info on what the GH public API supports please visit https://docs.github.com/en/rest/reference/repos#list-organization-repositories

## Get started

*Note that you will need to have [Node.js](https://nodejs.org) installed.*

Install the dependencies. From within the project directory..

```bash
npm install
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

To run the test suite via cypress

```bash
npm run test
```

Navigate to [localhost:5000](http://localhost:5000). You should see the app running.

By default, the server will only respond to requests from localhost. To allow connections from other computers, edit the `sirv` commands in package.json to include the option `--host 0.0.0.0`.


## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

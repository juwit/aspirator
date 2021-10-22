# aspirator

a script that clones github repositories

## pre-requisites

* a NodeJS environment
* a personal access token for your github account, with the `repo` scope (can be created at https://github.com/settings/tokens)

## usage

### with zx

* install zx : `npm i -g zx`
* install dependencies: `npm i`
* run the script : `zx ./aspirator.mjs` or `./aspirator.mjs`

### with npx

* install dependencies: `npm i`
* run the script : `npx zx ./aspirator.mjs`

## configuration

aspirator can also be configured with environment variables:

| env var          | description                                       |
|------------------|---------------------------------------------------|
| GITHUB_TOKEN     | a Github personal access token, with `repo` scope |
| REPO_NAME_FILTER | a regex pattern to filter repository names        |

#!/usr/bin/env zx

// import Octokit as Github client API
import { Octokit } from "octokit";

// check for GITHUB_TOKEN env var
let { GITHUB_TOKEN } = process.env;

if( ! GITHUB_TOKEN ){
    GITHUB_TOKEN = await question("Please input a Github personal access token (with repo read scope): ");
}

if( ! GITHUB_TOKEN ){
    console.error("A GITHUB_TOKEN is required.");
    process.exit(1);
}

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});


// get the filter string
let { REPO_NAME_FILTER } = process.env;
if( ! REPO_NAME_FILTER ){
    REPO_NAME_FILTER = await question("Please input a repo name filter regex (defaults to '.*' ): ");
}
if( ! REPO_NAME_FILTER ){
    REPO_NAME_FILTER = ".*";
}

console.log("listing repositories...");

const repos = await octokit.paginate(
    octokit.rest.repos.listForAuthenticatedUser,
    {
        visibility: "all",
        per_page: 100,
    },
    response => response.data.filter(it => new RegExp(REPO_NAME_FILTER).test(it.full_name) )
);

console.log(`found ${repos.length} repositories to clone`);

console.log(`cleaning old repositories folder`);
await $`rm -rf repositories`

console.log(`creating repositories folder`);
await $`mkdir repositories`
cd("repositories");

for( const repo of repos ){
    console.log(`cloning ${repo.full_name} to ${repo.name}...`);
    await $`git clone ${repo.ssh_url}`
    console.log()
}

console.log("Done");
const axios = require('axios').default;

const baseURL = "https://api.github.com";
const options = { headers: { Accept: "Accept: application/vnd.github.v3+json" } };

async function getUserRepositories(username) {
    const url = `${baseURL}/users/${username}/repos`;
    const response = await axios.get(url, options);
    return response.data;
}

async function getUserRepositoryBranches(username, repositoryName) {
    const url = `${baseURL}/repos/${username}/${repositoryName}/branches`;
    const response = await axios.get(url, options);
    return response.data;
}

exports.getUserRepositories = getUserRepositories;
exports.getUserRepositoryBranches = getUserRepositoryBranches;
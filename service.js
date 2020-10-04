const githubAPI = require('./githubAPI');

async function getRepoInfo(userName) {
    const repositories = await githubAPI.getUserRepositories(userName);
    const result = await Promise.all(repositories.filter(repo => !repo.fork).map(repo => mapResult(userName, repo)));
    return result;
}

async function mapResult(userName, repository) {

    const branchesData = await githubAPI.getUserRepositoryBranches(userName, repository.name);

    let branches = branchesData.map((item) => ({ branchName: item.name, lastCommitSha: item.commit.sha }));

    return {
        repositoryName: repository.name,
        ownerLogin: repository.owner.login,
        branches
    };
}

exports.getRepoInfo = getRepoInfo;
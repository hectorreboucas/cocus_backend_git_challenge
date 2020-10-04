const { expect } = require('chai');
const sinon = require('sinon');
const service = require('../../service');
const gitAPI = require('../../githubAPI');
const fs = require('fs');

const fileToJson = (filePath) => JSON.parse(fs.readFileSync(filePath));

describe('repositoryService', function () {
    before('set mock environment', function () {
        this.getUserRepositoriesStub = sinon.stub(gitAPI, 'getUserRepositories');
        this.getUserRepositoryBranches = sinon.stub(gitAPI, 'getUserRepositoryBranches');
        this.getUserRepositoriesStub.returns(Promise.resolve(fileToJson('./tests/repo/mocks/repoResponse.json')));
        this.getUserRepositoryBranches.returns(Promise.resolve(fileToJson('./tests/repo/mocks/branchResponse.json')));
    });

    after('cleanup mock environment', function () {
        this.getUserRepositoriesStub.restore();
        this.getUserRepositoryBranches.restore();
    });

    describe('getRepoInfo', function () {
        it('check if is returning only not forked repositories', async function () {
            const data = await service.getRepoInfo('hectorreboucas');
            expect(data).to.have.lengthOf(1);
            expect(data[0].repositoryName).to.be.equal("issuemanager");
        });

        it('deep check response', async function () {
            const data = await service.getRepoInfo('hectorreboucas');

            expect(data).to.be.deep.equal(
                [
                    {
                        "repositoryName": "issuemanager",
                        "ownerLogin": "hectorreboucas",
                        "branches": [
                            {
                                "branchName": "develop",
                                "lastCommitSha": "1513e9d3415231c22154677720e68167ce08f664"
                            },
                            {
                                "branchName": "master",
                                "lastCommitSha": "1513e9d3415231c22154677720e68167ce08f664"
                            }
                        ]
                    }
                ]);
        });

    });
});

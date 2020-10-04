const service = require('./service');

exports.getRepoInfo = async function (req, res, next) {
    try {
        const username = req.query.username;
        const data = await service.getRepoInfo(username);
        res.status(200).json(data);
    } catch (e) {
        next(e);
    }
}
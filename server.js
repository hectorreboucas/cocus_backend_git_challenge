const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const controller = require('./controller');

const { CommonError, InternalServerError } = require('./utils/exceptions');

(async () => {

    let app = express();

    app.use(express.json());

    const document = YAML.load("openAPI.yaml");
    app.use('/', swaggerUi.serve);
    app.get('/', swaggerUi.setup(document, false));

    app.get('/repo', controller.getRepoInfo);

    app.use((error, req, res, next) => {
        const responseError = error instanceof CommonError ? error : new InternalServerError();
        res.status(responseError.status).json(error).send();
    });

    const port = 3000;

    app.listen(port, () => console.log(`service listening on port ${port}!`));

})();
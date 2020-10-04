const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const controller = require('./controller');

(async () => {

    let app = express();

    app.use(express.json());

    const document = YAML.load("openAPI.yaml");
    app.use('/', swaggerUi.serve);
    app.get('/', swaggerUi.setup(document, false));

    app.get('/repo', controller.getRepoInfo);

    const port = 3000;

    app.listen(port, () => console.log(`service listening on port ${port}!`));

})();
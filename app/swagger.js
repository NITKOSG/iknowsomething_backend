import swaggerJSDoc from 'swagger-jsdoc';

const swagger = (app) => {
  // swagger definition
  const swaggerDefinition = {
    info: {
      title: 'I Know Something API DOCS',
      version: '0.0.1',
      description: 'Demonstrating the RESTFul API of I Know Something',
    },
    host: 'localhost:8000',
    basePath: '/',
  };

  const securityDefinitions = {
    api_key: {
      type: 'apiKey',
      name: 'api_key',
      in: 'header',
    },
  };
  // options for the swagger docs
  const options = {
    // import swaggerDefinitions
    swaggerDefinition,
    securityDefinitions,
    // path to the API docs
    apis: ['./**/**/swagger/routes/*.yml', './**/**/swagger/models/*.yml'],
  };

  // initialize swagger-jsdoc
  const swaggerSpec = swaggerJSDoc(options);

  // serve swagger
  app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
};
export default swagger;

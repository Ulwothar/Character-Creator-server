import swaggerJsdoc from 'swagger-jsdoc';

const swaggerConfig = () => {
  const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: 'Character Creator API',
        description: 'Character Creator API Information',
      },
      servers: ['http://localhost:4000'],
    },
    apis: ['./src/routes/*/*.js'],
  };

  const swaggerDocs = swaggerJsdoc(swaggerOptions);

  return swaggerDocs;
};

export default swaggerConfig;

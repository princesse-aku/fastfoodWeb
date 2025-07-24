// swaggerConfig.js
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Restaurant',
            version: '1.0.0',
            description: 'Documentation de l’API REST du Restaurant',
        },
        servers: [
            {
                url: 'http://localhost:3000', // Change si besoin
            },
        ],
    },
    apis: ['./server.js'], // Point vers ton fichier où tu mettras les annotations Swagger
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;

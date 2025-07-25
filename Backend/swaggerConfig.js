// swaggerConfig.js
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Restaurant',
      version: '1.0.0',
      description: 'API pour la gestion d\'un restaurant, y compris les plats du menu.',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Remplacez par l'URL de votre serveur si différente
        description: 'Serveur de développement local',
      },
    ],
    components: {
      schemas: {
        Dish: {
          type: 'object',
          required: ['name', 'price'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID unique du plat',
              readOnly: true,
            },
            name: {
              type: 'string',
              description: 'Nom du plat',
              example: 'Pizza Margherita',
            },
            description: {
              type: 'string',
              description: 'Description détaillée du plat',
              example: 'Classic pizza with tomato, mozzarella, and basil.',
            },
            price: {
              type: 'number',
              format: 'float',
              description: 'Prix du plat',
              example: 15.50,
            },
            category: {
              type: 'string',
              description: 'Catégorie du plat (ex: Entrée, Plat Principal, Dessert)',
              example: 'Plat Principal',
            },
            image_url: {
              type: 'string',
              format: 'url',
              description: 'URL de l\'image du plat',
              example: 'http://localhost:3000/img/menu2.png',
            },
          },
        },
      },
    },
    tags: [
      {
        name: 'General',
        description: 'Routes générales de l\'API',
      },
      {
        name: 'Dishes',
        description: 'Gestion des plats du menu',
      },
    ],
    paths: {
      '/': {
        get: {
          summary: 'Bienvenue sur l\'API',
          tags: ['General'],
          responses: {
            '200': {
              description: 'Message de bienvenue',
              content: {
                'text/plain': {
                  example: 'Bienvenue sur l\'API du Restaurant !',
                },
              },
            },
          },
        },
      },
      '/api/hello': {
        get: {
          summary: 'Message de test',
          tags: ['General'],
          responses: {
            '200': {
              description: 'Message de test pour le frontend',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: {
                        type: 'string',
                        example: 'Bonjour depuis l\'API backend !',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/dishes': {
        get: {
          summary: 'Récupérer tous les plats',
          tags: ['Dishes'],
          responses: {
            '200': {
              description: 'Liste des plats',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Dish',
                    },
                  },
                },
              },
            },
            '500': {
              description: 'Échec de la récupération des plats',
            },
          },
        },
        post: {
          summary: 'Ajouter un nouveau plat',
          tags: ['Dishes'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Dish',
                },
                examples: {
                  newDish: {
                    value: {
                      name: 'Salade César',
                      description: 'Salade romaine, croûtons, parmesan, poulet grillé, sauce César',
                      price: 9.99,
                      category: 'Entrée',
                      image_url: 'http://localhost:3000/img/menu3.png',
                    },
                  },
                },
              },
            },
          },
          responses: {
            '201': {
              description: 'Plat ajouté avec succès',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'integer',
                      },
                      message: {
                        type: 'string',
                      },
                    },
                  },
                  example: {
                    id: 101,
                    message: 'Plat ajouté avec succès !',
                  },
                },
              },
            },
            '400': {
              description: 'Données invalides (nom ou prix manquants/invalides)',
            },
            '500': {
              description: 'Échec de l\'ajout du plat',
            },
          },
        },
      },
      '/api/dishes/{id}': {
        get: {
          summary: 'Récupérer un plat par ID',
          tags: ['Dishes'],
          parameters: [
            {
              in: 'path',
              name: 'id',
              schema: {
                type: 'integer',
              },
              required: true,
              description: 'ID du plat à récupérer',
            },
          ],
          responses: {
            '200': {
              description: 'Détails du plat',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Dish',
                  },
                },
              },
            },
            '404': {
              description: 'Plat non trouvé',
            },
            '500': {
              description: 'Échec de la récupération du plat',
            },
          },
        },
        put: {
          summary: 'Mettre à jour un plat existant',
          tags: ['Dishes'],
          parameters: [
            {
              in: 'path',
              name: 'id',
              schema: {
                type: 'integer',
              },
              required: true,
              description: 'ID du plat à mettre à jour',
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Dish',
                },
                examples: {
                  updatedDish: {
                    value: {
                      name: 'Salade César (Grande)',
                      description: 'Salade romaine, croûtons, parmesan, poulet grillé, sauce César, portion XXL',
                      price: 12.50,
                      category: 'Entrée',
                      image_url: 'http://localhost:3000/img/salade_cesar_large.jpg',
                    },
                  },
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Plat mis à jour avec succès',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: {
                        type: 'string',
                      },
                    },
                  },
                  example: {
                    message: 'Plat mis à jour avec succès !',
                  },
                },
              },
            },
            '400': {
              description: 'Données invalides (nom ou prix manquants/invalides)',
            },
            '404': {
              description: 'Plat non trouvé ou aucune modification effectuée',
            },
            '500': {
              description: 'Échec de la mise à jour du plat',
            },
          },
        },
        delete: {
          summary: 'Supprimer un plat',
          tags: ['Dishes'],
          parameters: [
            {
              in: 'path',
              name: 'id',
              schema: {
                type: 'integer',
              },
              required: true,
              description: 'ID du plat à supprimer',
            },
          ],
          responses: {
            '200': {
              description: 'Plat supprimé avec succès',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: {
                        type: 'string',
                      },
                    },
                  },
                  example: {
                    message: 'Plat supprimé avec succès !',
                  },
                },
              },
            },
            '404': {
              description: 'Plat non trouvé',
            },
            '500': {
              description: 'Échec de la suppression du plat',
            },
          },
        },
      },
    },
  },
  apis: ['./server.js', './routes/*.js'], // Chemins vers vos fichiers de routes
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
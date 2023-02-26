# Photo Revive API

# Project Structure:

- [**api**](src/api)
  - [**middlewares**](src/api/middlewares) # API Global Middlewares [ Auth, Rate Limit, etc ]
  - [**resources**](src/api/resources)
    - [**resource-1**](src/api/resources/fixer) # API Resources [ Controller, Interface, Model, Service, Validators ]
      - [**resource-1.controller.ts**](src/api/resources/fixer/fixer.controller.ts) # Resource Controller [ Express Router ]
      - [**resource-1.interface.ts**](src/api/resources/fixer/fixer.interface.ts) # Resource Interface [ Mongoose Schema ]
      - [**resource-1.model.ts**](src/api/resources/fixer/fixer.model.ts) # Resource Model [ Mongoose Model ]
      - [**resource-1.service.ts**](src/api/resources/fixer/fixer.service.ts) # Resource Service [ Business Logic ]
      - [**resource-1.validator.ts**](src/api/resources/fixer/fixer.validator.ts) # Resource Validator [ Express Validator, Joi, etc ]
- [**config**](src/config) # Environment variables and configuration related things [ Database, JWT, etc ]
- [**loaders**](src/loaders) # Split the startup process into modules [ Express, Database, Firebase, etc ]
- [**utils**](src/utils) # Utility classes and functions [ Global Interfaces, Exceptions, etc ]
  - [**exceptions**](src/utils/exceptions)
  - [**interfaces**](src/utils/interfaces)
- [**decorators**](src/utils/decorators) # Custom Decorators
- [**assets**](src/assets) # Static Assets [ JSON files, etc ]
- [**jobs**](src/jobs) # Jobs definitions for agenda.js [ Cron jobs ]
- [**subscribers**](src/subscribers) # Event handlers for async task [ Email, etc ]
- [**types**](src/types) # Type declaration files (d.ts) for Typescript [ Custom Types, etc ]

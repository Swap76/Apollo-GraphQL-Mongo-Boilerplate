# Apollo GraphQL with MongoDB Boilerplate

## This boilerplate includes following things:-
- Apollo GraphQL server creation & configuration
- MongoDB setup & Model Examples
- GraphQL schema examples
- JWT Authorization Middlewear
- REST API Configuration

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Following are the softwares requried to get arena up and running.
* [Node.js](https://nodejs.org) - Chrome's V8 Javascript Engine
* [MongoDB](https://mongodb.org) - NoSQL Database
* [Redis](https://redis.io/) - Redis Cache

### Installing

- Install the packages mentioned in package.json file for getting all dependencies of the project.
  ```
  npm install --save
  ```
- Getting the configuration ready
  ```
  cp .env.example .env
  ```
- Starting the application
  ```
  npm run dev
  ```

- Setting the pre-push hook
  ```
  ./hooks.sh
  ```

## Linting the Code

- For linting the code
```
npm run lint -s
```

- For fixing the linting mistakes in code
```
npm run fix -s
```

## Issues

Issues are managed via GitHub Issues [here](https://github.com/Swap76/Apollo-GraphQL-Mongo-Boilerplate/issues).

## Developers

* **Swapnil Shinde** - [Swap76](https://github.com/Swap76)

## License

This project is licensed under the Apache License. See the [LICENSE.md](https://github.com/Swap76/Apollo-GraphQL-Mongo-Boilerplate/blob/master/LICENSE) file for details.

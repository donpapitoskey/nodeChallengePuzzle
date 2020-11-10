# nodeChallengePuzzle

This project was created with :
 -  [tsconfig CLI](https://www.typescriptlang.org/)
 -  [npm](https://www.npmjs.com/)

And was deployed in Heroku

### Backend Challenge - Recipe Book

This is a project developed to explore the design of a GraphQL Server with Apollo to provide the user store, create and fetch information related to cooking and recipies into an SQL Database [PostgreSQL](https://www.postgresql.org/). 

This server was deployed with [Heroku](https://dashboard.heroku.com/) and has a playground [API](https://backend-challenge-puzzle.herokuapp.com/).

## Main libraries

The necessary libraries for the development of this project were:

    - "apollo-server": "^2.19.0",
    - "bcryptjs": "^2.4.3",
    - "body-parser": "^1.18.1",
    - "graphql": "^15.4.0",
    - "jsonwebtoken": "^8.5.1",
    - "node": "^15.0.1",
    - "pg": "^8.4.0",
    - "reflect-metadata": "^0.1.10",
    - "typeorm": "0.2.29"

## Available Scripts

In the project directory, you can run:

### `npm install`

Installs the necessary libraries listed above.

### `npm run start`

Runs the server locally using the dist folder. A localhost is provided to interact with the playground.

### `npm run dev`

Runs the server locally using the src folder. A localhost is provided to interact with the playground

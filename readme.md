# FexiLease Project🚗

The project consists of developing a FULL REST API for a car rental company, using the technologies and knowledge learned in the courses.

## Tecnologias Utilizadas

| Tecnologia                              | Utilizada           |
|-----------------------------------------|---------------------|
| Node.js with TypeScript                 | ✅                  |
| Swagger documentation                   | ✅                  |
| MongoDB Database                        | ✅                  |
| ORM TypeORM                             | ✅                  |
| ESLint and Prettier                     | ✅                  |
| Github versioning                       | ✅                  |
| Conventional Commits, Small commits     | ✅                  |
| 100% Tests coverage                     | ✅                  |


## Installation

Follow the steps bellow to run the project

### Prerequisites

- Node.js 
- npm 
- Postman
- Git
- Docker (optional)

## Step by step:

1. Clone this repository in your local machine:
   ```bash
   git clone https://github.com/picoliW/FlexiLease.git
   ```
2. Navigate to the project directory:
   ```cmd
   cd FlexiLease
   ```
3. Install dependencies:
   ```cmd
   npm install (ou npm i)
   ```

## Running the application:
If in localhot:

    npm start
    
If using docker:

    docker-compose up

## To run the tests, run:

    npm test

## To see tests coverage, run:

    npm run test:cov
    
# Testing Users

##### Open postman and follow the steps bellow

### Get, Delete 

1. Put the URL localhost:3000/api/v1/routeToTest
2. Select the HTTP method
3. Click "send"

   ![TestGetUsers](https://imgur.com/kfktxdy.png)

### Post, Put 

1. Click "body"
2. Select "raw"
2. SelectJSON
3. Type the request
4. Click "Send"

   ![TestPostPutUser](https://imgur.com/AcNEjwO.png)
   
# Cars and reserves are protected by bearer token, follow the steps bellow:

## Testing reserves, cars:

### The steps for the requests are the same as above, except you need a bearer token.

### Getting the token

   ![GettingToken](https://imgur.com/tLQpCMg.png)

### Using token

   ![UsingToken](https://imgur.com/8zzvqID.png)
   
# .env data
If using localhost:

    DB_NAME=FlexiLease
    PORT=3000
    DB_HOST=localhost
    
If using docker:
    
    DB_NAME=FlexiLease
    PORT=3000
    DB_HOST=db

## If you already installed dependencies either using Docker or locally, and you want to switch to the other, you need to delete node_modules and install them again, because some dependencies have different versions for each operating system.
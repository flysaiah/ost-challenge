## OST Challenge

Currently hosted at https://ost-challenge.herokuapp.com/

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). (Click link for details)

### Local build instructions:

1. Run `npm install` in root directory of app

2. Enter client directory (`cd client`) and run `npm install` there as well

3. Ensure that you have mongodb installed: https://docs.mongodb.com/manual/installation/

4. Start a MongoDB server with `mongod`

5. You'll need a .env file in the root level of your project that has variables related to connecting to your database: an example is:

``DB_USER=myDatabaseUser
DB_PASS=myDatabasePassword
DB_SERVER=my-db-host.com:27530/my-database-name``


6. Go back to root directory (`cd ../`) and run `npm start`

7. To run unit tests, use `npm test` in client directory

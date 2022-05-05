To install required packages run:
npm i

To start server run:
npm start:dev

To run tests run:

npm test

to get all the user's carbon certificates:
GET localhost/users/carbon_certificates

to get all available certificates:
GET localhost/availabe_certificates

to switch a certificate from one user to another, body is json { carbonId, username }

POST localhost/switch

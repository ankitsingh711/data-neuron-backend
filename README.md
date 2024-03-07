###### Backend API Documentation

Deployed Link - https://data-neuron-backend.onrender.com/

This repository contains the backend API implementation for managing data used in a ReactJS frontend application. The API is built using TypeScript, Node.js, Express.js, and MongoDB as the database.

###### Installation

Clone this repository to your local machine.
Install dependencies by running npm install. ( npm install --legacy-peer-deps )
create .env file and pust mongoUrl and PORT.
Set up MongoDB and ensure it's running locally or configure the connection URI in config.ts.
Start the server by running npm start.

##### API Endpoints

1. Add Data
   Request:

URL - `/data`
Method: POST
Body: JSON object containing the data to be added or updated.

{
id: UUID,
"name":"testing",
"description": "testing description"
}

Response
Status Code: 200 OK
Body: JSON object representing the added or updated data.

{
"id": UUID,
"name":"testing",
"description": "testing description"
}

2. Count API Calls

Request
URL: `/count`
Method: GET
Response
Status Code: 200 OK
Body: JSON object containing the count of add and update API calls.

{
"addCount": 5,
"updateCount": 3
}

3. Update Data 

Method: PUT
Reesponse
Status Code: 200 OK
Body: JSON object containing the name and description

#### Database

- MongoDB databse (NoSQL) - Collection

{"\_id":{"$oid":"65e9d061c908c0f36b037e68"},"name":"data testing","description":"this is tesing description","countAdd":{"$numberInt":"0"},"countUpdate":{"$numberInt":"0"},"__v":{"$numberInt":"0"}}

#### Database Schema

interface Data {
id: string;
name: string;
description: number;
}

#### Database Operation

- I have used proper aggregation and indexing to make sure we get data response quickly if we have a huge amount of data in the collection.

#### Execution Time

- I have used morgan npm package to check the execution time for each api request:

/api/count - GET /count 200 381.506 ms

/api/data - POST /data 201 775.134 ms

/api/data/:id - PUT /data/65e9d38b56b55f153388f420 200 380.332 ms


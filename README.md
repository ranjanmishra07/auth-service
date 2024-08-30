## setup Backend

```bash Run Backend
cd auth-server
cp .env.example .env
modify the .env file to use your MONGO_URI and JWT_SECRET
$ npm install
$ npm start:dev
It will run on port 3001

Api's
1. GET localhost:3001 - this is secured with jwt token
   Request -> Authorization Header = Bearer {{token}}
   Response -> 200

2. POST localhost:3001/auth/signin
Request body -> {
    "name": "ranjan",
    "email": "ranjan2@gmail.com",
    "password": "testpass@123%%"
}
Response -> {
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicmFuamFuIiwiZW1haWwiOiJyYW5qYW4yQGdtYWlsLmNvbSIsImlkIjoiNjZkMDhiNWJmNGQxMjBmNzU2ZmQ4YWMxIiwiaWF0IjoxNzI0OTQzMjA0LCJleHAiOjE3MjQ5NDY4MDR9.190LdyDbYW57yS7oDYTA0LMdpdxUum3pIQf6X_I5VJ8",
    "email": "ranjan2@gmail.com"
}

3. POST localhost:3001/auth/signup
Request body -> {
    "email": "ranjan2@gmail.com",
    "password": "testpass@123%%"
}
Response -> {
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicmFuamFuIiwiZW1haWwiOiJyYW5qYW4yQGdtYWlsLmNvbSIsImlkIjoiNjZkMDhiNWJmNGQxMjBmNzU2ZmQ4YWMxIiwiaWF0IjoxNzI0OTQzMjA0LCJleHAiOjE3MjQ5NDY4MDR9.190LdyDbYW57yS7oDYTA0LMdpdxUum3pIQf6X_I5VJ8",
    "email": "ranjan2@gmail.com",
    "name": ""
}
}
```

## Setup Frontend

```bash Run Frontend
cd auth-client
$ npm install
$ npm start
It will run on port 3000
```

## Database

```bash
 Run mongodb server
 Create database named "test" before starting backend

Stored user in mongodb
{
  "_id": {
    "$oid": "66d07c055cc7f693ce75ebe1"
  },
  "name": "ranjan",
  "email": "ranjan1@gmail.com",
  "password": "$2b$10$mRmqLUg2qzpLoboQ7Jj0uu6Z3OQSMJuUUmvFQBFfb5UP2Lr8XcI2.",
  "__v": 0
}
```


# CRUD API

This is a Gold price tracking API created using Node.js to keep track of Gold prices daily and update the prices of gold items according to the price everyday.

## Features

- The Mock Gold Price API randomly generates a gold price between 30,000 and 80,000 and stores it in the database.
- Users can retrieve the best price of a particular gold item within a specific time range.
- A cron job is set up to automatically update the prices of gold items daily by calling the Mock Gold Price API. This ensures that the gold price changes every day and the updated prices are stored in the database.
- Unit test cases are added for each endpoint to test the functionality of the application.


## Documentation

[Documentation of API](https://documenter.getpostman.com/view/26216494/2s93m1YiWB)


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

MONGO_URL = `mongodb+srv://dharmikjethva:welcome2023@brilliantejewels.as2plbv.mongodb.net/?retryWrites=true&w=majority`

GOLD_ID = `6465b81448aba4b7394542d1`


## Run Locally

Clone the project

```bash
  git clone https://github.com/dharmikjethva30/Brillante-Jewels.git
```

Go to the project directory

```bash
  cd Brillante-Jewels
```

Install dependencies

```bash
  npm install
```

Start the server in development mode

```bash
  npm run dev
```
To run unit tests of the API 

```bash
  npm test
```

Start the server in Production mode

```bash
  npm run prod
```



## Tech Stack

**Server:** Node.js, Express.js

**Modules:** axios, cors, mongoose, dotenv, morgan, node-cron

**Devloper Modules:** nodemon

**Testing Modules:** mocha, chai, chai-http




## 🚀 About Me
I'm a Backend Node.js Developer...


## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://github.com/dharmikjethva30)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/dharmik-jethva-a16900229/)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/djethva3123)


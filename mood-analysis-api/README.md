# Mood Analyser API
This is a small app that allows a user to check-in to record how they are feeling, and to review previous check-ins on an insights page. 
This is written in [Node.js](https://nodejs.org/en/) and uses [MySQL](https://www.mysql.com/) as databases and [GraphQL](https://graphql.org/graphql-js/running-an-express-graphql-server/)

# How to use

### 1. Install Dependencies
```
npm install
```

### 2. Install MySQL
Click here to install MySQL if not installed already https://dev.mysql.com/doc/refman/8.0/en/installing.html

Connect to MySQL database and create a new database
```
CREATE DATABASE DATABASENAME;
```

### 3. Update config
Update the **user, password and databasename** in **database.json** and **config/config.js**


### 4. Migrate DB
```
cd mood-analysis-api

db-migrate up 
```

This will create ```userCheckIn``` table in the database


### 5. Run API server
```
npm start
```

The server should be running on ```http://localhost:3002/``` and graphql on ```http://localhost:3002/graphql```

### 5. Test 
```
npm test
```

# GraphQL queries

## Query

```
query {
  getUserCheckIns {
    id: Int
    moodScore: Int
    feeling: String
    comment: String
    checkInTime: String
  }
  
  getInsights {
    averagePercentage: Float
    moodScore: Int
  }
  
  getTotalCheckin {
    total: Int
  } 

}
```

## Mutation

```
mutation {
  createUserCheckIn( input: {moodScore: Int, feeling: String, comment: String}) 

}
```







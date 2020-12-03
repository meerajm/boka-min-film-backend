# BokaMinFilm

[![Actions Status](https://github.com/meerajm/boka-min-film-backend/workflows/BokaMinFilm%20backend/badge.svg)](https://github.com/meerajm/boka-min-film-backend/actions)

# backend

Starts with `npm run dev`
Runs on Port 5000

# UsersRouter

1. Create (new user)
   Route: POST '/api/v1/users'
   Request Body: {firstName: string, lastName: string, email: string}

2. Read (all users)
   Route: GET '/api/v1/users'

# CinemasRouter

1. Read (all cinema details)
   Route: GET '/api/v1/cinemas'

2. Read (all cinema names and Id)
   Route: GET '/api/v1/cinemas/all'

3. Read (all show details by cinema name, movie title and date)
   Route: GET '/api/v1/cinemas/:cinema/:movieTitle/:day'

4. Update(booked seats by cinema name and show id)
   Route: PATCH '/api/v1/cinemas/:cinemaName/:showId'

# MoviesRouter

1. Read (all movies)
   Route: GET '/api/v1/movies'
   Response Body: {[ Array of all movies ]}

2. Create (new movie)
   Route: POST '/api/v1/movies'
   Request Body: { title, language, genre, description, trailer, file}

## Seed Database with questions

In the seed-db folder you will find the import script and a folder named `data`, with all the `movies` and `cinemas` that will be saved in db. Every time you run this file, this specific collection of questions will be drop and created again.

To insert/update all movies and cinemas in database:

1. npm install
2. npm run seedDb

# Cloudinary Setup

######Setup

1. Follow link (https://cloudinary.com/) to set up a cloudinary account.
2. npm install cloudinary
3. Add a new folder for your project called "dev-bokaminfilm".
4. Provide CLOUDINARY_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET in `.env` file.

# BokaMinFilm backend

####Setup  
Eslint must be installed globally: `npm install -g eslint`

Database MongoDB: add connection string to .env file:

1. Use MongoDB database to store data.

- Follow the [MongoDB Atlas registration link](https://www.mongodb.com/cloud/atlas/register).
- Fill all mandatory fields and click create account button.
- Choose "Starter Cluster" option and click Create a cluster.
- The next screen choose: cloud provider, region and click "Create Cluster" button.
- Click Security - Database access tab.
- Click Add new user button.
- Choose method - Password and fill the username and the password fields (remember them, you will use them to connect mongodb database).
- User Privileges - Set read and write to any database.
- Click "Add user" button.
- Click Security - Network Access tab.
- Click "Add IP Address" button.
- Click "Allow access from anywhere" button.
- Click "Confirm" button.
- Generate the connect string, by the following: in Atlas - Clusters tab click "Connect" button.
- On Modal window (Connect to Cluster) click "Connect your Application" button: Copy the connection string.
- Replace username,password and dbname in the connection string.

2. Create `.env` file in the project directory. Add MONGO_URI='YOUR CONNECTION STRING HERE' to `.env` file.

3. Create `.env.test` file in the project directory. Add MONGO_URI='YOUR CONNECTION STRING HERE' to `.env.test` The database must have a different name than in step 2.

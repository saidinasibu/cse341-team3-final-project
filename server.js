// server.js
// This file starts the server and sets up the main tools we use in the project.

require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const GithubStrategy = require('passport-github2').Strategy;
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const mongodb = require('./db/connect');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for handling JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Allow basic CORS for testing and tools like Postman
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
}));

// Extra CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'POST, GET, PUT, PATCH, OPTIONS, DELETE'
  );
  next();
});

// Session setup for OAuth login
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'dev-secret',
    resave: false,
    saveUninitialized: true
  })
);

// Passport GitHub OAuth setup
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL
    },
    (accessToken, refreshToken, profile, done) => {
      // We save the GitHub profile in the session
      return done(null, profile);
    }
  )
);

// Save user info to session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Load user info from session
passport.deserializeUser((user, done) => {
  done(null, user);
});

// Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Main routes for the API
app.use('/', require('./routes/index'));

// Start server when database is ready
mongodb.initDb((err) => {
  if (err) {
    console.log('Error connecting to database:', err);
  } else {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log('Database connected');
    });
  }
});

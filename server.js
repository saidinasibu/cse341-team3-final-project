const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const dotenv = require('dotenv');
dotenv.config();

const { initDb } = require('./db/connect');
const routes = require('./routes/index');

const app = express();

// --------------------
// MIDDLEWARE
// --------------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// --------------------
// SESSION + PASSPORT
// --------------------
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

// --------------------
// OAUTH CONFIG
// --------------------
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

// --------------------
// SWAGGER
// --------------------
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// --------------------
// ROUTES
// --------------------
app.use('/', routes);

// --------------------
// EXPORT APP FOR TESTING
// --------------------
module.exports = app;

// --------------------
// START SERVER ONLY IF NOT TESTING
// --------------------
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3000;

  initDb((err) => {
    if (err) {
      console.error(err);
    } else {
      app.listen(PORT, () =>
        console.log(`Server running on port ${PORT}`)
      );
    }
  });
}

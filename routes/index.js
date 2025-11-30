// routes/index.js
// This file holds the main routes for the API, including login and logout.

const express = require('express');
const router = express.Router();
const passport = require('passport');

// Home route
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to Next Chapter Books API' });
});

// Login route (GitHub OAuth)
router.get('/login', passport.authenticate('github', { scope: ['user:email'] }));

// OAuth callback route
router.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/',
    session: true
  }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
  }
);

// Logout route
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.json({ message: 'You are logged out' });
});

// API entity routes
router.use('/books', require('./books'));
router.use('/authors', require('./authors'));
router.use('/stores', require('./stores'));
router.use('/customers', require('./customers'));

module.exports = router;

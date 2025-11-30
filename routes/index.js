const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', (req, res) => { 
  res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out")
});

//login/logout routes
router.get('/login', passport.authenticate('github'), (req, res) => {
  // #swagger.ignore = true
});

router.get('/logout', function(req, res, next) {
  // #swagger.ignore = true
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

router.get('/github/callback', passport.authenticate('github', { 
  failureRedirect: '/api-docs', 
  session: false
}),
(req, res) => {
  // #swagger.ignore = true
  req.session.user = req.user;
  res.redirect('/');
});

router.use('/books', require('./books'));
router.use('/authors', require('./authors'));
router.use('/stores', require('./stores'));
router.use('/customers', require('./customers'));




module.exports = router;
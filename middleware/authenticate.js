// middleware/authenticate.js
// This middleware checks if the user is logged in using GitHub OAuth.

const isAuthenticated = (req, res, next) => {
  // If there is no user stored in the session, they are not logged in
  if (!req.session.user) {
    return res.status(401).json({
      message: 'You must be logged in to access this route.'
    });
  }

  // If the user is in the session, let them continue
  next();
};

module.exports = { isAuthenticated };

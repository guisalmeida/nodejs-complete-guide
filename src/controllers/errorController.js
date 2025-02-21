const getError = (req, res) => {
  res.status(404)
    .render('not-found', {
      docTitle: 'Page Not Found',
      path: req.url,
      isAuthenticated: req.session.isLoggedIn
    });
};

module.exports = {
  getError,
}

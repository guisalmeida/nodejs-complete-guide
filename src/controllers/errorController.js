const getError = (req, res) => {
  res.status(404).render('not-found', { docTitle: 'Page Not Found', path: req.url });
};

module.exports = {
  getError,
}

export default (req, res, next) => {
  res.locals.messages = req.flash("messages");
  next();
};

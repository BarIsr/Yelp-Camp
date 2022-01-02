const User = require('../models/user');

module.exports.goToRegister = (req, res) => {
  res.render('users/register');
};

module.exports.goToLogin = (req, res) => {
  res.render('users/login');
};

module.exports.register = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registerUser = await User.register(user, password);
    req.login(registerUser, (err) => {
      if (err) {
        next(err);
      }
      req.flash('success', 'Welcome to Yelp Camp!');
      res.redirect('./campgrounds');
    });
  } catch (err) {
    req.flash('error', err.message);
    res.redirect('register');
  }
};

module.exports.login = (req, res) => {
  req.flash('success', 'welcome back!');
  const redirectUrl = req.session.returnTo || '/campgrounds';
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
  req.logout();
  req.flash('success', 'GoodBye!');
  res.redirect('/campgrounds');
};

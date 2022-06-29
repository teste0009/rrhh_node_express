

let loginHome = (req, res, next) => {

  if (req.user.isLogged()) {
    res.render('layout', { viewFile: 'home', pageTitle: 'Home' });
  }
  else {
    res.render('layout', { viewFile: 'loginForm', pageTitle: 'Login' });
  }

}

module.exports = loginHome;

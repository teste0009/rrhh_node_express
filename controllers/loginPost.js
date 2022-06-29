

let loginPost = (req, res, next) => {

  req.user.login(req.body.email, req.body.password, req)
  .then( result => {
    console.log(result);

    if (req.user.isLogged()) {
      res.render('layout', { viewFile: 'home', pageTitle: 'Home' });
    }
    else {
      res.render('layout', { viewFile: 'loginForm', pageTitle: 'Login' });
    }

  })
  .catch ( error => {})
  .finally();

}

module.exports = loginPost;

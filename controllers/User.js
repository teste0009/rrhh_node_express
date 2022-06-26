
const User = new function() {

  this.nombre = "";
  this.email = "";
  this.bIsLogged = false;
  this.loginMessage = '';

  this.db = require('../database/models');

  this.getNombre = () => this.nombre;

  this.getEmail = () => this.email;

  this.getLoginMessage = () => this.loginMessage;

  this.isLogged = () => this.bIsLogged;


  this.getSession = (req) => {
    // console.log('* * * * * * *'); console.log(req.session); console.log('* * * * * * *');
    if (req.session) {
      console.log('* * * * * * *'); console.log(req.session); console.log('* * * * * * *');
      if (req.session['user']) {
        if (req.session['user']['nombre']) {
          this.nombre = req.session['user']['nombre'];
          if (req.session['user']['email']) {
            this.email = req.session['user']['email'];
            this.bIsLogged = true;
          }
        }
      }
    }
  }

  this.setSession = (_userLogin, req) => {
    if (_userLogin) {
      console.log('['); console.log(req.session); console.log(']');
      req.session.user = {
        nombre: _userLogin.nombre,
        email: _userLogin.email
      }
      req.session.save();
      console.log('['); console.log(req.session); console.log(']');
      this.nombre = _userLogin.nombre;
      this.email = _userLogin.email;
      this.bIsLogged = true;
      console.log('[' + req.session.user.nombre + '] logueado...');
    }
    else {
      this.loginMessage = 'Login Incorecto';
    }
  }

  this.login = (email, password, req) => {
    const _userLogin = this.db['Usuario'].findOne({
      where: {email: email, password: password}
    });
    return _userLogin
      .then ( result => {
        this.setSession(result, req);
      })
      .catch ( error => {})
      .finally();
  }


}();

module.exports = User;
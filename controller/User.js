
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


  this.getSession = () => {
    ;
  }

  this.setSession = (_userLogin, req) => {
    if (_userLogin) {
      // console.log(_userLogin);
      console.log('[');
      console.log(req.session);
      console.log(']');
      req.session.user = {
        nombre: _userLogin.nombre,
        email: _userLogin.email
      }
      console.log('['); console.log(req.session.user.nombre); console.log(']');
      this.nombre = _userLogin.nombre;
      this.email = _userLogin.email;
      this.bIsLogged = true;
      console.log('['); console.log(req.session.user.nombre); console.log(']');
    }
    else {
      this.loginMessage = 'Login Incorecto';
    }
  }

  this.login = (email, password, req) => {
    const _userLogin = this.db['Usuario'].findOne({
      where: {email: email, password: password}
    });
    _userLogin
      .then ( result => {
        this.setSession(result, req);
      })
      .catch ( error => {})
      .finally();
  }


}();

module.exports =  User;

const User = new function() {

  this.nombre = "Guest";
  this.email = "";
  this.bIsLogged = false;
  this.loginMessage = '';

  this.site = require('../config/site');
  this.db = require('../database/models');

  this.getNombre = () => this.nombre;

  this.getEmail = () => this.email;

  this.getLoginMessage = () => this.loginMessage;

  this.isLogged = () => this.bIsLogged;


  this.bAuthRoute = (reqPath) => {
    let bAuthRouteResult = true;

    allowedReqPaths = ['/', '/login', '/logout']
    if (allowedReqPaths.includes(reqPath)) {
      bAuthRouteResult = true;
    }
    else {
      this.site.navOptions.forEach(navOption => { // console.log(navOption.route);
        if (reqPath == navOption.route) {
          bAuthRouteResult = false;
        }
      });
    }

    console.log('Auth Route = ' + bAuthRouteResult);
    return bAuthRouteResult;
  };

  this.getSession = (req) => {
    // console.log('* * * * * * *'); console.log(req.session); console.log('* * * * * * *');
    if (req.session) {
      // console.log('* * * * * * *'); console.log(req.session); console.log('* * * * * * *');
      if (req.session['user']) {
        if (req.session['user']['nombre']) {
          this.nombre = req.session['user']['nombre'];
          if (req.session['user']['email']) {
            this.email = req.session['user']['email'];
            this.bIsLogged = true;
            req.session.user = {
              nombre: this.getNombre(),
              email: this.getEmail()
            }
            req.session.save();
          }
        }
      }
      else {
        this.nombre = "Guest";
        this.email = "";
        this.bIsLogged = false;
        this.loginMessage = '';
      }

    }
    console.log('* - * - * - *'); console.log(req.session); console.log('* - * - * - *');
    console.log('User: [' + this.getNombre() + ']');
  };

  this.setSession = (_userLogin, req) => {
    if (_userLogin) {
      // console.log('['); console.log(req.session); console.log(']');
      req.session.user = {
        nombre: _userLogin.nombre,
        email: _userLogin.email
      }
      req.session.save();
      // console.log('['); console.log(req.session); console.log(']');
      this.nombre = _userLogin.nombre;
      this.email = _userLogin.email;
      this.bIsLogged = true;
      console.log('[' + req.session.user.nombre + '] logueado...');
    }
    else {
      this.loginMessage = 'Login Incorecto';
    }
  };

  this.login = (email, password, req) => {
    console.log('['+password+']')
    const _userLogin = this.db['Usuario'].findOne({
      where: {
        email: email,
        password: this.db.sequelize.literal("`Usuario`.`password` = HEX(AES_ENCRYPT('" + password + "', UNHEX(SHA2('My secret passphrase',512))))")} // password
    });

    // SELECT AES_DECRYPT(0xca1a7ecaf5295adb941ccb45635bd4d6, UNHEX(SHA2('My secret passphrase',512))) => enzo
    // SELECT HEX(AES_ENCRYPT('enzo', UNHEX(SHA2('My secret passphrase',512)))) => CA1A7ECAF5295ADB941CCB45635BD4D6

    return _userLogin
      .then ( result => {
        this.setSession(result, req);
        return result;
      })
      .catch ( error => {})
      .finally();
  }

  this.logout = (req) => {
    req.session.destroy();
    this.nombre = "Guest";
    this.email = "";
    this.bIsLogged = false;
    this.loginMessage = '';
  };

}();

module.exports = User;

ssh enzo@linuxserver


1) On project folder:

  npx express-generator --ejs

  warning: option `--ejs' has been renamed to `--view=ejs'


   create : public/
   create : public/javascripts/
   create : public/images/
   create : public/stylesheets/
   create : public/stylesheets/style.css
   create : routes/
   create : routes/index.js
   create : routes/users.js
   create : views/
   create : views/error.ejs
   create : views/index.ejs
   create : app.js
   create : package.json
   create : bin/
   create : bin/www


2)
   install dependencies:
     $ npm install


3)
   run the app:
     $ DEBUG=rrhh-node-express:* npm start


4)  sudo npm install -g --save sequelize sequelize-cli


5) en .sequelizerc
const path = require('path')

module.exports = {
  config: path.resolve('./database/config', 'config.js'),
  'models-path': path.resolve('./database/models'),
  'seeders-path': path.resolve('./database/seeders'),
  'migrations-path': path.resolve('./database/migrations'),
}


6)  sudo npm install --save mysql2


7)  sudo sequelize init
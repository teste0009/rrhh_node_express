
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
   run the app: (On Project Folder)
     $ DEBUG=rrhh-node-express:* npm start


4)  On Project Folder

    sudo npm install -g --save sequelize sequelize-cli (NO!!)

    From: https://stackoverflow.com/questions/51941168/error-cannot-find-module-sequelize

    if do it globally

    sudo npm install -g sequelize-cli (NO!!)
    sudo npm install -g sequelize (NO!!)


    if do it locally

    sudo npm install --save sequelize-cli
    sudo npm install --save sequelize


5) en .sequelizerc
const path = require('path')

module.exports = {
  config: path.resolve('./database/config', 'config.js'),
  'models-path': path.resolve('./database/models'),
  'seeders-path': path.resolve('./database/seeders'),
  'migrations-path': path.resolve('./database/migrations'),
}


6)  On Project Folder
    sudo npm install --save mysql2


7)  On Project Folder
    sudo sequelize init


8)  On Project Folder (?)
    sudo npm install redis (?)
    sudo apt install redis-server (?)

    sudo service redis-server stop

9)  On Project Folder
    sudo npm install express-session

10) On Project Folder
    sudo npm install redis connect-redis express-session

11) https://stackoverflow.com/questions/25515166/redis-daemon-not-creating-a-pid-file

12) https://stackoverflow.com/questions/39796228/req-session-is-undefined-using-express-session


13) sudo npm install nodemon -g
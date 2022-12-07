## Prerequisites

OS: Windows, Ubuntu, Mac OS X, Linux



### Dependencies:
node: v16.17.0 or above

db : MySQL
Version: 8.0.31
Password: Xornor@123
If you already have mysql setup installed, please go to files config/local.json and change password to your dbPassowrd.
## Steps to setup MySql and Mysql workbench in ubuntu

sudo apt update
sudo apt-get install mysql-server
systemctl is-active mysql
sudo mysql_secure_installation
1. in this it will ask for your password strength; so choose "2"
2. the set password: Xornor@123
3. It will ask bunch of questions: choose Y|N according to your preferences.
After completion, type sudo mysql
then type : ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Xornor@123';

to install MySQL Workbench: 
sudo snap install mysql-workbench-community
if after installing mysql-workbench-community and while connecting to database you're getting database error or connection error:
in terminal: sudo mysql -u root -p
enter password: Xornor@123
sudo snap connect mysql-workbench-community:password-manager-service :password-manager-service

## Steps to setup and run this code locally

1. clone this repository
2. In terminal " npm install"
3. npx sequelize-cli db:create

4. run code: "npm start"
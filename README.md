# mean-starter
MEAN starter project

- **M** - MongoDB
- **E** - ExpressJS
- **A** - AngularJS
- **N** - NodeJS

This MEAN starter project has a user authenication using standard email/password login or an optional Google login, a simple dashboard and user profile page, css night mode toggle.

For SCSS, it uses Google's [material design](https://material.io/guidelines/material-design/introduction.html).

## User Auth Setup
Create a mongodb either locally or a [mlabs.com](https://mlab.com/) and add the connection string to config/keys_dev.js.  The database will be used to store the users. To use Google authentication, you will need to go to https://console.cloud.google.com/apis/credentials/ and setup a project and create an oath service for web, then add the Client ID and Client secret to config/keys_dev.js.

## Install the node modules
```
npm install
```

## Running the app in the browser
```
npm run build
```

Leave the above command running and open a new terminal
```
npm start
```
Open your browser to http://localhost:8100

### heroku - first time
Change 'branch-name' to your heroku project
```
heroku git:remote -a branch-name
```

### heroku - deploy
```
npm run build:prod

git status
git add .
git commit -am "make it better"
git push heroku master
```

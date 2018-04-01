# mean-starter
MEAN starter project

This MEAN starter project has a user authenication using standard email/password login or an optional Google login, a simple dashboard and user profile page, css night mode toggle.

# User Auth Setup
Create a mongodb either locally or a mlabs.com and add the connection string to config/keys_dev.js.  The database will be used to store the users. To use Google authentication, you will need to go to [https://console.cloud.google.com/apis/credentials/] and setup a project and add the project and key to config/keys_dev.js.

# Install the node modules
npm install

# Running the app in the browser
npm run build

Leave the above command running and open a new terminal
npm start

In order to run this project
Run the following commands in terminal and follow instructions

1. npm i
2. create .env file in parent directory. Add following data in the created .env file
   PORT=<PORT NUMBER>
   DB_URI=<MONGODB ATLAS LINK>
   JWT_ACCESS_TOKEN_SECRET=<USE generateTokenSecret.js file TO GENERATE SECRET TOKEN FOR JWT>

3. npm start
4. Use rest.http file to see how to use all the enpoint
5. create access token for use using http://localhost:<PORT>/getToken?exp=<TIME(5m)>

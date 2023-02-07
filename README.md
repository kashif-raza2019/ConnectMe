# CONNECT ME
A chat application in react native, socket.io, with Node JS and Express Framework

### How to install server
- Clone this repository or download the zip file
- then ```cd connectme```
- Change Directory to Server in terminal / Command Line ```cd server```
- Run ```npm install``` and then run ```npm start```, this will start the server on 
  PORT 4000 or any other port 

## Now install the client
- Run ```cd connectme``` and then run ```npm install --legacy-peer-deps`` 
 (This will install the clientside libraries with the following dependencies and versions)
- Run ```npx react-native run-android``` and then run ```npm run android```
Make sure you are connected to the same network or Wifi as the server also change 
the SERVER_ENDPOINT by going into ```connectme/connectme/src/socket-service/server-endpoint.js```
and change it to your local network ip address
### To get the local network ip address
In Windows
- Run ```ipconfig``` and look for IPv4 address: then keep a note of it and change it to your local network ip address, ensure to also set the proper portnumber :4000 / or other
In Mac use ```ifconfig``` instead of ```ipconfig``

### To read more ensure to read the documentation
- Node JS Documentation https://nodejs.org/en/docs/
- Express Js Documentation https://expressjs.com/
- React Native Documentation https://reactnative.dev/docs/


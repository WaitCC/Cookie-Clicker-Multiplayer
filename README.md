# Cookie-Clicker-Multiplayer
Adds mutliplayer functionality to Cookie Clicker using Tampermonkey and NodeJS

# Features
- Leaderboard: Compete against your friends to get the highest CPS.

# Server installation (Linux)
Make sure nodejs and npm are installed on your server:
```bash
sudo apt install nodejs
sudo apt install npm
```

Create a directory with mkdir and copy leaderboard.js into it. There are no requirements.

You can run the server using:
```bash
node leaderboard.js
```

If you have screen installed, it can be used to run the server in the background.

# Client installation
- Install Tampermonkey, create a new script and upload client.js.
- Change the url variable to the url of your server. The default port is 5750, but this can be changed in leaderboard.js. Make sure to change the url every time the script is updated!
- Set your bakery name to something unique. This will be your username.
- As the server currently runs on HTTP, you must allow insecure requests by setting "Insecure content" to "Allow" in the site settings on Cookie Clicker.

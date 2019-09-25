# FiveM Server Status
FiveM Server Status Discord Bot

A custom discord bot providing functionality for interacting with fiveM servers and a discord community.

## Requirements:

- Included fivemqueue 

## Setup

1. Add the included fivemqueue to your server resources
2. Start the fivemqueue in your server.cfg
3. Set enviroment variables as described below

```
URL_SERVER - base url for fiveM server e.g. http://127.0.0.1:3501 (don't end with /)
LOG_LEVEL - Int of enum 0-4 specifying level of logs to display with 4 as no logs
BOT_TOKEN - Discord bot token
CHANNEL_ID - channel id for updates to be pushed to
MESSAGE_ID - message id of previous update to edit (not required)
SUGGESTION_CHANNEL - channel to create suggestion embeds in
BUG_CHANNEL - channel to recieve bug reports
BUG_LOG_CHANNEL - channel to log bug reports
LOG_CHANNEL - channel to log status changes
```
## Running
1. `npm i`
2. `npm start` or `node ./index.js`


## Commands
1. +status <Message> to add a warning message in the server status embed.
2. +status clear to clear the warning message.
  
![Screenshot](https://media.discordapp.net/attachments/424886239410388992/625739298846801936/unknown.png)

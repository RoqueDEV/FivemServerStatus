/*
WRITTEN BY Douile & Roque
https://github.com/Douile/
https://github.com/RoqueDEV/
*/

/*
Environment setup
Set environment variables as described below:
  URL_SERVER - base url for fiveM server e.g. http://127.0.0.1:3501
  LOG_LEVEL - Int of enum 0-4 specifying level of logs to display with 4 as no logs
  BOT_TOKEN - Discord bot token
  CHANNEL_ID - channel id for updates to be pushed to
  MESSAGE_ID - message id of previous update to edit (not required)
  SUGGESTION_CHANNEL - channel to create suggestion embeds in
  BUG_CHANNEL - channel to recieve bug reports
  BUG_LOG_CHANNEL - channel to log bug reports
  LOG_CHANNEL - channel to log status changes
*/

const setup = require('./setup.js');
const { start } = require('./bot.js');

const printValues = function(values,text) {
  console.log(text ? text : 'Current values:');
  for (var key in values) {
    console.log(`  ${key} = \x1b[32m'${values[key]}'\x1b[0m`);
  }
}

const startBot = function(values) {
  console.log('Starting bot');
  var bot = start(values);
  bot.on('restart',() => {
    console.log('\nRestarting bot');
    bot.destroy();
    bot = start(values);
  })
  var shutdown = function() {
    console.log('Shutting down');
    let destructor = bot.destroy();
    if (destructor) {
      destructor.then(() => {
        process.exit(0);
      }).catch(console.error);
    } else {
      process.exit(0);
    }
  }
  process.on('SIGINT',shutdown);
  process.on('SIGTERM',shutdown);
}

if (process.argv.includes('-c') || process.argv.includes('--config')) {
  setup.loadValues().then((values) => {
    printValues(values);
    process.exit(0);
  }).catch((error) => {
    console.log('Unable to load saved values, configuring all again');
    setup.createValues().then((values) => {
      setup.saveValues(values).then(() => {
        printValues(values,'New values:');
        process.exit(0);
      }).catch(console.error);
    }).catch(console.error);
  })
} else {
  console.log('Attempting to load enviroment');
  setup.loadValues().then((values) => {
    startBot(values);
  }).catch((error) => {
    console.error(error);
    setup.createValues().then((values) => {
      setup.saveValues(values).then(() => {
        startBot(values);
      }).catch(console.error);
    }).catch(console.error);
  })
}

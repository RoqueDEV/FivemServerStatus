const fs = require('fs');
const readline = require('readline');

const TEMPLATE = {
  'URL_SERVER': {
    'message': 'Base url for fiveM server e.g. http://127.0.0.1:3501',
    'required': true,
  },
  'LOG_LEVEL': {
    'message': 'Int of enum 0-4 specifying level of logs to display with 4 as no logs',
    'required': false,
    'default': 3,
  },
  'BOT_TOKEN': {
    'message': 'Discord bot token',
    'required': true,
  },
  'CHANNEL_ID': {
    'message': 'Channel id for updates to be pushed to',
    'required': true,
  },
  'MESSAGE_ID': {
    'message': 'Message id of previous update to edit',
    'required': false,
    'default': null
  },
  'SUGGESTION_CHANNEL': {
    'message': 'Channel to create suggestion embeds in',
    'required': true,
  },
  'BUG_CHANNEL': {
    'message': 'Channel to recieve bug reports',
    'required': true
  },
  'BUG_LOG_CHANNEL': {
    'message': 'Channel to log bug reports',
    'required': true,
  },
  'LOG_CHANNEL': {
    'message': 'Channel to log status changes',
    'required': true,
  },
};
const SAVE_FILE = './config.json';

function loadValue(key) {
  return new Promise((resolve,reject) => {
    const io = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    io.question(`Please enter a value for '${key}'${TEMPLATE[key].required ? '' : ` (Not required defaults to '${TEMPLATE[key].default}')`}\n  ${TEMPLATE[key].message}\n> `, (value) => {
      io.close();
      resolve(value);
    });
  })
}

exports.createValues = function(keys) {
  return new Promise((resolve,reject) => {
    var data = {};
    if (keys === undefined) {
      keys = Object.keys(TEMPLATE);
    }
    const loop = function(i) {
      if (i < keys.length) {
        loadValue(keys[i]).then((value) => {
          let realValue = value.trim();
          if (TEMPLATE[keys[i]].required) {
            if (realValue.length > 0) {
              data[keys[i]] = realValue;
              loop(i+1);
            } else {
              console.log('Invalid input');
              loop(i);
            }
          } else {
            if (realValue.length > 0) {
              data[keys[i]] = realValue;
              loop(i+1);
            } else {
              data[keys[i]] = TEMPLATE[keys[i]].default;
              loop(i+1);
            }
          }
        })
      } else {
        resolve(data);
      }
    }
    loop(0);
  })
}

exports.saveValues = function(values) {
  return new Promise((resolve,reject) => {
    fs.writeFile(SAVE_FILE,JSON.stringify(values),(err) => {
      if (err) return reject(err);
      return resolve(true);
    })
  })
}

exports.loadValues = function() {
  return new Promise((resolve,reject) => {
    fs.readFile(SAVE_FILE,(err,data) => {
      if (err) return reject(err);
      var json;
      try {
        json = JSON.parse(data);
      } catch(e) {
        console.log('Bad json in config.json');
        return reject(e);
      }
      let notFound = new Array();
      for (var key in TEMPLATE) {
        if (!json.hasOwnProperty(key)) {
          notFound.push(key);
        }
      }
      if (notFound.length === 0) {
        return resolve(json);
      } else {
        console.log('Some new configuration values have been added');
        exports.createValues(notFound).then((data) => {
          for (var key in data) {
            json[key] = data[key];
          }
          exports.saveValues(json).then(() => {
            resolve(json);
          }).catch(reject);
        }).catch(reject);
      }
    })
  });
}

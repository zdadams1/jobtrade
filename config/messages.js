const moment = require('moment');

function formatMessage(handle, text) {
  return {
    handle,
    text,
    time: moment().format('h:mm a'),
  };
}

module.exports = formatMessage;

const moment = require("moment");

function formateMessage(message) {
    message.time = moment().format("h:mm a");
    return message;
}

module.exports = {
    formateMessage,
};

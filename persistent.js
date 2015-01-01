var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('mydb.db');
var check;

module.exports.runDb = function initDB() {
    db.serialize(function () {
        // users
        db.run("CREATE TABLE if not exists users (id INTEGER PRIMARY KEY AUTOINCREMENT,userCode TEXT)");

        // massages
        db.run("CREATE TABLE if not exists messages (id INTEGER PRIMARY KEY AUTOINCREMENT,senderCode TEXT, recieverCode TEXT, message TEXT,type TEXT, date DATE)");
    });
};


module.exports.closeDB = function () {
    db.close();
};

module.exports.insertOnlineUser = function (userCode) {
    var insertOnlineUser = db.prepare("INSERT INTO users(userCode) VALUES (?)");
    db.serialize(function () {
        insertOnlineUser.run(userCode);
        insertOnlineUser.finalize();
    });
};

module.exports.deleteOnlineUser = function (userCode) {

};

module.exports.insertBroadCastMessage = function (senderCode, message) {
//insertMessage.run();
};

module.exports.insertPrivateMessage = function (senderCode, recieverCode, message) {
    var insertMessage = db.prepare("INSERT INTO messages(senderCode, recieverCode, message, type, date) VALUES (?, ?, ?, ?, ?)");
    db.serialize(function () {
        insertMessage.run(senderCode, recieverCode, message, 'private', new Date());
        insertMessage.finalize();
    });
};




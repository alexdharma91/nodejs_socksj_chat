var http = require('http');
var sockjs = require('sockjs');
var persistent = require('./persistent.js');

var clients = new Object();

persistent.runDb();

var echo = sockjs.createServer({ sockjs_url: 'http://cdn.jsdelivr.net/sockjs/0.3.4/sockjs.min.js' });
echo.on('connection', function (conn) {

    var clientIndex = conn.id;
    clients[clientIndex] = conn;

    persistent.insertOnlineUser(conn.id);

    refreshContactList();

    conn.on('data', function (message) {
        var request = JSON.parse(message);

        switch (request.actionCode) {
            case 1:
            {
                privateMessage(request);
            }
                break;
            case 2:
            {
                broadcast(request);
            }
                break;
            default :
            {
                console.log('{server}code does not resognized')
            }
        }

        console.log('{server}message = ' + message);
    });

    conn.on('close', function () {
        delete clients[clientIndex];
        refreshContactList();
    });

    function broadcast(request) {
        var responce = new Object();
        responce.message = request.message;
        responce.sender = request.sender;
        responce.actionCode = 2;

        for (var key in clients) {
            if (key != conn.id) {
                var connection = clients[key];
                connection.write(JSON.stringify(responce));
            }
        }

    }

    function privateMessage(request) {
        for (var user in request.recievers) {
            var connection = clients[request.recievers[user].code];

            if (connection != null) {
                var responce = new Object();
                responce.sender = request.sender;
                responce.message = request.message;
                responce.actionCode = 1;
                connection.write(JSON.stringify(responce));

                persistent.insertPrivateMessage(request.sender, request.recievers[user].code, request.message);
            }

        }
    }

    function refreshContactList() {
        var object = new Object();
        object.actionCode = 0;

        for (var key in clients) {
            var connection = clients[key];
            if (connection != null) {

                var localClients = new Array();

                /*
                 contact list
                 for each client send individual contact list
                 without his contact
                 */
                for (var innerKey in clients) {
                    if (innerKey != key) {
                        localClients.push({ code: innerKey});
                    }
                }

                object.onlineUsers = localClients;

                // current user
                if (key != conn.id) {
                    delete object.currentUser;
                } else {
                    object.currentUser = conn.id;
                }

                connection.write(JSON.stringify(object));
            }
        }
    }

});

var server = http.createServer();
echo.installHandlers(server, {prefix: '/echo'});
server.listen(9999, '127.0.0.1');
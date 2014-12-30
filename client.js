var nodeApp = angular.module('nodeApp', []);

nodeApp.controller('bodyController', function ($scope) {

    $scope.sock = new SockJS('http://127.0.0.1:9999/echo');

    $scope.message = 'Message';
    $scope.selectedContact = null;

    $scope.sock.onopen = function () {
        var usersRequest = new Object();
        usersRequest.actionCode = 0;
        $scope.send(JSON.stringify(usersRequest));

        console.log('open');
    };

    $scope.sock.onmessage = function (e) {
        var response = JSON.parse(e.data);

        switch(response.actionCode){
            case 0: {$scope.getOnlineUsers(response);} break;
            case 1: {alert('private message - (' + response.message + ') from ' + response.sender);} break;
            case 2: {alert('broadcast message - (' + response.message + ') from ' + response.sender);} break;
        }

        console.log('message', e.data);
    };

    $scope.sock.onclose = function () {
        console.log('close');
    };

    $scope.send = function(message){
        if ($scope.sock.readyState === SockJS.OPEN) {
            console.log("sending message")
            $scope.sock.send(message);
        } else {
            console.log("The socket is not open.");
        }
    }

    // to All
    $scope.broadCast = function(){
        var request = new Object();
        request.actionCode = 2;
        request.sender = $scope.currentClientCode;
        request.message = $scope.message;
        $scope.send(JSON.stringify(request));
    }

    // to one or more
    $scope.privateMessage = function(){
        var request = new Object();
        request.actionCode = 1;
        request.message = $scope.message;
        request.sender = $scope.currentClientCode;
        request.reciever = $scope.selectedContact;
        $scope.send(JSON.stringify(request));
    }

    $scope.getOnlineUsers = function(response){
        $scope.onlineUsers = response.onlineUsers;

        if(response.currentUser != null){
          $scope.currentClientCode = response.currentUser;
        }

        $scope.$digest();
        console.log('getOnlineUsers on client');
    }

    $scope.sendClick = function(keyCode){
      if(keyCode == 0){
          $scope.broadCast();
      } else{
          $scope.privateMessage();
      }

    }

});







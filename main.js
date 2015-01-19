var Sequelize = require('sequelize');
var config = require('./db_config.js');
var models = require('./model/models.js');

var classMap = new Object();

var sequelize = new Sequelize('test', 'test', config.password, {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    storage: __dirname + config.storage,
    omitNull: true
});

var Message = models.getMessageModel();

/*for(var i = 0; i <= 6; i++){
    Message.sync({ force: true }).then(function () {return Message.create({content : 'test', sender : 'sender', reciever : 'bnmbnm', type : 'public'});});
}*/


/*
Message.find(2).then(function (photo) {
   console.log('photo = ' + photo);
}).catch(function (error) {
        res.send(500, error);
});*/

classMap['message'] = Message;

var User = models.getUserModel();

classMap['user'] = User;

for(var i = 0; i <= 15; i++){
  //  var user = createUser('name' + i, 'surname' + i)

   /* var user = User.build({name: 'name', surname : 'surnameParam', age : i});
     var user = createUser('name' + i, 'surname' + i, i);*/

//    var getObject = new Object();
  //  saveEntity(getObject);
}


//Message.find({}).then(function(res){console.log(res)});


exports.createUser = function createUser(nameParam, surnameParam, age){
    var user = User.build({name: nameParam, surname : surnameParam, age : age});
    User.sync({ force: false }).then(function () {return User.create(user.dataValues);});
    return user;
};

function saveEntity(entity){

    if(entity.getMappedClass == undefined){
        return;
    }

   var persistclass = classMap[mappedClass];

   if(entity.isNewRecord()){
    persistclass.sync({ force: true }).then(function () {return persistclass.create(entity.dataValues);});
   }else{
    entity.updateAttributes(entity.dataValues)
   }

   var point = 80;
}

function putPrivateMessage(contentParam, senderIdParam, recieverIdParam){
    Message.sync({ force: true }).then(function () {return User.create({ content: contentParam, sender : senderIdParam, reciever : recieverIdParam, type : 'private'});});
}

function putPublicMessage(content, senderId, recieverGroupId){

}







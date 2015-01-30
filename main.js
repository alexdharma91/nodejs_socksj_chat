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

var Message = models.getMessageModel(sequelize, Sequelize);
classMap['message'] = Message;

var User = models.getUserModel(sequelize, Sequelize);
classMap['user'] = User;

exports.createUser = function createUser(nameParam, surnameParam, age) {
    var user = User.build({name: nameParam, surname: surnameParam, age: age});
    User.sync({ force: false }).then(function () {
        return User.create(user.dataValues);
    });
    return user;
};

exports.saveEntity = function (entity) {
    if (entity.getMappedClass == undefined) {
        return;
    }
    var persistclass = classMap[entity.getMappedClass()];

    if (entity.isNewRecord) {
        persistclass.sync({ force: false }).then(function () {
            return persistclass.create(entity.dataValues);
        });
    } else {
        entity.updateAttributes(entity.dataValues)
    }

}

exports.deleteEntity = function (entityClass, id) {
    if (entityClass == undefined) {return;}
    var persistclass = classMap[entityClass];
    persistclass.destroy({where : {id:[id]}});
};

/*
var options = {where : {id:[1,2,3]}}
User.destroy(options);
*/

for(var i = 0; i < 10; i++){
    exports.deleteEntity('user', i);
}



/*
сохранение
for(var i = 0; i < 10; i++){
    var user = User.build({login : 'login', password : 'password', age : 30});
    exports.saveEntity(user);
}
*/



function putPrivateMessage(contentParam, senderIdParam, recieverIdParam) {
    Message.sync({ force: true }).then(function () {
        return User.create({ content: contentParam, sender: senderIdParam, reciever: recieverIdParam, type: 'private'});
    });
}

function putPublicMessage(content, senderId, recieverGroupId) {

}







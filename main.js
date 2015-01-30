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

//  Общее сохранение
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

// Общее удаление
exports.deleteEntity = function (entityClass, id) {
    if (entityClass == undefined) {return;}
    var persistclass = classMap[entityClass];
    persistclass.destroy({where : {id:[id]}});
};

exports.findEntity = function(entityClass, id){
    if (entityClass == undefined) {return;}
    var persistclass = classMap[entityClass];
    persistclass.find(id).success(function(entity){
    console.log('finded');
    })
}

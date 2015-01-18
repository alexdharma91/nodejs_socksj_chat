/*
 var hell = require('./hell');                     var sequelize = new Sequelize('database', 'username', 'password', {
 host: 'localhost',
 dialect: 'mysql'|'mariadb'|'sqlite'|'postgres'|'mssql',

 pool: {
 max: 5,
 min: 0,
 idle: 10000
 },
 // SQLite only
 storage: 'path/to/database.sqlite'
 });
 hell.fire();
 */

var Sequelize = require('sequelize');

// postgres set up
/* var sequelize = new Sequelize('postgres', 'postgres', '123456', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }

}); */

var classMap = new Object();


// postgres set up
var sequelize = new Sequelize('test', 'test', '123456', {
    host: 'localhost',
    port: 5432,
    dialect: 'sqlite',
    storage: __dirname + '/database.sqlite',
    omitNull: true
});

var Message = sequelize.define('message', {
    content : Sequelize.STRING
   ,sender : Sequelize.STRING
   ,reciever : Sequelize.STRING
   ,type : Sequelize.STRING
},{
    paranoid: true,
    instanceMethods: {
        setContent: function(content) {
            this.content = content;
        },
        getContent: function() {
            return this.content;
        }
       ,setSender: function(sender) {
            this.sender = sender;
        }
       ,getSender: function() {
           return this.sender;
        }
       ,setReciever: function(reciever) {
         this.reciever = reciever;
        }
       ,getReciever: function() {
         return this.reciever;
        }
    }
});


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

var User = sequelize.define('sys_user', {
    login : {type : Sequelize.STRING}
   ,age :{type : Sequelize.INTEGER}
   ,mappedClass : {type : Sequelize.STRING, defaultValue: 'user'}
},{
    paranoid: true,
    instanceMethods: {
        setLogin: function(login) {
          this.login = login;
        },
        getLogin: function() {
          return this.login;
        },
        setAge: function(age) {
            this.age = age;
        },
        getAge: function() {
          return this.age;
        },
        getMappedClass : function(){
            return this.mappedClass;
        }
    }
});

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







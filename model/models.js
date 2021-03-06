module.exports.getMessageModel =  function(sequelize, Sequelize) {
    return sequelize.define('sys_user', {
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
}

module.exports.getUserModel = function(sequelize, Sequelize) {
    return sequelize.define('sys_user', {
        login : {type : Sequelize.STRING}
        , password : {type : Sequelize.STRING}
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
            setPassword : function(password){
                this.password = password;
            },
            getPassword : function(){
                return this.password;
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
}

module.exports.getRelationPageUser = function(sequelize, Sequelize){
    return sequelize.define('sys_user', {
         userId : {type : Sequelize.INTEGER}
        ,connectionId : {type : Sequelize.STRING}
        ,mappedClass : {type : Sequelize.STRING, defaultValue: 'relationPageUser'}
    },{
        paranoid: true,
        instanceMethods: {
            setUserId : function(userId){
               this.userId = userId;
            },
             getUser : function(){
               return this.userId;
             },
            setConnectionId : function(connectionId){
               this.connectionId = connectionId;
            },
            getConnectionId : function(){
               return this.connectionId;
            },
            getMappedClass : function(){
                return this.mappedClass;
            }
        }
    });










}
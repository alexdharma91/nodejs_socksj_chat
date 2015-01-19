module.exports.getMessageModel =  function(sequelize, DataTypes) {
    return sequelize.define('sys_user', {
        login : {type : DataTypes.STRING}
        ,age :{type : DataTypes.INTEGER}
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

module.exports.getUserModel = function(sequelize, DataTypes) {
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
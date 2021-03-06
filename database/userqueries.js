//Wrapper functions for sql queries to make code more readable
const Users = require("./dbconnection").Users;
const Promise = require("bluebird");

var findUser = function(username){
    return Users.findOne({
        where: {
            UName: username
        }
    })
}

var insertUser = function(username,password){
    return new Promise((resolve,reject) => {
        findUser(username)
        .then((result) => {
            if (result)
                return resolve(false);
                Users.create({
                    UName: username,
                    Password: password
                })
                .then(() => {
                    return resolve(true)
                })
                .catch((err) => {
                    return reject(err);
                })
        })
        .catch((err) => {
            return reject(err);
        })
    })
}

module.exports = {
    insertUser: insertUser,
    findUser: findUser
}
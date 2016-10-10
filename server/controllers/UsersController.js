var encryption = require('../utilities/encryption');
var users = require('../data/users');

var CONTROLLER_NAME = 'users';

module.exports = {
    getRegister:function (req,res,next) {
        res.render(CONTROLLER_NAME+'/register')
    },
    postRegister:function (req,res,next) {
        var newUserData = req.body;

        if (newUserData.password !=newUserData.comfirmPassword){

            req.session.error = 'Password do not match!';
            res.redirect('/register');//TODO return same view wtih same data
        }else{
            newUserData.salt = encryption.generateSalt();
            newUserData.hashPass = encryption.generateHashsedPassword(newUserData.salt,newUserData.password);
            users.create(newUserData,function (err,user) {
                if(err){
                    console.log("Failed to register new user: "+err);
                    return;
                }
                req.logIn(user,function (err) {
                    if(err){
                        res.status(400);
                        return res.send({reason:err.toString()}); //TODO
                    }else{
                        res.redirect('/');
                    }
                })
            })
        }
    },
    getLogin: function(req, res, next) {
        res.render(CONTROLLER_NAME + '/login');
    }
}
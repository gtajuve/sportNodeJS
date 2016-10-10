var mongoose=require('mongoose'),
    encription = require('../../utilities/encryption');
module.exports.init = function () {
    var userSchema=mongoose.Schema({
        username: { type: String, required: true, unique: true },
        salt: String,
        hashPass: { type: String }
    })
    userSchema.method({
        authenticate:function (password) {
            if(encription.generateHashsedPassword(this.salt,password) === this.hashPass){
                return true
            }else{
                return false;
            }
        }
    })
    var User = mongoose.model('User',userSchema);
}


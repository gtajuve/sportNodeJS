var crypto = require('crypto');
module.exports={
    generateSalt:function () {
        return crypto.randomBytes(128).toString('base64');
    },
    generateHashsedPassword : function (salt,pass) {
        var hmac = crypto.createHmac('sha1',salt);
        return hmac.update(pass).digest('hex');
    }
}
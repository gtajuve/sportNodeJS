var mongoose = require('mongoose'),
    UserModel = require('../data/models/User'),
    TeamModel = require('../data/models/Team'),
    PlayerModel = require('../data/models/Player'),
    ImageModel = require('../data/models/Image');
module.exports = function (config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.once('open',function (err) {
        if(err){
            console.log('Database could not be opened: ' + err);
            return
        }
        console.log('Database up and runnig' );
    })
    db.on('error',function (err) {
        console.log('Database error: '+err );
    })
    UserModel.init();
    TeamModel.init();
    PlayerModel.init();
    ImageModel.init();
}

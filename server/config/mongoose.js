var fs= require('fs');
var mongoose = require('mongoose');
    // UserModel = require('../data/models/User'),
    // TeamModel = require('../data/models/Team'),
    // PlayerModel = require('../data/models/Player'),
    // ImageModel = require('../data/models/Image');

var reqFails=fs.readdirSync(__dirname +'/../data/models');
var files=[];
for (var i=0, length=reqFails.length;i<length;i+=1){
    files.push(require('../data/models/'+reqFails[i]));

}

module.exports = function (config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.once('open', function (err) {
        if (err) {
            console.log('Database could not be opened: ' + err);
            return
        }
        console.log('Database up and runnig');
    })
    db.on('error', function (err) {
        console.log('Database error: ' + err);
    })
    // UserModel.init();
    // TeamModel.init();
    // PlayerModel.init();
    // ImageModel.init();

    for (var i = 0, length = files.length; i < length; i += 1) {
        files[i].init();
    }
}

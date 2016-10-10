var Player = require('mongoose').model('Player');

module.exports = {
    create:function (player,callback) {
        Player.create(player,callback);
    },
    getAll:function (page,pageSize,where,callback) {

        // Player.find().exec(function (err,players) {
        //     if(err){
        //         console.log('Player could not be loaded: ' + err);
        //         return;
        //     }
        //     callback(players);
        // })
        Player.find(where).limit(1*pageSize).skip((page-1)*pageSize)
            .exec(function (err,players) {
                if(err){
                    console.log('Players could not be loaded: ' + err);
                    return;
                }
                Player.count(where).exec(function (err,numberOfPlayers) {
                    var data={
                        players:players,
                        totalPlayers:numberOfPlayers,
                        page:page,
                        pageSize:pageSize,
                    };
                    callback(data);
                })

            })
    },
    deleteById:function (request,callback) {
        Player.remove(request).exec(function (err) {
            if(err){
                console.log('Player could not be removed: ' + error);
                return next(error);
            }
        })
    },
    findById:function (request,callback) {

        Player.findOne(request).exec(function (err,player) {
            if(err){
                console.log('Player could not be loaded: ' + error);
                return;
            }

            callback(player);
        })
    },
    editPlayerById:function (request,callback) {
        Player.findByIdAndUpdate(request._id,request.updatedData, function (err) {
            if(err){
                console.log('Player could not be updated: ' + error);
                return;

            }
        });
    }
};
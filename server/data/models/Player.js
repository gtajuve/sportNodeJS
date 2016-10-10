var mongoose=require('mongoose');

var defaultImage='http://cache.images.core.optasports.com/soccer/players/150x150/288994.png';
module.exports.init = function () {
    var playerSchema=mongoose.Schema({
        firstName:{type:String,require:true},
        lastName:{type:String,require:true},
        playerTeam:{type:String,require:true},
        playerCountry:{type:String,require:true},
        position:{type:String,require:true},
        image:{type:String,default:defaultImage}
    })
    var Player = mongoose.model('Player',playerSchema);
}



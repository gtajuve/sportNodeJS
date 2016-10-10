var mongoose=require('mongoose');

var defaultImage='http://cache.images.core.optasports.com/soccer/teams/150x150/18718.png';
module.exports.init = function () {
    var teamSchema=mongoose.Schema({
        teamname:{type:String,require:true},
        teamCountry:{type:String,require:true},
        image:{type:String,default:defaultImage}
    })
    var Team = mongoose.model('Team',teamSchema);
}


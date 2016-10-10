var Team = require('mongoose').model('Team');

module.exports = {
    create:function (team,callback) {
        Team.create(team,callback);
    },
    getAll:function (page,pageSize,country,callback) {
        var where={};
        if(country!=0)
        {
            where.teamCountry=country;
        }
        Team.find(where).limit(1*pageSize).skip((page-1)*pageSize)
            .exec(function (err,teams) {
            if(err){
                console.log('Teams could not be loaded: ' + err);
                return;
            }
            Team.count(where).exec(function (err,numberOfTeams) {
                var data={
                    teams:teams,
                    totalTeams:numberOfTeams,
                    page:page,
                    pageSize:pageSize,
                };
                callback(data);
            })

        })
    },
    deleteById:function (request,callback) {
        Team.remove(request).exec(function (err) {
            if(err){
                console.log('Team could not be removed: ' + error);
                return next(error);
            }
        })
    },
    findById:function (request,callback) {

        Team.findOne(request).exec(function (err,team) {
            if(err){
                console.log('Team could not be loaded: ' + error);
                return;
            }

            callback(team);
        })
    },
    editTeamById:function (request,callback) {
        Team.findByIdAndUpdate(request._id,request.updatedData, function (err) {
            if(err){
                console.log('Team could not be updated: ' + error);
                return;

            }
        });
    }
};
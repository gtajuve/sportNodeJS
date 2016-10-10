var players = require('../data/players');
var teams = require('../data/teams');
var constants = require('../common/constants');
var CONTROLLER_NAME = 'players';

module.exports ={
    getCreate:function (req,res,next) {
        teams.getAll(1,100,0,function (data,err) {
            res.render(CONTROLLER_NAME+'/create',{countrys:constants.country,
                                                    teams:data.teams,
                                                    positions:constants.positions})
        })

    },
    postCreate:function (req,res,next) {
        var newPlayerData=req.body;
        if(newPlayerData.firstName==""||newPlayerData.lastName==""){
            teams.getAll(1,100,0,function (data,err) {
                res.render(CONTROLLER_NAME+'/create',{countrys:constants.country,
                    teams:data.teams,
                    positions:constants.positions})
            })
            return;
        }else{
            if(newPlayerData.image==""){
                delete newPlayerData.image;
            }
            players.create(newPlayerData,function (err,team) {
                var data = {

                }
                if(err){
                    console.log("Failed to register new team: "+err);
                    res.render(CONTROLLER_NAME+'/create',data);
                }
                res.redirect('/'+CONTROLLER_NAME);
            })
        }
    },
    getAllPlayers:function (req,res) {
        var page= req.query.page || 1;
        var pageSize= req.query.pageSize || 5;
        var country= req.query.playerCountry||0;
        var team=req.query.playerTeams||0;
        var position=req.query.position||0;
        var filter={};
        if (country!=0)
        {
            filter.playerCountry=country;
        }
        if (team!=0)
        {
            filter.playerTeam=team;
        }
        if (position!=0)
        {
            filter.position=position;
        }

        var allTeams;
        teams.getAll(1,100,0,function (data,err) {
            allTeams=data.teams;
        })
        players.getAll(page,pageSize,filter,function (data,err) {
            data.countrys=constants.country;
            data.playerCountry=country;
            data.teams=allTeams;
            data.positions=constants.positions;
            data.choosedTeam=team;
            data,choosedPos=position;
            res.render(CONTROLLER_NAME+'/show',data);
        })
    },
    deletePlayer:function (req,res) {
        var playerId=req.params.id;

        players.deleteById({_id:playerId},function () {

        });
        res.redirect('/players');

    },
    getEdit:function (req,res) {
        var playerId=req.params.id;
        players.findById({_id:playerId},function (player,err) {
            teams.getAll(1,100,0,function (data,err) {
                res.render(CONTROLLER_NAME+'/edit',{countrys:constants.country,
                    teams:data.teams,
                    positions:constants.positions,
                    player:player,
                })
            })

        })
    },
    postEdit:function (req,res) {
        var playerId=req.params.id;
        var updatedData=req.body;
        players.editPlayerById({_id:playerId,updatedData:updatedData},function (player,err) {

        });
        res.redirect('/'+CONTROLLER_NAME);
    }
}
var teams = require('../data/teams');
var constants = require('../common/constants');
var CONTROLLER_NAME = 'teams';

module.exports ={
    getCreate:function (req,res,next) {
        res.render(CONTROLLER_NAME+'/create',{countrys:constants.country})
    },
    postCreate:function (req,res,next) {
        var newTeamData=req.body;
        if(newTeamData.teamname==""||newTeamData.country==""){
            res.render(CONTROLLER_NAME+'/create',{countrys:constants.country,teamname:newTeamData.teamname,image:newTeamData.image})
            return;
        }else{
            if(newTeamData.image==""){
                delete newTeamData.image;
            }
            teams.create(newTeamData,function (err,team) {
                var data = {
                    teamname:newTeamData.teamname,
                    teamCountry:constants.country,
                    errorMessage: err
                }
                if(err){
                    console.log("Failed to register new team: "+err);
                    res.render(CONTROLLER_NAME+'/create',data);
                }
                res.redirect('/'+CONTROLLER_NAME);
            })
        }
    },
    getAllTeams:function (req,res) {
        var page= req.query.page || 1;
        var pageSize= req.query.pageSize || 5;
        var country= req.query.teamCountry||0;
        teams.getAll(page,pageSize,country,function (data,err) {
           data.countrys=constants.country;
            data.teamCountry=country;
            res.render(CONTROLLER_NAME+'/show',data);
        })
    },
    deleteTeam:function (req,res) {
        var teamId=req.params.id;

        teams.deleteById({_id:teamId},function () {

        });
        res.redirect('/teams');

    },
    getEdit:function (req,res) {
        var teamId=req.params.id;
        teams.findById({_id:teamId},function (team,err) {
            var data={
                countrys:constants.country,
                team:team
            }
            res.render(CONTROLLER_NAME+'/edit',data);
        })
    },
    postEdit:function (req,res) {
        var teamId=req.params.id;
        var updatedData=req.body;
        teams.editTeamById({_id:teamId,updatedData:updatedData},function (team,err) {

        });
        res.redirect('/teams');
    }
}
var auth = require('./auth'),
    controllers = require('../controllers'),
    constants = require('../common/constants');

module.exports = function (app) {
    app.get('/register',controllers.users.getRegister);
    app.post('/register',controllers.users.postRegister);

    app.get('/login',controllers.users.getLogin);
    app.post('/login',auth.login);
    app.get('/logout',auth.logout);

    app.get('/teams',controllers.teams.getAllTeams);
    app.get('/teams/create',controllers.teams.getCreate);
    app.post('/teams/create',controllers.teams.postCreate);
    app.get('/teams/edit/:id',controllers.teams.getEdit);
    app.post('/teams/edit/:id',controllers.teams.postEdit);
    app.get('/teams/delete/:id',controllers.teams.deleteTeam);

    app.get('/players',controllers.players.getAllPlayers);
    app.get('/players/create',controllers.players.getCreate);
    app.post('/players/create',controllers.players.postCreate);
    app.get('/players/edit/:id',controllers.players.getEdit);
    app.post('/players/edit/:id',controllers.players.postEdit);
    app.get('/players/delete/:id',controllers.players.deletePlayer);

    app.get('/pictures',controllers.images.getAll);
    app.get('/upload/:id',controllers.images.getUpload);
    app.post('/upload/:id',controllers.images.postUpload);


    app.get('/',function (req,res) {
        res.render('index');
    });
    app.get('*',function (req,res) {
        res.render('index');
    });

}
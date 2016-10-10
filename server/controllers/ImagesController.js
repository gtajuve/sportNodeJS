var images = require('../data/images');
var config = require('../config/config');
var fs = require('fs');
var uuid = require('node-uuid');

var CONTROLLER_NAME = 'images';

module.exports = {
    getUpload:function (req,res,next) {
        res.render(CONTROLLER_NAME+'/upload')
    },
    postUpload:function (req,res,next) {
        var targetPath=config.development.rootPath+'public/images/';
        var teamId=req.params.id;
        req.pipe(req.busboy);
        req.busboy.on('file', function(fieldname, file, filename) {
            filename=uuid.v1()+'.jpg';
            var fstream = fs.createWriteStream(targetPath + filename);
            file.pipe(fstream);
            fstream.on('close', function () {
                var image ={
                    teamId:teamId,
                    imageName:filename
                }
                images.create(image,function (err,image) {
                    if(err){
                        console.log(err);
                    }
                    res.redirect('/teams');
                });
            });
        });
    },
    getAll:function (req,res,next) {
        var request;
        images.getAll(request,function (findImages) {
            var data={
                images:findImages
            }
            res.render(CONTROLLER_NAME + '/show',data);
        })
    }
}
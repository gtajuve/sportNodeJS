var Image = require('mongoose').model('Image');

module.exports ={
    create:function (image,callback) {
        Image.create(image,callback)
    },
    getAll:function (request,callback) {
       Image.find().exec(function (err,teams) {
           callback(teams);
       })
    }
}
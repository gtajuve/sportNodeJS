var mongoose=require('mongoose');


module.exports.init = function () {
    var imageSchema=mongoose.Schema({
        teamId:{type:String,require:true},
        imageName:{type:String,require:true}
    })
    var Image = mongoose.model('Image',imageSchema);
}


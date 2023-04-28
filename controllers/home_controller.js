const {v4 : uuidv4} = require('uuid');

module.exports.index = function(req,res){
    res.render('index',{
        title : "Join Room",
        roomId : uuidv4()
    })
}

module.exports.home = function(req,res){
    return res.render('home',{
        title : "Zoom",
        roomId : req.params.room
    })
}
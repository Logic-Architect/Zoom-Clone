module.exports.home = function(req,res){
    return res.render('home',{
        title : "Zoom",
        roomId : req.params.room
    })
}
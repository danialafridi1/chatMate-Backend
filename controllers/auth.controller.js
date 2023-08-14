exports.register=async(req,res,next)=>{
    try {
        
        res.status(200).send(req.body)
    } catch (error) {
        next(error);
    }
}

exports.login=async(req,res,next)=>{
    try {
        
        
    } catch (error) {
        next(error);
    }
}
exports.logout=async(req,res,next)=>{
    try {
        
        
    } catch (error) {
        next(error);
    }
}
exports.refreshToken=async(req,res,next)=>{
    try {
        
        
    } catch (error) {
        next(error);
    }
}
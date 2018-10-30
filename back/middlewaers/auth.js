const userState=(req,res,next)=>{
    if(req.session.userInfo){
        next();
    }else{
        res.render('user',{
            code:403,
            data:JSON.stringify({
                msg:"登录身份已过期，请重新登录"
            })
        })
    }
}
module.exports={
    userState
}
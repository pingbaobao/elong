const jwt=require('jsonwebtoken');
const user_model=require('../models/user');
const fs  = require('fs');
const PATH  = require('path');
const isSignin =(req,res)=>{
       res.render('user',{
           code:200,
           data:JSON.stringify({
               msg:"用户已经登录了"
           })
       })
}
const userinfo= async(req,res)=>{
    var _decoded = jwt.verify(req.cookies.token, 'hahaha');
    console.log(_decoded,555);
    let userId=_decoded.id;
    let _result=await user_model.getUserInfoById(userId);
    res.render('user',{
        code:200,
        data:JSON.stringify({
            userId:_result._id,
            username:_result.username
        })
    })
}
const exit=(req,res)=>{
    req.session.userInfo=null;
    res.render('user',{
        code:200,
        data:JSON.stringify({
            msg:"用户退出登录成功"
        })
    })
}
const auth=async (req,res)=>{
    let _site=await user_model.levels()[req.query.site];
    let _public=fs.readFileSync(PATH.resolve(__dirname,'../keys/public.key'));
    var _decoded = jwt.verify(req.cookies.token,_public, {algorithm: 'RS256'});
    let _auth=_decoded.level>=_site;
    res.render('user',{
        code:_auth?200:402,
        data:JSON.stringify({
            msg:_auth?"可以访问":"您的权限不够，请联系管理员"
        })
    })
}
module.exports={
   isSignin,
   userinfo,
   exit,
   auth 
}
const user_model=require('../models/user');
const isSignin =(req,res)=>{
    if(req.session.userInfo){
       res.render('user',{
           code:200,
           data:JSON.stringify({
               msg:"用户已经登录了"
           })
       })
    }else{
        res.render('user',{
            code:403,
            data:JSON.stringify({
                msg:"用户未登录，请重新登录"
            })
        })
    }
}
const userinfo= async(req,res)=>{
    let userId=req.session.userInfo.id;
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
    let _auth=req.session.userInfo.level>=_site;
    console.log(req.session.userInfo.level,_site)
    res.render('user',{
        code:_auth?200:402,
        data:JSON.stringify({
            msg:_auth?"可以访问":"您的权限不够，请联系管理员"
        })
    })
}
//获取所有用户信息
const userlist=async (req,res)=>{
    let _result=await user_model.userlist();
    res.render('user',{
        code:200,
        data:JSON.stringify(_result)
    })
}
const userremove=async(req,res)=>{ 
    console.log(req.query)
    let _result=await user_model.userremove(req.query);
    
    res.render('user',{
        code:200,
        data:JSON.stringify(_result)
    })
}
const findOne=async(req,res)=>{
    let _result=await user_model.findOne(req.query);
    res.render('user',{
        code:200,
        data:JSON.stringify(_result)
    })
}
const userupdate=async(req,res,next)=>{
    res.set('content-type', 'application/json; charset=utf8');
    req.session.userInfo={
        id:req.body._id,
        level:req.body.level
    }
    let _result=await user_model.userupdate(req.body);
    console.log(_result);
    res.render('user',{
        code:200,
        data:JSON.stringify({
            msg:"用户信息修改成功"
        })
    })
}
module.exports={
   isSignin,
   userinfo,
   exit,
   auth,
   userlist,
   userremove,
   findOne,
   userupdate 
}
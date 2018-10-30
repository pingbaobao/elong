const admin_model = require('../models/admin')
const { handleData } = require('../util')
const signup = async (req, res, next) => {
    // 先判断有没有这个用户 
    let _judge_result = await admin_model.judgeUserByUsername(req.body.username)
    // console.log(_judge_result,2);
    if ( !_judge_result.length ) { // 如果没有这个用户
        // 注册
        // console.log(req.body,3);
        let _data = await admin_model.signup(req.body);
        // console.log(_data,4);
        handleData(_data, res, 'admin');
    } else { // 如果有这个用户
        res.render('admin', {
            code: 201,
            data: JSON.stringify('用户名已存在')
        })
    }
    
}
const signin = async (req, res, next) => {
    // console.log(req.body);
    //有没有这个用户 
    let _judge_result = await admin_model.judgeUserByUsername(req.body.username)
    
    if ( !!_judge_result.length ) { // 如果有这个用户
        // 登录
        let _data = await admin_model.signin(req.body.password, _judge_result[0])
        // 如果前端利用完整的表单提交逻辑的话，可以利用res.redirect告知浏览器进行跳转
        // console.log(_data);
        if (_data) {
               req.session.userInfo={
                    id:_judge_result[0]._id,
                    level:_judge_result[0].level||8
               }
            res.render('admin', { code: 200, data: JSON.stringify('success') })
        } else {
            res.render('admin', { code: 203, data: JSON.stringify('密码错误') })
        }
        
    } else { // 如果没有这个用户
        res.render('admin', {
            code: 202,
            data: JSON.stringify('用户名不存在')
        })
    }
    
    
}


module.exports = {
    signup,
    signin
}
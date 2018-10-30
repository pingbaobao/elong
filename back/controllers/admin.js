const admin_model = require('../models/admin');
const fs  = require('fs');
const PATH  = require('path');
const {
    handleData
} = require('../util');
const jwt = require("jsonwebtoken");
const signup = async (req, res, next) => {
    // 先判断有没有这个用户 
    let _judge_result = await admin_model.judgeUserByUsername(req.body.username)
    // console.log(_judge_result,2);
    if (!_judge_result.length) { // 如果没有这个用户
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

    if (!!_judge_result.length) { // 如果有这个用户
        // 登录
        let _data = await admin_model.signin(req.body.password, _judge_result[0])
        // 如果前端利用完整的表单提交逻辑的话，可以利用res.redirect告知浏览器进行跳转
        // console.log(_data);
        if (_data) {
            let _payload = {
                id: _judge_result[0]._id,
                username: _judge_result[0].username,
                level: _judge_result[0].level || 8
            }
            let _private=fs.readFileSync(PATH.resolve(__dirname,'../keys/private.key'));
            let _token = jwt.sign(_payload,_private,{algorithm: 'RS256'});
            res.cookie('token',_token);
            res.render('admin', {
                code: 200,
                data: JSON.stringify("登录成功")
            })
        } else {
            res.render('admin', {
                code: 203,
                data: JSON.stringify('密码错误')
            })
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
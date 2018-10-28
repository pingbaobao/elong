
const mongoose = require('../util/mongoose')
const bcrypt = require('bcrypt')
const { hash } = require('../util')

var UserModel = mongoose.model('users', new mongoose.Schema({
    username: String,
    password: String,
    signupTime: String
}));

// 注册，存入数据到数据库password
const signup = async ({ username, password }) => {
    let _password = await hash(password)
    // 应该对密码进行加密之后再存储，可以利用node内置模块crypto，
    return new UserModel({
        username,
        password: _password,
        signupTime: Date.now()
    })
    .save()
    .then((results) => {
        console.log(results,1);
        let { _id, username } = results
        return { _id, username}
    })
    .catch(() => {
        console.log(results,2);
        return false
    })
}

// 登录
// @param pwd 是用户传入的密码
// @param password 是此用户的加密密码
// :result 是否匹配
const signin = async (pwd, { password }) => {
    return bcrypt.compare(pwd, password)
}


// 通过用户名验证是否有这个用户
const judgeUserByUsername = (username) => {
    return UserModel
    .find({ username })
    .then((results) => {
        return results
    })
    .catch(() => {
        return false
    })
            
}

module.exports = {
    signup,
    signin,
    judgeUserByUsername
}
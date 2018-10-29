
const mongoose = require('../util/mongoose');
const bcrypt = require('bcrypt');
// const { hash } = require('../util');

var UserModel = mongoose.model('users', new mongoose.Schema({
    username: String,
    password: String,
    signupTime: String
}));

// 注册，存入数据到数据库password
const signup = async ({ username, password }) => {
    // let _password = await hash(password);
    // 应该对密码进行加密之后再存储，可以利用node内置模块crypto，
    const saltRounds = 10;
    //随机生成salt
    const salt = bcrypt.genSaltSync(saltRounds);
    //获取hash值
    var hash = bcrypt.hashSync(password, salt);
     //把hash值赋值给password变量
    let _password = hash;

    return new UserModel({
        username,
        password: _password,
        signupTime: Date.now()
    })
    .save()
    .then((results) => {
        let { _id, username } = results
        return { _id, username}
    })
    .catch(() => {
        return false;
    })
}

const signin = async (pwd, { password }) => {
    return bcrypt.compareSync(pwd, password);
}


// 通过用户名验证是否有这个用户
const judgeUserByUsername = (username) => {
    return UserModel
    .find({ username })
    .then((results) => {
        return results;
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
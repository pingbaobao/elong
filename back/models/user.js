const mongoose =require('../util/mongoose');
//找到这个集合
const UsersModel = mongoose.model('users');
const getUserInfoById=(userId)=>{
    return UsersModel.findById(userId)
    .then((result)=>{
        return result;
    }).catch((result)=>{
        return false;
    })
}
const levels=()=>{
    return {
        'map':5,
        'list':1,
        'remove':3

    }
}
module.exports={
    getUserInfoById,
    levels
}
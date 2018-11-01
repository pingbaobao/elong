const mongoose =require('../util/mongoose');
//找到这个集合
const UsersModel = mongoose.model('users');
const bcrypt = require('bcrypt');
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
        'remove':3,
        'usermanage':10,
        'user-update':10
    }
}
const userlist=()=>{
    return UsersModel.find({ username:{ $ne:"000"}})
    .sort({level: -1})
    .then((result)=>{
        return result;
    }).catch(()=>{
        return false;
    })
}
const userremove=({id})=>{
    return  UsersModel.deleteOne({_id:id}).then((results)=>{
        results.deleteId=id;
        return results;
    }).catch((err)=>{
        return false;
    })
}
const findOne=({id})=>{
    return  UsersModel.findById({_id:id}).then((results)=>{
        return results;
    }).catch((err)=>{
        return false;
    })
}
const userupdate=(body)=>{
    const saltRounds = 10;
    //随机生成salt
    const salt = bcrypt.genSaltSync(saltRounds);
    //获取hash值
    var hash = bcrypt.hashSync(body.password, salt);
     //把hash值赋值给password变量
    let _password = hash;
    body.password=_password;
        return UsersModel.updateOne({_id:body.id},{...body}).then((result)=>{
        return result;
        }).catch((result)=>{
            return false;
        })
}
module.exports={
    getUserInfoById,
    levels,
    userlist,
    userremove,
    findOne,
    userupdate

}
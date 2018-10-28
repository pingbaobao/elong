const mongoose = require('../util/mongoose')
const Moment = require('moment')
const fs=require('fs-extra');
const PATH=require('path')
var hotel = mongoose.model('hotels', new mongoose.Schema({
    hotelImage:String,
    hotelName: String,
    location: String,
    hotelType:String,
    basePrice: String,
    createTime: String,
    formatTime: String
}));

const listall = (query) => {
    let _query=query||{};
    return hotel.find(_query).
           then((results) => {
               return results
           }).
           catch((err) => {
               return false
           })
}

const list = async ({ pageNo = 1, pageSize = 10, search = '' }) => {
    let re = new RegExp(search, 'i');
    let _query = search ?  { hotelName: re } : {}// 查询的约定条件
    let _all_items = await listall(_query)


    return hotel.find(_query)
    .sort({createTime: -1})
    .skip((pageNo - 1) * pageSize)// 从哪一页开始
    .limit(~~pageSize)// 截取多少
    .then((results) => {
        return { 
            items: results, 
            pageInfo: { // 页码信息
                pageNo, // 当前页
                pageSize, // 一页数量
                total: _all_items.length, // 总数
                totalPage: Math.ceil(_all_items.length / pageSize) // 总页数
            }
        }
    }).catch((err) => {
        return false
    })
}


const save = (body) => {
    let _timestamp = Date.now()
    let moment = Moment(_timestamp)
    return new hotel({ 
        ...body,
        createTime: _timestamp,
        formatTime: moment.format("YYYY-MM-DD, hh:mm")
    }).save()
      .then((result) => {
        return result
      })
      .catch((err) => {
          return false
      })
}
const remove =async ({id})=>{
     let _row=await findOne({id});
    return  hotel.deleteOne({_id:id}).then((results)=>{
        results.deleteId=id;
        fs.removeSync(PATH.resolve(__dirname, '../public'+_row.hotelImage));
        return results;
    }).catch((err)=>{
        return false;
    })
}
const findOne =async ({id})=>{
    return hotel.findById(id).
    then((result)=>{
        return result;
    }).catch((result)=>{
        return false;
    })
}

const update = (body) => {
    if(!body.hotelImage) delete body.hotelImage;
    if(body.republish){
        let _timestamp = Date.now();
        let moment = Moment(_timestamp);
        body.createTime = _timestamp;
        body.formatTime = moment.format("YYYY-MM-DD, hh:mm");
    }
        return hotel.updateOne({_id:body.id},{...body}).then((result)=>{
        return result;
        }).catch((result)=>{
            return false;
        })
    
}
module.exports = {
    list,
    listall,
    save,
    findOne,
    remove,
    update
}
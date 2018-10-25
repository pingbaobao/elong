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


const list = () => {
     return hotel.find({}).
            then((results) => {
                return results
            }).
            catch((err) => {
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
    save,
    findOne,
    remove,
    update
}
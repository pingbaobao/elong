const mongoose = require('../util/mongoose')
const Moment = require('moment')

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
    // limit skip
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

module.exports = {
    list,
    save
}
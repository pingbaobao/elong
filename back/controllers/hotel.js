const { errorData } = require('../util')
const hotel_model = require('../models/hotel')
// list控制器
const list = async (req, res) => {
    res.set('content-type', 'application/json; charset=utf8')
    let _data = await hotel_model.list()
    let err = errorData(_data, res, 'hotel')
    if ( err ) res.render('hotel', { 
        code: 200, 
        data: JSON.stringify(_data)
    })
}
// 添加职位
const save = async (req, res) => {
    // 接收到发送过来的数据 req.body, 然后存入数据库
    res.set('content-type', 'application/json; charset=utf8')
    let _data = await hotel_model.save(req.body)
    let err = errorData(_data, res, 'hotel')
    if ( err ) res.render('hotel', { 
        code: 200, 
        data: JSON.stringify(_data)
    })
}
// 修改酒店信息
const update = async (req, res) => {
    // 接收到发送过来的数据 req.body, 然后存入数据库
    res.set('content-type', 'application/json; charset=utf8')
    let _data = await hotel_model.update(req.body)
    let err = errorData(_data, res, 'hotel')
    if ( err ) res.render('hotel', { 
        code: 200, 
        data: JSON.stringify(_data)
    })
}
const remove =async(req,res)=>{
    res.set('content-type', 'application/json; charset=utf8')
    let _data=await hotel_model.remove(req.query);
    let err = errorData(_data, res, 'hotel')
    if ( err ) res.render('hotel', { 
        code: 200, 
        data: JSON.stringify(_data)
    })
}
const findOne =async(req,res)=>{
    res.set('content-type', 'application/json; charset=utf8')
    let _data=await hotel_model.findOne(req.query);
    let err = errorData(_data, res, 'hotel')
    if ( err ) res.render('hotel', { 
        code: 200, 
        data: JSON.stringify(_data)
    })
}
module.exports = {
    list,
    save,
    remove,
    findOne,
    update
}
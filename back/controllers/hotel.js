const { handleData } = require('../util');
const hotel_model = require('../models/hotel')
// list控制器
const list = async (req, res) => {
    res.set('content-type', 'application/json; charset=utf8')
    let _data = await hotel_model.list(req.query)
    handleData(_data, res, 'hotel');
}
// listall控制器
const listall = async (req, res) => {
    res.set('content-type', 'application/json; charset=utf8')
    let _data = await hotel_model.listall();
    handleData(_data, res, 'hotel');
}
// 添加
const save = async (req, res) => {
    // 接收到发送过来的数据 req.body, 然后存入数据库
    res.set('content-type', 'application/json; charset=utf8')
    let _data = await hotel_model.save(req.body)
    handleData(_data, res, 'hotel');
}
// 修改酒店信息
const update = async (req, res) => {
    // 接收到发送过来的数据 req.body, 然后存入数据库
    res.set('content-type', 'application/json; charset=utf8')
    let _data = await hotel_model.update(req.body)
    handleData(_data, res, 'hotel');
}
const remove =async(req,res)=>{
    res.set('content-type', 'application/json; charset=utf8')
    let _data=await hotel_model.remove(req.query);
    handleData(_data, res, 'hotel');
}
const findOne =async(req,res)=>{
    res.set('content-type', 'application/json; charset=utf8')
    let _data=await hotel_model.findOne(req.query);
    handleData(_data, res, 'hotel');
}
module.exports = {
    list,
    save,
    remove,
    findOne,
    update,
    listall
}
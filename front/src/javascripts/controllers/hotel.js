import {handleToastByData,bus,toast} from '../util';
import hotel_list_template from '../views/hotel-list.html';
import hotel_save_template from '../views/hotel-save.html';
import hotel_update_template from '../views/hotel-update.html';
import hotel_model from '../models/hotel';
import qs from 'querystring'

//显示分页
const list = async (req, res, next) => {
    req.query=req.query||{};
    let _page={
        pageNo:req.query.pageNo,
        pageSize:req.query.pageSize,
        search:req.query.search
    }
    let html = template.render(hotel_list_template, {
        data: (await hotel_model.list(_page)).data
    })
    res.render(html);
    bindListEvent(_page);// 绑定事件
}
// list的事件绑定
const bindListEvent = (_page) => {
    //切换到添加页
    $('.hotel-list #addbtn').on('click', function () {
        bus.emit('go','/hotel-save')
    })
    //切换到修改页面
    $('.hotel-list .hotel-update').on('click', function () {
        let id = $(this).parents('td').data('id')
        bus.emit('go','/hotel-update', { id })
    })
    //数据删除
    $('.hotel-list .hotel-remove').on('click',function(){
        handelRemoveHotel.bind(this,_page)()
    })
    //数据搜索
    $('.hotel-list #possearch').on('click',function(){
        console.log('s');
        let _search = $('.hotel-list #keywords').val()
        // 重新刷新路由 ，注意，页码回复到1
        let _params = {
            search: _search,
            pageNo: 1
        }
        bus.emit('go',`/hotel-list?${$.param(_params)}`)
    })
}
//信息添加
const save = async (req, res, next) => { 
    res.render(hotel_save_template)
    bindSaveEvent();
    previewImage();
}
//图片预览
const previewImage=()=>{
    //为元素添加onchange，调用函数
    document.getElementById("hotelImageSelect").setAttribute("onchange", "preview(this)");
    //选择图片，马上预览
    window.preview=function(obj) {
        var file = obj.files[0];
        var reader = new FileReader();
        //读取文件过程方法
        reader.onload = function (e) {
            // 成功读取;
            toast('图片以已传到本地');
            var img = document.getElementById("hotelImagePreview");
            img.src = e.target.result;
        }
        reader.readAsDataURL(file)
    }
}
// save的事件绑定
const bindSaveEvent = () => {
    $('.hotel-save #back').on('click', function () {
        bus.emit('go', '/hotel-list')
    })
    $('.hotel-save #save-form').submit(handleSaveSubmit)
}
// 开关防止多次提交
let _isLoading = false
const handleSaveSubmit = async function (e) {
    e.preventDefault();
    if ( _isLoading ) return false;
    _isLoading = true
    let result = await hotel_model.save();
    _isLoading = false;
    handleToastByData(result);
    bus.emit('go', '/hotel-list');
}
//酒店信息修改
const update = async (req, res) => { 
    let { id } = req.body// 要更新的数据的id
    // 获取id对应的数据进行渲染
    let _html = template.render(hotel_update_template, {
        data: (await hotel_model.findOne({ id })).data // 获取到列表数据
    })
    res.render(_html);
    bindUpdateEvent();
    previewImage();
}
const bindUpdateEvent=()=>{
    $('.hotel-update #back').on('click', function () {
        bus.emit('go', '/hotel-list')
    })
    $('.hotel-update #update-form').submit('click', handelUpdateHotel)
}
//酒店信息修改控制
const handelUpdateHotel=async function(e){
    e.preventDefault();
    let _result =await hotel_model.update();
    handleToastByData(_result);
}
//酒店信息的移除
const handelRemoveHotel=async function(_page){
    let _id=$(this).parents('td').data('id');
    let _data=await hotel_model.remove({id:_id});
    let trs = $('.position-list__tabel tr[data-id]')
    // 如果只剩一个，将pageNo-1
    let _pageNo = trs.length > 1 ? _page.pageNo : (_page.pageNo - (_page.pageNo > 1 ? 1 : 0))

    handleToastByData(_data, {
        isReact: false,
        success: (data) => {
            // 删除成功后 刷新页面
            bus.emit('go', '/hotel-list?pageNo='+_pageNo+'&_='+data.deleteId)
        }
    })
}

export default {
    list,
    save,
    update
}
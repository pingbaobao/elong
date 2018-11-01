import usermanage_template from '../views/usermanage.html';
import user_model from '../models/user';
import userupdate_template from '../views/user-update.html';
import {handleToastByData,bus,toast} from '../util';
import auth_template from '../views/auth.html'
const usermanage=async (req,res)=>{
    let _auth=await user_model.auth('usermanage');
    if(_auth.status===403){
        alert('登陆后操作')
        window.location.href = '/admin.html'
        return false;
    }
    if ( _auth.status === 402 ) {
        res.render(auth_template)
        return false;
    }
    renderUserManage(req,res);
}
const renderUserManage=async (req,res)=>{
    let html = template.render(usermanage_template, {
        data: (await user_model.userlist()).data
    })
    res.render(html);
    bindEvent();
}
const bindEvent=()=>{
    $('.user-remove').on('click',function(){
        let _id=$(this).parents('tr').data('id');
        let _result= user_model.remove({id:_id});
        if(_result.status==200){
              window.location.reload();
        }
      
    })
    $('.user-update').on('click',function(){
        let id = $(this).parents('td').data('id')
        bus.emit('go','/user-update', { id })
    })
    
}
const userupdate=async (req,res)=>{
    let _auth=await user_model.auth('user-update');
    if(_auth.status===403){
        alert('登陆后操作')
        window.location.href = '/admin.html'
        return false;
    }
    if ( _auth.status === 402 ) {
        res.render(auth_template)
        return false;
    }
    update(req,res);
}
const update = async (req, res) => { 
    let { id } = req.body// 要更新的数据的id
    // 获取id对应的数据进行渲染
    let _html = template.render(userupdate_template, {
        data: (await user_model.findOne({ id })).data // 获取到列表数据
    })
    res.render(_html);
    bindUpdateEvent();
}
const bindUpdateEvent=function(){
    $('#back').on('click',function(){
        bus.emit('go','/usermanage');
    })
    $('#update-user').on('click',function(){
        $('.user-update #updateuser-form').submit('click', handelUpdateUser);
    })
}
const handelUpdateUser=async function(e){
    e.preventDefault();
    let _result =await user_model.update();
    handleToastByData(_result);
    bus.emit('go','/usermanage');
}
export default{
    usermanage,
    userupdate
}
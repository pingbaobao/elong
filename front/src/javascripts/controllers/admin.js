import adminForm_template from '../views/adminForm.html';
import admin_model from '../models/admin';
import qs from 'querystring';
import toast from '../util/toast';
var flag = true; //如果有账号  要登录
const modeSwitch = () => {
    adminRender(flag);
    $('.nav_slider div').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
        flag = $(this).data('flag');
        adminRender(flag);
    })
}
const adminRender = (flag) => {
    var _html = template.render(adminForm_template, {
        type:flag
    })
    $('.form-box').html(_html);
    bindEvent();
}
const bindEvent=()=>{
    // 注册表单
    $('#admin-content').on('submit', '#signup-form', async function (e) {
        e.preventDefault();
        let _params = $(this).serialize();
        let _result = await admin_model.signup(qs.parse(_params))
        console.log(_result);
        switch ( _result.status ) {
            case 500: toast('失败，服务器出了问题'); break;
            case 201:  toast('用户已存在'); break;
            default: 
                toast('注册成功');
                // render('signin')
                break;
        }
    })
    // 登录表单
    $('#admin-content').on('submit', '#signin-form', async function (e) {
        e.preventDefault()
        let _params = $(this).serialize();
        let _result = await admin_model.signin(qs.parse(_params));
        console.log(_result);
        switch ( _result.status ) {
            case 203: toast('密码错误'); break;
            case 202:  toast('用户不存在'); break;
            default: 
                localStorage.user = qs.parse(_params).username
                window.location.href = "/"; 
            break;
        }
    })
}
export default {
    modeSwitch
}
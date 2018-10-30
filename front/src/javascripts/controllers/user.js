import user_model from '../models/user';
const renderUserInfo=async ()=>{
    let _result=await user_model.userinfo();
    if ( _result.status === 403 ) { // 用户没有登录信息
        alert('请重新登录')
        window.location.href = '/admin.html';
    } else {
        $('.username').html(_result.data.username);
    }
    $('.exit-btn').click(async function(){
        let _result=await user_model.exit();
        if ( _result.status === 200 ) {
            $.cookie('token', { expires: -1 })
            window.location.href = '/admin.html'
        }
    })
}
export default{
    renderUserInfo
}
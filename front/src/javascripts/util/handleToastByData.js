import toast from './toast'

// 根据返回数据做出操作
const handleToastByData = ( data, options = {} ) => {
    let _none = () => {}

    let { isReact, success, fail,errmsg } = {
        isReact: ((typeof options.isReact) !== 'undefined') ? options.isReact : true,
        success: options.success || _none,
        fail: options.fail || _none,
        errmsg:options.errmsg||'操作失败'
    }
    if ( data.status == 200 ) {
        if (isReact)  toast('操作成功'); 

        if ( success ) success(data.data);
    } else {
        if (isReact)  toast(errmsg); 

        if ( fail ) fail(data.data);
    }
}

export default  handleToastByData
import bus from '../util/bus'
import hotel_list_template from '../views/hotel-list.html'
import hotel_save_template from '../views/hotel-save.html'
import hotel_model from '../models/hotel'
import qs from 'querystring'

const list = async (req, res, next) => {

    let html = template.render(hotel_list_template, {
        data: (await hotel_model.list()).data
    })
    
    res.render(html)

    bindListEvent()// 绑定事件
}

// list的事件绑定
const bindListEvent = () => {
    $('.hotel-list #addbtn').on('click', function () {
        bus.emit('go','/hotel-save')
    })
}

const save = async (req, res, next) => { 
    res.render(hotel_save_template)
    bindSaveEvent()
}

// save的事件绑定
const bindSaveEvent = () => {
    $('.hotel-save #back').on('click', function () {
        bus.emit('go', '/hotel-list')
    })

    let _isLoading = false

    $('.hotel-save #save-form').submit(async function (e) {
        e.preventDefault()
        if ( _isLoading ) return false;

        _isLoading = true
        // 拿到form的数据
        let _params = qs.parse($(this).serialize())
        console.log(_params);
        let result = await hotel_model.save(_params)
        _isLoading = false
        if ( result.status == 200 ) {
            $.toast({ 
                text : "保存成功", 
                showHideTransition : 'fade',
                allowToastClose : false,
                hideAfter : 3000,
                stack : 5,
                textAlign : 'left',
                position : 'top-center'
              })     
        } else {
            $.toast({ 
                text : "保存失败", 
                showHideTransition : 'fade',
                allowToastClose : false,
                hideAfter : 3000,
                stack : 5,
                textAlign : 'left',
                position : 'top-center'
              })  
        }
       

    })
}
export default {
    list,
    save
}

const list = () => {
    return $.ajax({
        url: '/api/v1/hotel/list',
        success:(results) => {
           return results
        }
    })
}

const save = (data) => {
    return new Promise((resolve) => {
        $('.hotel-save #save-form').ajaxSubmit({
            url: '/api/v1/hotel/save',
            type: 'POST',
            error:(result)=>{
                console.log(result);
            },
            success: (results) => {
                resolve(results)
            }
        })
    })
}
const remove = (data) => {
    return $.ajax({
        url: '/api/v1/hotel/remove',
        data,
        success:(results) => {
           return results
        }
    })
}
const findOne=(data)=>{
    return $.ajax({
        url: '/api/v1/hotel/findOne',
        data,
        success:(results) => {
           return results
        }
    })
}
const update = (data) => {
    return new Promise((resolve) => {
        $('.hotel-update #update-form').ajaxSubmit({
            url: '/api/v1/hotel/update',
            type: 'POST',
            error:(result)=>{
                console.log(result);
            },
            success: (results) => {
                resolve(results)
            }
        })
    })
}
export default {
    list,
    save,
    remove,
    findOne,
    update
}




const list = () => {
    return $.ajax({
        url: '/api/v1/hotel/list',
        success:(results) => {
            
           return results
        }
    })
}

const save = (data) => {
    return $.ajax({
        url: '/api/v1/hotel/save',
        type: 'post',
        data,
        success:(results) => {
            
           return results
        }
    })
}

export default {
    list,
    save
}



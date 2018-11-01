const isSignin=()=>{
    return $.ajax({
        url: '/api/v1/user/isSignin',
        error: (results) => {
            console.log(results)
        },
        success: (results) => {
            return results
        }
    })
}
const userinfo=()=>{
    return $.ajax({
        url: '/api/v1/user/userinfo',
        error: (results) => {
            console.log(results)
        },
        success: (results) => {
            return results
        }
    })
}
const exit=()=>{
    return $.ajax({
        url: '/api/v1/user/exit',
        error: (results) => {
        },
        success: (results) => {
            return results
        }
    })
}
const userlist=()=>{
    return $.ajax({
        url: '/api/v1/user/userlist',
        error: (results) => {
        },
        success: (results) => {
            return results
        }
    })
}
const auth=(site)=>{
    return $.ajax({
        url: '/api/v1/user/auth',
        data:{site},
        error: (results) => {
        },
        success: (results) => {
            return results
        }
    })
}
const remove = (data) => {
    return $.ajax({
        url: '/api/v1/user/userremove',
        data,
        success:(results) => {
           return results
        }
    })
}
const findOne=(data)=>{
    return $.ajax({
        url: '/api/v1/user/findOne',
        data,
        success:(results) => {
           return results
        }
    })
}
const update = (data) => {
    return new Promise((resolve) => {
        $('.user-update #updateuser-form').ajaxSubmit({
            url: '/api/v1/user/userupdate',
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


export default{
    isSignin,
    userinfo,
    exit,
    auth,
    userlist,
    remove,
    findOne,
    update
}
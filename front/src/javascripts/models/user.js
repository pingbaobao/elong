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
export default{
    isSignin,
    userinfo,
    exit,
    auth
}
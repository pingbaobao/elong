const signup = (data) => {
    return $.ajax({
        url: '/api/v1/admin/signup',
        type: 'post',
        data,
        error: (results) => {
            console.log(results)
        },
        success: (results) => {
            return results
        }
    })
}
const signin = (data) => {
    return $.ajax({
        url: '/api/v1/admin/signin',
        type: 'post',
        data,
        success: (results) => {
            return results
        }
    })
}
export default {
    signup,
    signin
}
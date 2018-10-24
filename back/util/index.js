


const errorData = (data, res, template) => {
    if ( !data ) {
        res.render(template, {
            code: 500,
            data: '发生了不可预知的错误'
        })
        return false
    }
    return true
}



module.exports = {
    errorData
}
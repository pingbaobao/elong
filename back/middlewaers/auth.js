const jwt =require('jsonwebtoken');
const fs  = require('fs');
const PATH  = require('path');
const userState = (req, res, next) => {
    try {
        let _public=fs.readFileSync(PATH.resolve(__dirname,'../keys/public.key'));
        var decoded = jwt.verify(req.cookies.token,_public, {algorithm: 'RS256'});
        let _time = (Date.now() / 1000) - decoded.iat
        let _expires = 3600;
        if (_time > _expires) {
            res.render('user', {
                code: 403,
                data: JSON.stringify({
                    msg: "登录身份已过期，请重新登录"
                })
            })
        } else {
            next();
        }
    }catch(err){
        res.render('user', {
            code: 403,
            data: JSON.stringify({ msg: '请登录后操作' })
        })
    }

}
module.exports = {
    userState
}
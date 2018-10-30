const _none = () => {};
import user_model from '../models/user';
const userSigninState =async () => {
    let _result =await user_model.isSignin();
    return !!(_result.status==200);
}
const userSigninAuth = async(success = _none, fail = _none) => {
    let auth =await userSigninState();
    if (auth) {
        success(auth);
        return true;
    } else {
        fail(auth);
        return true;
    }
}
export default {
    userSigninState,
    userSigninAuth
}
export {
    userSigninState,
    userSigninAuth
}
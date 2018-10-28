const _none = () => {};
const userSigninState = () => {
    return !!localStorage.getItem('user');
    return true;
}
const userSigninAuth = (success = _none, fail = _none) => {
    let auth = userSigninState();
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
const toast = (text,options) => {
        $.toast({
            text,
            showHideTransition: 'fade',
            allowToastClose: false,
            hideAfter: 2000,
            stack: 5,
            textAlign: 'left',
            position: 'top-center'
        })
}
export default toast


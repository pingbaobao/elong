const toast = (text,options) => {
        $.toast({
            text,
            showHideTransition: 'fade',
            allowToastClose: false,
            bgColor:'#3C8DBC',
            textColor:'white',
            hideAfter: 2000,
            stack: 5,
            textAlign: 'center',
            position: 'mid-center'
        })
}
export default toast


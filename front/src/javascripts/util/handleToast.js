const handleToast = (data ) => {
    if (data) {
        $.toast({
            text: "操作成功",
            showHideTransition: 'fade',
            allowToastClose: false,
            hideAfter: 3000,
            stack: 5,
            textAlign: 'left',
            position: 'top-center'
        })
    }else{
        $.toast({
            text: "操作失败",
            showHideTransition: 'fade',
            allowToastClose: false,
            hideAfter: 3000,
            stack: 5,
            textAlign: 'left',
            position: 'top-center'
        })
    }
}
export default{
    handleToast
}

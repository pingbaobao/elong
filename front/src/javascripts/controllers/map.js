import map_template from '../views/map.html';
const map=(req,res)=>{
    res.render(map_template);
     // // 按需加载 地图js 在这里应该判断是否有这个
    if ( !window.AMap ) {
        let $script = $('<script  src="https://webapi.amap.com/maps?v=1.4.10&key=463275f0494a781979affa4ac9554edf&callback=onApiLoaded&plugin=AMap.Transfer,AMap.Geocoder" >')
        $('body').append($script)
    }else {
        window.onApiLoaded()
    }
}
window.onApiLoaded = function () {
    var map = new AMap.Map('map-container', {
        resizeEnable: true, //是否监控地图容器尺寸变化
        zoom:11, //初始化地图层级
        center: [116.397399, 39.908551] //初始化地图中心点
    });
     //解析定位错误信息
    //  function onError(data) {
    //     console.log('定位失败', data.message)
    // };

}

export default{map}
import map_template from '../views/map.html';
import user_model from '../models/user';
import auth_template from '../views/auth.html';
import hotel_model from '../models/hotel';
const map=async (req,res)=>{
    let _auth=await user_model.auth('map');
    if(_auth.status===403){
        alert('登陆后操作')
        window.location.href = '/admin.html'
        return false;
    }
    if ( _auth.status === 402 ) {
        res.render(auth_template)
        return false;
    }
   
    res.render(map_template);
     // // 按需加载 地图js 在这里应该判断是否有这个
    if ( !window.AMap ) {
        let $script = $('<script  src="https://webapi.amap.com/maps?v=1.4.10&key=35b752bcaf56d3e3f6d7cd285d0172cc&callback=onApiLoaded&plugin=AMap.Transfer,AMap.Geocoder,AMap.PlaceSearch" > <script type="text/javascript" src="https://cache.amap.com/lbs/static/PlaceSearchRender.js"></script><script type="text/javascript" src="https://cache.amap.com/lbs/static/addToolbar.js"></script>')
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
    var placeSearch = new AMap.PlaceSearch({
        // city 指定搜索所在城市，支持传入格式有：城市名、citycode和adcode
        city: '北京'
    })
    const getposition=async ()=>{
        let _result=await hotel_model.listall();
        for(let i=0;i<_result.data.length;i++){
            // _arr.push(_result.data[i].hotelName);
            placeSearch.search(_result.data[i].hotelName, function (status, result) {
                // 查询成功时，result即对应匹配的POI信息
                var pois = result.poiList.pois;
                    var poi = pois[0];
                    var marker = [];
                    marker[0] = new AMap.Marker({
                        position: poi.location,   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                        title: poi.name
                    });
                    // 将创建的点标记添加到已有的地图实例：
                    map.add(marker[0]);
                map.setFitView();
            })
        }
    }
    getposition();
}

export default{map}
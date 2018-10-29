
import URL from 'url';

const pageHeaderInfo = (url, prevUrl) => {
    let _urlinfo = URL.parse(url);
    let _pathname = _urlinfo.pathname;
    let _search = URL.parse(prevUrl).search;
    let _infos = {
        '/home': {
            title: '首页',
            list: []
        },
        '/map': {
            title: '地图显示',
            list: [
                { text: '地图', path: '#/map' }
            ]
        },
        '/hotel-list': {
            title: '酒店管理',
            description: '酒店列表',
            list: [
                { text: '酒店列表' }
            ]
        },
        '/hotel-save': {
            title: '酒店管理',
            description: '添加酒店',
            list: [
                { text: '酒店列表', path: '#/hotel-list'+_search },
                { text: '添加酒店'}
            ]
        },
        '/hotel-update': {
            title: '酒店管理',
            description: '酒店更新',
            list: [
                { text: '酒店列表', path: '#/hotel-list'+_search },
                { text: '酒店更新'}
            ]
        }
    }
    return _infos[_pathname] || {  };
}


export default {
    pageHeaderInfo
}
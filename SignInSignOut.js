if (window.VConsole != undefined) {
    new window.VConsole();
}

window.addEventListener('error', function (event) {
    event.stopImmediatePropagation();
    console.log('>>> error event stop');
}, true);

var geoArr = [
    {name: '石家庄|星际中心', lng: '114.623720', lat: '38.038799'},
    {name: '北京|庄胜广场', lng: '116.375458', lat: '39.896526'}
];

var index;
var getLocation = function (options) {
    var lng = geoArr[index].lng;
    var lat = geoArr[index].lat;

    var min, max, rand;

    min = -0.0011;
    max = 0.0011;
    rand = (Math.random() * (max - min) + min);
    lng = (lng + rand).toFixed(6);

    min = -0.0009;
    max = 0.0009;
    rand = (Math.random() * (max - min) + min);
    lat = (lat + rand).toFixed(6);

    console.log('>>> 经纬度：', lng, lat);

    options.success.call(this, {longitude: lng, latitude: lat, accuracy: '0.5'});
}

setInterval(function () {
    if(index == undefined){
        index = window.prompt('请输入编号：\n' + geoArr.map(function (value, index) {
            return index + '：' + value.name;
        }).join('\n'));
        console.log('>>> 地点选择了：', geoArr[index].name);
    }
    if (window.wx == undefined) {
        console.log('>>> window.wx is undefined');
        return;
    }
    if (window.wx.getLocation == getLocation) {
        console.log('>>> window.wx.getLocation is configured');
        return;
    }
    window.wx.getLocation = getLocation;
}, 1000);

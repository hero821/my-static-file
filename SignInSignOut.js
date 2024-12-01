if (window.VConsole != undefined) {
    new window.VConsole();
}

window.addEventListener("error", function (event) {
    event.stopImmediatePropagation();
    console.log(">>> error event stop");
}, true);

var getLocation = function (options) {
    var lng = "";
    var lat = "";

    var min, max, rand;

    min = -0.0011;
    max = 0.0011;
    rand = Math.random() * (max - min) + min;
    lng = (lng + rand).toFixed(6);

    min = -0.0009;
    max = 0.0009;
    rand = Math.random() * (max - min) + min;
    lat = (lat + rand).toFixed(6);

    console.log(">>> 经纬度：", lng, lat);

    options.success.call(this, { longitude: lng, latitude: lat, accuracy: "0.5" });
};

setInterval(function () {
    if (window.wx == undefined) {
        console.log(">>> window.wx is undefined");
        return;
    }
    if (window.wx.getLocation == getLocation) {
        console.log(">>> window.wx.getLocation is configured");
        return;
    }
    window.wx.getLocation = getLocation;
}, 1000);

/**
 * Created by homker on 2015/5/19.
 */

define(function (require, exports, module) {

    exports.setconfig = function (context, url, callback) {
        module.context = context;
        module.url = url;
        module.onload = callback;
    };

    exports.start = function () {
        if (typeof(module.url) === "string") {
            loadBuffer(module.url);
        }
    };

    var loadBuffer = function (url) {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = "arraybuffer";//这里必须为数组帧的格式
        console.log(this === module);
        var loader = module;
        request.onload = function () {
            loader.context.decodeAudioData(request.response, function (buffer) {
                console.log("this");
                loader.onload(buffer);
            }, function (err) {
                return err;
            });
        };
        request.send();
    };
});
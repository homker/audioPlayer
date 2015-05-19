/**
 * Created by homker on 2015/5/19.
 */
var loadAudio = function (context, url, callback) {
    this.context = context,
        this.url = url,
        this.onload = callback;
};
loadAudio.prototype.start = function () {
    console.log(typeof this.url);
    if (typeof(this.url) === "string") {
        console.log("1");
        this.loadBuffer(this.url);
    }
};

loadAudio.prototype.loadBuffer = function (url) {
    console.log("work");
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = "arraybuffer";//这里必须为数组帧的格式
    var loader = this;
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
/**
 * Description: 返回服务器时间,用于时间校准
 */

module.exports = function () {
    
}

~function (global) {
    var serverDiff = null;
    var sendTime, receiveTime;

    global._setServerTime = function (ts) {
        receiveTime = new Date();
        ts += (receiveTime - sendTime) / 2;
        var df = new Date - ts;
        if (serverDiff == null) {
            serverDiff = df;
        } else if (df < serverDiff) {
            serverDiff = df;
        }
    };
    global.serverNow = function () {
        var now = +new Date();
        return now - (serverDiff || 0);
    };
    global._getServerDiff = function () {
        return serverDiff;
    };
    function getServerTime() {
        sendTime = new Date();
        var head = document.head;
        if (!head) {
            var fs = document.getElementsByTagName("script")[0];
            if (fs) {
                head = fs.parentNode;
            }
        }
        if (head) {
            var scr = document.createElement("script");
            scr.src = "http://time.quanmin.tv/";
            head.appendChild(scr);
        } else {
            document.write("<script src=\"http://time.quanmin.tv/\"></scri" + "pt>");
        }
    }

    getServerTime();
}(window, undefined);
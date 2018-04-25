/*
 * @Dsc:获取IP地址
 * @Author: billyhu 
 * @Date: 2018-04-25 17:54:01
*/
module.exports = function getClientIp(req) {
    let ips = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    let ipsArr = ips.match(/\d+\.\d+\.\d+\.\d+/);
    let ip;
    if(getType(ipsArr) === 'array'){
        ip = ipsArr[0];
    }else{
        ip = "Postman";//读不出的情况是因为在postman中
    }
    function getType(value) {
        return Object.prototype.toString.call(value).match(/^(\[object )(\w+)\]$/i)[2].toLowerCase()
    }
    return ip
}
/*
 * @Dsc:错误控制
 * @Author: billyhu 
 * @Date: 2018-04-25 17:54:21
*/

module.exports = function (res) {
    res.status(200);
    res.send({
        "code": "8",
        "msg": "system error or request params error, please check out!"
    });
};

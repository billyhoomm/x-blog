module.exports = function (res) {
    res.status(200);
    res.send({
        "code": "8",
        "msg": "system error or request params error, please check out!"
    });
};

let $base64 = require('../utils/base64.utils.js');
let md5 = require('js-md5');
let mongoose = require('mongoose');
let Users = mongoose.model('Users');
//数据库查询同一错误处理
let DO_ERROR_RES = require('../utils/DO_ERROE_RES.js');

function checkToken(token) {
	let [username,pswMD5,time] = $base64.decode(token).split("|");
	let timeNow = new Date().getTime();


	return new Promise(function (resolve, reject) {
		//2 hours authorize
		if ((timeNow - time) > 1000 * 60 * 60 * 2) {
			reject({
				"code": "10",
				"msg": "token time out!"
			});
		} else {
			Users.findOne({username: username}, function (err, doc) {
				if (err) {
					DO_ERROR_RES(res);
					reject();
					return next();
				}
				if (!!doc) {
					if (!!doc.is_admin) {
						if (pswMD5 === md5(`${doc.password}|${time}`)) {
							resolve(true);
						}else{
							reject({
								"code": "10",
								"msg": "password not right, authorization failure!"
							});
						}
					} else {
						reject({
							"code": "9",
							"msg": "you are visitor, authorization failure!"
						});
					}
				} else {
					reject({
						"code": "10",
						"msg": "token format error!"
					});
				}
			});
		}
	});
}
module.exports = checkToken;

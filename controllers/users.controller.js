/**
 * Created by xiangsongtao on 16/3/3.
 */
let mongoose = require('mongoose');
let $base64 = require('../utils/base64.utils.js');
let md5 = require('js-md5');
let fs = require('fs');
//MyInfo的数据模型
let Users = mongoose.model('Users');
//数据库查询同一错误处理
let DO_ERROR_RES = require('../utils/DO_ERROE_RES.js');
let getClientIp = require('../utils/getClientIp.utils.js');
let marked = require('marked');

module.exports = {
	register: function (req, res, next) {
		let user_ip = getClientIp(req);
		Users.findOne({username: req.body.username}, function (err, user) {
			if (err) {
				DO_ERROR_RES(res);
				return next();
			}
			//如果没有数据,则增加is_admin: user.is_admin,
			if (!user) {
				let {username, password, is_admin, full_name, position, address, motto, personal_state, img_url} = req.body;
				let UserInfo = new Users({
					username,
					password,
					is_admin,
					login_info: [{
						login_time: new Date().getTime().toString(),
						login_ip: user_ip,
					}],
					full_name,//名字
					position,//职位
					address,//地址
					motto,//座右铭
					personal_state,//我的称述
					img_url//头像imgurl
				});
				//保存
				UserInfo.save();
				//发送
				res.status(200);
				res.send({
					"code": "1",
					"msg": "user added and login success!",
					"token": $base64.encode(`${username}|${password}|${new Date().getTime()}`),
					"data": UserInfo
				});
			} else {
				//否则修改找到的数据
				res.status(200);
				res.send({
					"code": "2",
					"msg": "user already exist,please use another 'username'!"
				});
			}
		});
	},
	doLogin: function (req, res, next) {
		let user_ip = getClientIp(req);
		let timeNow = new Date().getTime()
		let token = md5(`${user_ip}|${timeNow}`);
		res.status(200);
		res.send({
			"code": "1",
			"msg": "get login token success, please complete login in 5s!",
			"token": `${token}|${timeNow}`
		});
	},
	login: function (req, res, next) {
		let username = req.body.username;
		let password_org = req.body.password;
		let user_ip = getClientIp(req);
		// console.log("------用户当前登录请求的ip------");
		// console.log(user_ip);
		let password_org_arr = password_org.split('|');
		// salt|endTime
		let timeNow = new Date().getTime();
		let loginReqSalt = password_org_arr[0];
		let loginReqTime = password_org_arr[1];
		if (loginReqTime + 5000 > timeNow && timeNow > loginReqTime) {
			Users.findOne({username: username}, function (err, user) {
				if (err) {
					DO_ERROR_RES(res);
					return next();
				}

				var _salt_left = md5(`${user_ip}|${loginReqTime}`);
				var _salt_right = loginReqTime;
				var _salt_mid = md5(user.password);

				//有用户数据且密码正确
				if (!!user && (loginReqSalt === md5(`${_salt_left}|${_salt_mid}|${_salt_right}`))) {
					user.login_info.push({
						login_time: new Date().getTime(),
						login_ip: user_ip
					});
					user.save();
					res.status(200);
					// res.cookie('rememberme', '1', { maxAge: 900000})
					let _time = new Date().getTime();
					let _psw = md5(user.password + '|' + _time);
					res.send({
						"code": "1",
						"msg": "login success! please use token to access!",
						"token": $base64.encode(`${user.username}|${_psw}|${_time}`)
					});
				} else {
					res.status(200);
					res.send({
						"code": "2",
						"msg": "username or password error, please check out!"
					});
				}
			});


		} else {
			res.status(200);
			res.send({
				"code": "3",
				"msg": "login time window is close, pleae relogin!"
			});
		}

	},
	changePassword: function (req, res, next) {
		let {_id, username, password, new_password} = req.body;

		Users.findOne({_id: _id}, function (err, user) {
			if (err) {
				DO_ERROR_RES(res);
				return next();
			}
			//有用户数据且密码正确
			if (!!user) {
				if (user.password === password) {
					user.username = username;
					user.password = new_password;
					user.save();
					res.status(200);
					res.send({
						"code": "1",
						"msg": "user password change success, you should re-login!"
					});
					// res.redirect('/#/login');
				} else {
					res.status(200);
					res.send({
						"code": "2",
						"msg": "user password not right!"
					});
				}

			} else {
				res.status(200);
				res.send({
					"code": "3",
					"msg": "user non-exist, please check out!"
				});
			}
		});
	},
	getAll: function (req, res, next) {
		Users.find({}, {'username': 0, 'password': 0, 'is_admin': 0, 'login_info': 0, '__v': 0}, function (err, users) {
			if (err) {
				DO_ERROR_RES(res);
				return next();
			}
			res.send({
				"code": "1",
				"msg": "user list",
				"data": users
			})
		})
	},
	//用于home显示
	getById: function (req, res, next) {
		Users.findOne({_id: req.params.id}, {
			'_id': 0,
			'username': 0,
			'password': 0,
			'is_admin': 0,
			'login_info': 0,
			'__v': 0
		}, function (err, user) {
			if (err) {
				DO_ERROR_RES(res);
				return next();
			}
			//将我的介绍由markdown转化为html输出
			// marked
			/**
			 * markdown转html
			 **/
			marked.setOptions({
				renderer: new marked.Renderer(),
				gfm: true,
				tables: true,
				breaks: true,
				pedantic: false,
				sanitize: false,
				smartLists: true,
				smartypants: false,
			});
			user.personal_state = marked(user.personal_state);

			if (!!user) {
				res.status(200);
				res.send({
					"code": "1",
					"msg": "user info",
					"data": user
				})
			} else {
				res.status(200);
				res.send({
					"code": "2",
					"msg": "user non-exist"
				})
			}

		})
	},
	//原始的个人信息,可以二次修改
	getByIdWithOriginal: function (req, res, next) {
		Users.findOne({_id: req.params.id},{
			'username': 0,
			'password': 0,
		}, function (err, user) {
			if (err) {
				DO_ERROR_RES(res);
				return next();
			}

			if (!!user) {
				res.status(200);
				res.send({
					"code": "1",
					"msg": "user list",
					"data": user
				})
			} else {
				res.status(200);
				res.send({
					"code": "2",
					"msg": "user non-exist"
				})
			}

		})
	},
	edit: function (req, res, next) {
		Users.findOne({_id: req.body._id}, function (err, user) {
			if (err) {
				DO_ERROR_RES(res);
				return next();
			}
			//如果没有数据,则增加
			if (!user) {
				//发送
				res.status(200);
				res.send({
					"code": "2",
					"msg": "user not find!"
				});
			} else {
				({
					full_name: user.full_name,
					position: user.position,
					address: user.address,
					motto: user.motto,
					personal_state: user.personal_state,
					img_url: user.img_url
				} = req.body);
				if (req.body.is_admin !== undefined) {
					user.is_admin = req.body.is_admin
				}
				user.save();
				res.status(200);
				res.send({
					"code": "1",
					"msg": "user update success!"
				});
			}
		});


	},
	delete: function (req, res, next) {
		Users.remove({_id: req.params.id}, function (err) {
			if (err) {
				DO_ERROR_RES(res);
				return next();
			}
			res.status(200);
			res.send({
				"code": "1",
				"msg": `user ${req.params.id} delete success!`
			});
		});
	}
};







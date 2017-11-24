/**
 * Created by xiangsongtao on 16/3/4.
 */
let mongoose = require('mongoose');
let config = require('../config/config.js');
//数据模型
let Statistic = mongoose.model('Statistic');
//数据库查询同一错误处理
let DO_ERROR_RES = require('../utils/DO_ERROE_RES.js');
let superagent = require('superagent');
let moment = require('moment');
const SIGNPATH = '/api/statistic/sign';

let cache = require('../cache');//全局缓存系统
const EXPIRE = 10*60*1000;//统计数据缓存过期时间，ms

module.exports = {
	record: function record(ip, path, time) {
		let VisitInfo = new Statistic({ip, path, time});
		//保存
		VisitInfo.save(function (err) {
			// console.log('-----------------------')
			// console.log('--访问信息记录成功')
			// console.log('--ip:' + ip)
			// console.log('--path:' + path)
			// console.log('--time:' + moment(time).format("YYYY/MM/DD HH/mm/ss"))
			// console.log('-----------------------')
		});
	},
	sign: function get(req, res, next) {
		res.status(200);
		res.send({
			"code": "1",
			"msg": "sign in success!",
		});
	},
	get: function get(req, res, next) {
		Statistic.find({'path': SIGNPATH}, function (err, docs) {
			res.status(200);
			res.send({
				"code": "1",
				"msg": "get PV statistic success!",
				"data": docs
			});
		})
	},
	getAll: function get(req, res, next) {
		Statistic.find({}, function (err, docs) {
			if (err) {
				DO_ERROR_RES(res);
				return next();
			}
			res.status(200);
			res.send({
				"code": "1",
				"msg": "get all statistic success!",
				"data": docs
			});
		})
	},
	deleteAll: function deleteAll(req, res, next) {
		Statistic.remove({}, function (err, docs) {
			if (err) {
				DO_ERROR_RES(res);
				return next();
			}
			res.send({
				"code": "1",
				"msg": "delete all statistic success!"
			});
		})
	},

	/**
	 * 过去24小时统计 缓存处理
	 * */
	total: function search(req, res, next) {
		let _result = [];
		let _start;
		let _end;

		let path = req.path.toString();
		let result = cache.has(path);
		if (!!result) {
			res.status(200);
			res.send({
				"code": "1",
				"msg": "get chart data success!",
				"data": result,
			});
		} else {
			// 24小时
			_start = moment().subtract(24, 'hours').format();
			_end = moment().format();
			_count(_start, _end, function () {
				// 30天
				_start = moment().subtract(30, 'days').startOf('day').format();
				_end = moment().endOf('day').format();
				_count(_start, _end, function () {
					//1年
					_start = moment().subtract(1, 'years').startOf('day').format();
					_end = moment().endOf('day').format();
					_count(_start, _end, function () {
						cache.set(path, _result, EXPIRE);
						res.status(200);
						res.send({
							"code": "1",
							"msg": "get chart data success!",
							"data": _result,
						});
					})
				})
			});
		}


		function _count(start, end, cb) {
			Statistic.count({
				'path': SIGNPATH,
				"time": {
					"$gt": start,
					"$lt": end
				}
			}, function (err, count) {
				_result.push(count);
				cb && cb(count);
			})
		}
	},
	/**
	 * map 数据 过去30天的数据 缓存处理
	 * */
	map: function map(req, res, next) {
		let path = req.path.toString();
		let result = cache.has(path);
		if (!!result) {
			res.status(200);
			res.send({
				"code": "1",
				"msg": "get statistic map data success!",
				"data": result
			});
		} else {
			const _ak = config.baiduAK || 'yFKaMEQnAYc1hA0AKaNyHGd4HTQgTNvO';
			let result = [];
			let obj = {};
			let count = 0;
			let _start = moment().subtract(30, 'days').startOf('day').format();
			let _end = moment().endOf('day').format();
			Statistic.find({
				'path': SIGNPATH,
				"time": {
					"$gt": _start,
					"$lt": _end
				}
			}, function (err, docs) {
				if (err) {
					DO_ERROR_RES(res);
					return next();
				}
				let _uniqueObj = {};
				let _uniqueArr = [];
				for (let doc of docs) {
					if (!_uniqueObj[doc.ip]) {
						_uniqueArr.push(doc)
						_uniqueObj[doc.ip] = 1;
					}
				}

				for (var i = 0, len = _uniqueArr.length; len > i; i++) {
					let doc = _uniqueArr[i];
					if (/^\d+\.\d+\.\d+\.\d+$/.test(doc.ip) && doc.ip != '127.0.0.1' && doc.ip.toLowerCase() != 'localhost' && doc.ip.toLowerCase() != 'postman') {
						superagent.get(`http://api.map.baidu.com/location/ip`)
						.query({output: 'json'})
						.query({ak: _ak})
						.query({ip: doc.ip})
						.query({coor: 'bd09ll'})
						.end(function (err, data) {
							var textObj = JSON.parse(data.text);
							if (parseInt(textObj.status) === 0) {
								let _city = textObj.content.address_detail.city;
								if (!!obj[_city]) {
									obj[_city][2]++;
								} else {
									obj[_city] = [textObj.content.point.x, textObj.content.point.y, 1]
								}
								count++;
								_launch();
							} else {
								count++;
								_launch();
							}

						})
					} else {
						count++;
						_launch();
					}
				}
				// 判断是否发送数据
				function _launch() {
					if (count === _uniqueArr.length) {
						for (let a in obj) {
							result.push({
								name: a,
								value: [obj[a][0], obj[a][1], obj[a][2]]
							});
						}
						cache.set(path, result, EXPIRE);
						res.status(200);
						res.send({
							"code": "1",
							"msg": "get statistic map data success!",
							"data": result
						});
					}
				}
			})
		}


	},
	/**
	 * chart 数据  过去24小时统计 缓存处理
	 * */
	chart: function chart(req, res, next) {
		let path = req.path.toString();
		let result = cache.has(path);
		if (!!result) {
			res.status(200);
			res.send({
				"code": "1",
				"msg": "get chart data success!",
				"data": result
			});
		} else {
			let _dayStart = moment().subtract(24, 'hours').format();
			let _dayEnd = moment().format();
			Statistic.find({
				'path': SIGNPATH,
				"time": {
					"$gt": _dayStart,
					"$lt": _dayEnd
				}
			}, function (err, docs) {
				// 以小时为单位
				let _end = new Date().getHours() + 1;

				// 发送数据结构体
				let obj = {
					x: [],
					y: [],
				};

				// 生成原始数据
				for (let i = 0; 24 > i; i++) {
					obj.x.push(i > 9 ? `${i}:00` : `0${i}:00`);
					obj.y.push(0)
				}

				// 数据库数据统计
				docs.forEach(function (doc) {
					obj.y[moment(doc.time).hour()]++
				});

				// [1,2,3,4,5] => [4,5,1,2,3]
				obj.x = [].concat(obj.x.slice(_end), obj.x.slice(0, _end));
				obj.y = [].concat(obj.y.slice(_end), obj.y.slice(0, _end));
				cache.set(path, obj, EXPIRE);
				res.status(200);
				res.send({
					"code": "1",
					"msg": "get chart data success!",
					"data": obj
				});
			})
		}
	},
}
;







/*
 * @Dsc:访问数据统计等
 * @Author: billyhu 
 * @Date: 2017-11-25 17:55:41
*/
var express = require('express');
var router = express.Router();
var cors = require('cors');
let getClientIp = require('../utils/getClientIp.utils.js');

let mongoose = require('mongoose');
//数据模型
let Statistic = mongoose.model('Statistic');
//控制器
let StatisticController = require('../controllers/statistic.controller.js');
//数据库查询同一错误处理


/**
 * 访问数据统计
 * */
router.use('*', cors(), function (req, res, next) {
	let ip = getClientIp(req);
	let url = req.baseUrl.toString();
	let time = new Date();
	StatisticController.record(ip, url, time);
	next();
});


router.use(function (req, res, next) {
	// console.log(req.path);
	//对于访问api的路由,直接通过
	if (req.path.includes('/api')) {
		next();
	} else {
		//对于访问子页面的路由,跳转到启动页
//		console.log('from api dir 访问了主页！！')
//		res.set('Cache-Control', 'no-cache');
		res.set('Content-Type', 'text/html');
		res.sendFile('public/index.html');
	}
});
/* GET 前端显示-blog home page. 前后端合并*/
router.all('/', function (req, res, next) {
	res.set('Cache-Control', 'no-cache');
	res.set('Content-Type', 'text/html');
	res.sendFile('public/index.html');
});


module.exports = router;
let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
var os = require('os');
var http = require('http');
var cors = require('cors');
var history = require('connect-history-api-fallback');


// 引入 mongoose 配置文件,执行配置文件中的函数，以实现数据库的配置和 Model 的创建等
let mongoose = require('./config/mongoose.js');
let db = mongoose();

//主页及后台管理页面
let web = require('./routes/web.routes.js');
//api入口
let api = require('./routes/api.routes.js');

let app = express();
app.use(cors());
app.use(history())
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
//app.set('env', 'development');
app.set('env', 'production');
// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(res_api);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cookieParser());
// app.use(require('node-compass')({mode: 'expanded'}));
app.use(express.static(path.join(__dirname, 'public'), {
	etag: false, //资源标记
	maxAge: 0,//30 days 后过期, 单位ms
	setHeaders: function (res, path, state) {
		if(/\.(js|css|png|gif|jpg|jpeg|ico|mp3)$/.test(path)){
			// 未来的一个过期时间
			res.set('Expires', new Date(Date.now() + 2592000*1000).toGMTString())
			res.set('Cache-Control', 'public, max-age=2592000')
		}
	}
}));
app.use('/', web);
app.use('/api', api);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
	let err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function (err, req, res, next) {
		res.status(err.status || 500);
		res.set('Content-Type', 'text/html');
		res.render('error_dev', {
			title: err.status,
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.set('Content-Type', 'text/html');
	res.render('error', {
		title: '我们一定会找到你',
	});
});


module.exports = app;

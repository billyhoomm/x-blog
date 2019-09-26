![](./AFront/XBlog.jpg)

[![License MIT](https://camo.githubusercontent.com/c89d8f18e7dfd8a123ec3b2c3d50f4907bf0c4d5/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f6c6963656e73652f766d2d636f6d706f6e656e742f56696d6f2e737667)](https://github.com/billyhoomm/XBlog)
[![code style](https://camo.githubusercontent.com/58fbab8bb63d069c1e4fb3fa37c2899c38ffcd18/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f636f64655f7374796c652d7374616e646172642d627269676874677265656e2e737667)](https://standardjs.com/)
> 文档目的旨在让想学习Vue或者Node或者想开发个人博客的兄弟们借鉴下，碰到错误的地方还望指正
> 如果有代码问题或者运行错误欢迎提issues或者在我博客下留言

> 博客地址：[The blog of billyhu](http://blog.billyhu.com)

> 考虑使用TypeScript + React重构前后台...

### 说明（Instructions）

- 本项目后台基于express、mongodb，前台基于Vue2.0全家桶及一众UI、工具类插件
- 项目前后台代码在同一个目录中，AFront文件夹为前端代码，build后会打包静态文件到public文件夹中
- 鉴于云服务1M的小水管，项目中静态文件以及图片均使用七牛云CDN（build自动上传）

### 项目结构（Project structure）
---
```
|-AFront				//前端代码
|----build				//webpack
|----config				//webpack基本配置
|----src				//包含api、所有vue组件、所有插件
|----index.html			//首页的模板文件
|----package.json		
|-bin  					//启动文件
|-config  				//配置文件以及数据库模型
|-controllers  			//api路由请求控制
|-md					//接口文档
|-public  				//静态资源文件
|-routes  				//路由
|-utils  				//通用工具类
|-views  				//模板文件（均为错误页面，首页会转向public/index.html）
|-app.js				//express
|-cache.js				//本地缓存控制  
|-package.json  
```

### 页面结构（Page structure）
---
```
|----前台展示---- 
|-首页  		        //个人信息和简单导航	
|-博客  
|-----最新文章	         //最近10篇文章
|-----归档	            //博文时间归档
|-----标签库	        //文章分类
|-----好友链接
|-音乐
|-背景切换 
|-登录			
|----后台管理----
|-控制台  		//PV统计、访问地区统计、以及其他数据统计图表	
|-我的资料		//个人信息管理 
|-标签管理  	//标签增删改查			
|-文章管理		//文章增删改查（编辑使用markdown）
|-文章评论		//评论查询、回复、审核等
|-退出
|---------------  
```



### 前端（Front）
---

#### 特点（Features）

**全屏幕自适应**

**背景图片随意配置和切换**

**...**

#### 插件列表（Plugins）

- moment.js(日期格式化)
- bootstrap(sass版本，按需使用)
- jquery(slim版本)
- bootstrap-datetimepicker（日期选择器）
- vue-multiselect（多选下拉框组件）
- dropzone.js（上传插件）
- fastclick.js（移动端延迟问题）
- highlight.js（代码高亮，用户后台文章编辑）
- marked（markdown预览）
- clipboard（复制到剪贴板，上传图片获得图片访问地址）
- echarts（仪表盘图表统计）
- ...


#### 配置文件（Config）

前台配置文件AFront/src/config，此处包含个人信息、所有api地址、静态资源的CDN地址（音乐、图片等）

- url：api接口指向的地址，dev环境调试前端代码时需要提前在后台做好跨域
- MY_INFO_ID：用来获取个人信息的info_id（后面会详细解释用户注册接口的字段和规范）
- MY：回复网友评论时的昵称
- EMAIL：回复网友评论时的邮箱
- ...


#### 启动（Start）

```
cd AFront 
npm i
npm run dev #开发环境 
npm run build #构建
```


### 后端（Server）
---

#### 全局配置（Config）

**config/config.js**:

- 配置中包含mongodb数据库的连接配置和七牛云的文件上传api需要的配置
- 关于七牛云的配置，可以自行去注册七牛、申请空间（免费的空间已经够用了），如果服务器是1M的小水管，静态文件放CDN后访问速度还是相当可以的（其他CDN服务同理，不建议放自己服务器~）

#### CDN自动上传配置

**utils/cdn_sync.js**

- 运行 `npm run cdnsync`, 此处代码会将public中的所有文件上传到七牛云对应的空间
- TODO: 加上文件以及文件夹过滤功能，整合成webpack插件

#### 启动（Start）
1. Nodejs(6.0.0+)/npm/Mongodb安装(不会的自行google)；
2. pm2（项目启动管理）
3. 进入config/config.js配置数据库信息以及七牛云账号设置
4. `npm run start`
5. 注册个人信息  
	注册接口可以参考API文档 `md/api.md`，可以使用Postman等模拟工具来进行。
	
	> 注册成功后会返回注册用户的_id, 此 _id就是上面说到的MY_INFO_ID，用于用户登陆的基础，请保管好。
	
	**参数（Post）：**
	
	```
	url:/api/register
	header:Content-Type   application/json; charset=utf-8
	{
    	"username": "登录用户名",
    	"password": "密码",
    	"is_admin":true,	//是否是admin用户
    	"full_name":"昵称",
    	"position":"你的职位",
    	"address":"你的地址",
    	"motto":"你的心情",
    	"personal_state":"你的自我介绍",
    	"img_url":"http://你的头像地址"
	}
	```
	
	**结果：** 
	
	```
	{
  		"code": "1",
  		"msg": "user added and login success!",
  		"token": "XXXXXXXXXXXXXXXXXXXXXXXXXX",
  		"data": {
    		"username": "登录用户名",
    		"password": "密码",
    		"is_admin":true,
    		"full_name": "昵称",
    		"position": "你的职位",
    		"address": "你的地址",
    		"motto": "你的心情",
    		"personal_state": "你的自我介绍",
    		"img_url": "http://你的头像地址",
    		"_id": "用户_id",
    		"login_info": [
      		{
        		"login_time": "登录时间",
        		"login_ip":"登录ip",
        		"_id": "_id"
      		}//该账号登录记录
    		]
  		}
	}
	```
5. 登录（使用上面注册的用户名和密码）


参考文档
===
- [Vue2.0文档](https://cn.vuejs.org/v2/api/)
- [WebPack中文文档](https://doc.webpack-china.org/)
- [MongooseAPI参考手册](http://www.nodeclass.com/api/mongoose.html)
- [Mongoose的Population连表操作](http://www.tuicool.com/articles/73UBRb6)
- [Express 4.x API手册](http://www.expressjs.com.cn/4x/api.html)
- [Echarts](https://ecomfe.github.io/echarts-doc/public/en/index.html)
- [Markdown转码工具](https://www.npmjs.com/package/marked)
- [代码高亮工具](https://highlightjs.org)
- ...

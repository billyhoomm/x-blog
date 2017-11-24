X-SONGTAO Blog项目
===

> 这个是X-SONGTAO Blog项目的后端node框架，前端vue请查看[此仓库](https://github.com/xiangsongtao/X-SONGTAO-VUE)


项目起源
---

15年底的时候参加过极客学院前端培训,这个博客项目是为毕设准备的。按照三个月的学习进度写一个前端、后端、设计、api设计融合为一体的项目是有些难的,不过毕设也放低了门槛,只要能在老师的电脑上能运行交互就好，第一版交付前我也在阿里云跑过，当时界面效果还好，中规中矩。前台页面和后台页面是两个spa，虽然后台页面用户是看不到的，自我认为还是不够简洁。所以这一版我将后台页面和前台页面融合到了一个spa中。参观者账号在下面，如果登陆后，就能在左下角看到管理者的页面进入按钮了。是不是要简介方便一些？

另外第二版关于文章编辑我使用的是Markdown编辑器，并附带预览功能。另外还有代码高亮，方便观察最终呈现的效果。

项目第二版重写了60%的代码，至于为什么不用成熟的博客框架而自己写一个是因为我想练练手，将现在已掌握的技术用在博客中，在博客构建时也能遇到工作中遇不到的问题，另外再检查自己技术上的不足。与此同时，开博后希望自己每周至少一篇博文总结。

**目前X-SONGTAO已上线，访问地址：[X-SONGTAO](http://xiangsongtao.com)**

> 题外话: 问题能找到解决办法都不算难，希望在技术路上的你能沉着分析问题并面对各种挑战！


项目结构
---
```
|-app  					//后台代码
|----config  			//数据库配置文件
|----controllers  		//api路由请求处理文件
|----routers  			//页面及API访问路由文件
|----utils  			//通用工具类文件
|----views  			//页面模板文件（当前只有错误页面的，首页会转向public/web/index.html下）
|-bin  					//nodejs启动文件
|-public  				//静态资源文件  
|----uploads  			//上传文件夹
|-app.js  
|-package.json  
```

项目框架
---

X-SONGTAO使用的是MEAN框架（Mongodb+Express+Angular+Nodejs），这个是四种技术的组合。就我现在的能力也只掌握了40%，但是已经足够开发X-SONGTAO项目了。另外，因为Nodejs使用的是6.0.0+版本，因此后台我也是用了部分ES6语法。前台使用了babel的核心库（ES6的语法糖部分）。与此同时，前台代码压缩合并打码都已做到位，具体可以参考public/web_design/gulpfile.babel.js文件。


项目如何启动
---

这里主要讲述如何在你的本地启动X-SONGTAO项目。在本机开发的过程中遇到的问题真的很少，但是一部署到服务器，问题就出来了：域名解析、Nginx设置、FTP设置、Nodejs/Mongodb安装、数据库配置连接等问题接踵而至，不过这些问题分析下都能在网上找到解决办法，不算难。到目前为止，遇到的问题就都自己解决了，虽然多花点时间，也需要总结下，希望以后再遇到这类问题能再少花点时间！

#### 环境配置

1. CentOS x64操作系统；
2. Nodejs(6.0.0+)/npm/Mongodb安装(自行google)；
3. pm2（项目启动管理）、n（Nodejs版本管理）安装；
4. 进入项目根根目录执行`npm install` ,安装各种npm的module；
5. 进入app/config/config.js修改数据库配置信息
6. 进入public/web/config.js修改web的配置信息，详情如下：
	- url: API访问根目录（http://xiangsongtao.com）
	- MY_INFO_ID: 我的个人资料的_id(个人博客嘛，后面讲解如何获取)
	- MY: 我的信息，主要使用在评论回复上显示
	- EMAIL: 我的邮箱，主要使用在评论回复上显示
7. 注册个人信息  
	因为博客针对个人，所以这个注册的页面是没有制作的，但是接口是存在的，这个可以参考API文档，我在实现API接口及测试都是使用Postman进行的。
	
	> 注册成功后会返回注册用户的_id, 此 _id就是上面说到的MY_INFO_ID，请保管好。
	
	**发送的请求参数如下：**
	
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
	
	**成功的返回结果如下：** 
	
	```
	{
  		"code": "1",
  		"msg": "user added and login success!",
  		"token": "a2FhY2hhMTIyfDEyM3wxNDY4MjA3MzE3MzAx",
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

	


8. public/web目录是最终生成好的spa目录，如果希望对X-SONGTAO进行二次修改，请在web_design进行操作，操作之前，也请安装好web_design目录下的package.json中的各类依赖。项目Gulp文为gulpfile.babel.js，执行DEVELOPMENT任务，访问localhost:8080就能访问到项目。




参观者账号
---


> 目前参观者账号能浏览整个网站的内容，但是不可以做增删改的操作


```
username:visitor
password:visitor
```




需求文档
---


因为是我自己的博客，主要是展示自己的成长记录所以包含以下模块：

```
|----前台页面---- 
|-index  		//展示自己的签名			
|-博客  
|-----最近更新	//最近更新的10篇文章，文章可点击浏览，且能评论（评论需要admin的审核）
|-----时光机		//按照年到月的排序，点击文章标题能浏览具体文章
|-----标签库		//标签根据类别分类，点击标签能找到相同标签的文章列表
|-我的音乐       
|-登录			//token写入，评论基本信息写入
|----后台页面----  			
|-我的信息		//修改我的信息，包含头像 
|-我的标签  		//标签的增删改查			
|-我的文章		//文章列表的增删改查，文章编辑使用markdown，并能实时预览
|-我的评论		//评论的增删改查，包含回复、审核、删除等操作
|-退出			//清空个人信息
|---------------  
```


参考文档
===

- [MongooseAPI参考手册](http://www.nodeclass.com/api/mongoose.html)
- [Mongoose的Population连表操作](http://www.tuicool.com/articles/73UBRb6)
- [Angular1.3文档](https://code.angularjs.org/1.3.0-beta.11/docs/api)
- [Express 4.x API手册](http://www.expressjs.com.cn/4x/api.html)
- [Markdown转码工具](https://www.npmjs.com/package/marked)
- [代码高亮工具](https://highlightjs.org)
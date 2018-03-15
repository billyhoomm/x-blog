# XBlog

> 改版进行中...，
> 本文档目的旨在让想学习Vue或者node或者想开发个人博客的兄弟们借鉴下，碰到错误的地方还望指正，
> 如果有代码问题或者运行错误欢迎提iussue或者在我博客下留言

### 说明

- 本项目后台基于express、mongodb，前台基于Vue2.0全家桶、bootstrap、scss预编译器以及其他小插件
- 项目前后台代码在同一个目录中，AFront中为前端代码，build后会打包静态文件到public文件夹中
- 鉴于云服务1M的小水管，项目中静态文件以及图片均使用七牛云CDN，如果你想放到本地也可以（需要改动webpack的publicPath配置，以及图片上传功能的后台代码）。

### 项目结构
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
|-controllers  			//api路由请求控制器
|-md					//接口文档
|-public  				//静态资源文件
|-routes  				//路由
|-utils  				//通用工具类
|-views  				//模板文件（均为错误页面，首页会转向public/index.html）
|-app.js				//express
|-cache.js				//本地缓存控制  
|-package.json  
```

### 前端
---

#### 主要特点

**主要功能**都在左边的导航条上了：主页、博客（最近10篇文章、文章库、标签库）、音乐、背景、登录（我的信息管理、标签管理、文章管理、评论管理、退出）

**支持全屏幕自适应**，从手机（iphone5）到2K显示器。

**插件**列表：

- vue-moment（时间格式化）
- font-awesome（字体图标）
- vStorage.js（localStorage和sessionStorage管理）
- bootstrap(sass版本，按需使用)
- jquery(slim版本)
- bootstrap-datetimepicker（日期选择器）
- vue-multiselect（多选下拉框组件）
- dropzone.js（上传插件）
- fastclick.js（移动端延迟问题）
- highlight.js（代码高亮，用户后台文章编辑）
- moment-with-locales.js(日期格式化)
- marked（markdown预览）
- clipboard（复制到剪贴板，上传图片获得图片访问地址）
- js-md5（加密）
- echarts（仪表盘图表统计）

#### 启动：

```
cd AFront 
npm i
npm run dev #开发环境 
npm run build #构建
```

#### 调试和构建注意事项：

**1、** 后台代码在前面已有介绍，在启动后台代码之前，需要配置AFront/src/config，此处包含个人信息、所有的api、静态资源的CDN地址（音乐、图片等），重要配置如下：

```
let CONFIG;
if (process.env.NODE_ENV === 'production') {
  CONFIG = {
    url: "http://blog.billyh.cn",
    MY_INFO_ID: '5837eaa795661756b0bc9eb4',
    MY: '博主',
    EMAIL: 'billyhoom@qq.com'
  };
} else {
  CONFIG = {
    url: "http://localhost:8081",
    //我的信息_id
    MY_INFO_ID: '5837eaa795661756b0bc9eb4',
    //我对对评论进行回复的信息
    MY: '博主',
    EMAIL: 'billyhoom@qq.com'
  };
}
```

- url：api接口指向的地址，dev环境调试前端代码时可以直接跨域到后台调用
- MY_INFO_ID：用来获取个人信息的info_id（后续会详细解释用户注册接口的字段和规范）
- MY：回复网友评论时的昵称
- EMAIL：回复网友评论时的邮箱

**2、**

想到再补...

### 全局配置
---

**config/config.js**:

- 配置中包含mongodb数据库的连接配置和七牛云的文件上传api需要的配置
- 关于七牛云的配置，可以自行去注册七牛、申请空间（免费的空间已经够用了），如果服务器是1M的小水管，静态文件放CDN后访问速度还是相当可以的

### 静态文件自动上传CDN

**utils/cdn_sync.js**

- 运行 `npm run cdnsync`, 此处代码会将public中的所有文件上传到七牛云对应的空间
- TODO: 后续有时间会加上文件以及文件夹过滤功能，整合成webpack插件


### 后端
---

1. Nodejs(6.0.0+)/npm/Mongodb安装(不会的自行google)；
2. pm2（项目启动管理）
3. 进入config/config.js配置数据库信息以及七牛云账号设置
4. `npm run start`
5. 注册个人信息  
	注册接口可以参考API文档 `md/api.md`，可以使用Postman等模拟工具来进行。
	
	> 注册成功后会返回注册用户的_id, 此 _id就是上面说到的MY_INFO_ID，用于用户登陆的基础，请保管好。
	
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
- [Vue2.0文档](https://cn.vuejs.org/v2/api/)
- [WebPack中文文档](https://doc.webpack-china.org/)
- [MongooseAPI参考手册](http://www.nodeclass.com/api/mongoose.html)
- [Mongoose的Population连表操作](http://www.tuicool.com/articles/73UBRb6)
- [Express 4.x API手册](http://www.expressjs.com.cn/4x/api.html)
- [Echarts](https://ecomfe.github.io/echarts-doc/public/en/index.html)
- [Markdown转码工具](https://www.npmjs.com/package/marked)
- [代码高亮工具](https://highlightjs.org)

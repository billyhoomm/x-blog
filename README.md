# Vue2.0-Blog-System

> 使用Vue2.0开发的博客前端版块，另外后台代码在[另一个仓库](https://github.com/billyhoomm/blog-stage),在此主要写博客系统中关于技术细节的详细教程，欢迎star和改进本项目，我将会持续更新和增加新功能。


## 项目组成：

项目是由**vue-cli**构建的。

**主要功能**都在左边的导航条上了：主页、博客（最近10篇文章、文章库、标签库）、音乐、背景、登录（我的信息管理、标签管理、文章管理、评论管理、退出）

**博客支持全屏幕自适应**，从手机（iphone5）到2K显示器。另外对触摸屏300ms的click延迟做了处理（fastclick.js）

**技术栈**

- 前端：Vue全家桶 + webpack + ES6 + Sass + bootstrap + Jquery
- 后端：nodeJS（express）+ mongodb 

**插件**列表如下：

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

> 放置到plugin中的插件不用npm版本是为了对插件做定制和修改。

## 本地启动

```
# install dependencies（安装依赖）
npm install

# serve with hot reload at localhost:8085（8085端口热启动）
npm run dev

# build for production with minification（构建打包代码用于生产环境）
npm run build

```

## 项目结构

```
|-build                 //webpack配置，webpack.base.conf.js中的基础配置需要特别注意
|-config
|-dist                  //目标文件
|-src                   //开发目录
|----App.vue            //基本配置、根组件实例
|----config.js          //url及个人信息配置
|----main.js            //初始化配置及组件挂载（入口文件）
|----router.js          //路由配置
|----api                //http请求方法
|----assets             //静态资源（图片等）
|----components         //小组件
|----plugin             //插件（放在此处是为了定制和修改）
|----theme              //公共样式文件
|----utils              //filter等工具组件
|----views              //整个页面组件集合
|----vuex               //全局状态管理（管理登录状态和音乐播放等）
|-static
|-test
```

## 调试和上线注意事项

**1、**后台代码在前面已有介绍，在启动后台代码之前，需要配置src/config
```
//线上配置
let CONFIG;
// if (process.env.NODE_ENV === 'development') {
if (process.env.NODE_ENV === 'production') {
  CONFIG = {
    url: "http://blog.billyh.cn",
    MY_INFO_ID: '5837eaa795661756b0bc9eb4',
    MY: '博主',
    EMAIL: 'billyhoom@qq.com'
  };
} else {
  CONFIG = {
    url: "http://blog.billyh.cn",
    //我的信息_id
    MY_INFO_ID: '5837eaa795661756b0bc9eb4',
    //我对对评论进行回复的信息
    MY: '博主',
    EMAIL: 'billyhoom@qq.com'
  };
}
```
**2、**上面代码中已说明如果是生产环境则跨域地址为线上地址，如果是开发环境，可将url改为localhost：8080，并在本地8080端口启动后台代码，此时则可同时开发前端和后端。

**3、**关于个人信息（包括登录密码）的注册，在启动后台代码后，可以使用chrome浏览器的Postman插件进行注册，API格式可以在后台代码中的api.md文件中看到，下面贴出个人信息注册截图
注册：
![](http://www.billyh.cn/resource/img-resource/postman-1.png)
返回：
![](http://www.billyh.cn/resource/img-resource/postman-2.png)

注册完成后将返回信息填入以上配置项即可使用账号密码登录博客后台界面

**4、**后台环境配置

- 关于mongodb，在后台代码启动前需要先在服务器/本地安装mongodb并进行配置，具体操作过程可google或百度搜索教程
- pm2安装（项目启动管理）
- 进入app/config/config.js修改数据库配置信息

**5、**后台版块public目录是前端npm run build后最终构建好的项目存放目录，前端版块打包后的dist里面的内容放在此处再启动后台即可进入生产环境

**6、**在博客编辑器使用上传图片功能需要在项目目录的public目录下建立一个uploads子目录，用于存放图片，否则上传图片时会报错

## webpack引入jQuery插件以及基础配置

#### webpack配置

首先在alias中定义好别名和插件位置，之后在plugins中将$、jQuery、jquery、window.jQuery编程项目中全局可用状态，最后在你的vue中引入，如下：

webpack中配置：

```
 alias: {
            "jquery": path.resolve(__dirname, '../node_modules/jquery/dist/jquery.slim.min.js'),
            //插件位置
            "bootstrap-datetimepicker": path.resolve(__dirname, '../src/plugin/bootstrap-datetimepicker'),
        }
```


```
plugins: [
        // new webpack.optimize.CommonsChunkPlugin('common.js'),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            jquery: "jquery",
            "window.jQuery": "jquery",
        })
    ]
```


项目文件中：

```
    import "bootstrap-datetimepicker/src/sass/bootstrap-datetimepicker-build.scss"
    import "bootstrap-datetimepicker/src/js/bootstrap-datetimepicker.js"
```

#### 关于fastclick的配置

```
/**
 * 触摸配置
 * */
import attachFastClick from "fastclick";
new attachFastClick(document.body);
```

#### 关于vuex的正确用法

这个Backend API只是接管和全局相关的api比如config获取、公共数据等。下图是
[vuex数据流](http://vuex.vuejs.org/zh-cn/data-flow.html)

> 另外本项目基于[此处](https://github.com/xiangsongtao/X-SONGTAO-VUE)，主要作了样式以及功能添加和修改

> 没介绍的细节后续会继续更新。。。

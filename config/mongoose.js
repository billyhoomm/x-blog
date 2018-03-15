/**
 * 数据库配置及模型建立
 * */
let mongoose = require('mongoose');
let config = require('./config.js');

module.exports = function () {
    mongoose.Promise = global.Promise;
    let db = mongoose.connect(config.mongodb,{
        useMongoClient: true
    });
    let Schema = mongoose.Schema;
    /**
     * id由数据库自己生成,名字为_id,
     * */
    //我的个人信息数据模型
    mongoose.model('Users', new mongoose.Schema({
        username: String,//名字
        password: String,//职位
        is_admin: Boolean,//用户权限组,true:admin组;false:visitor组
        login_info: [
            {
                login_time: Date,//回复时间
                login_ip: String,//登录IP地址
            }
        ],
        full_name: {type: String, default: '名字'},//名字
        position: {type: String, default: '职位'},//职位
        address: {type: String, default: '地址'},//地址
        motto: {type: String, default: '心情'},//心情
        personal_state: String,//我的称述
        img_url: String//头像imgurl
    }));

    //访问统计
    mongoose.model('Statistic', new mongoose.Schema({
        time: Date,//当前访问时间,默认当前时间
        ip: String,// 访问的ip
        path:String,// 访问的路径
    }));


    //标签数据模型
    mongoose.model('Tags', new mongoose.Schema({
        name: {type: String, default: '标签名称'},//标签名称 eg: css html
        catalogue_name: {type: String, default: '分类名称'},//分类名称 eg: FrontEnd
        used_num: {type: Number, default: 0},//文章引用数
        create_time: {type: Date, default: (new Date())},//创建时间 时间戳
    }));


    //文章数据模型
    mongoose.model('Articles', new mongoose.Schema({
        title: {type: String, default: '文章标题'},//文章标题
        publish_time: {type: Date, default: (new Date())},//文章发表时间
        last_modify_time:{type: Date, default: (new Date())},//最后修改时间
        read_num: {type: Number, default: 0},//阅读数
        comment_num: {type: Number, default: 0}, //评论数,当评论新增的时候进行++操作
        tags: [{
            type: Schema.Types.ObjectId, ref: 'Tags'
        }],                            //标签,包含标签的id array
        state: {type: Boolean, default: false}, //是否公开 0 草稿(不公开) 1 完成(公开)
        abstract:{type: String, default: null},//文章摘要
        content: {type: String, default: '文章内容(Markdown文本)'},//内容 markdown文本
        html:{type: String, default: null},//内容 HTML文本
    }));


    //评论数据模型
    mongoose.model('Comments', new mongoose.Schema({
        //自动维护
        article_id: {type: Schema.Types.ObjectId, ref: 'Articles'},//记录此评论所属的文章_id
        pre_id: String,//钩子的id。即,上一条父记录id,如果没有则为根id->article_id(必须)
        next_id: [{
            type: Schema.Types.ObjectId, ref: 'Comments'
        }],//沟槽id,即,下一条记录的id,一般是子评论的id。
        //
        isIReplied: {type: Boolean, default: false},//我是否回复过?
        //
        name: {type: String, default: '评论人姓名'},//评论人姓名、昵称
        email: String,//评论人邮箱
        time: Date,//评论时间,时间戳
        content: {type: String, default: '评论内容'},//评论内容
        ip: String,//对方ip
        state: {type: Boolean, default: false},//是否审核通过 0, 未审核通过 1 审核通过
    }));

    return db;
};
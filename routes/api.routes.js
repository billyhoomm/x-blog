/*
 * @Dsc:API接口实现
 * @Author: billyhu 
 * @Date: 2017-11-25 17:51:23
*/
'use strict';
let express = require('express');
let router = express.Router();

let multipart = require('connect-multiparty');
let multipartMiddleware = multipart();

const config_qn = require('../config/config_').qiniu;
const qn = require('qn');
let client = qn.create(config_qn);

let fs = require('fs');

let mongoose = require('mongoose');
let $checkToken = require('../utils/checkToken.utils.js');

//数据模型
let Users = mongoose.model('Users');
let Tags = mongoose.model('Tags');
let Comments = mongoose.model('Comments');
let Articles = mongoose.model('Articles');

//控制器
let UsersController = require('../controllers/users.controller.js');
let TagsController = require('../controllers/tags.controller.js');
let ArticleController = require('../controllers/article.controller.js');
let CommentController = require('../controllers/comments.controller.js');
let StatisticController = require('../controllers/statistic.controller.js');

//数据库查询同一错误处理
let DO_ERROR_RES = require('../utils/DO_ERROE_RES.js');


/**
 * API请求验证
 * get请求+post(login/register/upload)请求不需要token,其余都需要检查token
 * */
router.all('*', function (req, res, next) {
    let method = req.method.toLocaleLowerCase();
    let path = req.path.toString();
    if (method === 'get' || path.includes('register') || path.includes('login') || path.includes('upload') || (method === 'post' && path.includes('comment'))) {
        return next();
    } else {
        let authorization = req.get("authorization");
        if (!!authorization) {
            let token = authorization.split(" ")[1];
            $checkToken(token).then(function () {
                console.log("*********token check success!**********")
                return next();
            }, function (errObj) {
                res.status(200);
                res.send(errObj);
            });
        } else {
            res.status(200);
            res.send({
                "code": "10",
                "msg": "need token!"
            });
        }
    }
});


/**
 * User相关
 * */
//register
router.post('/register', UsersController.register);
//login之前的请求返回,登录的第一步
router.get('/do_login', UsersController.doLogin);
//login,登录的第2步
router.post('/login', UsersController.login);

//change_password
router.post('/change_password', UsersController.changePassword);
//all user list
router.get('/users', UsersController.getAll);
//find user by id
router.get('/user/:id', UsersController.getById);
//为了安全,使用post获取某人的个人信息
router.get('/user/original/:id', UsersController.getByIdWithOriginal);
//edit user by id
router.put('/user', UsersController.edit);
//delete user by id
router.delete('/user/:id', UsersController.delete);


/**
 * Upload img
 * */
//之后还需要uuid找图片,图片压缩,裁剪的功能
router.post('/imgupload', multipartMiddleware, function (req, res, next) {
    // console.log('req.files')
    // console.log(req)
    if (req.files) {
        let imgInfo = req.files.uploadImg;
        let arr = imgInfo.type.split('/');
        let suffix = arr[arr.length - 1];
        let filename = `blogUploads/${Date.parse(new Date())}.${suffix}`;
        console.log(imgInfo);
        console.log(`临时文件路径${imgInfo.path}`);

        client.uploadFile(imgInfo.path, {key: filename}, function(err, result){
            if(err){
                console.log('uploadimg_cdn_fail==>',err);
                res.status(200);
                res.send({
                    "code": "2",
                    "msg": "image upload fail!"
                });
            }
            console.log(`uploadimg_cdn_succ ==>${result.url}`)
            res.status(200);
            res.send({
                "code": "1",
                "msg": "image upload succ!",
                "data": result.url
            });

        })
    }
});


/**
 * Tags 相关
 * */
//查找all
router.get('/tags', TagsController.get);
//
router.get('/tags_with_structure', TagsController.getAllWithStructure);
//查找某个tag
router.get('/tag/:id', TagsController.getById);
//增加
router.post('/tag', TagsController.add);
//修改
router.put('/tag', TagsController.edit);
//delete
router.delete('/tag/:id', TagsController.delete);


/**
 * Article 相关
 * */
//查找全部,进行分页设置(api测试)
router.get('/articles', ArticleController.getAll);
//分页查找文章,进行分页设置/^\/commits\/(\w+)(?:\.\.(\w+))?$/
router.get(/^\/articles\/(\d+)_(\d+)/, ArticleController.getAllWithPages);
//根据id查找
router.get('/article/:id', ArticleController.getById);
router.get('/article/raw/:id', ArticleController.getRawById);

//增加,增加的同时对标签使用num++
// router.post('/article', ArticleController.add);
//根据id修改/增加,增加的同时对标签使用num++
router.post('/article', ArticleController.postArt);

//根据id删除
router.delete('/article/:id', ArticleController.delete);
//查询历史记录
router.get('/article_history', ArticleController.getHistory);
//根据tag_id查找文章列表,具有分页
router.get(/^\/article_tag\/(\d+)_(\d+)\/(\w+)/, ArticleController.getByTagId);
// router.get('/article_tag/:id', ArticleController.getByTagId);

//最新更新Top
router.get('/article_latest_top/:topNum', ArticleController.getLatestTop);
//阅读最多Top
router.get('/article_read_top/:topNum', ArticleController.getReadTop);
//标签top榜单
router.get('/tag_used_top/:topNum', TagsController.getUsedTop);
//上面三个top的集合
router.get('/article_top/:topNum', ArticleController.getArticleTops);


/**
 * Comments 相关
 * */
//获取全部
router.get('/comments', CommentController.getAll);
//查询单个评论(将评论进行组装,还有子评论)
router.get('/comment/:comment_id', CommentController.getById);
//新增,当用户新增评论的时候,
//评论的文章的评论数++
//对评论进行评论的将前评论的next_id中新增自评论_id
router.post('/comment', CommentController.add);
//修改,基本不用
router.put('/comment', CommentController.edit);
//根据文章id查询其评论的数组(用于详细的文章调取评论接口)
router.get('/article/comments/:article_id', CommentController.getByArticleId);
//delete(用于后台删除评论)
router.delete('/comment/:id', CommentController.delete);
//checkComments
router.post('/changeCommentReplyState', CommentController.isIReplied);
//改变审核状态
router.post('/changeCommentAuthState', CommentController.changeState);
//commentToArticleList
router.get('/commentToArticleList', CommentController.commentToArticle);

/**
 * Statistic 统计相关
 * */
//查找all
router.get('/statistic', StatisticController.get);
router.get('/statistic/sign', StatisticController.sign);
router.get('/statistic/all', StatisticController.getAll);
router.delete('/statistic/deleteAll', StatisticController.deleteAll);
//total->当日当月当年的数据
router.get('/statistic/total', StatisticController.total);
//chart->当前的访问数，折线图
router.get('/statistic/chart', StatisticController.chart);
//ip->经纬度+访问数
router.get('/statistic/map', StatisticController.map);






module.exports = router;
/**
 * Created by xiangsongtao on 16/3/4.
 */
let mongoose = require('mongoose');

//MyInfo的数据模型
let Tags = mongoose.model('Tags');
let Articles = mongoose.model('Articles');
let Comments = mongoose.model('Comments');
let DO_ERROR_RES = require('../utils/DO_ERROE_RES.js');

let marked = require('marked');
/**
 * markdown转html 配置
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
    highlight: function (code) {
        return hljs.highlightAuto(code).value;
    }
});
let hljs = require('highlight.js');

/**
 * @name 文档的内容改为摘要，去除不必要的md标记
 * @param content <string> 查询出来的article文档
 * @param length <number> 截取的摘要长度，默认250
 * @return string  转换完毕的内容摘要
 * */
function getArticleContentToAbstract(content, length) {
    let _length = length || 200;
    let _abstractArr = marked.lexer(content);
    let _abstract = '';
    let _fragment_text;
    for (let _fragment of _abstractArr) {
        _fragment_text = _fragment.text;
        if (!!_fragment_text && _fragment.type === 'paragraph') {
            if (_abstract.length < _length) {
                // 去除markdown的标记符号
                _abstract += _fragment_text.replace(/(\*+)|(_+)|(\!\[.+\))|(\n)|(\[.+?\]\(.+?\))|(\n)|(\")|(\[.+?\]\[.+?\])|(\`+)/g, '');
            } else {
                break;
            }
        }
    }
    console.log(_abstract)
    console.log(_length)
    return _abstract;
}

/**
 * @name 标签引用数刷新
 * @description 读取发表的文章，搜集引用的tag的id数组（同时也统计全部tag的id数组），统计更新tag的used_num字段，
 * @param null
 * @return null
 * */
function refreshTagUsedNum() {
    Tags.find({},{'_id': 1},function (err, tags) {
        if (err) {
            DO_ERROR_RES(res);
            return next();
        }
        var _allTagArr = []
        tags.forEach(function (tag) {
            _allTagArr.push(tag._id)
        })
        Articles.find({state: true}, {'_id': 0, 'tags': 1}).exec(function (err, articles) {
            let _arrTmp = [];
            articles.forEach(function (article) {
                Array.prototype.push.apply(_arrTmp, article.tags)
            })
            //去重,key为id，value为被引用数
            // 查找文章引用的tag，如果引用则修改usednum。
            let _tagObj = {};
            for (let i = 0, len = _arrTmp.length; len > i; i++) {
                if (!_tagObj[_arrTmp[i]]) {
                    _tagObj[_arrTmp[i]] = 1;
                } else {
                    _tagObj[_arrTmp[i]]++;
                }
            }

            // 有tag总列表查找哪些是没引用的，将其设为0
            for (let i = 0, len = _allTagArr.length; len > i; i++) {
                if (!_tagObj[_allTagArr[i]]) {
                    _tagObj[_allTagArr[i]] = 0;
                }
            }

            for (let id in _tagObj) {
                Tags.findOne({_id: id}, function (err, tag) {
                    if (!!tag) {
                        tag.used_num = _tagObj[id];
                        tag.save();
                    }
                });
            }
        })
    })
}

module.exports = {
    //修改文章时，对标签使用refreshTagUsedNum进行处理
    postArt: function (req, res, next) {
        var _id = req.body._id;
        //修改文章
        if (!!_id) {
            //id存在-->修改操作
            Articles.findOne({_id: _id}, function (err, article) {
                if (err) {
                    DO_ERROR_RES(res);
                    return next();
                }
                if (!!article) {
                    let {title, publish_time, tags, state, content} = req.body;

                    // 新旧tag比对，判断tag是否更新
                    let _oldTagStr = article.tags.sort().join();
                    let _newTagStr = tags.sort().join();

                    if (state || article.state) {
                        if (state && article.state) {
                            if (_oldTagStr != _newTagStr) {
                                refreshTagUsedNum();
                            }
                        } else {
                            refreshTagUsedNum();
                        }
                    }

                    //数据写入并保存
                    article.title = title;
                    article.publish_time = publish_time;
                    article.tags = tags;
                    article.state = state;
                    article.content = content;


                    //11-5新增，增加文章摘要存储，一行40字，200共5行
                    article.abstract = getArticleContentToAbstract(article.content.substr(0, 300), 200);
                    // 增加文章html字段存储
                    article.html = marked(article.content);
                    // 增加最后修改时间存储
                    article.last_modify_time = new Date();
                    //评论数更新
                    Comments.count({article_id: _id}, function (err, count) {
                        if (err) {
                            DO_ERROR_RES(res);
                            return next();
                        }
                        article.comment_num = parseInt(count);
                        //保存
                        article.save(function (err) {
                            if (err) {
                                DO_ERROR_RES(res);
                                return next();
                            }
                            res.status(200);
                            res.send({
                                "code": "1",
                                "msg": "article edit success!",
                                "data": article
                            });
                        });
                    })
                } else {
                    res.status(200);
                    res.send({
                        "code": "2",
                        "msg": "article edit failure, article non-exist!"
                    });
                }
            });
        } else {
            //id不存在-->新增操作
            let {title, publish_time, tags, state, content} =  req.body;
            let article = new Articles({
                title,
                publish_time,
                read_num: 0,
                comment_num: 0,
                tags,
                state,
                content
            });
            article.save();
            //更新tag used_num
            refreshTagUsedNum();
            //11-5新增，增加文章摘要存储，一行40字，200共5行
            article.abstract = getArticleContentToAbstract(article.content.substr(0, 300), 200);
            // 增加文章html字段存储
            article.html = marked(article.content);
            // 增加最后修改时间存储
            article.last_modify_time = new Date();


            res.status(200);
            res.send({
                "code": "1",
                "msg": "article add success!",
                "data": article
            });
        }

    },
    /***
     * 评论统计在评论新增、修改、删除的时候进行,
     * 评论的数据模型带有文章id,因此可追溯
     */
    getAll: function (req, res, next) {
        //查找文章
        Articles.find({}, {'content': 0})
            .populate({
                path: "tags",
                select: 'name'
            })
            .exec(function (err, docs) {
                if (err) {
                    DO_ERROR_RES(res);
                    return next();
                }
                // console.log(docs)
                res.status(200);
                res.send({
                    "code": "1",
                    "msg": "article list get success!",
                    "data": docs
                });
            })
    },
    //home需要的格式(带分页的文章列表)
    getAllWithPages: function (req, res, next) {
        //查找文章
        let from = parseInt(req.params[0]);
        let limit = parseInt(req.params[1]);
        Articles.find({state: true}).sort('-publish_time').skip(from).limit(limit).populate({
            path: "tags",
            select: 'name'
        }).exec(function (err, docs) {
            if (err) {
                DO_ERROR_RES(res);
                return next();
            }
            //docs不为空,最少为[]
            //文章摘要在文章保存阶段处理

            // docs.forEach(function (article) {
            //     //获取文章摘要
            //     article.content = getArticleContentToAbstract(article.content.substr(0, 500), 250);
            // });
            res.status(200);
            res.send({
                "code": "1",
                "msg": "article list get success!",
                "data": docs
            });
        });
    },
    getById: function (req, res, next) {
        //需要处理,因为单个文章是文章的全文,并且含有文章的评论信息
        Articles.findOne({_id: req.params.id}).populate({
            path: "tags",
            select: 'name'
        }).exec(function (err, doc) {
            if (err) {
                DO_ERROR_RES(res);
                return next();
            }
            if (!!doc) {
                //阅读数++
                doc.read_num++;
                doc.save(function (err) {
                    if (err) {
                        DO_ERROR_RES(res);
                        return next();
                    }
                    //文章的html内容在html字段中，获取文章时不需要再进行编译转换
                    // doc.content = marked(doc.content);
                    res.status(200);
                    res.send({
                        "code": "1",
                        "msg": `get aurticle ${req.params.id} success! but get comment need other request to {{url}}/api/article/comments/:id`,
                        "data": doc
                    });
                });

            } else {
                res.status(200);
                res.send({
                    "code": "2",
                    "msg": `article non-exist!`
                });
            }
        })
    },
    getRawById: function (req, res, next) {
        //需要处理,因为单个文章是文章的全文,并且含有文章的评论信息
        Articles.findOne({_id: req.params.id}).populate({
            path: "tags",
        }).exec(function (err, doc) {
            if (err) {
                DO_ERROR_RES(res);
                return next();
            }
            if (!!doc) {
                res.status(200);
                res.send({
                    "code": "1",
                    "msg": `get aurticle ${req.params.id} success! but get comment need other request to {{url}}/api/article/comments/:id`,
                    "data": doc
                });
            } else {
                res.status(200);
                res.send({
                    "code": "2",
                    "msg": `article non-exist!`
                });
            }
        });
    },
    delete: function (req, res, next) {
        //删除文章还要删除和文章一起的评论,还有标签统计
        Articles.findOne({_id: req.params.id}, function (err, article) {
            if (err) {
                DO_ERROR_RES(res);
                return next();
            }
            if (!!article) {
                //减去tags的引用
                for (let tag of article.tags) {
                    Tags.findOne({_id: tag}, function (err, tag) {
                        if (!!tag && tag.used_num > 0) {
                            tag.used_num--;
                            tag.save();
                        }
                    });
                }

                //先删除评论!!
                Comments.remove({article_id: article._id}, function (err) {
                    if (err) {
                        DO_ERROR_RES(res);
                        return next();
                    }
                    article.remove(function (err) {
                        if (err) {
                            DO_ERROR_RES(res);
                            return next();
                        }
                        res.status(200);
                        res.send({
                            "code": "1",
                            "msg": `delete success, article && tag_num && comment has removed!`
                        });
                    });
                });
            } else {
                res.status(200);
                res.send({
                    "code": "2",
                    "msg": `article non-exist!`
                });
            }

        });
    },
    //获取文章历史记录,需要根据【年】->【月】->【文章arr】划分组合
    getHistory: function (req, res, next) {
        Articles.find({state: true}, {'title': 1, 'publish_time': 1, 'read_num': 1, 'comment_num': 1, 'state': 1}).sort('-publish_time').exec(function (err, docs) {
            if (err) {
                DO_ERROR_RES(res);
                return next();
            }
            let historyArr = [];
            let yearObj = {};
            let monthObj = {};

            //当前循环的-年-月
            let yearNow = 0;
            let monthNow = 0;
            for (let i = 0, docLen = docs.length; docLen > i; i++) {
                //记录当前文章的时间-年-月
                let tplYear = new Date(docs[i].publish_time).getFullYear();
                let tplMonth = new Date(docs[i].publish_time).getMonth() + 1;
                if (yearNow !== tplYear) {
                    //保存上一年的年月数据,如果存在的话
                    if (yearNow !== 0) {
                        yearObj.data.push(monthObj);
                        historyArr.push(yearObj);
                    }
                    //初始化
                    yearNow = tplYear;
                    monthNow = tplMonth;
                    yearObj = {
                        "year": yearNow,
                        "data": []
                    };
                    monthObj = {
                        "month": monthNow,
                        "data": []
                    };
                    monthObj.data.push(docs[i]);
                    //判断是否为最后一个,如果是则保存月和年
                    if (docLen == i + 1) {
                        yearObj.data.push(monthObj);
                        historyArr.push(yearObj);
                    }
                } else {
                    //在年中遍历
                    if (tplMonth === monthNow) {
                        //同月的情况
                        monthObj.data.push(docs[i]);
                        if (docLen === i + 1) {
                            yearObj.data.push(monthObj);
                            historyArr.push(yearObj);
                        }

                    } else {
                        //不同月的情况
                        //保存上一个月的obj,(monthObj创建就会附加article数据)
                        yearObj.data.push(monthObj);
                        monthNow = tplMonth;
                        monthObj = {
                            "month": monthNow,
                            "data": []
                        };
                        monthObj.data.push(docs[i]);
                        if (docLen === i + 1) {
                            yearObj.data.push(monthObj);
                            historyArr.push(yearObj);
                        }
                    }
                }
            }
            res.status(200);
            res.send({
                "code": "1",
                "msg": `article history find success!`,
                "data": historyArr
            });
        })
    },
    getByTagId: function (req, res, next) {
        let from = parseInt(req.params[0]);
        let limit = parseInt(req.params[1]);
        let id = (req.params[2]);
        //根据tag查找文章,不限制文章数量
        Articles.find({tags: {"$in": [id]}, state: true}).skip(from).limit(limit).populate({
            path: "tags",
            select: 'name',
        }).exec(function (err, docs) {
            if (err) {
                DO_ERROR_RES(res);
                return next();
            }
            //docs不为空,最少为[]
            docs.forEach(function (article) {
                //获取文章摘要
                article.content = getArticleContentToAbstract(article.content.substr(0, 500), 250);
            });
            res.status(200);
            res.send({
                "code": "1",
                "msg": "find article by tag_id success!",
                "data": docs
            });
        })
    },
    /**
     * 三个接口的合体
     * */
    getArticleTops: function (req, res, next) {
        //查找文章
        var _topNum = parseInt(req.params.topNum);
        Articles.find({state: true}, {'title': 1, 'read_num': 1, 'publish_time': 1}).sort('-publish_time').limit(_topNum).exec(function (err, latestTopDocs) {
            if (err) {
                DO_ERROR_RES(res);
                return next();
            }
            Articles.find({state: true}, {'title': 1, 'read_num': 1}).sort('-read_num').limit(_topNum).exec(function (err, readTopDocs) {
                if (err) {
                    DO_ERROR_RES(res);
                    return next();
                }
                Tags.find({}, {'name': 1, 'used_num': 1}).sort('-used_num').limit(10).exec(function (err, tagTopDocs) {
                    if (err) {
                        DO_ERROR_RES(res);
                        return next();
                    }
                    res.status(200);
                    res.send({
                        "code": "1",
                        "msg": "read-top article and latest-top and tags article list get success!",
                        "data": {
                            latest: latestTopDocs,
                            read: readTopDocs,
                            tag: tagTopDocs,
                        }
                    });
                });
            });
        })
    },
    /**
     * 最新发布榜
     * */
    getLatestTop: function (req, res, next) {
        //查找文章
        Articles.find({state: true}, {'title': 1, 'read_num': 1, 'publish_time': 1}).sort('-publish_time').limit(parseInt(req.params.topNum)).exec(function (err, docs) {
            res.status(200);
            res.send({
                "code": "1",
                "msg": "latest-top article list get success!",
                "data": docs
            });
        })
    },
    /**
     * 最新阅读榜
     * */
    getReadTop: function (req, res, next) {
        //查找文章
        Articles.find({state: true}, {'title': 1, 'read_num': 1}).sort('-read_num').limit(parseInt(req.params.topNum)).exec(function (err, docs) {
            res.status(200);
            res.send({
                "code": "1",
                "msg": "read-top article list get success!",
                "data": docs
            });
        })
    },
    /**
     * 最多tag榜
     * */
    getUsedTop: function (req, res, next) {
        Tags.find({}, {'name': 1, 'used_num': 1}).sort('-used_num').limit(parseInt(req.params.topNum)).exec(function (err, docs) {
            if (err) {
                DO_ERROR_RES(res);
                return next();
            }
            res.status(200);
            res.send({
                "code": "1",
                "msg": `find tag all success!`,
                "data": docs
            });
        })
    },
}
;







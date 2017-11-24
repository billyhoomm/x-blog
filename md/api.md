
API接口文档（前方高能误入）
---


### 前提说明

首先，所有的api请求都会都会进行权限验证，目前对以下五种请求及路径会直接通过：

```
GET、/register、/login、/imgupload、POST-/comment
```

**为了防止请求失败，发起请求前，请在head中添加token信息，格式如下：**


|      key      |       value     |
| ------------- | --------------- |
| authorization | token {{token}} | 


### 补充说明 

- 具体的API请参考目录：app/routes/api.routes.js文件。  
- mongodb表结构请参考目录：app/config/mongoose.js文件。 


### API参数通用格式说明

	
- code：1-成功；2~5-失败；8-数据库查找错误；9-非admin用户；10-token错误或超时（（Token 2h内有效）; 
- msg: 服务器返回接口信息;
- token: 修改数据的接口权限令牌，只有在head中携带此token才能访问特定API（只在注册和登录返回）
- data: 服务器返回数据
	

	
	


### User接口相关

- 注册接口

```
method: post
url:/api/register
data:
{
    "username": "username",
    "password": "password",
    "is_admin":"true",
    "full_name":"X-SONGTAO",
    "position":"前端工程师&&Nodejs",
    "address":"江苏-苏州",
    "motto":"全栈工程师薪水如何？没15k我不考虑。",
    "personal_state":"各位好，我是X-SONGTAO！",
    "img_url":"http://your.head.img"
}
resopnse:
{
  "code": "1",
  "msg": "user added and login success!",
  "token": "token",
  "data": {
    "username": "username",
    "password": "password",
    "is_admin": true,
    "full_name": "X-SONGTAO",
    "position": "前端工程师&&Nodejs",
    "address": "江苏-苏州",
    "motto": "全栈工程师薪水如何？没15k我不考虑。",
    "personal_state": "各位好，我是X-SONGTAO！",
    "img_url": "http://your.head.img",
    "_id": "_id",
    "login_info": [
      {
        "login_time": "login_time",
        "login_ip": "login_ip",
        "_id": "_id"
      }
    ]
  }
}
resopnse code:
1-success;
2=username already exist;
```

- 登录接口

```
method: post
url:/api/login
data:
{
    "username": "username",
    "password": "password"
}
resopnse:
{
  "code": "1",
  "msg": "login success! please use token to access!",
  "token": "token"
}
resopnse code:
1-success;
2=username or password error;
```

- 密码修改接口

```
method: post
url:/api/change_password
data:
{
    "_id": "_id",
    "username": "username",
    "password": "password",
    "new_password": "new_password"
}
resopnse:
{
  "code": "1",
  "msg": "user password change success, you should re-login!"
}
resopnse code:
1-success;
2=psw not right;
3=user non-exist;
```

- 获取全部user信息接口

```
method: get
url:/api/users
resopnse:
{
  "code": "1",
  "msg": "user list",
  "data": [
    {
      "position": "position",
      "address": "address",
      "motto": "motto",
      "img_url": "img_url",
      "personal_state": "personal_state",
      "full_name": "full_name"
    }
 ]
}
resopnse code:
1-success;
```


- 获取某个user信息接口（前台需要）

```
method: get
url:/api/users/id
resopnse:
{
  "code": "1",
  "msg": "user info",
  "data": {
      "position": "position",
      "address": "address",
      "motto": "motto",
      "img_url": "img_url",
      "personal_state": "personal_state",//原始格式 HTML
      "full_name": "full_name"
  }
}
resopnse code:
1-success;
2=user non-exist;
```

- 获取某个user信息接口（后台需要）

```
method: get
url:/api/users/original/id
resopnse:
{
  "code": "1",
  "msg": "user info",
  "data": {
      "position": "position",
      "address": "address",
      "motto": "motto",
      "img_url": "img_url",
      "personal_state": "personal_state",//原始格式 Markdown
      "full_name": "full_name"
  }
}
resopnse code:
1-success;
2=user non-exist;
```

- 修改信息接口

```
method: put
url:/api/user
data:
{
    "_id":"_id",
    "full_name":"full_name",
    "position":"position",
    "is_admin":true,
    "address":"address",
    "motto":"motto",
    "personal_state":"personal_state",//Markdown 格式
    "img_url":"img_url"
}
resopnse:
{
  "code": "1",
  "msg": "user update success!"
}
resopnse code:
1-success;
2=user non-exist;
```

- 删除某个user信息接口

```
method: delete
url:/api/users/id
resopnse:
{
  "code": "1",
  "msg": "user info",
  "data": {
		"code": "1",
        "msg":"user ${_id} delete success!"
  }
}
resopnse code:
1-success;
```



### Tags接口相关

- 获取全部Tags信息接口（用于后台列表查看）

```
method: get
url:/api/tags
resopnse:
{
  "code": "1",
  "msg": "find tag all success!",
  "data": [
    {
      "_id": "_id",
      "name": "name",
      "catalogue_name": "catalogue_name",
      "create_time": "create_time",
      "used_num": 0
    }
  ]
}
resopnse code:
1-success;
```

- 获取全部Tags信息接口（具有特殊数据结构，用于前台标签库）

```
method: get
url:/api/tags_with_structure
resopnse:
{
  "code": "1",
  "msg": "find tag all success!",
  "data": [
    {
      "name": "cataName",
      "data": [
        {
          "_id": "_id",
          "name": "name",
          "catalogue_name": "catalogue_name",
          "create_time": "create_time",
          "used_num": 0
        }
      ]
    }
  ]
}
resopnse code:
1-success;
```


- 获取某个Tags信息接口

```
method: get
url:/api/tag/id
resopnse:
{
  "code": "1",
  "msg": "tag find success!",
  "data": {
    "_id": "_id",
    "name": "name",
    "catalogue_name": "catalogue_name",
    "create_time": "create_time",
    "used_num": 0
  }
}
resopnse code:
1-success;
```

- 新增Tags信息接口

```
method: post
url:/api/tag
data:
{
    "name":"name",
    "catalogue_name":"catalogue_name"
}
resopnse:
{
  "code": "1",
  "msg": "tags add success!",
  "data": {
    "name": "name",
    "catalogue_name": "catalogue_name",
    "used_num": 0,
    "create_time": "create_time",
    "_id": "5783382ac84cf4861527386e"
  }
}
resopnse code:
1-success;
2-tag already exist;
```


- 修改Tags信息接口

```
method: put
url:/api/tag
data:
{
    "_id":"_id",
    "name":"name",
    "catalogue_name":"catalogue_name"
}
resopnse:
{
  "code": "1",
  "msg": "tag edit success!",
  "data": {
    "_id": "_id",
    "name": "name",
    "catalogue_name": "catalogue_name",
    "create_time": "create_time",
    "used_num": 0
  }
}
resopnse code:
1-success;
2-tag non-exist or params error;
3-tag name exist, please use another one!;
```


- 删除某个Tag接口

```
method: delete
url:/api/tag/id
resopnse:
{
  "code": "1",
  "msg": "tag delete success!"
}
resopnse code:
1-success;
```


### Articles接口相关

- 获取全部Articles信息接口（后台页面需要）

```
method: get
url:/api/articles
resopnse:
{
  "code": "1",
  "msg": "article list get success!",
  "data": [
    {
      "_id": "_id",
      "title": "title",
      "publish_time": "publish_time",
      "read_num": 26,
      "comment_num": 4,
      "state": true,
      "tags": []//标签列表
    }
  ]
}
resopnse code:
1-success;
```


- 获取全部Articles信息接口，具有分页restful（前台-最近更新）

```
method: get
url:/api/articles/from_to
resopnse:
{
  "code": "1",
  "msg": "article list get success!",
  "data": [
    {
      "_id": "_id",
      "title": "title",
      "publish_time": "publish_time",
      "read_num": 26,
      "comment_num": 4,
      "state": true,
      "content": "content",//这里为纯文本摘要模式
      "tags": []//标签列表
    }
  ]
}
resopnse code:
1-success;
```

- 获取某个Article的信息接口（具体文章，前台文章展示）

```
method: get
url:/api/article/id
resopnse:
{
  "code": "1",
  "msg": "get aurticle success! but get comment need other request to {{url}}/api/article/comments/:id",
  "data": {
    "_id": "_id",
    "title": "title",
    "publish_time": "publish_time",
    "read_num": 29,
    "comment_num": 4,
    "state": true,
    "content": "<p>content</p>\n",//HTML格式
    "tags": []
  }
}
resopnse code:
1-success;
2-article non-exist!;
```


- 获取某个Article的信息接口（文章源码，后台文章修改）

```
method: get
url:/api/article/raw/id
resopnse:
{
  "code": "1",
  "msg": "get aurticle success! but get comment need other request to {{url}}/api/article/comments/:id",
  "data": {
    "_id": "_id",
    "title": "title",
    "publish_time": "publish_time",
    "read_num": 29,
    "comment_num": 4,
    "state": true,
    "content": "content",//Markdown格式
    "tags": []
  }
}
resopnse code:
1-success;
2-article non-exist!;
```


- 删除某个文章接口

```
method: delete
url:/api/article/id
resopnse:
{
  "code": "1",
  "msg": "article delete success!"
}
resopnse code:
1-success;
2-article non-exist!;
```


- 文章修改新增接口

```
method: post
url:/api/article
data:
{
    "title": "title", 
    "publish_time": publish_time,
    "read_num": 0,
    "comment_num": 0,
    "tags": ["_id","_id","_id"],
    "state": true,
    "content": "content"//Markdown源码
}
resopnse:
{
  "code": "1",
  "msg": "article add/edit success!"
}
resopnse code:
1-success;
2-article non-exist!;
```

- 获取文章历史记录(这部分用在-时光机页面)

```
method: get
url:/api/article_history
resopnse:
{
  "code": "1",
  "msg": "article history find success!",
  "data": [
    {
      "year": 2016,
      "data": [
        {
          "month": 7,
          "data": [
            {
              "_id": "_id",
              "title": "title",
              "publish_time": "publish_time",
              "read_num": 29,
              "comment_num": 4,
              "state": true
            }
          ]
        }
      ]
    },
    {
      "year": 2013,
      "data": [
        {
          "month": 4,
          "data": [
            {
              "_id": "_id",
              "title": "title",
              "publish_time": "publish_time",
              "read_num": 29,
              "comment_num": 4,
              "state": true
            },
            {
              "_id": "_id",
              "title": "title",
              "publish_time": "publish_time",
              "read_num": 29,
              "comment_num": 4,
              "state": true
            }
          ]
        }
      ]
    }
  ]
}
resopnse code:
1-success;
```


- 根据tag id查找文章列表(这部分用在-标签库)

```
method: get
url:/api/article_tag/id
resopnse:
{
  "code": "1",
  "msg": "find article by tag_id success!",
  "data": []
}
resopnse code:
1-success;
```


### Comments接口相关

- 获取全部Comments信息接口

```
method: get
url:/api/comments
resopnse:
{
  "code": "1",
  "msg": "comments list",
  "data": [
    {
      "_id": "_id",
      "article_id": "article_id",
      "pre_id": "pre_id",
      "name": "我",
      "email": "280304286@163.com",
      "time": "time",
      "content": "content",
      "isIReplied": true,
      "state": true,
      "next_id": []
    }
  ]
}
resopnse code:
1-success;
```


- 增加comment的接口

```
method: post
url:/api/comment
data:
{
    "article_id": "article_id",
    "pre_id": "pre_id", 
    "next_id": [],
    "name": "name",
    "email": "email@email.com",
    "time": "time",
    "content": "content",
    "ip": "ip",
    "isIReplied":false,
    "state": false
}
resopnse:
{
  "code": "1",
  "msg": "comment create success!",
  "data": {
    "article_id": "article_id",
    "pre_id": "pre_id", 
    "next_id": [],
    "name": "name",
    "email": "email@email.com",
    "time": "time",
    "content": "content",
    "ip": "ip",
    "isIReplied":false,
    "state": false
    "_id": "_id",
  }
}
resopnse code:
1-success;
2-article non-exist;
```

- 根据文章id查询其评论的数组

```
method: get
url:/api/article/comments/:article_id
resopnse:
{
  "code": "1",
  "msg": "comment to articles list get success!",
  "data": [{
    "article_id": "article_id",
    "pre_id": "pre_id", 
    "next_id": [],
    "name": "name",
    "email": "email@email.com",
    "time": "time",
    "content": "content",
    "ip": "ip",
    "isIReplied":false,
    "state": false
    "_id": "_id",
      "next_id": [
        {
          "_id": "_id",
          "article_id": "article_id",
          "pre_id": "pre_id",
          "name": "我",
          "email": "280304286@163.com",
          "time": "time",
          "content": "content",
          "isIReplied": true,
          "state": true,
          "next_id": []
        }
      ]
  }
}
resopnse code:
1-success;
2-article non-exist;
```

- 删除评论

```
method: delete
url:/api/comment/:id
resopnse:
{
  "code": "1",
  "msg": "delete success, comment_num && pre_comment has removed!"
}
resopnse code:
1-success;
2-comment non-exist;
```


- 修改评论状态（审核、未审核）

```
method: post
url:/api/changeCommentAuthState
data:
{
    "_id": "_id"
}
resopnse:
{
  "code": "1",
  "msg": "comment state change success!"
}
resopnse code:
1-success;
2-comment non-exist;
```

- 修改admin对评论的回复状态（我是否回复）

```
method: post
url:/api/changeCommentReplyState
data:
{
    "_id": "_id"
}
resopnse:
{
  "code": "1",
  "msg": "comment isIReplied change success!"
}
resopnse code:
1-success;
2-comment non-exist;
```

- 后台展示评论列表，包含评论文章的title

```
method: get
url:/api/commentToArticleList
resopnse:
{
  "code": "1",
  "msg": "comment to articles list get success!",
  "data": [
    {
      "_id": "_id",
      "article_id": {
        "_id": "_id",
        "title": "title"
      },
      "pre_id": "pre_id",
      "name": "name",
      "email": "email@163.com",
      "time": "time",
      "content": "content",
      "isIReplied": true,
      "state": true,
      "next_id": []
   }
 ]
}
resopnse code:
1-success;
```

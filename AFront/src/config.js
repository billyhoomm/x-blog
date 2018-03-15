//线上配置
let CONFIG;

if (process.env.NODE_ENV === 'production') {
  CONFIG = {
    url: "http://118.24.61.24",
    MY_INFO_ID: '5a09c50775bbda8712825a63',
    MY: '博主',
    EMAIL: 'billyhoom@qq.com'
  };
} else {
  CONFIG = {
    url: "http://localhost:8081",
    //我的信息_id
    MY_INFO_ID: '5a09c50775bbda8712825a63',
    //我对对评论进行回复的信息
    MY: '博主',
    EMAIL: 'billyhoom@qq.com'
  };
}

//57ef5987e1bb0b0b7cbd17e8
//接口API根地址
const url = CONFIG.url;
//我的信息_id
const MY_INFO_ID = CONFIG.MY_INFO_ID;
//我对对评论进行回复的信息
const MY = CONFIG.MY;
const EMAIL = CONFIG.EMAIL;


module.exports = {
  /**
   * 通用状态码
   * */

  SYS_ERR: 'SYS_ERR',//api请求系统错误


  /**
   * 用户、登录相关
   * */
  MY_INFO_ID: MY_INFO_ID,
  MY: MY,
  EMAIL: EMAIL,
  //登录
  login: `${url}/api/login`,
  doLogin: `${url}/api/do_login`,
  //获取我的信息
  getMyInfo: `${url}/api/user/${MY_INFO_ID}`,
  //post 为了安全起见
  getMyInfoWithOriginal: `${url}/api/user/original/${MY_INFO_ID}`,
  postMyInfo: `${url}/api/user`,
  changePassword: `${url}/api/change_password`,
  imgUpload: `${url}/api/imgupload`,
  imgResource: `${url}/uploads/`,

  /**
   * 文章相关
   * */
  //获取最新的十条文章
  ArticleFrom: "0",
  ArticleNum: "10",
  newUpdateArticle: `${url}/api/articles/from_to`,
  //由文章id获取文章详情
  getArticleById: `${url}/api/article/id`,
  //获取文章历史记录
  getArticleHistoryWithStructure: `${url}/api/article_history`,
  //获取文章列表
  getArticleList: `${url}/api/articles`,
  //由文章id获取文章详情(原始markdown版本)
  getRawArticleById: `${url}/api/article/raw/id`,
  //新增(如果传入的_id不存在的电话)-修改文章,并且确定文章列表概要的文字长度和概要图片
  postArt: `${url}/api/article`,
  //delete 文章
  deleteArt: `${url}/api/article/id`,
  //get 获得文章最新num条+阅读最多Num条+引用次数最多的num条，用于文章详情的
  getArticleTop: `${url}/api/article_top/num`,


  /**
   * 标签相关
   * */
  //获取标签列表(带有结构的)
  getTagsListWithStructure: `${url}/api/tags_with_structure`,
  //由标签id获取文章列表
  getArticlesWithTagId: `${url}/api/article_tag/from_to/id`,
  //获取标签列表(原始)
  getTagsList: `${url}/api/tags`,
  //增加 post
  addTag: `${url}/api/tag`,
  //修改 put
  editTag: `${url}/api/tag`,
  //删除 delete
  deleteTag: `${url}/api/tag/id`,


  /**
   * 获取评论
   * */
  getArticleComments: `${url}/api/article/comments/article_id`,
  changeCommentState: `${url}/api/changeCommentState`,
  getCommentToArticleList: `${url}/api/commentToArticleList`,
  postComment: `${url}/api/comment`,
  //评论已阅读 post
  changeCommentReplyState: `${url}/api/changeCommentReplyState`,
  //评论审核状态 post
  changeCommentAuthState: `${url}/api/changeCommentAuthState`,
  //删除评论 delete
  delComment: `${url}/api/comment/id`,
  //新增评论
  // newComment: `${url}/api/comment`,

  /**
   * 获取统计
   * */
  getTotal: `${url}/api/statistic/total`,
  getChart: `${url}/api/statistic/chart`,
  getMap: `${url}/api/statistic/map`,
  sign: `${url}/api/statistic/sign`,

  /**
   * 音乐列表
   * */
  musicList: [
    {
      coverUrl: 'http://p4.music.126.net/ANJbE5sPCbZ8YsGKOupGHg==/76965813957057.jpg?param=260y260',
      musicUrl: 'http://billyh.oss-cn-shanghai.aliyuncs.com/%E5%BC%A0%E5%AD%A6%E5%8F%8B%20-%20%E5%A5%B9%E6%9D%A5%E5%90%AC%E6%88%91%E7%9A%84%E6%BC%94%E5%94%B1%E4%BC%9A%28Live%29.mp3',
      name: '张学友 - 她来听我的演唱会',
      player: 'Jacky Cheung',
      album: '她来听我的演唱会',
    },
    {
      coverUrl: 'http://p4.music.126.net/Tnr_4K3USqFOcg9KgZMRRw==/636617232503585.jpg?param=260y260',
      musicUrl: 'http://billyh.oss-cn-shanghai.aliyuncs.com/feat.%20Soulja.mp3',
      name: 'そばにいるね 青山テルマ feat. Soulja',
      player: '青山テルマ',
      album: 'そばにいるね 青山テルマ feat. Soulja',
    },
    {
      coverUrl: 'http://p3.music.126.net/9mT4YpKIjfKx46oIEWxsTQ==/126443837207671.jpg?param=260y260',
      musicUrl: 'http://billyh.oss-cn-shanghai.aliyuncs.com/%E5%BC%A0%E5%AD%A6%E5%8F%8B%20-%20%E5%A4%B4%E5%8F%91%E4%B9%B1%E4%BA%86%28Live%29%20-%20live.mp3',
      name: '张学友 - 头发乱了',
      player: 'Jacky Cheung',
      album: '头发乱了',
    },
    {
      coverUrl: 'http://p3.music.126.net/6tu0HRcN9Rrb7mfLpTbkuA==/7948369559818308.jpg?param=260y260',
      musicUrl: 'http://billyh.oss-cn-shanghai.aliyuncs.com/Kozoro%20-%20Remember%20Me%20%28Original%20Mix%29.mp3',
      name: 'Remember Me',
      player: 'Kozoro',
      album: 'Remember Me',
    },
    {
      coverUrl: 'http://p3.music.126.net/-6osWky_WObfAydYYiTvpA==/3236962232773608.jpg?param=260y260',
      musicUrl: 'http://billyh.oss-cn-shanghai.aliyuncs.com/%E5%88%98%E5%BE%B7%E5%8D%8E%20-%2017%E5%B2%81%28%E7%B2%A4%29.mp3',
      name: '刘德华 - 17岁',
      player: 'Andy Lau',
      album: '刘德华 - 17岁',
    },
    {
      coverUrl: 'http://p4.music.126.net/hH4UmteuzsqZHacrr3YS_g==/18358545649308968.jpg?param=260y260',
      musicUrl: 'http://billyh.oss-cn-shanghai.aliyuncs.com/%E6%88%91%E6%98%AF%E7%88%B1%E9%9F%B3%E4%B9%90%E7%9A%84%E5%BE%90%E6%A2%A6%E5%9C%86%20-%20China-X.mp3',
      name: 'China-X',
      player: '徐梦圆',
      album: 'Change',
    },
    {
      coverUrl: 'http://p3.music.126.net/cUTk0ewrQtYGP2YpPZoUng==/3265549553028224.jpg?param=260y260',
      musicUrl: 'http://billyh.oss-cn-shanghai.aliyuncs.com/%E5%91%8A%E7%99%BD%E6%B0%94%E7%90%83%20-%20%E5%91%A8%E6%9D%B0%E4%BC%A6.mp3',
      name: '告白气球 - 周杰伦',
      player: 'Jay Chou',
      album: '告白气球',
    }
  ],
  /**
   * 切换的背景列表
   * */
  imageList: [
    'http://billyh.oss-cn-shanghai.aliyuncs.com/bg-img/1.jpg',
    'http://billyh.oss-cn-shanghai.aliyuncs.com/bg-img/2.jpg',
    'http://billyh.oss-cn-shanghai.aliyuncs.com/bg-img/3.jpg',
    'http://billyh.oss-cn-shanghai.aliyuncs.com/bg-img/4.jpg',
    'http://billyh.oss-cn-shanghai.aliyuncs.com/bg-img/5.jpg',
    'http://billyh.oss-cn-shanghai.aliyuncs.com/bg-img/6.jpg',
    'http://billyh.oss-cn-shanghai.aliyuncs.com/bg-img/7.jpg',
    'http://billyh.oss-cn-shanghai.aliyuncs.com/bg-img/8.jpg',
    'http://billyh.oss-cn-shanghai.aliyuncs.com/bg-img/9.jpg',
    'http://billyh.oss-cn-shanghai.aliyuncs.com/bg-img/10.jpg'
  ],

  // 微信二维码图片
  socialImgUrl: 'http://ozxkqbp7l.bkt.clouddn.com/icon/wechat.png'

};

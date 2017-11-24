/**
 * Description: 获取更新我的个人信息的api,
 * 只由actions.js调用,返回成功的结果,否则返回空,错误由自己处理显示
 */
import API from "../config.js";
import Vue from "vue";
import {doError} from "../api/api_doError";

//获取文章详情-for 前端 渲染后的详情
export const GetArticleById = function (articleId) {
  return new Promise(function (resolve, reject) {
    let url = API.getArticleById.replace('id', articleId);
    let tmp = Vue.$sessionStorage[url];
    if (!!tmp) {
      console.log("文章详情" + articleId + "数据使用缓存!")
      resolve(tmp);
      return;
    }
    Vue.http.get(url).then((response) => {
      // success callback
      let result = response.data;
      if (parseInt(result.code) === 1) {
        resolve(result.data);
        Vue.$sessionStorage.$set(url, result.data);
      } else {
        reject(parseInt(result.code));
      }
    }, () => {
      reject(API.SYS_ERR);
    });
  });
};
//获取文章列表-for 最近更新
export const GetArticleListForFrontEnd = function (url) {
  return new Promise(function (resolve, reject) {
    let tmp = Vue.$sessionStorage[url];
    if (!!tmp) {
      console.log("文章列表数据使用缓存!")
      resolve(tmp);
      return;
    }
    Vue.http.get(url).then((response) => {
      // success callback
      let result = response.data;
      if (parseInt(result.code) === 1) {
        resolve(result.data);
        Vue.$sessionStorage.$set(url, result.data);
      } else {
        reject(parseInt(result.code));
      }
    }, () => {
      reject(API.SYS_ERR);
    });
  })
};

//获取文章历史记录-for 时光机
export const GetHistoryList = function () {
  return new Promise(function (resolve, reject) {
    let url = API.getArticleHistoryWithStructure;
    let tmp = Vue.$sessionStorage[url];
    if (!!tmp) {
      console.log("时光机数据使用缓存!")
      resolve(tmp);
      return;
    }
    Vue.http.get(url).then((response) => {
      // success callback
      let result = response.data;
      if (parseInt(result.code) === 1) {
        resolve(result.data);
        Vue.$sessionStorage.$set(url, result.data);
      } else {
        reject(parseInt(result.code))
      }
    }, () => {
      reject(API.SYS_ERR);
    });
  })
};

/**
 * 获取文章列表-for 后台列表
 * */
export const GetArticleList = function () {
  return new Promise(function (resolve, reject) {
    Vue.http.get(API.getArticleList).then((response) => {
      // success callback
      let result = response.data;
      if (parseInt(result.code) === 1) {
        resolve(result.data);
      } else {
        reject(parseInt(result.code))
      }
    }, () => {
      reject(API.SYS_ERR);
    });
  })
};


/**
 * 获取文章原始信息
 * */
export const GetRawArticleById = function (id) {
  return new Promise(function (resolve, reject) {
    Vue.http.get(API.getRawArticleById.replace('id', id)).then((response) => {
      // success callback
      let result = response.data;
      if (parseInt(result.code) === 1) {
        resolve(result.data);
      } else {
        reject(parseInt(result.code))
      }
    }, () => {
      reject(API.SYS_ERR);
    });
  })
};

/**
 * 文章保存
 * */
export const SaveArticle = function (params) {
  return new Promise(function (resolve, reject) {
    Vue.http.post(API.postArt, params).then((response) => {
      // success callback
      let result = response.data;
      if (parseInt(result.code) === 1) {
        resolve(result.data);
      } else {
        reject(doError(parseInt(result.code)));
      }
    }, () => {
      reject(API.SYS_ERR);
    });
  })
};


/**
 * 文章删除
 * */
export const DeleteArticle = function (_id) {
  return new Promise(function (resolve, reject) {
    Vue.http.delete(API.deleteArt.replace('id', _id)).then((response) => {
      // success callback
      let result = response.data;
      if (parseInt(result.code) === 1) {
        resolve(result);
      } else {
        reject(doError(parseInt(result.code)));
      }
    }, () => {
      reject(API.SYS_ERR);
    });
  })
};

/**
 * 文章top榜单
 * */
export const GetArticleTop = function (_num) {
  return new Promise(function (resolve, reject) {
    var url = API.getArticleTop.replace('num', _num);
    let tmp = Vue.$sessionStorage[url];
    if (!!tmp) {
      console.log("文章文章top榜单使用缓存!")
      resolve(tmp);
      return;
    }
    Vue.http.get(url).then((response) => {
      // success callback
      let result = response.data;
      if (parseInt(result.code) === 1) {
        resolve(result.data);
        Vue.$sessionStorage.$set(url, result.data);
      } else {
        reject(doError(parseInt(result.code)));
      }
    }, () => {
      reject(API.SYS_ERR);
    });
  })
};

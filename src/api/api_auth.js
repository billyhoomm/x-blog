/**
 * Description: 获取更新我的个人信息的api,
 * 只由actions.js调用,返回成功的结果,否则返回空,错误由自己处理显示
 */


import API from "../config.js"
import Vue from "vue";
import {doError} from "../api/api_doError";

/**
 * 获取login的token
 * */
export const DoLogin = function () {
  return new Promise(function (resolve, reject) {
    Vue.http.get(API.doLogin).then((response) => {
      // success callback
      let result = response.data;
      if (parseInt(result.code) === 1) {
        resolve(result);
      } else {
        reject(doError(parseInt(result.code)));
      }
    }, () => {
      reject(API.SYS_ERR)
    });
  })
};

export const Login = function (params) {
    return new Promise(function (resolve, reject) {
        Vue.http.post(API.login,params).then((response) => {
            // success callback
            let result = response.data;
            if (parseInt(result.code) === 1) {
                resolve(result);
            } else {
                reject(doError(parseInt(result.code)));
            }
        }, () => {
            reject(API.SYS_ERR)
        });
    })
};





export const GetMyInfoWithOriginal = function () {
    return new Promise(function (resolve, reject) {
        Vue.http.post(API.getMyInfoWithOriginal).then((response) => {
            // success callback
            let result = response.data;
            if (parseInt(result.code) === 1) {
                resolve(result.data);
            } else {
                reject(doError(parseInt(result.code)));
            }
        }, () => {
            reject(API.SYS_ERR)
        });
    })
};

export const ChangePassword = function (params) {
    return new Promise(function (resolve, reject) {
        Vue.http.post(API.changePassword,params).then((response) => {
            // success callback
            let result = response.data;
            if (parseInt(result.code) === 1) {
                resolve(result);
            } else {
                reject(doError(parseInt(result.code)));
            }
        }, () => {
            reject(API.SYS_ERR)
        });
    })
};

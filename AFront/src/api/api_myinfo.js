/**
 * Description: 获取更新我的个人信息的api,
 * 只由actions.js调用,返回成功的结果,否则返回空,错误由自己处理显示
 */


import API from "../config.js";
import Vue from "vue";
import {doError} from "../api/api_doError";

export const GetMyInfo = function () {
    return new Promise(function (resolve, reject) {
        let url = API.getMyInfo;
        let tmp = Vue.$sessionStorage[url];
        if (!!tmp) {
            console.log("个人数据使用缓存!")
            resolve(tmp);
            return;
        }
        Vue.http.get(url).then((response) => {
            // success callback
            let result = response.data;
            if (parseInt(result.code) === 1) {
                resolve(result.data);
                Vue.$sessionStorage.$set(url,result.data);
            } else {
                reject(parseInt(result.code));
            }
        }, () => {
            reject(API.SYS_ERR)
        });
    })
};

export const GetMyInfoWithOriginal = function () {
    return new Promise(function (resolve, reject) {
        Vue.http.get(API.getMyInfoWithOriginal).then((response) => {
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


export const PostMyInfo = function (params) {
    return new Promise(function (resolve, reject) {
        Vue.http.put(API.postMyInfo, params).then((response) => {
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


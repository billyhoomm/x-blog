/*
 * @Dsc:上传打包后静态文件到七牛（后续扩展成通用的webpack插件）
 * @Author: hubin 
 * @Date: 2017-11-25 00:46:16
*/
const qn = require('qn');
const path = require('path');
const fs = require('fs');
const config_qn = require('../config/config_').qiniu;

const root = path.resolve(__dirname, '../public/static/');
const uploadArr = [];

let client = qn.create(config_qn);

function explorer(path){
    return new Promise((res, rej) => {
        fs.readdir(path, function(err, files){
            //err错误 , files 文件名列表包含文件夹与文件
            if(err){
                console.log('error:\n' + err);
                rej(-1)
                return;
            }
    
            files.forEach(function(file){
    
                fs.stat(path + '/' + file, function(err, stat){
                    if(err){console.log(err); return;}
                    if(stat.isDirectory()){			
                        // 如果是文件夹遍历
                        explorer(path + '/' + file);
                    }else{
                        // 读出所有的文件
                        // 此处需要和html-webpack-plugin插件填充的打包目录配合
                        let filename = path.split('\\').pop() + '/' + file;
                        let filepath = path + '/' + file;
                        uploadArr.push(uploadFile(filename, filepath));
                        res(0);
                    }				
                });
                
            });
    
        });
    })
}

explorer(root).then(data => {
    if(data == 0 ){
        Promise.all(uploadArr).then(result => {
            console.log(`cdn_sync_done!!!${root}`);
        })
    }
})


function uploadFile(filename, filepath){
    return new Promise((res, rej) => {
        client.uploadFile(filepath, {key: filename}, function (err, result) {
            if(err){
                console.log('cdnsync_fail==>',err);
                rej(err);
            }
            console.log(`cdn_sync_succ ==>${result.url}`)
            res(result)
        })
    })
}
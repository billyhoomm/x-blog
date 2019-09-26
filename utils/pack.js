/*
 * @Dsc: 打包-上传-解压-重启
 * @Author: billyhu 
 * @Date: 2019-07-23 22:23:27
*/
const fs = require('fs')
const path = require('path')
const targz = require('targz')
const scpClient = require('scp2')
const moment = require('moment')
const chalk = require('chalk')
const SSH = require('simple-ssh')
const config = require('../config/config');

const timesrting = moment().format('YYYY-MM-DD HH:mm:ss').toString().replace(/-|\s|:/g, '')
const ARCHIVE_NAME = `release-${timesrting}.tar.gz`

console.log('Packing...')

try{
  targz.compress({
    src: './',
    dest: `./release/${ARCHIVE_NAME}`,
    tar: {
      ignore: function (name) {
        return path.extname(name) === '.git' || path.dirname(name) === 'AFront' || path.extname(name) === 'config.js'
      }
    },
  }, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Scping...')
      scpToServer().then(() => {
        console.log('Extract...')
        execRemoteOperations()
      })
    }
  });
}catch (ex) {
  console.log(ex)
}

// 上传至服务器
function scpToServer() {
  return new Promise((resolve, reject) => {
    scpClient.scp(`./release/${ARCHIVE_NAME}`, {
      host: config.HOST,
      username: config.USERNAME,
      password: config.PASSWORD,
      path: config.REMOTE_PATH,
    }, function (err) {
      if (err) {
        reject(err);
      } else {
        fs.unlinkSync(`./release/${ARCHIVE_NAME}`);
        resolve();
      }
    });
  });
}

// ssh到服务器解压
function execRemoteOperations() {
  return new Promise((resolve, reject) => {
    const ssh = new SSH({
      host: config.HOST,
      user: config.USERNAME,
      pass: config.PASSWORD,
    });

    ssh
      .exec(`tar zxvf ${config.REMOTE_PATH}/${ARCHIVE_NAME} -C ${config.REMOTE_PATH}/XBlog`, {
        out: (stdout) => console.log(stdout),
      })
      .exec(`rm ${config.REMOTE_PATH}/${ARCHIVE_NAME}`, {
        out: (stdout) => console.log(stdout),
        exit: () => {
          resolve();
          console.log(
            chalk.green('Extract success!')
          );
          process.exit()
        },
      })
      .on('error', function (err) {
        console.log(err)
        ssh.end();
        reject(err);
      })
      .start();
  });
}
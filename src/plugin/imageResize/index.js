/**
 * Created by Hsiang on 2016/11/10.
 * 图片压缩+方向矫正处理
 */
import "./exif.js"
import "./canvasResize.js"
module.exports = function imageResize(file,cb) {
      canvasResize(file, {
        width: 710,//最大的尺寸,如果比这小是不会出现放大的情况的,文章宽度为710px
        height: 0,
        crop: false,
        quality: 80,
        //rotate: 90,
        callback: function (data, width, height) {
          // 将图片改为二进制文件,准备上传
          var blob = canvasResize('dataURLtoBlob', data);
          var form = new FormData();
          form.append('uploadImg', blob);
          // 上传
          !!cb && cb(form);
        }
      });
}

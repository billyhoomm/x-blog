使用方法：

```
import imageResize from "./imageResize"

export const ImageUpload = function (_file) {
  //1. 传入filer参数
  return new Promise(function (resolve, reject) {
    // 2. 将img值进行方向矫正,裁剪压缩
    imageResize(_file, function (_form) {
      // 3. 文件上传
      Vue.http.post(API.imgUpload, _form).then(function (result) {
        let response = result.data;
        // console.log(response)
        if (parseInt(response.code) === 1) {
          resolve(response.data);
        } else {
          reject(response.code)
        }
      }, function (error) {
        reject(error)
      });
    })
  });
};
```

参数设置见：index.js

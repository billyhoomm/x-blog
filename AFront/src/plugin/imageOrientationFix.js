/**
 * Description:
 */


module.exports =  function (opts) {
    var settings = {
        //img:"" //图片元素，推荐用var _img=new Image() 然后用_img.onload=function(){ EXIF.getData(this,function(exifdata){});_img.src=value; }这样使用。
        image: opts.image || "" //分成三种类型，一种是服务端的url，一种是base64数据，还有一种是iamge原生元素。
        , imgType: opts.imgType || "url" //url，base64或者image
        , onFix: opts.onFix || function (base64ImgStr) {

        }//处理以后得到的base64字符串。
    };

    var _exifInfo = {};
    var _realImage = "";


    //---修正ios压扁问题。
//--修正ios下面canvas图片压缩的情况。
    /**
     * Detecting vertical squash in loaded image.
     * Fixes a bug which squash image vertically while drawing into canvas for some images.
     * This is a bug in iOS6 devices. This function from https://github.com/stomita/ios-imagefile-megapixel
     *
     */
    function detectVerticalSquash(img) {
        var iw = img.naturalWidth, ih = img.naturalHeight;
        var canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = ih;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        var data = ctx.getImageData(0, 0, 1, ih).data;
        // search image edge pixel position in case it is squashed vertically.
        var sy = 0;
        var ey = ih;
        var py = ih;
        while (py > sy) {
            var alpha = data[(py - 1) * 4 + 3];
            if (alpha === 0) {
                ey = py;
            } else {
                sy = py;
            }
            py = (ey + sy) >> 1;
        }
        var ratio = (py / ih);
        return (ratio === 0) ? 1 : ratio;
    }

    /**
     * A replacement for context.drawImage
     * (args are for source and destination).
     */
    function drawImageIOSFix(ctx, img, sx, sy, sw, sh, dx, dy, dw, dh) {
        var vertSquashRatio = detectVerticalSquash(img);
        // Works only if whole image is displayed:
        // ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh / vertSquashRatio);
        // The following works correct also when only a part of the image is displayed:
        ctx.drawImage(img, sx * vertSquashRatio, sy * vertSquashRatio,
            sw * vertSquashRatio, sh * vertSquashRatio,
            dx, dy, dw, dh);
    }

    var _app = {
        init: function () {
            var __image = new Image();
            var _me = this;
            _realImage = __image;

            __image.onload = function () {

                EXIF.getData(this, function () {

                    _exifInfo = EXIF.getAllTags(this);
                    _me.__fix();
                });
            };
            if (settings.imgType == "image") {
                __image.src = $(settings.image).attr("src");
            }
            else {
                __image.src = settings.image;
            }
        }
        , __fix: function () {

            //--修正ios6 7 颠倒，压扁问题。

            var Options = {
                width: _realImage.naturalWidth
                , height: _realImage.naturalHeight
                , transX: 0
                , transY: 0
                , XDimension: 0
                , YDimension: 0
                , Orientation: 1
            };
            Options.Orientation = _exifInfo.Orientation;

            if (Options.Orientation == undefined) {
                Options.Orientation = 1;
            }

            var _realWidth = 0;
            var _realHeight = 0;
            //--计算是否需要旋转。
            if (Options.Orientation != 1) {
                Options.transX = parseInt(Options.width / 2);
                Options.transY = parseInt(Options.height / 2);

            }
            else {
                Options.transX = 0;
                Options.transY = 0;

            }
            _realWidth = _realImage.width;
            _realHeight = _realImage.height;

            var XDimension = _exifInfo["PixelXDimension"];// EXIF.getTag(this,"PixelXDimension");
            var YDimension = _exifInfo["PixelYDimension"]; // EXIF.getTag(this,"PixelYDimension");
            Options.XDimension = XDimension;
            Options.YDimension = YDimension;

            var tmpCanvas = document.createElement("canvas");

            tmpCanvas.width = Options.width;
            tmpCanvas.height = Options.height;
            var tmpContext = tmpCanvas.getContext("2d");
            //--放入临时画布。
            tmpContext.clearRect(0, 0, tmpCanvas.width, tmpCanvas.height);
            //context.clearRect(0,0,canvas.width,canvas.height);
            //context.drawImage(image, 0, 0, image.width, image.height, Options.cropLeft, Options.cropTop, Options_image.scaleWidth, Options_image.scaleHeight);
            // context.drawImage(image, 0, 0, image.width, image.height, Options.cropLeft, Options.cropTop, canvas.width, canvas.height);
            drawImageIOSFix(tmpContext, _realImage, 0, 0, _realWidth, _realHeight, 0, 0, _realWidth, _realHeight);


            //--生成新的canvas。
            var _canvas = document.createElement("canvas");

            var _context = _canvas.getContext("2d");
            //.clearRect(0,0,canvas.width,canvas.height);
            //生成一个可以用的缩略图。

            switch (Options.Orientation) {
                case 8:
                    // 90 rotate left     --需要90度向左旋转。。那么，这个 PixelYDimension就是宽度了，PixelXDimension就是高度了。
                    _realWidth = YDimension;
                    _realHeight = XDimension;
                    _canvas.width = _realWidth;
                    _canvas.height = _realHeight;
                    _context.translate(parseInt(_realWidth / 2), parseInt(_realHeight / 2));
                    _context.rotate(-0.5 * Math.PI);
                    _context.drawImage(tmpCanvas, 0, 0, tmpCanvas.width, tmpCanvas.height, 0 - Options.transX, 0 - Options.transY, tmpCanvas.width, tmpCanvas.height);
                    break;
                case 3:
                    //180向左旋转
                    _realWidth = XDimension;
                    _realHeight = YDimension;
                    _canvas.width = _realWidth;
                    _canvas.height = _realHeight;
                    _context.translate(parseInt(_realWidth / 2), parseInt(_realHeight / 2));
                    _context.rotate(Math.PI);
                    _context.drawImage(tmpCanvas, 0, 0, tmpCanvas.width, tmpCanvas.height, 0 - Options.transX, 0 - Options.transY, tmpCanvas.width, tmpCanvas.height);
                    break;
                case 6:
                    //90 rotate right 需要向右旋转90度，PixelYDimension就是宽度了，PixelXDimension就是高度了。
                    _realWidth = YDimension;
                    _realHeight = XDimension;
                    _canvas.width = _realWidth;
                    _canvas.height = _realHeight;

                    _context.translate(parseInt(_realWidth / 2), parseInt(_realHeight / 2));
                    _context.rotate(0.5 * Math.PI);


                    _context.drawImage(tmpCanvas, 0, 0, tmpCanvas.width, tmpCanvas.height, 0 - Options.transX, 0 - Options.transY, tmpCanvas.width, tmpCanvas.height);
                    break;
                case 1:
                    _canvas.width = _realWidth;
                    _canvas.height = _realHeight;
                    _context.drawImage(tmpCanvas, 0, 0, _realWidth, _realHeight, 0 - Options.transX, 0 - Options.transY, tmpCanvas.width, tmpCanvas.height);
                    break;
            }
            var _base64 = _canvas.toDataURL();
            settings.onFix(_base64);
            //$(document.body).append(_canvas);
            //selection = new Selection("canvas",16,9);
            // selection.drawScene();
            //selection.addListerner();

            return;

        }

    };

    _app.init();

    var returnObject = {
        getExif: function () {
            return _exifInfo;
        }

    };

    return returnObject;
};
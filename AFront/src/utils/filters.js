/**
 * Description:
 */
import CONFIG from "../config.js";
/**
 * 给图片加前缀
 * */
export const addImgPrefix = function (imgName) {
  if (!imgName) {
    return false;
  } 

  return `http://` + imgName

}

/**
 * 将月转化为因为首字母大写简写的形式
 * 1 -> JUN
 * */
export const num2MMM = function (value) {
  var output = '';
  switch (parseInt(value)) {
    case 1:
      output =  "Jan";
      break;
    case 2:
      output =  "Feb";
      break;
    case 3:
      output =  "Mar";
      break;
    case 4:
      output =  "Apr";
      break;
    case 5:
      output =  "May";
      break;
    case 6:
      output =  "Jun";
      break;
    case 7:
      output =  "Jul";
      break;
    case 8:
      output =  "Aug";
      break;
    case 9:
      output =  "Sept";
      break;
    case 10:
      output =  "Oct";
      break;
    case 11:
      output =  "Nov";
      break;
    case 12:
      output =  "Dec";
      break;
  }
  return output.toUpperCase();
}

/**
 * 大写
 * */
export const uppercase = function (value) {
  return value.toUpperCase();
}




/**
 * 音乐播放器,秒转化为03:40这种格式
 * */
export const secondsConvert = function (values) {
  let seconds = values;
  if (seconds === 0 || !seconds || seconds === 'undefined') {
    return "00:00"
  } else {
    seconds = parseInt(seconds);

    let minute = setZero(Math.floor(seconds / 60))
    let second = setZero(Math.floor(seconds % 60))
    return minute + ":" + second
  }

  function setZero(value) {
    value = parseInt(value)
    if (parseInt(value) < 10) {
      return "0" + value + ""
    } else {
      return value
    }
  }
}

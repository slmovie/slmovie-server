/**
 * Created by 包俊 on 2018/5/28.
 */
let iconv = require("iconv-lite");

export const transfer = (xl) => {
  if (xl.indexOf("thunder://") !== -1) {
    let origin = xl.replace("thunder://", "");
    let url = Buffer.from(origin, "base64");
    url = iconv.decode(url, "gbk");
    url = url.slice(2, url.length - 2);
    if (url.indexOf("电影家园www.idyjy.com下载") !== -1) {
      url = url.replace("电影家园www.idyjy.com", "双龙影视www.slys.in");
    }
    return url;
  } else {
    return xl;
  }
};

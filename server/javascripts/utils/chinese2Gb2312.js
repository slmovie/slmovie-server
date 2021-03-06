/**
 * Created by BJ on 2017/2/9.
 */
let iconv = require("iconv-lite");

module.exports = function chinese2Gb2312(data) {
  let gb2312 = iconv.encode(data.toString("UCS2"), "GB2312");
  let gb2312Hex = "";
  for (let i = 0; i < gb2312.length; ++i) {
    gb2312Hex += toHex(gb2312[i]);
  }
  return gb2312Hex.toUpperCase();
};

let toHex = function (chr, padLen) {
  if (padLen == null) {
    padLen = 2;
  }
  return pad(chr.toString(16), padLen);
};

let pad = function (number, length, pos) {
  let str = "%" + number;
  while (str.length < length) {
    //向右边补0
    if (pos == "r") {
      str = str + "0";
    } else {
      str = "0" + str;
    }
  }
  return str;
};
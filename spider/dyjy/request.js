const agent = require("../../server/javascripts/utils/mySuperagent");
const userAgents = require("../userAgent");
const request = require("request");
const iconv = require("iconv-lite");

exports.getHtml = (url, proxy) => {
  const myReq = request.defaults({ "proxy": proxy });
  try {
    myReq.get(url,
      { encoding: "binary", timeout: 1000 },
      (error, response, result) => {
        if (error) {
          throw error;
        }
        if (response.statusCode === 200) {
          const body = iconv.decode(Buffer.from(result, "binary"), "gbk");
          return new Promise((resolve) => {
            resolve(body);
          });
        } else {
          throw response.statusCode;
        }
      });
  } catch (error) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }
};

exports.getDetailHtml = (id, proxy) => {
  const myReq = request.defaults({ "proxy": proxy });
  try {
    myReq.get("http://www.idyjy.com/sub/" + id + ".html",
      { encoding: "binary", timeout: 1000 },
      (error, response, result) => {
        if (error) {
          throw error;
        }
        if (response.statusCode === 200) {
          const body = iconv.decode(Buffer.from(result, "binary"), "gbk");
          return new Promise((resolve) => {
            resolve(body);
          });
        } else {
          throw response.statusCode;
        }
      });
  } catch (error) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }
};

exports.getHomeHtml1 = async (proxy) => {
  try {
    const back = await agent.getAgent()
      .get("http://www.idyjy.com")
      .charset("gb2312")
      .timeout(3000)
      .proxy(proxy)
      .set({ "User-Agent": userAgents.getUserAgent() });
    return handleResponse(back);
  } catch (error) {
    throw error;
  }
};

exports.getDetailHtml1 = async (id, proxy) => {
  try {
    const back = await agent.getAgent()
      .get("http://www.idyjy.com/sub/" + id + ".html")
      .charset("gb2312")
      .timeout(3000)
      .proxy(proxy)
      .set({ "User-Agent": userAgents.getUserAgent() });
    return handleResponse(back);
  } catch (error) {
    throw error;
  }
};

exports.getDownloadUrl = async (url, proxy) => {
  const back = await agent.getAgent()
    .get("http://www.idyjy.com" + url + ".html")
    .charset("gb2312")
    .proxy(proxy);
  return back;
};

const handleResponse = (back) => {
  if (back.statusCode === 200) {
    if (back.text.indexOf("您的请求过于频繁") === -1) {
      return back;
    } else {
      throw "-1";
    }
  } else {
    throw "error code " + back.statusCode;
  }
};

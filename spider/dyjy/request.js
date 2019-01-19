const getSuperagent = require("../../server/javascripts/utils/mySuperagent");

exports.getHomeHtml = async () => {
  const back = await getSuperagent().get("http://www.idyjy.com").charset("gb2312");
  return back;
};

exports.getDetailHtml = async (id) => {
  const back = await getSuperagent().get("http://www.idyjy.com/sub/" + id + ".html").charset("gb2312");
  return back;
};

exports.getDownloadUrl = async (url) => {
  const back = await getSuperagent().get("http://www.idyjy.com" + url + ".html").charset("gb2312");
  return back;
};

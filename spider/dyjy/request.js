const getSuperagent = require("../../server/javascripts/utils/mySuperagent");

exports.getHomeHtml = async (url) => {
  const back = await getSuperagent().get(url).charset("gb2312");
  return back;
};
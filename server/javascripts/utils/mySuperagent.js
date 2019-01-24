/**
 * Created by BaoJun on 2017/2/11.
 */
let request = require("superagent");
const charset = require("superagent-charset");
request = charset(request);
const proxy = require("superagent-proxy");
request = proxy(request);

export const getAgent = () => {
  return request;
};
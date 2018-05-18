/**
 * Created by 包俊 on 2018/5/15.
 */
var cheerio = require('cheerio');
let TestProxy = require('./TestProxy.js')
var http = require('http');

exports.getSinglePoxy = function (callback) {
    singlePoxy().then(v => {
        callback(v)
    }, (error) => {
        console.log(error)
    })
}

async function singlePoxy() {
    let page = Math.floor(Math.random() * 7) + 1
    console.log('开始查询第' + page + '页')
    //请求代理IP页面
    var res = await reqHtml(page)
    var $ = cheerio.load(res);
    var tr = $('tr');
    //从第二行开始获取IP和端口
    for (var line = 1; line < tr.length; line++) {
        var td = $(tr[line]).children('td');
        var proxy = {
            host: td[2].children[0].data.toLowerCase() + '://' + td[0].children[0].data,
            port: td[1].children[0].data
        }
        console.log('开始测试：' + proxy.host + ':' + proxy.port)
        //代理IP请求，设置超时为3000ms，返回正确即当可用
        let ip = await TestProxy.testProxy(proxy)
        if (ip != '0') {
            return new Promise(resolve => {
                console.log('可用IP：' + proxy.host + ':' + proxy.port)
                resolve(ip)
            })
        }
    }
    return new Promise(resolve => {
        console.log('无可用ip')
        resolve('0')
    })
}

async function reqHtml(page) {
    return await new Promise((resolve) => {
        console.log('url>>>' + 'http://www.freeproxylists.net/zh/?page=')
        var req = http.get('http://www.freeproxylists.net/zh/?page=' + page, function (res) {
            var html = '';
            res.on('data', function (data) {
                html += data;
            });
            res.on('end', function () {
                resolve(html)
            });
        });
        req.on('error', () => {
            resolve("")
        })
        req.end()
    })
}
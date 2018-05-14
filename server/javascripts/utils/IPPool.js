/**
 * Created by 包俊 on 2018/5/9.
 */
var request = require('superagent');
var cheerio = require('cheerio');
require('superagent-proxy')(request);
var http = require('http');

// getPoxy().then(v => {
//     console.log(v)
// })

async function getPoxy() {
    let ips = []
    for (var page = 1; page <= 50; page++) {
        console.log('开始查询第' + page + '页')
        //请求代理IP页面
        var res = await reqHtml(page).catch(error => {
            console.log(error)
        })
        console.log(res)
        var $ = cheerio.load(res);
        var tr = $('tr');
        //从第二行开始获取IP和端口
        for (var line = 1; line < tr.length; line++) {
            var td = $(tr[line]).children('td');
            // var proxy = 'http://' + td[1].children[0].data + ':' + td[2].children[0].data;
            var proxy = {
                host: 'http://' + td[1].children[0].data,
                port: td[2].children[0].data
            }
            // console.log('开始测试：' + proxy)
            try {
                //代理IP请求，设置超时为3000ms，返回正确即当可用
                let ip = await reqDouban(proxy)
                if (ip != '0') {
                    ips.push(ip)
                }
            } catch (error) {
            }
            // console.log(ips)
        }
    }
    console.log('finish')
    return new Promise(resolve => {
        resolve(ips)
    })
}

async function reqHtml(page) {
    return await new Promise((resolve, reject) => {
        var req = http.get('http://www.xicidaili.com/nt/' + page, function (res) {
            var html = '';
            res.on('data', function (data) {
                html += data;
            });
            res.on('end', function () {
                resolve(html)
            });
        });
        req.on('error', () => {
            reject(new Error())
        })
        req.end()
    })
}

async function reqDouban(proxy) {
    return await new Promise(resolve => {
        request.get('https://api.douban.com/v2/book/1220562')
            .proxy(proxy.host + ':' + proxy.port)
            .timeout(5000)
            .on('error', (error) => {
                console.log('IPPool on error' + error)
                resolve('0')
            })
            .end((error, response) => {
                try {
                    if (response.statusCode == 200) {
                        let text = JSON.parse(response.text)
                        // console.log(text)
                        if (text.id == 1220562) {
                            resolve(proxy.host + ':' + proxy.port)
                        } else {
                            resolve('0')
                        }
                    } else {
                        resolve('0')
                    }
                } catch (error) {
                    resolve('0')
                }
            })
    })
}

// test()

async function test() {
    let ip = await singlePoxy()
    console.log(ip)
}

exports.getSinglePoxy = function (callback) {
    singlePoxy().then(v => {
        callback(v)
    }, (error) => {
        console.log(error)
    })
}

async function singlePoxy() {
    for (var page = 1; page <= 5; page++) {
        console.log('开始查询第' + page + '页')
        //请求代理IP页面
        var res = await reqHtml(page)
        var $ = cheerio.load(res);
        var tr = $('tr');
        //从第二行开始获取IP和端口
        for (var line = 1; line < tr.length; line++) {
            var td = $(tr[line]).children('td');
            var proxy = {
                host: 'http://' + td[1].children[0].data,
                port: td[2].children[0].data
            }
            console.log('开始测试：' + proxy.host + ':' + proxy.port)
            try {
                //代理IP请求，设置超时为3000ms，返回正确即当可用
                let ip = await reqDouban(proxy)
                if (ip != '0') {
                    return new Promise(resolve => {
                        console.log('可用IP：' + proxy.host + ':' + proxy.port)
                        resolve(ip)
                    })
                }
            } catch (error) {
            }
            // console.log(ips)
        }
    }
}
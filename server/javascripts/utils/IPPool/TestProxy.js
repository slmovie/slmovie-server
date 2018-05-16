/**
 * Created by 包俊 on 2018/5/15.
 */
var request = require('superagent');
require('superagent-proxy')(request);

exports.testProxy = async function (proxy) {
    let ip = await reqDouban1(proxy)
    // ip = await reqDouban(proxy)
    return new Promise(resolve => {
        resolve(ip)
    })
}

async function reqDouban(proxy) {
    return await new Promise(resolve => {
        request.get('http://api.douban.com/v2/movie/subject/1298648')
            .proxy(proxy.host + ':' + proxy.port)
            .timeout(5000)
            .on('error', (error) => {
                console.log('IPPool on error' + error)
                resolve('0')
            })
            .end((error, response) => {
                try {
                    if (error || response.statusCode == '') {
                        resolve('0')
                    }
                    if (response.statusCode == 200) {
                        let text = JSON.parse(response.text)
                        if (text.id == 1298648) {
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

async function reqDouban1(proxy) {
    return await new Promise(resolve => {
        request.get('http://api.douban.com/v2/movie/subject/1764796')
            .proxy(proxy.host + ':' + proxy.port)
            .timeout(5000)
            .on('error', (error) => {
                console.log('IPPool on error' + error)
                resolve('0')
            })
            .end((error, response) => {
                try {
                    if (error || response.statusCode == '') {
                        resolve('0')
                    }
                    if (response.statusCode == 200) {
                        let text = JSON.parse(response.text)
                        if (text.id == 1764796) {
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
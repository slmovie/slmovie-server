/**
 * Created by 包俊 on 2018/5/15.
 */
var request = require('superagent');
require('superagent-proxy')(request);

export async function reqDouban(proxy) {
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
/**
 * Created by 包俊 on 2018/5/15.
 */

let XCProxy = require('./XCProxy.js')
let KuaiProxy = require('./KuaiProxy.js')
let FreeProxy = require('./KuaiProxy.js')

exports.getSinglePoxy = function (callback) {
    getSinglePoxy(callback)
    // KuaiProxy.getSinglePoxy(callback)
}

FreeProxy.getSinglePoxy((ip) => {
    console.log(ip)
})

function getSinglePoxy(callback) {
    let index = Math.floor(Math.random() * 3)
    switch (index) {
        case 0:
            XCProxy.getSinglePoxy((ip => {
                callback(ip)
            }))
            break
        case 1:
            KuaiProxy.getSinglePoxy((ip => {
                callback(ip)
            }))
            break
        case 2:
            FreeProxy.getSinglePoxy((ip => {
                callback(ip)
            }))
            break
    }

}
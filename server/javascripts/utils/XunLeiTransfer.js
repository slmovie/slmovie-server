/**
 * Created by 包俊 on 2018/5/28.
 */
var iconv = require('iconv-lite');

// transfer("thunder://QUFlZDJrOi8vfGZpbGV8ob6159OwvNLUsHd3dy5pZHlqeS5jb23PwtTYob+xz9K11/fGty5IRLn60+/W0NfWLm1wNHwxNDc1OTAxMzE3fDk3MUU2MDE3OTk4RTk1M0JGNjRDQzY4QUM4NDY5MEMxfGg9VlJHRzVNM0VWTFQyRFlFS09XTTZGM0g2RVFQSzQ2Rkh8L1pa",
//     (url) => console.log(url))

exports.transfer = function (xl, next) {
    transfers(xl, (data) => {
        next(data)
    })
}

function transfers(xl, callback) {
    if (xl.indexOf("thunder://") != -1) {
        xl = xl.replace("thunder://", "")
        var url = new Buffer(xl, 'base64')
        var url = iconv.decode(url, 'gbk')
        url = url.slice(2, url.length - 2)
        if (url.indexOf("电影家园www.idyjy.com下载") != -1) {
            url = url.replace("电影家园www.idyjy.com", "双龙影视www.slys.ml")
        }
        callback(url)
    } else {
        console.log('无需更新')
        callback(xl)
    }
}
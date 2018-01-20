/**
 * Created by 包俊 on 2017/7/9.
 */
let AllMovies = require('./updateAllMovies.js')
let Index = require('./indexMovies/saveIndexMovies.js')

updateMovies(function () {
    Index.updateIndex(function () {
        process.exit(0)
    })
})

function updateMovies(callback) {
    console.log("start update")
    AllMovies.update(0, function (res) {
        if (res == 1) {
            callback()
        } else {
            updateMovies(callback)
        }
    })
}
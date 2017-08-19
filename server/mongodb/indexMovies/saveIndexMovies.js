/**
 * Created by 包俊 on 2017/7/7.
 */
exports.updateIndex = function (callback) {
    getAll(callback)
}

getAll(() => {
    console.log("update finished")
    process.exit(0)
})

function getAll(callback) {
    let hotMovies = require('./hotMovies/hotMoviesSaveModel.js')
    let newMovies = require('./newMovies/newMoviesSaveModel.js')
    let newTVs = require('./newTVs/newTVsSaveModel.js')
    hotMovies.getHotMovies(function () {
        console.log("hotmovies update finish")
        newMovies.getNewMovies(function () {
            console.log("newMovies update finish")
            newTVs.getNewTVs(function () {
                console.log("newTVs update finish")
                callback()
            })
        })
    })
}
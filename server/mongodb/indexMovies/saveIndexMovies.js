/**
 * Created by 包俊 on 2017/7/7.
 */
exports.updateIndex = function () {
    getAll()
}

// getAll()

function getAll() {
    let hotMovies = require('./hotMovies/hotMoviesSaveModel.js')
    let newMovies = require('./newMovies/newMoviesSaveModel.js')
    let newTVs = require('./newTVs/newTVsSaveModel.js')
    hotMovies.getHotMovies(function () {
        newMovies.getNewMovies(function () {
            newTVs.getNewTVs(function () {
                console.log('index update finish')
            })
        })
    })
}
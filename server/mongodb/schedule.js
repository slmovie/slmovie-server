/**
 * Created by 包俊 on 2017/7/9.
 */
let schedule = require('node-schedule');
let AllMovies = require('./updateAllMovies.js')
let Index = require('./indexMovies/getIndexMovies.js')

let rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(1, 6)];
rule.hour = 24;
rule.minute = 0;

console.log('schedule running')

var j = schedule.scheduleJob(rule, function () {
    updateMovies(function () {
        Index.updateIndex()
    })
});

function updateMovies(callback) {
    AllMovies.update(function (res) {
        if (res == 1) {
            callback()
        } else {
            updateMovies(callback)
        }
    })
}
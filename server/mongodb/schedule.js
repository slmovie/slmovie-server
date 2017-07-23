/**
 * Created by 包俊 on 2017/7/9.
 */
let schedule = require('node-schedule');
let AllMovies = require('./updateAllMovies.js')
let Index = require('./indexMovies/saveIndexMovies.js')

let rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(1, 6)];
rule.hour = 1;
rule.minute = 0;

console.log('schedule running')

schedule.scheduleJob(rule, function () {
    console.log('start update')
    updateMovies(function () {
        Index.updateIndex()
    })
});

function updateMovies(callback) {
    AllMovies.update(1, function (res) {
        if (res == 1) {
            callback()
        } else {
            updateMovies(callback)
        }
    })
}
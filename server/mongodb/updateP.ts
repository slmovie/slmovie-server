/**
 * Created by 包俊 on 2017/7/9.
 */
let AllMovies = require("./updateAllMovies.js");
import { startHomeSpider } from "../../spider/dyjy/home/homeSpider";

const updateMovies = (callback: any) => {
  console.log("start update");
  AllMovies.update(1, (res: number) => {
    if (res === 1) {
      callback();
    } else {
      updateMovies(callback);
    }
  });
};

updateMovies(() => {
  startHomeSpider().then(() => {
    process.exit(0);
  });
});
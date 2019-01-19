import { getDetailHtml, getDownloadUrl } from "../request";
import { IDownloadFiles, IMovieInfo, MovieInfo, IDetails } from "../../typings/detailResponse";
import { transfer } from "../../utils/XunLeiTransfer";
import cheerio from "cheerio";

export default class DetailSpider {
  getDatail(address: string): Promise<IDetails> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await getDetailHtml(address);
        if (response.statusCode === 200) {
          if (response.text.indexOf("如果您的浏览器没有自动跳转，请点击这里") !== -1) {
            reject("-1");
          } else {
            const result = await this.handleData(response.text, address);
            if (!result.name && !result.post) {
              reject("-1");
            } else {
              resolve(result);
            }
          }
        } else {
          console.log("movie" + address + " get  error: " + response.statusCode);
          reject("0");
        }
      } catch (error) {
        console.log("movie" + address + " get  error: " + error);
        reject("0");
      }
    });
  }

  private async handleData(html: string, address: string): Promise<IDetails> {
    let $ = cheerio.load(html);
    const name = $("span", ".h1title").text();
    const detail = [];
    detail.push(" 片名： " + name);
    $("li", ".info").each(function (i, elem) {
      detail.push($(elem).text());
    });
    const details: IDetails = {
      id: address,
      detail: detail,
      name: name,
      post: $("img", ".pic").attr("src"),
      describe: $(".endtext").text(),
      details: this.handleDetails(detail),
      files: await this.handleDownloads($),
    };
    return details;
  }

  private handleDetails(detail: string[]): IMovieInfo {
    const details = new MovieInfo();
    for (let i = 0; i < detail.length; i++) {
      if (detail[i].indexOf("片名") !== -1) {
        let name = detail[i];
        name = name.replace(/\s+/g, "");
        details.name = name.slice(3);
      } else if (detail[i].indexOf("上映年代") !== -1) {
        let str = detail[i];
        str = str.replace(/\s+/g, "");
        details.year = str.slice(5, 9);
        details.location = str.slice(12);
      } else if (detail[i].indexOf("类型") !== -1) {
        let type = detail[i].slice(3);
        type = type.replace(/^\s*/, "");
        type = type.replace(/(\s*$)/g, "");
        details.type = type.replace(/\s+/g, "、");
      } else if (detail[i].indexOf("导演") !== -1) {
        let director = detail[i].slice(3);
        director = director.replace(/^\s*/, "");
        director = director.replace(/(\s*$)/g, "");
        details.director = director.replace(/\s+/g, " ");
      } else if (detail[i].indexOf("主演") !== -1) {
        let actor = detail[i].slice(3);
        actor = actor.replace(/^\s*/, "");
        actor = actor.replace(/(\s*$)/g, "");
        details.actor = actor.replace(/\s+/g, " ");
      } else if (detail[i].indexOf("又名") !== -1) {
        let otherName = detail[i].slice(3);
        details.otherName = otherName.replace(/\s+/g, "");
      } else if (detail[i].indexOf("IMDB") !== -1) {
        let IMDB = detail[i].slice(5);
        details.IMDB = IMDB.replace(/\s+/g, "");
      } else if (detail[i].indexOf("更新状态") !== -1 || detail[i].indexOf("更新至") !== -1) {
        details.status = detail[i].replace(/\s+/g, "");
        details.TV = true;
      }
    }
    return details;
  }

  private async handleDownloads($: CheerioStatic): Promise<IDownloadFiles[]> {
    const downloads: IDownloadFiles[] = Array<IDownloadFiles>();
    await $(".down_part_name").each(async (i, elem) => {
      const name = $("a", elem).text();
      const fileSize = $("em", $(elem).parent().next()).text();
      const url = $(elem).parent().prev().attr("value");
      let download = "";
      if (url.indexOf(".html") !== -1) {
        try {
          const response = await getDownloadUrl("");
          if (response.statusCode === 200) {
            const che = cheerio.load(response.text);
            download = che("a", che(".downtools")).attr("href");
          }
        } catch (error) {
        }
      } else {
        download = url;
      }
      if (download) {
        downloads.push({
          name: name,
          fileSize: fileSize,
          download: transfer(download),
        });
      }
    });
    return downloads;
  }
}
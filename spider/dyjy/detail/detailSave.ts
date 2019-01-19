import DetailSpider from "./detail";
import { findOneByID } from "../../../server/mongodb/queryUtils";
import { MoviesDB, MovieModel } from "./detailCon";

const SaveDetail = (id: string) => {
  return new Promise((resolve, reject) => {
    const detailSpider = new DetailSpider();
    detailSpider.getDatail(id).then((detail) => {
      findOneByID(id, (detailFromDB: any) => {
        if (detailFromDB === 0) {
          MovieModel(MoviesDB()).create(detail, function (error: any) {
            if (error) {
              console.log(id + " " + detail.name + ">>>保存失败");
              reject("-1");
            } else {
              console.log(id + " " + detail.name + ">>>保存成功");
              resolve();
            }
          });
        } else if (JSON.stringify(detail.files) === JSON.stringify(detailFromDB.files)) {
          MovieModel(MoviesDB()).update({ id: id }, { $set: detail }, (err: any) => {
            if (err) {
              console.log(id + " " + detail.name + ">>>更新失败");
              reject("-1");
            } else {
              console.log(id + " " + detail.name + ">>>更新成功");
              resolve();
            }
          });
        } else {
          console.log(id + " " + detail.name + ">>>无需更新");
          resolve();
        }
      });
    }).catch(error => {
      reject(error);
    });
  });
};

export default SaveDetail;
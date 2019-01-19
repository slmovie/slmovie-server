import HomeRec from "./homeRec";
import { Save } from "./homeSave";

export const startHomeSpider = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const homeRec = new HomeRec();
    homeRec.getRec().then(res => {
      console.log("Home hmtl get");
      Save(res).then(() => {
        console.log("All finish");
        resolve();
      });
    });
  });
};


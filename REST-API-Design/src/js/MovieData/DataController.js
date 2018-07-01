export class Controller {
  constructor(dataModules) {
    this.dataModules = dataModules;
    // console.log(this.dataModules.getNowPlayingURL('ko', 1));
    console.log(this.dataModules.getDetailURL(351286, 'ko'));
    
  }
}
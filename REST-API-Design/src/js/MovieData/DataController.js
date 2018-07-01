import {
  dataTemplate
} from './DataTemplate.js'

export class Controller {
  constructor(dataURL, dataModel) {
    this.dataURL = dataURL;
    this.dataModel = dataModel;
    this.loadMovieData();
  }

  loadMovieData() {
    this.dataModel.loadData(this.dataURL.getNowPlayingURL('ko', 1), this.getMovieData.bind(this));
  }

  getMovieData(data) {
    let id = data.results.map(elem => elem.id);
    id.forEach(elem => this.dataModel.loadData(this.dataURL.getTrailerURL(elem), this.getVideoData.bind(this)));
  }

  getVideoData(data) {
    if (data.results.length) {
     console.log(`https://www.youtube.com/watch?v=${data.results[0].key}`);      
    }
  }
}
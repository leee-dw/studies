import {Controller} from './MovieData/DataController.js'
import {MovieData} from './MovieData/DataURL.js'
import {Model} from './MovieData/DataModel.js'

const dataURL = new MovieData();
const dataModel = new Model();
const dataController = new Controller(dataURL, dataModel);
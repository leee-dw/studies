import {Controller} from './MovieData/DataController.js'
import {MovieData} from './MovieData/DataModules.js'

const dataModules = new MovieData();
const dataController = new Controller(dataModules);

console.log(dataController);

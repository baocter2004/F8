// for file 2 : 2_modules.js
import { TYPE_LOG, TYPE_WARN, TYPE_ERROR } from '../constants.js';

function logger(log, type = TYPE_LOG) {
    console[type](log);
}

export default logger;
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";

import logger from "./logger";

const middlewares = [
    thunk,
    logger
];

export default applyMiddleware(...middlewares);
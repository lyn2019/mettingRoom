import { createStore, combineReducers } from "redux";
import {calculate} from "./reducers/calculate";

const rootReducers = combineReducers({calculate});
// 全局就管理一个store
export const store:any = createStore(rootReducers);

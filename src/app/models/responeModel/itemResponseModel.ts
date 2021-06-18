import { baseResponseModel } from "./baseResponeModel";

export interface itemResponseModel<T> extends baseResponseModel {
    data:T

}
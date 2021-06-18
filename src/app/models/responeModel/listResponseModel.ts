import { baseResponseModel } from "./baseResponeModel";

export interface ListResponseModel<T> extends baseResponseModel {
    data:T[];
}

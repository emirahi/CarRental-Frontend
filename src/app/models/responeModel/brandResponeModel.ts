import { Brand } from "../Entity/brand";
import { baseResponseModel } from "./baseResponeModel";

export interface brandResonseModel extends baseResponseModel {
    data:Brand[];
}
import { Car } from "../Entity/car";
import { baseResponseModel } from "./baseResponeModel";

export interface carResponseModel extends baseResponseModel {
    data:Car[]
}
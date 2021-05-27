import { Rental } from "../Entity/rental";
import { baseResponseModel } from "./baseResponeModel";

export interface rentalResponeModel extends baseResponseModel {
    data:Rental[];
}
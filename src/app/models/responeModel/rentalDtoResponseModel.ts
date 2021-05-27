import { RentalDto } from "../Dto/rentadto";
import { baseResponseModel } from "./baseResponeModel";

export interface rentalDtoResponeModel extends baseResponseModel {
    data:RentalDto[]
}
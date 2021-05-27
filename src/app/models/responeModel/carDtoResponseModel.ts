import { CarDto } from "../Dto/cardto";
import { baseResponseModel } from "./baseResponeModel";

export interface CarDtoResponseModel extends baseResponseModel {
    data:CarDto[];
}

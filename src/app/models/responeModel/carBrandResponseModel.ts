import { CarbyBrandDto } from "../Dto/carbybranddto";
import { baseResponseModel } from "./baseResponeModel";

export interface CarBrandResponseModel extends baseResponseModel {
    data:CarbyBrandDto[];
}

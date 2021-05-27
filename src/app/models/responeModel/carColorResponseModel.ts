import { CarbyColorDto } from "../Dto/carbycolordto";
import { baseResponseModel } from "./baseResponeModel";

export interface CarColorResponseModel extends baseResponseModel {
    data:CarbyColorDto[];
}

import {IsNotEmpty, IsString, Length} from "class-validator";

export class CreateBoardRequest{

    @IsNotEmpty()
    @IsString({message:"Title should be a string"})
    @Length(3,30)
    title:string

}
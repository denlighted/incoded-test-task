import api from "../axios.ts";
import type {Card} from "../cards/cards.api.ts";

export interface CreateBoardDto{
    title:string
}

export interface EditBoardDto extends CreateBoardDto{}

export interface Board {
    id:string
    publicId:string
    title:string
    cards:Card[]
}

export async function getAllBoardCards(publicId:string): Promise<Board> {
    const response = await api.get(`/boards/${publicId}`)
    return response.data;
}

export async function createBoard(data:CreateBoardDto): Promise<Board> {
    const response = await api.post("/boards",data);
    return response.data;
}

export async function editBoard(publicId:string,data:EditBoardDto):Promise<Board> {
    const response = await api.patch(`/boards/${publicId}`,data);
    return response.data;
}

export async function deleteBoard(publicId:string):Promise<boolean> {
    await api.delete(`/boards/${publicId}`);
    return true;
}


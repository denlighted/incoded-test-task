import api from "../axios.ts";

export interface CreateCardDto{
    boardId:string,
    title:string
    description?:string
    column:'TODO' | 'IN_PROGRESS' | 'DONE';
}

export interface UpdateCardDto{
    title?:string
    description?:string
}

export interface MoveCardRequest{
    column:'TODO' | 'IN_PROGRESS' | 'DONE';
    position:number
}

export interface Card{
    id:string
    title:string
    description?:string
    boardId:string
    column:'TODO' | 'IN_PROGRESS' | 'DONE';
    position:number

}

export async function createCard(data:CreateCardDto):Promise<Card>{
    const response =  await api.post('/cards', data);
    return response.data;
}

export async function updateCard(id:string,data:UpdateCardDto):Promise<Card>{
    const response = await api.patch(`/cards/${id}`,data);
    return response.data;
}

export async function deleteCard(id:string):Promise<boolean>{
    await api.delete(`/cards/${id}`);
    return true
}

export async function moveCard(id:string, data:MoveCardRequest):Promise<Card>{
    const response = await api.patch(`/cards/move/${id}`,data);
    return response.data
}





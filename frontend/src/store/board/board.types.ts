import type {Card} from "../../api/cards/cards.api.ts";

export interface BoardState{
    cards:Card[]
    isLoading:boolean
}
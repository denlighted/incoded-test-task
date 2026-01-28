import {createAsyncThunk} from "@reduxjs/toolkit";
import {getAllBoardCards} from "../../api/boards/boards.api.ts";
import {
    createCard,
    deleteCard,
    moveCard,
    type MoveCardRequest,
    updateCard,
    type UpdateCardDto
} from "../../api/cards/cards.api.ts";

export const fetchBoardData = createAsyncThunk("board/fetchData",
    async (publicId: string) => {
        const response = await getAllBoardCards(publicId);

        return response.cards || [];
    }
);

export const deleteCardThunk = createAsyncThunk("board/deleteCard",
    async (cardId: string) => {
        await deleteCard(cardId)
        return cardId
    }
);

export const createCardThunk = createAsyncThunk("board/createCard",
    async (data: { title: string; description?: string; column: "TODO"|"IN_PROGRESS"|"DONE"; boardId: string }) => {
        const newCard = await createCard({...data});
        return newCard;
    }
);

export const moveCardThunk = createAsyncThunk("board/moveCard",
    async ({cardId, data}: { cardId: string; data: MoveCardRequest }) => {
        const response = await moveCard(cardId, data);
        return response;
    }
);

export const editCardThunk = createAsyncThunk("board/editCatd",
    async ({cardId, data}: { cardId: string, data: UpdateCardDto }) => {
        const response = await updateCard(cardId, data);
        return response
    }
)
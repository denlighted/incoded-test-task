import type {BoardState} from "./board.types.ts";
import {createSlice} from "@reduxjs/toolkit";
import {createCardThunk, deleteCardThunk, editCardThunk, fetchBoardData, moveCardThunk} from "./board.thunks.ts";

const initialState: BoardState = {
    cards:[],
    isLoading: false,
}

export const boardState = createSlice({
    name: "board",
    initialState,
    reducers: {
        moveCardOpt: (state, action) => {
            const { cardId, newColumn, newPosition } = action.payload;
            const movedCard = state.cards.find(c => c.id === cardId);
            if (movedCard){
                movedCard.column = newColumn;

                const targetColumnCards = state.cards
                    .filter(c => c.column === newColumn && c.id !== cardId)
                    .sort((a, b) => a.position - b.position);

                targetColumnCards.splice(newPosition, 0, movedCard);

                targetColumnCards.forEach((card, index) => {
                    card.position = index;
                });
            }
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(fetchBoardData.pending,(state)=>{
                state.isLoading=true;
            })
            .addCase(fetchBoardData.fulfilled,(state,action)=>{
                state.isLoading=false
                state.cards = action.payload
            })
            .addCase(fetchBoardData.rejected,(state)=>{
                state.isLoading=false
            })

            .addCase(deleteCardThunk.fulfilled,(state,action)=>{
                state.cards = state.cards.filter(card => card.id !== action.payload)
            })

            .addCase(createCardThunk.fulfilled,(state,action)=>{
                state.cards.push(action.payload);
            })

            .addCase(moveCardThunk.fulfilled,(state,action)=>{
                const index = state.cards.findIndex(c => c.id === action.payload.id);
                if (index !== -1) {
                    state.cards[index] = action.payload;
                }
            })

            .addCase(editCardThunk.fulfilled,(state,action)=>{
                const index = state.cards.findIndex(c => c.id === action.payload.id);
                if(index!==-1){
                    state.cards[index] = action.payload;
                }
            })
    }
})

export const { moveCardOpt } = boardState.actions;
export default boardState.reducer;
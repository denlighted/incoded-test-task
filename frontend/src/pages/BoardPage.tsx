import {useParams} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../store/hooks.ts";
import {useEffect} from "react";
import {fetchBoardData, moveCardThunk} from "../store/board/board.thunks.ts";
import BoardColumn from "../components/Board/BoardColumn.tsx";
import {DragDropContext, type DropResult} from "@hello-pangea/dnd";
import {moveCardOpt} from "../store/board/board.slice.ts";
import type {Card} from "../api/cards/cards.api.ts";
import cl from './BoardPage.module.css'


export function BoardPage() {
    const {publicId} = useParams();
    const dispatch = useAppDispatch();

    const {cards, isLoading} = useAppSelector((state) => state.board)

    const sortByPosition = (a: Card, b: Card) => a.position - b.position;

    useEffect(() => {
        if (publicId) {
            dispatch(fetchBoardData(publicId));
        }
    }, [publicId, dispatch])


    const onDragEnd = (result: DropResult) => {
        const {destination, source, draggableId} = result;

        if (!destination) return;

        if (destination.droppableId === source.droppableId && destination.index === source.index){
            return;
        }

        dispatch(moveCardOpt({cardId: draggableId, newColumn: destination.droppableId, newPosition: destination.index}));

        dispatch(moveCardThunk({
            cardId: draggableId, data:
                {
                    column: destination.droppableId as 'TODO' | 'IN_PROGRESS' | 'DONE',
                    position: destination.index

                }
        }));
    };

    if (isLoading) {
        return <div style={{padding: 20}}>
            Loading data...
        </div>
    }

    const safeCards = cards || [];

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className={cl.board}>

                <div style={{display: "flex", gap: "20px", alignItems: "flex-start", overflowX: "auto"}}>
                    <BoardColumn
                        title="To Do"
                        column="TODO"
                        cards={safeCards.filter(c => c.column === 'TODO').sort(sortByPosition)}
                    />
                    <BoardColumn
                        title="In Progress"
                        column="IN_PROGRESS"
                        cards={safeCards.filter(c => c.column === 'IN_PROGRESS').sort(sortByPosition)}
                    />
                    <BoardColumn
                        title="Done"
                        column="DONE"
                        cards={safeCards.filter(c => c.column === 'DONE').sort(sortByPosition)}
                    />
                </div>
            </div>
        </DragDropContext>
    );
}
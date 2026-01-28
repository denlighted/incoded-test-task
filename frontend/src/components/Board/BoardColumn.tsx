import type {Card} from "../../api/cards/cards.api.ts";
import TaskCard from "../Card/TaskCard.tsx";
import cl from './Board.module.css'
import {CreateCardForm} from "./CreateCardForm.tsx";
import {Droppable} from "@hello-pangea/dnd";

interface BoardColumnProps{
    title:string;
    column:"TODO"|"IN_PROGRESS"|"DONE";
    cards:Card[];
}

const BoardColumn = ({title,cards,column}:BoardColumnProps) => {
    return (
        <div className={cl.column}>
            <div className={cl.columnHeader}>
                <h2 className={cl.columnTitle}>{title}</h2>
                <span className={cl.count}>{cards.length}</span>
            </div>

            <Droppable droppableId={column}>
                {(provided) => (
                    <div
                        className={cl.columnContent}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{ minHeight: "100px" }}
                    >
                        {cards.map((card, index) => (
                            <TaskCard
                                key={card.id}
                                card={card}
                                index={index}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            <CreateCardForm columnId={column} />
        </div>
    );
}
export default BoardColumn;
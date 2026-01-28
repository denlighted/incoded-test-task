import type {Card} from "../../api/cards/cards.api.ts";
import {useAppDispatch} from "../../store/hooks.ts";
import cl from "./Card.module.css"
import {Check, Pencil, Trash2, X} from "lucide-react";
import {deleteCardThunk, editCardThunk} from "../../store/board/board.thunks.ts";
import {Draggable} from "@hello-pangea/dnd";
import {useState} from "react";


interface TaskProps {
    card: Card
    index: number
}

function TaskCard({card, index}: TaskProps) {
    const dispatch = useAppDispatch();

    const [isEditing,setIsEditing] = useState(false)
    const [editTitle, setEditTitle] = useState(card.title);
    const [editDescription, setEditDescription] = useState(card.description || "");

    const handleDeleteClick = () => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            dispatch(deleteCardThunk(card.id));
        }
    };

    const handleSave = async () => {
        if (!editTitle.trim()) return;

        await dispatch(editCardThunk({
            cardId: card.id,
            data: {
                title: editTitle,
                description: editDescription
            }
        }));

        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditTitle(card.title);
        setEditDescription(card.description || "");
        setIsEditing(false);
    };

    return (
        <Draggable draggableId={card.id} index={index}>
            {(provided,snapshot) => (
                <div
                    className={cl.card}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                        marginBottom: "8px",
                        padding: "10px",
                        background: "white",
                        borderRadius: "8px",
                        boxShadow: snapshot.isDragging
                            ? "0 10px 20px rgba(0,0,0,0.2)"
                            : "0 1px 3px rgba(0,0,0,0.12)",


                        ...provided.draggableProps.style,

                        zIndex: snapshot.isDragging ? 1000 : "auto",
                    }}
                >
                    {isEditing ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <input
                                autoFocus
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                style={{
                                    fontWeight: 'bold',
                                    padding: '4px',
                                    borderRadius: '4px',
                                    border: '2px solid #0079bf'
                                }}
                            />
                            <textarea
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                                placeholder="Описание..."
                                style={{
                                    padding: '4px',
                                    borderRadius: '4px',
                                    border: '1px solid #dfe1e6',
                                    minHeight: '60px',
                                    resize: 'vertical',
                                    fontFamily: 'inherit'
                                }}
                            />
                            <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                                <button
                                    onClick={handleSave}
                                    style={{ background: '#0079bf', color: 'white', border: 'none', borderRadius: '4px', padding: '4px 8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
                                >
                                    <Check size={14} /> Save
                                </button>
                                <button
                                    onClick={handleCancel}
                                    style={{ background: '#e2e4e7', color: '#333', border: 'none', borderRadius: '4px', padding: '4px 8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
                                >
                                    <X size={14} /> Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div style={{ paddingRight: "20px" }}>
                                <h3 className={cl.cardTitle} style={{ margin: "0 0 5px 0" }}>{card.title}</h3>
                                {card.description && (
                                    <p style={{ fontSize: "14px", color: "#666", margin: 0, whiteSpace: "pre-wrap" }}>
                                        {card.description}
                                    </p>
                                )}
                            </div>
                            <div style={{
                                top: "8px",
                                right: "8px",
                                display: "flex",
                                gap: "4px"
                            }}>
                                <button
                                    onClick={() => setIsEditing(true)}
                                    style={{ border: "none", background: "transparent", cursor: "pointer", color: "#6b778c", padding: 2 }}
                                    title="Редактировать"
                                >
                                    <Pencil size={16} />
                                </button>
                                <button
                                    onClick={handleDeleteClick}
                                    style={{ border: "none", background: "transparent", cursor: "pointer", color: "#6b778c", padding: 2 }}
                                    title="Удалить"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </>
                    )}
                </div>
            )}
        </Draggable>
    );
}

export default TaskCard;
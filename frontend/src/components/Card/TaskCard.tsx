import type { Card } from '../../api/cards/cards.api.ts';
import { useAppDispatch } from '../../store/hooks.ts';
import cl from './Card.module.css';
import { Check, Pencil, Trash2, X } from 'lucide-react';
import { deleteCardThunk, editCardThunk } from '../../store/board/board.thunks.ts';
import { Draggable } from '@hello-pangea/dnd';
import { useState } from 'react';

interface TaskProps {
  card: Card;
  index: number;
}

function TaskCard({ card, index }: TaskProps) {
  const dispatch = useAppDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(card.title);
  const [editDescription, setEditDescription] = useState(card.description || '');

  const handleDeleteClick = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteCardThunk(card.id));
    }
  };

  const handleSave = async () => {
    if (!editTitle.trim()) return;

    await dispatch(
      editCardThunk({
        cardId: card.id,
        data: {
          title: editTitle,
          description: editDescription
        }
      })
    );

    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(card.title);
    setEditDescription(card.description || '');
    setIsEditing(false);
  };
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`${cl.card} ${snapshot.isDragging ? cl.isDragging : ''}`}
          style={provided.draggableProps.style}
        >
          {isEditing ? (
            <div className={cl.editModeWrapper}>
              <input
                autoFocus
                className={cl.editInput}
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <textarea
                className={cl.editTextarea}
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Описание..."
              />
              <div className={cl.editButtons}>
                <button onClick={handleSave} className={`${cl.btn} ${cl.saveBtn}`}>
                  <Check size={14} /> Save
                </button>
                <button onClick={handleCancel} className={`${cl.btn} ${cl.cancelBtn}`}>
                  <X size={14} /> Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className={cl.viewContent}>
                <h3 className={cl.cardTitle}>{card.title}</h3>
                {card.description && <p className={cl.cardDescription}>{card.description}</p>}
              </div>

              <div className={cl.actionsWrapper}>
                <button onClick={() => setIsEditing(true)} className={cl.actionBtn} title="Edit">
                  <Pencil size={16} />
                </button>
                <button onClick={handleDeleteClick} className={cl.actionBtn} title="Delete">
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

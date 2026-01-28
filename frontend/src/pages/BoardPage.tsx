import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  deleteBoardThunk,
  fetchBoardData,
  moveCardThunk,
  updateBoardThunk
} from '../store/board/board.thunks.ts';
import BoardColumn from '../components/Board/BoardColumn.tsx';
import { DragDropContext, type DropResult } from '@hello-pangea/dnd';
import { moveCardOpt } from '../store/board/board.slice.ts';
import type { Card } from '../api/cards/cards.api.ts';
import cl from './BoardPage.module.css';
import { useAppDispatch, useAppSelector } from '../store/hooks.ts';
import { Trash2, Check, X, Edit2 } from 'lucide-react';

export function BoardPage() {
  const { publicId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { cards, isLoading, title } = useAppSelector((state) => state.board);

  const sortByPosition = (a: Card, b: Card) => a.position - b.position;

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editTitle, setEditTitle] = useState('');

  useEffect(() => {
    if (publicId) {
      dispatch(fetchBoardData(publicId));
    }
  }, [publicId, dispatch]);

  useEffect(() => {
    setEditTitle((title ?? '') as string);
  }, [title]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    dispatch(
      moveCardOpt({
        cardId: draggableId,
        newColumn: destination.droppableId,
        newPosition: destination.index
      })
    );

    dispatch(
      moveCardThunk({
        cardId: draggableId,
        data: {
          column: destination.droppableId as 'TODO' | 'IN_PROGRESS' | 'DONE',
          position: destination.index
        }
      })
    );
  };

  const handleSaveTitle = () => {
    if (!editTitle.trim() || !publicId) return;
    dispatch(updateBoardThunk({ publicId: publicId, data: { title: editTitle } }));
    setIsEditingTitle(false);
  };

  const handleDeleteBoard = async () => {
    if (window.confirm(`Are you sure to delete this board "${title}"?`)) {
      if (publicId) {
        await dispatch(deleteBoardThunk({ publicId }));
        navigate('/');
      }
    }
  };

  if (isLoading) {
    return <div style={{ padding: 20 }}>Loading data...</div>;
  }

  const safeCards = cards || [];
  return (
    <div className={cl.pageContainer}>
      <div className={cl.header}>
        {isEditingTitle ? (
          <div className={cl.headerLeft}>
            <input
              className={cl.titleInput}
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              autoFocus
            />
            <button onClick={handleSaveTitle} className={`${cl.iconButton} ${cl.saveBtn}`}>
              <Check size={20} />
            </button>
            <button
              onClick={() => {
                setIsEditingTitle(false);
                setEditTitle((title ?? '') as string);
              }}
              className={`${cl.iconButton} ${cl.cancelBtn}`}
            >
              <X size={20} />
            </button>
          </div>
        ) : (
          <div className={cl.headerLeft}>
            <h1 className={cl.boardTitle}>{title || 'Board Title'}</h1>
            <button
              onClick={() => setIsEditingTitle(true)}
              title="Rename Board"
              className={`${cl.iconButton} ${cl.editBtn}`}
            >
              <Edit2 size={18} />
            </button>
          </div>
        )}

        <button onClick={handleDeleteBoard} className={cl.deleteButton}>
          <Trash2 size={16} />
          Delete Board
        </button>
      </div>
      <div className={cl.boardCanvas}>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className={cl.columnsContainer}>
            <BoardColumn
              title="To Do"
              column="TODO"
              cards={safeCards
                .filter((c: { column: string }) => c.column === 'TODO')
                .sort(sortByPosition)}
            />
            <BoardColumn
              title="In Progress"
              column="IN_PROGRESS"
              cards={safeCards
                .filter((c: { column: string }) => c.column === 'IN_PROGRESS')
                .sort(sortByPosition)}
            />
            <BoardColumn
              title="Done"
              column="DONE"
              cards={safeCards
                .filter((c: { column: string }) => c.column === 'DONE')
                .sort(sortByPosition)}
            />
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}

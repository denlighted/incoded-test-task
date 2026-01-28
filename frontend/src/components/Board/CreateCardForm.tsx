import React, { useState } from 'react';

import { useParams } from 'react-router-dom';
import { createCardThunk } from '../../store/board/board.thunks.ts';
import { Plus, X } from 'lucide-react';
import cl from './Board.module.css';
import clForm from './CreationForm.module.css';
import { useAppDispatch } from '../../store/hooks.ts';

interface CreateCardFormProps {
  columnId: 'TODO' | 'IN_PROGRESS' | 'DONE';
}

export function CreateCardForm({ columnId }: CreateCardFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const dispatch = useAppDispatch();
  const { publicId } = useParams();

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    if (!title.trim() || !publicId) return;

    await dispatch(
      createCardThunk({
        title,
        description,
        column: columnId,
        boardId: publicId
      })
    );
    setTitle('');
    setIsEditing(false);
    setDescription('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void handleSubmit();
    }
    if (e.key === 'Escape') {
      setIsEditing(false);
    }
  };
  if (isEditing) {
    return (
      <form
        onSubmit={handleSubmit}
        style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: '8px' }}
      >
        <input
          className={clForm.inputTitle}
          autoFocus
          placeholder="What to do?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <textarea
          className={clForm.inputDesc}
          placeholder="Description (not necessary)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div style={{ display: 'flex', gap: 5, marginTop: 5 }}>
          <button className={clForm.addBtn} type="submit">
            Add
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
          >
            <X size={24} color="#6b778c" />
          </button>
        </div>
      </form>
    );
  }
  return (
    <button className={cl.addCard} type="button" onClick={() => setIsEditing(true)}>
      <Plus size={20} style={{ marginRight: 5 }} />
      Add a card
    </button>
  );
}

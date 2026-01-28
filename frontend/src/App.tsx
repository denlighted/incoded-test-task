import { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { BoardPage } from './pages/BoardPage';
import { createBoard } from './api/boards/boards.api';
import {Header} from "./components/Header/Header.tsx";
import cl from "./styles/App.module.css";


function HomePage() {
    const [title, setTitle] = useState('');
    const navigate = useNavigate();

    const handleCreate = async () => {
        if (!title.trim()) return;
        try {
            const newBoard = await createBoard({ title });
            navigate(`/board/${newBoard.publicId}`);
        } catch (e) {
            console.error(e);
            alert('Board creation error');
        }
    };

    return (
        <div className={cl.homeContainer}>
            <div className={cl.title}>
                <input
                    className={cl.input}
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Project name..."

                />
                <button className={cl.button} onClick={handleCreate}>
                    Create
                </button>
            </div>
        </div>
    );
}

function App() {
    return (

        <BrowserRouter>
            <Header/>
            <Routes>

                <Route path="/" element={<HomePage />} />
                <Route path="/board/:publicId" element={<BoardPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
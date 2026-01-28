import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import styles from './Header.module.css';

export const Header = () => {
  const [searchId, setSearchId] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchId.trim()) return;

    navigate(`/board/${searchId.trim()}`);

    setSearchId('');
  };

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}></Link>

      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Find board by id..."
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <Search size={16} className={styles.searchIcon} />
      </form>
    </header>
  );
};

import React, { useEffect, useState } from 'react';

function SearchPost() {
  const [searchTerm, setSearchTerm] = useState('');
  const [search, setSearch] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      fetch(`http://localhost:3000/posts?searchTerm=${searchTerm}`)
        .then((res) => res.json())
        .then((data) => setSearch(data));
    } else {
      setSearch([]);
    }
  }, [searchTerm]);

  function handleSubmit(e) {
    e.preventDefault();
    setSearchTerm(e.target.value);
  }

  return (
    <div>
      <input type="text" value={searchTerm} onChange={handleSubmit} />
      <button type="submit">Search</button>
      {search.map((t) => (
        <div key={t.id}>
          <p>{t.title}</p>
          <p>{t.content}</p>
          <img src={t.image} alt="not found" />
        </div>
      ))}
    </div>
  );
}

export default SearchPost;

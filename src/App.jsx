import React from 'react';
import { Route, Routes } from 'react-router-dom';
import List from './components/List';
import Edit from './components/Edit';
import Create from './components/Create';

function App() {
  return (
    <Routes>
      <Route path="/" element={<List />} />
      <Route path="/edit/:id" element={<Edit />} />
      <Route path="/create" element={<Create />} />
    </Routes>
  );
}

export default App;
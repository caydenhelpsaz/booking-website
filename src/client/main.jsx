import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Index from './pages/Index';
import IkeaAssembly from './pages/IkeaAssembly';
import BookMe from './pages/BookMe';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms'

const root = document.getElementById('root');

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Index />} />
      <Route path='/ikea-assembly' element={<IkeaAssembly />} /> 
      <Route path='/book-me' element={<BookMe />} />
      <Route path='/privacy' element={<Privacy />} />
      <Route path='/terms' element={<Terms />} />
    </Routes>
  </BrowserRouter>
);

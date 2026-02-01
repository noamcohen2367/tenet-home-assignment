import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AlertsList from './pages/AlertsList';
import AlertDetails from './pages/AlertDetails';
import Home from './pages/Home';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/alerts" element={<AlertsList />} />
        <Route path="/alerts/:id" element={<AlertDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

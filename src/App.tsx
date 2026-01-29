import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AlertsList from './pages/AlertsList';
import AlertDetails from './pages/AlertDetails';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/alerts" element={<AlertsList />} />
        <Route path="/alerts/:id" element={<AlertDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FilmsList from './FilmsList';
import FilmDetail from './FilmDetail';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FilmsList />} />
        <Route path="/film/:id" element={<FilmDetail />} />
      </Routes>
    </Router>
  );
}

export default App;


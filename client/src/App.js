import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import CreatePalette from './components/CreatePalette';

function App() {
 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-palette" element={<CreatePalette/>} />
      </Routes>
    </Router>
  );
}

export default App;
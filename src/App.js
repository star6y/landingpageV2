import { Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar'
import Home from './routes/Home'
import AboutMe from './routes/AboutMe'
import Projects from './routes/Projects'
import NotFound from './routes/NotFound'



import './App.css';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutme" element={<AboutMe />} />
        <Route path="/projects" element={<Projects  />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

import { Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar'
import Home from './routes/Home'
import AboutMe from './routes/AboutMe'
import Projects from './routes/Projects'
import NotFound from './routes/NotFound'
import Sandbox from './routes/Sandbox'

import './App.css';


function App() {
  const location = useLocation();

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home key={location.key}/>} />
        <Route path="/aboutme" element={<AboutMe />} />
        <Route path="/projects" element={<Projects  />} />
        <Route path="/sandbox" element={<Sandbox  key={location.key}/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

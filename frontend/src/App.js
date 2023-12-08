import './App.css';
import './components/style.css'
import HomePage from './components/home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MusicPage from '../src/components/music';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/result" element={<MusicPage />} />
      </Routes>
    </Router>
    // <div className="App">
    //   <header className="App-header">
    //     <h1>Emotion music reccomendation</h1>
    //     <pre><div className="line"></div></pre>
    //     <HomePage />
    //   </header>
    //   { }
    // </div>
  );
}

export default App;

import Nav from './components/nav';
import './App.css';
import UploadFile from './components/uploadFile';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/main';


function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Routes>
          <Route path="/" element={<UploadFile />} />
          <Route path="/Main" element={<Main />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

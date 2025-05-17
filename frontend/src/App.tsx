import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login'; 
import Cadastrar from "./pages/cadastrar";


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastrar" element={<Cadastrar />} />
        </Routes>
    </div>
  );
}

export default App;

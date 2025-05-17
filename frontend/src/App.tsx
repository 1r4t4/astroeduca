import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Cadastrar from './pages/cadastrar';
import MeusConteudos from "./pages/meusConteudos";


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastrar" element={<Cadastrar />} />
        <Route path="/meus-conteudos" element={<MeusConteudos />} />
        </Routes>
    </div>
  );
}

export default App;

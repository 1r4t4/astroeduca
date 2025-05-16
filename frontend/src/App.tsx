import { Routes, Route } from 'react-router-dom';
import Home from './pages/home'; // Ajuste o caminho conforme necessário
import Login from './pages/login'; // Sua página de login
import Header from "./components/Header";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        </Routes>
    </div>
  );
}

export default App;

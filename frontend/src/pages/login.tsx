import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Importando o Link para navegação

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("professor");

  // Função de login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await axios.post("http://localhost:8000/auth/login", {
        username: email,
        password,
      });

      if (response.status === 200) {
        // Armazenar o token no localStorage ou Cookie
        localStorage.setItem("token", response.data.access_token);
        // Navegar para a página principal ou mudar o estado de login
        console.log("Login realizado com sucesso!");
      }
    } catch (err) {
      setError("Credenciais inválidas");
    }
  };

  // Função de registro
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await axios.post("http://localhost:8000/auth/register", {
        email,
        name,
        role,
        password,
      });

      if (response.status === 201) {
        setIsRegistering(false); // Retorna ao formulário de login
        console.log("Conta criada com sucesso!");
      }
    } catch (err) {
      setError("Erro ao criar a conta");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-blue-50">
      {/* Topo com o nome AstroEduca */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 text-4xl font-extrabold text-blue-700">
        <Link to="/" className="flex items-center gap-2">
          <span>🌌</span> AstroEduca
        </Link>
      </div>

      {/* Caixa de login */}
      <div className="w-full max-w-sm bg-white p-8 rounded shadow-lg mt-20">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isRegistering ? "Criar Conta" : "Login"}
        </h2>

        {error && <p className="text-red-600 text-sm text-center mb-4">{error}</p>}

        {isRegistering ? (
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-blue-900">Nome</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-blue-900">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="role" className="block text-sm font-medium text-blue-900">Papel</label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-3 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="professor">Professor</option>
                <option value="aluno">Aluno</option>
              </select>
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-blue-900">Senha</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button type="submit" className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition">Criar Conta</button>
          </form>
        ) : (
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-blue-900">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-blue-900">Senha</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button type="submit" className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition">Entrar</button>
          </form>
        )}

        <div className="mt-4 flex justify-between text-sm text-blue-600">
          <button onClick={() => setIsRegistering(!isRegistering)}>{isRegistering ? "Já tem uma conta? Faça login" : "Criar Conta"}</button>
          <button className="hover:underline">Esqueci minha senha</button>
        </div>
      </div>
    </div>
  );
};

export default Login;

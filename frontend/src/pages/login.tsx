import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../contexts/AuthContext"; // ajuste o caminho se necessário



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("professor");
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [successMessage, setSuccessMessage] = useState("");




  // Função de login
const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const formData = new URLSearchParams();
    formData.append("grant_type", "password"); // necessário para satisfazer o OAuth2PasswordRequestForm
    formData.append("username", email);
    formData.append("password", password);
    formData.append("scope", "");
    formData.append("client_id", "string");
    formData.append("client_secret", "string");

    const response = await api.post("/auth/login", formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (response.status === 200) {
      const token = response.data.access_token;
      localStorage.setItem("token", token);
      console.log("Login realizado com sucesso!");
      // Atualiza o usuário no contexto imediatamente
      const decoded: any = jwtDecode(token);
      setUser({ email: decoded.sub, role: decoded.role });
      navigate("/");
    }
  } catch (err) {
    setError("Credenciais inválidas");
    console.error("Erro ao logar:", err);
  }
};

  // Função de registro
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await api.post("/auth/register", {
        email,
        name,
        role,
        password,
      });
      alert("Conteúdo cadastrado com sucesso!");
      navigate("/login");
  
      if (response.status === 201) {
        setIsRegistering(false);
        console.log("Login realizado com sucesso!");
      }
    } catch (err) {
      setError("Erro ao criar a conta");
    }
  };  

  return (
    <div className="flex items-center justify-center h-screen bg-blue-50">
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 text-4xl font-extrabold text-blue-700">
        <Link to="/" className="flex items-center gap-2">
          <span>🌌</span> AstroEduca
        </Link>
      </div>

      <div className="w-full max-w-sm bg-white p-8 rounded shadow-lg mt-20">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isRegistering ? "Criar Conta" : "Login"}
        </h2>

        {error && <p className="text-red-600 text-sm text-center mb-4">{error}</p>}

        {successMessage && (
          <div className="success-modal">
            {successMessage}
            <button onClick={() => setSuccessMessage("")}>Fechar</button>
          </div>
        )}

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
            <button type="submit" className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition cursor-pointer">Criar Conta</button>
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
            <button type="submit" className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition cursor-pointer">Entrar</button>
          </form>
        )}

        <div className="mt-4 flex justify-between text-sm text-blue-600 cursor-pointer">
          <button className="hover:underline cursor-pointer" onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? "Já tem uma conta? Faça login" : "Criar Conta"}
          </button>
          <button className="hover:underline cursor-pointer">Esqueci minha senha</button>
        </div>
      </div>
    </div>
  );
};

export default Login;

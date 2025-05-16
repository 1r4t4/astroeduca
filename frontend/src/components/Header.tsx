import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">AstroEduca</h1>
      {user && (
        <div className="flex items-center gap-4">
          <span>Olá, {user.email}</span>
          <button
            onClick={logout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Sair
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;

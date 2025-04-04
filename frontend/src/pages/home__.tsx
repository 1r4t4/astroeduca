import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

function Home() {
  return (
    <div className="flex h-screen">
      {/* Menu lateral fixo */}
      <aside className="w-64 bg-gray-800 text-white p-4 flex flex-col">
        <h2 className="text-xl font-bold mb-4">Menu</h2>
        <button className="text-left mb-2 hover:bg-gray-700 p-2 rounded">
          Provas
        </button>
        <button className="text-left mb-2 hover:bg-gray-700 p-2 rounded">
          Conteúdos
        </button>
        <button className="text-left hover:bg-gray-700 p-2 rounded">
          Vídeos
        </button>
      </aside>

      {/* Conteúdo principal */}
      <main className="flex-1 flex flex-col items-center justify-center p-8">
        <h1 className="text-3xl font-bold mb-6">Bem-vindo ao AstroEduca</h1>
        <Input placeholder="Pesquisar conteúdo..." className="w-96 mb-4" />
        <Button>Login</Button>
      </main>
    </div>
  );
}

export default Home;

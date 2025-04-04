import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Home() {
  const [openProvas, setOpenProvas] = useState(false);
  
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-lg font-semibold">AstroEduca</h2>
        <div className="mt-4">
          <button
            className="flex items-center justify-between w-full p-2 text-left hover:bg-gray-700 rounded"
            onClick={() => setOpenProvas(!openProvas)}
          >
            Provas {openProvas ? <ChevronUp /> : <ChevronDown />}
          </button>
          {openProvas && (
            <ul className="ml-4 mt-2">
              {[2020, 2021, 2022, 2023, 2024, 2025].map((year) => (
                <li key={year} className="p-1 hover:bg-gray-700 rounded">
                  {year}
                </li>
              ))}
            </ul>
          )}
          <button className="w-full p-2 text-left hover:bg-gray-700 rounded mt-2">
            Conteúdos
          </button>
          <button className="w-full p-2 text-left hover:bg-gray-700 rounded mt-2">
            Vídeos
          </button>
        </div>
      </aside>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="p-4 bg-gray-200 flex justify-between items-center">
          <Input placeholder="Pesquisar conteúdo..." className="w-1/2" />
          <Button>Login</Button>
        </header>
        
        {/* Main Area */}
        <main className="flex-1 p-4">
          <h1 className="text-2xl font-bold">Bem-vindo ao AstroEduca</h1>
          <p>Escolha uma opção no menu lateral para começar.</p>
        </main>
        
        {/* Footer */}
        <footer className="p-4 bg-gray-800 text-white text-center">
          Trabalho realizado na disciplina de Projeto Integrador da UNIVESP - 2025
        </footer>
      </div>
    </div>
  );
}

import { useState } from "react";
import { ChevronDown, ChevronUp, Book, FileText, Video, LogIn, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


export default function Home() {
  const [openProvas, setOpenProvas] = useState(false);

  return (
    <div className="flex h-screen bg-blue-50 text-blue-900">
      {/* Menu lateral */}
        <aside className="w-64 bg-blue-950 text-white p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-3xl font-extrabold mb-6 flex items-center gap-2">
            🌌 AstroEduca
          </h2>
            <button
            className="w-full text-left px-3 py-2 hover:bg-blue-800 rounded"
            onClick={() => setOpenProvas(!openProvas)}
            >
            Provas
            </button>

          <AnimatePresence>
            {openProvas && (
              <motion.ul
                className="ml-6 mt-2 text-sm text-blue-200"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {["2020", "2021", "2022", "2023", "2024", "2025"].map((ano) => (
                  <li key={ano} className="hover:underline cursor-pointer py-1">
                    {ano}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>

            <button className="w-full text-left px-3 py-2 hover:bg-blue-800 rounded mt-2">
            Exercícios
            </button>
            <button className="w-full text-left px-3 py-2 hover:bg-blue-800 rounded mt-2">
            Conteúdo de apoio
            </button>
            <button className="w-full text-left px-3 py-2 hover:bg-blue-800 rounded mt-2">
            Vídeos
            </button>
            <img
            src="https://tse3.mm.bing.net/th?id=OIP.RN60cwRazjAFmw7odSnKpQHaFN&pid=Api&P=0&h=180"
            alt="Universo estrelado"
            className="rounded-xl shadow-lg mt-6"
            />
        </div>

        <div className="mt-4">
            <footer className="text-xs text-blue-300 mt-4">
            Trabalho realizado na disciplina de Projeto Integrador da UNIVESP - 2025
            </footer>
        </div>
        </aside>

      {/* Conteúdo principal */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Barra superior */}
        <div className="flex justify-between items-center mb-8">
          <div className="relative w-1/2">
            <input
                type="text"
                placeholder="🔍 Buscar conteúdos..."
                className="border border-blue-300 bg-white rounded px-4 py-2 w-1/2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />            <Search className="absolute right-3 top-2.5 text-blue-500" size={18} />
          </div>
          <button className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition flex items-center gap-2">
            <LogIn size={18} /> Login
          </button>
        </div>

        {/* Conteúdo */}
        <div className="flex items-center gap-6">
          <div className="text-blue-900">
            <h1 className="text-6xl font-extrabold mb-4">🌠 Bem-vindo ao AstroEduca!</h1>
            <p className="text-xl text-blue-700">
              Aqui você encontrará provas, conteúdos e vídeos para aprofundar seus estudos em astronomia e ciências exatas.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

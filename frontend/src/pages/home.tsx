import { useEffect, useState } from "react";
import axios from "axios";
import {
  ChevronDown,
  ChevronUp,
  Book,
  FileText,
  Video,
  LogIn,
  Search,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Content = {
  id: number;
  title: string;
  file_url: string;
  type: string;
};

export default function Home() {
  const [openProvas, setOpenProvas] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [contents, setContents] = useState<Content[]>([]);

  const fetchContents = async (type: string) => {
    try {
      const res = await axios.get("http://localhost:8000/contents/");
      const filtered = res.data.filter((item: Content) => item.type === type);
      setContents(filtered);
      setSelectedType(type);
    } catch (err) {
      console.error("Erro ao buscar conteúdos:", err);
    }
  };

  return (
    <div className="flex h-screen bg-blue-50 text-blue-900">
      {/* Menu lateral */}
      <aside className="w-64 bg-blue-950 text-white p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-3xl font-extrabold mb-6 flex items-center gap-2">
            🌌 AstroEduca
          </h2>
          <button
            className="w-full text-left px-3 py-2 hover:bg-blue-800 rounded cursor-pointer"
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
                <li className="py-1 hover:underline">
                  <a href="http://www.oba.org.br/site/?p=conteudo&idcat=9&pag=conteudo&m=s" target="_blank" rel="noopener noreferrer">
                    OBA
                  </a>
                </li>
                <li className="py-1 hover:underline">
                  <a href="https://www.fuvest.br/acervo-vestibular" target="_blank" rel="noopener noreferrer">
                    Fuvest
                  </a>
                </li>
                <li className="py-1 hover:underline">
                  <a href="https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos" target="_blank" rel="noopener noreferrer">
                    ENEM
                  </a>
                </li>
              </motion.ul>
            )}
          </AnimatePresence>

          <button
            className="w-full text-left px-3 py-2 hover:bg-blue-800 rounded mt-2 cursor-pointer"
            onClick={() => fetchContents("exercise")}
          >
            Exercícios
          </button>
          <button
            className="w-full text-left px-3 py-2 hover:bg-blue-800 rounded mt-2 cursor-pointer"
            onClick={() => fetchContents("support")}
          >
            Conteúdo de apoio
          </button>
          <button
            className="w-full text-left px-3 py-2 hover:bg-blue-800 rounded mt-2 cursor-pointer"
            onClick={() => fetchContents("video")}
          >
            Vídeos
          </button>
          <img
            src="https://tse3.mm.bing.net/th?id=OIP.RN60cwRazjAFmw7odSnKpQHaFN&pid=Api&P=0&h=180"
            alt="Universo estrelado"
            className="rounded-xl shadow-lg mt-6"
          />
        </div>

        <footer className="text-xs text-blue-300 mt-4">
          Trabalho realizado na disciplina de Projeto Integrador da UNIVESP - 2025
        </footer>
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
            />
            <Search className="absolute right-3 top-2.5 text-blue-500" size={18} />
          </div>
          <button className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition flex items-center gap-2 cursor-pointer">
            <LogIn size={18} /> Login
          </button>
        </div>

        {/* Conteúdo carregado */}
        <div>
          {selectedType && (
            <h2 className="text-2xl font-bold mb-4 capitalize">
              {selectedType === "exercise"
                ? "Exercícios"
                : selectedType === "exam"
                ? "Provas"
                : selectedType === "support"
                ? "Conteúdos de Apoio"
                : "Vídeos"}
            </h2>
          )}

          {contents.length === 0 && selectedType ? (
            <p className="text-blue-600">Nenhum conteúdo disponível.</p>
          ) : (
            <ul className="space-y-2">
              {contents.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-800 hover:underline"
                  >
                    📘 {item.title}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}

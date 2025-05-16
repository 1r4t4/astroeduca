import { useEffect, useState } from "react";
import axios from "axios";
import {
  ChevronDown,
  ChevronUp,
  BookOpen,
  FileText,
  Video,
  Brain,
  LogIn,
  Search,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

type Content = {
  id: number;
  title: string;
  description: string;
  file_url: string;
  type: string;
  subject: string;
};

export default function Home() {
  const [isHomePage, setIsHomePage] = useState(true); // Estado para a "Home da Home"
  const [openProvas, setOpenProvas] = useState(false);
  const [openExercicios, setOpenExercicios] = useState(false);
  const [openSupport, setOpenSupport] = useState(false);
  const [openVideos, setOpenVideos] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [contents, setContents] = useState<Content[]>([]);
  const [searchTag, setSearchTag] = useState("");

    // Função para alternar entre a "Home da Home" e a home principal
  const handleLogoClick = () => {
    setIsHomePage(true);
  };

  // Função para voltar para o menu principal (ou Home normal)
  const goBackToHome = () => {
    setIsHomePage(false);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "exercise":
        return <FileText className="text-blue-700" />;
      case "video":
        return <Video className="text-red-600" />;
      case "support":
        return <Brain className="text-yellow-600" />;
      case "exam":
        return <BookOpen className="text-green-600" />;
      default:
        return <FileText />;
    }
  };

  // Busca apenas os subjects para o tipo selecionado
  const fetchSubjects = async (type: string) => {
    try {
      const res = await axios.get("http://localhost:8000/contents/");
      const filtered = res.data.filter((item: Content) => item.type === type);
      const uniqueSubjects = [...new Set(filtered.map((item) => item.subject))];
      setSubjects(uniqueSubjects);
      setSelectedType(type);
      setSelectedSubject(null);
      setContents([]);
    } catch (err) {
      console.error("Erro ao buscar subjects:", err);
    }
  };

  // Busca o conteúdo filtrado por tipo e subject
  const fetchContentsBySubject = async (subject: string) => {
    try {
      if (!selectedType) return;
      const res = await axios.get("http://localhost:8000/contents/");
      const filtered = res.data.filter(
        (item: Content) => item.type === selectedType && item.subject === subject
      );
      setContents(filtered);
      setSelectedSubject(subject);
      setIsHomePage(false); // Sai da home inicial
    } catch (err) {
      console.error("Erro ao buscar conteúdos por subject:", err);
    }
  };


  // ... busca por tags permanece igual
  const fetchContentsByTag = async (tag: string) => {
    try {
      const res = await axios.get("http://localhost:8000/contents/");
      const filtered = res.data.filter((item: any) =>
        item.tags.includes(tag.toLowerCase())
      );
      setContents(filtered);
      setSelectedType(null);
      setSelectedSubject(null);
      setOpenExercicios(false);
      setOpenSupport(false);
      setOpenVideos(false);
      setIsHomePage(false); // Sai da home inicial
    } catch (err) {
      console.error("Erro ao buscar conteúdos por tag:", err);
    }
  };


  return (
    <div className="flex h-screen bg-blue-50 text-blue-900">

      {/* Menu lateral */}
      <aside className="w-64 bg-blue-950 text-white p-4 flex flex-col justify-between">
        <div>
          <h2
            onClick={handleLogoClick}
            className="text-3xl font-extrabold mb-6 flex items-center gap-2 cursor-pointer hover:text-blue-300"
          >
            🌌 AstroEduca
          </h2>

          {/* Provas */}
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

          {/* Exercícios */}
          <button
            className="w-full text-left px-3 py-2 hover:bg-blue-800 rounded mt-2 cursor-pointer"
            onClick={() => {
              setOpenExercicios(!openExercicios);
              // fechar outros menus
              setOpenSupport(false);
              setOpenVideos(false);
              fetchSubjects("exercise");
            }}
          >
            Exercícios
          </button>

          <AnimatePresence>
            {openExercicios && (
              <motion.ul
                className="ml-6 mt-2 text-sm text-blue-200"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {subjects.map((subject) => (
                  <li
                    key={subject}
                    className="py-1 hover:underline cursor-pointer"
                    onClick={() => fetchContentsBySubject(subject)}
                  >
                    {subject}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>

          {/* Conteúdo de Apoio */}
          <button
            className="w-full text-left px-3 py-2 hover:bg-blue-800 rounded mt-2 cursor-pointer"
            onClick={() => {
              setOpenSupport(!openSupport);
              setOpenExercicios(false);
              setOpenVideos(false);
              fetchSubjects("support");
            }}
          >
            Conteúdo de apoio
          </button>
          <AnimatePresence>
            {openSupport && (
              <motion.ul
                className="ml-6 mt-2 text-sm text-blue-200"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {subjects.map((subject) => (
                  <li
                    key={subject}
                    className="py-1 hover:underline cursor-pointer"
                    onClick={() => fetchContentsBySubject(subject)}
                  >
                    {subject}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>

          {/* Vídeos */}
          <button
            className="w-full text-left px-3 py-2 hover:bg-blue-800 rounded mt-2 cursor-pointer"
            onClick={() => {
              setOpenVideos(!openVideos);
              setOpenExercicios(false);
              setOpenSupport(false);
              fetchSubjects("video");
            }}
          >
            Vídeos
          </button>
          <AnimatePresence>
            {openVideos && (
              <motion.ul
                className="ml-6 mt-2 text-sm text-blue-200"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {subjects.map((subject) => (
                  <li
                    key={subject}
                    className="py-1 hover:underline cursor-pointer"
                    onClick={() => fetchContentsBySubject(subject)}
                  >
                    {subject}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>

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
                value={searchTag}
                onChange={(e) => setSearchTag(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") fetchContentsByTag(searchTag);
                }}
                className="border border-blue-300 bg-white rounded px-4 py-2 w-1/2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => fetchContentsByTag(searchTag)}
                className="ml-2 bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
              >
                Buscar
              </button>
            </div>
            <Link to="/login">
              <button className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition flex items-center gap-2 cursor-pointer">
                <LogIn size={18} /> Login
              </button>
            </Link>
          </div>

      {isHomePage ? (
        // Se estiver na "Home da Home"
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-6xl font-extrabold mb-4 flex items-center gap-4 text-blue-900">
            🌠 Bem-vindo ao AstroEduca!
          </h1>
          <p className="text-xl mb-6">
            Aqui você encontra recursos educativos sobre Astronomia para
            aprofundar seus conhecimentos!
          </p>
          <img
            src="/astro.png"
            alt="Astronomia"
            className="rounded-lg shadow-lg mb-6 max-w-[1350px]"
          />
        </div>
      ) : (
        // Se NÃO estiver na "Home da Home", mostra o conteúdo principal
        <>

          {/* Conteúdo carregado */}
          <div>
            {selectedSubject ? (
              <h2 className="text-2xl font-bold mb-4 capitalize">
                {selectedSubject}
              </h2>
            ) : (
              <p className="text-blue-600">Selecione um assunto no menu.</p>
            )}

            {contents.length === 0 && selectedSubject ? (
              <p className="text-blue-600">Nenhum conteúdo disponível.</p>
            ) : (
              <ul className="space-y-2">
                {contents.map((item) => (
                  <a
                    key={item.id}
                    href={item.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 border p-3 rounded hover:bg-blue-100 cursor-pointer"
                  >
                    {getIcon(item.type)}
                    <div>
                      <div className="font-semibold">{item.title}</div>
                      <div className="text-sm text-blue-600">
                        {item.description}
                      </div>
                    </div>
                  </a>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </main>
    </div>
    );
  };  
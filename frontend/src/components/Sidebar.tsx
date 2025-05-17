// src/components/Sidebar.tsx
import {
    BookOpen,
    FileText,
    Video,
    Brain,
    LogOut,
    PlusCircle,
  } from "lucide-react";
  import { motion, AnimatePresence } from "framer-motion";
  import { useAuth } from "../contexts/AuthContext";
  import { Link } from "react-router-dom";
  
  interface SidebarProps {
    onLogoClick: () => void;
    onFetchSubjects: (type: string) => void;
    onFetchBySubject: (subject: string) => void;
    openMenus: {
      provas: boolean;
      exercicios: boolean;
      support: boolean;
      videos: boolean;
    };
    toggleMenu: (menu: "provas" | "exercicios" | "support" | "videos") => void;
    subjects: string[];
  }
  
  export default function Sidebar({
    onLogoClick,
    onFetchSubjects,
    onFetchBySubject,
    openMenus,
    toggleMenu,
    subjects,
  }: SidebarProps) {
    const { user, logout } = useAuth();
  
    return (
      <aside className="w-64 bg-blue-950 text-white p-4 flex flex-col justify-between">
        <div>
          <h2
            onClick={onLogoClick}
            className="text-3xl font-extrabold mb-6 flex items-center gap-2 cursor-pointer hover:text-blue-300"
          >
            🌌 AstroEduca
          </h2>
  
          {/* Provas */}
          <button
            className="w-full text-left px-3 py-2 hover:bg-blue-800 rounded cursor-pointer"
            onClick={() => toggleMenu("provas")}
          >
            Provas
          </button>
          <AnimatePresence>
            {openMenus.provas && (
              <motion.ul
                className="ml-6 mt-2 text-sm text-blue-200"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <li className="py-1 hover:underline">
                  <a href="http://www.oba.org.br" target="_blank" rel="noopener noreferrer">OBA</a>
                </li>
                <li className="py-1 hover:underline">
                  <a href="https://www.fuvest.br" target="_blank" rel="noopener noreferrer">Fuvest</a>
                </li>
                <li className="py-1 hover:underline">
                  <a href="https://www.gov.br/inep" target="_blank" rel="noopener noreferrer">ENEM</a>
                </li>
              </motion.ul>
            )}
          </AnimatePresence>
  
          {/* Exercícios */}
          <button
            className="w-full text-left px-3 py-2 hover:bg-blue-800 rounded mt-2 cursor-pointer"
            onClick={() => {
              toggleMenu("exercicios");
              onFetchSubjects("exercise");
            }}
          >
            Exercícios
          </button>
          <AnimatePresence>
            {openMenus.exercicios && (
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
                    onClick={() => onFetchBySubject(subject)}
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
              toggleMenu("support");
              onFetchSubjects("support");
            }}
          >
            Conteúdo de apoio
          </button>
          <AnimatePresence>
            {openMenus.support && (
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
                    onClick={() => onFetchBySubject(subject)}
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
              toggleMenu("videos");
              onFetchSubjects("video");
            }}
          >
            Vídeos
          </button>
          <AnimatePresence>
            {openMenus.videos && (
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
                    onClick={() => onFetchBySubject(subject)}
                  >
                    {subject}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
  
          {/* Imagem */}
          <img
            src="https://tse3.mm.bing.net/th?id=OIP.RN60cwRazjAFmw7odSnKpQHaFN&pid=Api&P=0&h=180"
            alt="Universo estrelado"
            className="rounded-xl shadow-lg mt-6"
          />
  
          {/* Painel de controle do usuário */}
          {user && (
            <div className="mt-6 space-y-2 text-sm">
              <p className="text-blue-200">
                Olá, <strong>{user.email}</strong>
              </p>

              {user.role === "professor" ? (
                <Link
                  to="/cadastrar"
                  className="flex items-center gap-2 bg-blue-800 px-3 py-2 rounded hover:bg-blue-700"
                >
                  <PlusCircle size={16} /> Cadastrar Conteúdo
                </Link>
              ) : (
                <p className="text-blue-400 italic">
                  Acesso somente para consulta.
                </p>
              )}
            </div>
          )}

        </div>
  
        <footer className="text-xs text-blue-300 mt-4">
          Trabalho realizado na disciplina de Projeto Integrador da UNIVESP - 2025
        </footer>
      </aside>
    );
  }
  
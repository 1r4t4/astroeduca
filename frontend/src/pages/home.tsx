import { useState } from "react";
import axios from "axios";
import { LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface Content {
  id: number;
  title: string;
  description: string;
  file_url: string;
  type: string;
  subject: string;
}

export default function Home() {
  const [isHomePage, setIsHomePage] = useState(true);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [contents, setContents] = useState<Content[]>([]);
  const [searchTag, setSearchTag] = useState("");
  const [openMenus, setOpenMenus] = useState({
    provas: false,
    exercicios: false,
    support: false,
    videos: false,
  });
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    setIsHomePage(true);
    setSelectedSubject(null);
    setContents([]);
  };

  const toggleMenu = (menu: keyof typeof openMenus) => {
    setOpenMenus((prev) => ({
      provas: false,
      exercicios: false,
      support: false,
      videos: false,
      [menu]: !prev[menu],
    }));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "exercise": return <span className="text-blue-700">📄</span>;
      case "video": return <span className="text-red-600">🎥</span>;
      case "support": return <span className="text-yellow-600">🧠</span>;
      case "exam": return <span className="text-green-600">📚</span>;
      default: return <span>📄</span>;
    }
  };

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

  const fetchContentsBySubject = async (subject: string) => {
    try {
      if (!selectedType) return;
      const res = await axios.get("http://localhost:8000/contents/");
      const filtered = res.data.filter(
        (item: Content) => item.type === selectedType && item.subject === subject
      );
      setContents(filtered);
      setSelectedSubject(subject);
      setIsHomePage(false);
    } catch (err) {
      console.error("Erro ao buscar conteúdos:", err);
    }
  };

  const fetchContentsByTag = async (tag: string) => {
    try {
      const res = await axios.get("http://localhost:8000/contents/");
      const filtered = res.data.filter((item: any) =>
        item.tags.includes(tag.toLowerCase())
      );
      setContents(filtered);
      setSelectedType(null);
      setSelectedSubject(null);
      setIsHomePage(false);
    } catch (err) {
      console.error("Erro ao buscar por tag:", err);
    }
  };

  return (
    <div className="flex h-screen bg-blue-50 text-blue-900">
      <Sidebar
        onLogoClick={handleLogoClick}
        onFetchSubjects={fetchSubjects}
        onFetchBySubject={fetchContentsBySubject}
        openMenus={openMenus}
        toggleMenu={toggleMenu}
        subjects={subjects}
      />

      <main className="flex-1 p-8 overflow-y-auto">
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
            {user ? (
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition flex items-center gap-2 cursor-pointer"
              >
                Sair
              </button>
            ) : (
              <Link to="/login">
                <button className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition flex items-center gap-2 cursor-pointer">
                  <LogIn size={18} /> Login
                </button>
              </Link>
            )}
          </div>

        {isHomePage ? (
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
        )}
      </main>
    </div>
  );
}

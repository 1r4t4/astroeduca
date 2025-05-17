import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import api from "../api";
import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";

type Content = {
  id: number;
  title: string;
  description: string;
  type: string;
  subject: string;
  file_url: string;
};

export default function MeusConteudos() {
  const { user } = useAuth();
  const [userId, setUserId] = useState<number | null>(null);
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyContents = async () => {
      try {
        let id = userId;

        // Só busca o id se ainda não souber
        if (!id) {
          const resUser = await api.get("/users/me");
          id = resUser.data.id;
          setUserId(id);
        }

        const res = await api.get(`/contents/?created_by=${id}`);
        setContents(res.data);
      } catch (err) {
        console.error("Erro ao buscar conteúdos do professor:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === "professor") {
      fetchMyContents();
    }
  }, [user, userId]);

  const handleDelete = async (id: number) => {
    const confirmar = window.confirm("Tem certeza que deseja excluir este conteúdo?");
    if (!confirmar) return;

    try {
      await api.delete(`/contents/${id}`);
      setContents((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Erro ao excluir conteúdo:", err);
      alert("Erro ao excluir conteúdo.");
    }
  };

  if (!user || user.role !== "professor") {
    return <div className="text-red-600 p-8">Acesso restrito a professores.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Meus Conteúdos</h1>

      {loading ? (
        <p>Carregando...</p>
      ) : contents.length === 0 ? (
        <p className="text-blue-700">Você ainda não cadastrou nenhum conteúdo.</p>
      ) : (
        <ul className="space-y-4">
          {contents.map((item) => (
            <li key={item.id} className="border p-4 rounded shadow-sm flex justify-between items-center">
              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-blue-600">{item.subject} • {item.type}</p>
              </div>
              <div className="flex gap-3">
                <Link
                  to={`/editar/${item.id}`}
                  className="text-blue-600 hover:text-blue-800"
                  title="Editar"
                >
                  <Pencil size={20} />
                </Link>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-600 hover:text-red-800"
                  title="Excluir"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

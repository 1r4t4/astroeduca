import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function EditarConteudo() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "exercise",
    exam: "",
    year: 2025,
    subject: "",
    tags: "",
    file_url: "",
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await api.get(`/contents/${id}`);
        const data = res.data;
        setFormData({
          title: data.title,
          description: data.description,
          type: data.type,
          exam: data.exam,
          year: data.year,
          subject: data.subject,
          tags: data.tags.join(", "),
          file_url: data.file_url,
        });
      } catch (error) {
        console.error("Erro ao carregar conteúdo:", error);
        alert("Erro ao carregar dados do conteúdo.");
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [id]);

  if (!user || user.role !== "professor") {
    return <div className="text-red-600 p-8">Acesso restrito a professores.</div>;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(",").map((tag) => tag.trim().toLowerCase()),
      };
      await api.put(`/contents/${id}`, payload);
      alert("Conteúdo atualizado com sucesso!");
      navigate("/meus-conteudos");
    } catch (error: any) {
      console.error("Erro ao atualizar conteúdo:", error);
      alert("Erro ao atualizar conteúdo.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-16 bg-white p-6 rounded shadow relative">
      {/* Logo centralizado */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-3xl font-extrabold text-blue-700">
        <Link to="/" className="flex items-center gap-2">
          🌌 AstroEduca
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-6 text-center mt-16">Editar Conteúdo</h1>

      {loading ? (
        <p className="text-center text-blue-600">Carregando...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-blue-900 mb-1">Título</label>
            <input name="title" value={formData.title} onChange={handleChange} className="w-full p-3 border border-blue-300 rounded" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-900 mb-1">Descrição</label>
            <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-3 border border-blue-300 rounded" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-900 mb-1">Tipo</label>
            <select name="type" value={formData.type} onChange={handleChange} className="w-full p-3 border border-blue-300 rounded">
              <option value="exercise">Exercício</option>
              <option value="support">Conteúdo de apoio</option>
              <option value="video">Vídeo</option>
              <option value="exam">Prova</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-900 mb-1">Nome da prova (opcional)</label>
            <input name="exam" value={formData.exam} onChange={handleChange} className="w-full p-3 border border-blue-300 rounded" />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-900 mb-1">Ano</label>
            <input name="year" type="number" value={formData.year} onChange={handleChange} className="w-full p-3 border border-blue-300 rounded" />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-900 mb-1">Assunto</label>
            <input name="subject" value={formData.subject} onChange={handleChange} className="w-full p-3 border border-blue-300 rounded" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-900 mb-1">Tags (separadas por vírgula)</label>
            <input name="tags" value={formData.tags} onChange={handleChange} className="w-full p-3 border border-blue-300 rounded" />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-900 mb-1">URL do Arquivo</label>
            <input name="file_url" value={formData.file_url} onChange={handleChange} className="w-full p-3 border border-blue-300 rounded" required />
          </div>

          <button type="submit" disabled={submitting} className="w-full bg-blue-700 text-white py-3 rounded hover:bg-blue-800 transition disabled:opacity-50">
            {submitting ? "Salvando..." : "Salvar Alterações"}
          </button>
        </form>
      )}
    </div>
  );
}

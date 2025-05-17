import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function Cadastrar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);

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
      await api.post("/contents/", payload);
      alert("Conteúdo cadastrado com sucesso!");
      navigate("/");
    } catch (error) {
      console.error("Erro ao cadastrar conteúdo:", error);
      alert("Erro ao cadastrar conteúdo.");
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

      <h1 className="text-2xl font-bold mb-6 text-center mt-16">Cadastrar novo conteúdo</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1 font-semibold text-blue-700">Título</label>
          <input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 border border-blue-300 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block mb-1 font-semibold text-blue-700">Descrição</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border border-blue-300 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="type" className="block mb-1 font-semibold text-blue-700">Tipo</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-3 border border-blue-300 rounded"
          >
            <option value="exercise">Exercício</option>
            <option value="support">Conteúdo de apoio</option>
            <option value="video">Vídeo</option>
            <option value="exam">Prova</option>
          </select>
        </div>

        <div>
          <label htmlFor="exam" className="block mb-1 font-semibold text-blue-700">Nome da prova (opcional)</label>
          <input
            id="exam"
            name="exam"
            value={formData.exam}
            onChange={handleChange}
            className="w-full p-3 border border-blue-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="year" className="block mb-1 font-semibold text-blue-700">Ano</label>
          <input
            id="year"
            name="year"
            type="number"
            value={formData.year}
            onChange={handleChange}
            className="w-full p-3 border border-blue-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block mb-1 font-semibold text-blue-700">Assunto (subject)</label>
          <input
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full p-3 border border-blue-300 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="tags" className="block mb-1 font-semibold text-blue-700">Tags separadas por vírgula</label>
          <input
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-full p-3 border border-blue-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="file_url" className="block mb-1 font-semibold text-blue-700">URL do arquivo</label>
          <input
            id="file_url"
            name="file_url"
            value={formData.file_url}
            onChange={handleChange}
            className="w-full p-3 border border-blue-300 rounded"
            required
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-blue-700 text-white py-3 rounded hover:bg-blue-800 transition disabled:opacity-50"
        >
          {submitting ? "Enviando..." : "Cadastrar"}
        </button>
      </form>
    </div>
  );
}

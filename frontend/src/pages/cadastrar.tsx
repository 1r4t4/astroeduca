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
      const response = await api.post("/contents/", payload);
      console.log("Resposta:", response);
      alert("Conteúdo cadastrado com sucesso!");
      navigate("/");
} catch (error: any) {
  console.error("Erro ao cadastrar conteúdo:", error);

  if (error.response) {
    console.error("Status:", error.response.status);
    console.error("Headers:", error.response.headers);
    console.error("Data:", error.response.data);
  } else {
    console.error("Erro sem resposta:", error.message);
  }

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
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Título"
          className="w-full p-3 border border-blue-300 rounded"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Descrição"
          className="w-full p-3 border border-blue-300 rounded"
          required
        />
        <select
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
        <input
          name="exam"
          value={formData.exam}
          onChange={handleChange}
          placeholder="Nome da prova (opcional)"
          className="w-full p-3 border border-blue-300 rounded"
        />
        <input
          name="year"
          type="number"
          value={formData.year}
          onChange={handleChange}
          placeholder="Ano"
          className="w-full p-3 border border-blue-300 rounded"
        />
        <input
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Assunto (subject)"
          className="w-full p-3 border border-blue-300 rounded"
          required
        />
        <input
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="Tags separadas por vírgula"
          className="w-full p-3 border border-blue-300 rounded"
        />
        <input
          name="file_url"
          value={formData.file_url}
          onChange={handleChange}
          placeholder="URL do arquivo"
          className="w-full p-3 border border-blue-300 rounded"
          required
        />
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

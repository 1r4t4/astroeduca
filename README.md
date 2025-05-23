# 🌌 AstroEduca

**AstroEduca** é uma plataforma educacional *white label* voltada para o apoio ao ensino de Astronomia, com foco inicial na **Olimpíada Brasileira de Astronomia e Astronáutica (OBA)**. Seu propósito é democratizar o acesso a conteúdos de qualidade para **alunos** e **professores**, incentivando uma aprendizagem mais eficiente e colaborativa.

---

## 🎯 Objetivo

* **Alunos:** estudar provas anteriores da OBA com ferramentas de busca por tema e dificuldade.
* **Professores:** acessar questões comentadas, recursos didáticos e trocar experiências com outros docentes.

---

## 🧰️ Funcionalidades

* 📚 Acesso organizado às provas anteriores da OBA.
* 🔍 Filtro de questões por tema, categoria e origem (ex.: ENEM, Fuvest, Provão Paulista).
* 📄 Materiais didáticos para apoio ao ensino e aprendizagem.
* 🖥️ Interface intuitiva e responsiva, com navegação simples.

---

## 🧱 Tecnologias Utilizadas

* **Backend:** FastAPI
* **Frontend:** React + Vite
* **Banco de Dados:** MySQL
* **UI Framework:** Tailwind CSS

---

## 💻 Como Executar Localmente

Siga os passos abaixo para rodar o projeto **AstroEduca** em sua máquina:

### 📦 Requisitos

* Node.js **v20+**
* npm **v10+** (ou [pnpm](https://pnpm.io/) / yarn, se preferir)
* Python **3.10+**
* [Poetry](https://python-poetry.org/) ou `venv` para ambiente virtual (caso use backend local)
* MySQL (ou outro banco de dados compatível)

---

### ▶️ Passo a Passo

#### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/astroeduca.git
cd astroeduca
```

#### 2. Instale as dependências do Frontend

```bash
cd frontend
npm install
```

#### 3. Rode o Frontend

```bash
npm run dev
```

> A aplicação estará disponível em: `http://localhost:5173`

#### 4. (Opcional) Configure e execute o Backend

```bash
cd ../backend
python -m venv .venv
source .venv/bin/activate  # no Linux/macOS
.venv\Scripts\activate     # no Windows

pip install -r requirements.txt
uvicorn app.main:app --reload
```

> A API estará disponível em: `http://localhost:8000`

#### 5. Configure as variáveis de ambiente

Crie um arquivo `.env` em `frontend/` e `backend/` com as configurações necessárias, como URLs da API, tokens, ou credenciais de banco de dados.

Exemplo para o `frontend/.env`:

```
VITE_API_URL=http://localhost:8000
```

---

### ✅ Pronto!

Agora você pode navegar pelo portal educacional e começar a contribuir.

---

## 🚀 Como Contribuir

Contribuições são sempre bem-vindas! Você pode:

* Abrir `issues` para reportar bugs ou sugerir melhorias
* Enviar `pull requests` com correções ou novas funcionalidades
* Compartilhar ideias e feedbacks para aprimorar o projeto

---

## 📝 Licença

Este projeto está licenciado sob a **Licença MIT**. Consulte o arquivo `LICENSE` para mais informações.

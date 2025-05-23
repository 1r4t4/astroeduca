from fastapi import FastAPI
from database import engine, Base
from routes import users, contents
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:5173",  # Porta do Vite + React
    "http://127.0.0.1:5173",  # Adicionando 127.0.0.1 também
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Aceita essas origens específicas
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos os métodos HTTP (GET, POST, etc.)
    allow_headers=["*"],  # Permite todos os cabeçalhos
)


# Criar tabelas no banco de dados
Base.metadata.create_all(bind=engine)

# Incluir rotas
app.include_router(users.router)
app.include_router(contents.router)


@app.get("/")
def root():
    return {"message": "Portal OBA API"}

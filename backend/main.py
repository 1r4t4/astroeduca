from fastapi import FastAPI
from database import engine, Base
from routes import users, contents

app = FastAPI()

# Criar tabelas no banco de dados
Base.metadata.create_all(bind=engine)

# Incluir rotas
app.include_router(users.router)
app.include_router(contents.router)


@app.get("/")
def root():
    return {"message": "Portal OBA API"}

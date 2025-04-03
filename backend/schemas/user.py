from pydantic import BaseModel, EmailStr
from enum import Enum


class UserRole(str, Enum):
    professor = "professor"
    aluno = "aluno"
    admin = "admin"


class UserBase(BaseModel):
    email: EmailStr
    name: str
    role: UserRole


class UserCreate(UserBase):
    password: str  # Apenas para registro, não será salvo diretamente


class UserResponse(UserBase):
    id: int

    class Config:
        from_attributes = True  # Para compatibilidade com o banco de dados


class UserUpdate(BaseModel):
    name: str

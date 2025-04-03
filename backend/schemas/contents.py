from pydantic import BaseModel, HttpUrl
from typing import List, Optional
from enum import Enum


class ContentType(str, Enum):
    exercise = "exercise"
    material = "material"
    video = "video"


class ContentBase(BaseModel):
    title: str
    description: Optional[str] = None
    type: ContentType
    exam: Optional[str] = None  # Nome da prova (OBA, Fuvest, etc.)
    year: Optional[int] = None
    subject: Optional[str] = None
    tags: List[str] = []
    file_url: Optional[HttpUrl] = None  # URL do arquivo (imagem, vídeo, etc.)


class ContentCreate(ContentBase):
    pass  # Mesmo esquema, pois criamos o conteúdo completo


class ContentResponse(ContentBase):
    id: int
    created_by: int  # ID do professor que criou

    class Config:
        from_attributes = True

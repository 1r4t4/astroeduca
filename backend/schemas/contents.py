from pydantic import BaseModel, HttpUrl
from typing import List, Optional
from enum import Enum


class ContentType(str, Enum):
    exercise = "exercise"
    support = "support"
    material = "material"
    video = "video"


class ContentBase(BaseModel):
    title: str
    description: Optional[str] = None
    type: ContentType
    exam: Optional[str] = None
    year: Optional[int] = None
    subject: Optional[str] = None
    tags: List[str] = []
    file_url: Optional[HttpUrl] = None


class ContentCreate(ContentBase):
    pass


class ContentResponse(ContentBase):
    id: int
    created_by: int

    class Config:
        from_attributes = True

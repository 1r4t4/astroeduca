from sqlalchemy import Column, Integer, String, Enum, ForeignKey
from sqlalchemy.orm import relationship
from database import Base
from schemas.contents import ContentType


class Content(Base):
    __tablename__ = "contents"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    description = Column(String(500), nullable=True)
    type = Column(Enum(ContentType), nullable=False)
    exam = Column(String(100), nullable=True)
    year = Column(Integer, nullable=True)
    subject = Column(String(100), nullable=True)
    tags = Column(String(200), nullable=True)  # Armazenamos como CSV ("tag1,tag2,tag3")
    file_url = Column(String(500), nullable=True)

    created_by = Column(Integer, ForeignKey("users.id"))
    creator = relationship("User")

    @property
    def tags_list(self) -> list[str]:
        return self.tags.split(",") if self.tags else []

    @tags_list.setter
    def tags_list(self, value: list[str]) -> None:
        self.tags = ",".join(value)

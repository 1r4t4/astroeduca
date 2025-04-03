from sqlalchemy import Column, Integer, String, Enum, ForeignKey
from sqlalchemy.orm import relationship
from database import Base
from schemas.contents import ContentType


class Content(Base):
    __tablename__ = "contents"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    type = Column(Enum(ContentType), nullable=False)
    exam = Column(String, nullable=True)
    year = Column(Integer, nullable=True)
    subject = Column(String, nullable=True)
    tags = Column(String, nullable=True)  # Armazenamos como CSV ("tag1,tag2,tag3")
    file_url = Column(String, nullable=True)

    created_by = Column(Integer, ForeignKey("users.id"))
    creator = relationship("User")

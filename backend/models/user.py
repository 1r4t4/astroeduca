from sqlalchemy import Column, Integer, String, Enum
from database import Base
from schemas.user import UserRole


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    name = Column(String(100), nullable=False)
    role = Column(Enum(UserRole), nullable=False)
    hashed_password = Column(String(255), nullable=False)

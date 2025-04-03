from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from models.contents import Content
from schemas.contents import ContentCreate, ContentResponse
from database import get_db
from services.dependencies import get_current_authenticated_user
from models.user import User

router = APIRouter()


@router.post("/contents/", response_model=ContentResponse)
def create_content(
    content_data: ContentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_authenticated_user),
):
    if current_user.role not in ["professor", "admin"]:
        raise HTTPException(
            status_code=403, detail="Apenas professores podem criar conteúdos."
        )

    new_content = Content(
        **content_data.dict(),
        created_by=current_user.id,
        tags=",".join(content_data.tags),
    )
    db.add(new_content)
    db.commit()
    db.refresh(new_content)
    return new_content


@router.get("/contents/", response_model=List[ContentResponse])
def get_contents(
    db: Session = Depends(get_db),
    type: str = None,
    exam: str = None,
    year: int = None,
    subject: str = None,
    tag: str = None,
):
    query = db.query(Content)

    if type:
        query = query.filter(Content.type == type)
    if exam:
        query = query.filter(Content.exam == exam)
    if year:
        query = query.filter(Content.year == year)
    if subject:
        query = query.filter(Content.subject == subject)
    if tag:
        query = query.filter(Content.tags.like(f"%{tag}%"))

    return query.all()


@router.get("/contents/{content_id}", response_model=ContentResponse)
def get_content(content_id: int, db: Session = Depends(get_db)):
    content = db.query(Content).filter(Content.id == content_id).first()
    if not content:
        raise HTTPException(status_code=404, detail="Conteúdo não encontrado.")
    return content


@router.put("/contents/{content_id}", response_model=ContentResponse)
def update_content(
    content_id: int,
    content_data: ContentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_authenticated_user),
):
    content = db.query(Content).filter(Content.id == content_id).first()
    if not content:
        raise HTTPException(status_code=404, detail="Conteúdo não encontrado.")

    if (
        current_user.role not in ["professor", "admin"]
        or content.created_by != current_user.id
    ):
        raise HTTPException(
            status_code=403, detail="Você não tem permissão para editar este conteúdo."
        )

    for key, value in content_data.dict().items():
        setattr(content, key, value)

    content.tags = ",".join(content_data.tags)  # Atualizar tags

    db.commit()
    db.refresh(content)
    return content


@router.delete("/contents/{content_id}")
def delete_content(
    content_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_authenticated_user),
):
    content = db.query(Content).filter(Content.id == content_id).first()
    if not content:
        raise HTTPException(status_code=404, detail="Conteúdo não encontrado.")

    if (
        current_user.role not in ["professor", "admin"]
        or content.created_by != current_user.id
    ):
        raise HTTPException(
            status_code=403, detail="Você não tem permissão para excluir este conteúdo."
        )

    db.delete(content)
    db.commit()
    return {"message": "Conteúdo excluído com sucesso"}

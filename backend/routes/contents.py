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

    data = content_data.model_dump(exclude={"tags"})

    if "file_url" in data and data["file_url"] is not None:
        data["file_url"] = str(data["file_url"])

    new_content = Content(**data, created_by=current_user.id)
    new_content.tags_list = content_data.tags
    db.add(new_content)
    db.commit()
    db.refresh(new_content)
    data_dict = {
        c.name: getattr(new_content, c.name) for c in new_content.__table__.columns
    }
    data_dict["tags"] = new_content.tags_list
    response = ContentResponse.model_validate(data_dict)
    return response


@router.get("/contents/", response_model=List[ContentResponse])
def get_contents(
    db: Session = Depends(get_db),
    type: str = None,
    exam: str = None,
    year: int = None,
    subject: str = None,
    tag: str = None,
    created_by: int = None,  # Novo filtro adicionado
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
    if created_by:
        query = query.filter(Content.created_by == created_by)

    results = []
    for content in query.all():
        # monta dict e sobrescreve tags como lista
        data = {c.name: getattr(content, c.name) for c in content.__table__.columns}
        data["tags"] = content.tags_list
        results.append(ContentResponse.model_validate(data))
    return results


@router.get("/contents/{content_id}", response_model=ContentResponse)
def get_content(content_id: int, db: Session = Depends(get_db)):
    content = db.query(Content).filter(Content.id == content_id).first()
    if not content:
        raise HTTPException(status_code=404, detail="Conteúdo não encontrado.")
    data = {c.name: getattr(content, c.name) for c in content.__table__.columns}
    data["tags"] = content.tags_list
    return ContentResponse.model_validate(data)


@router.put("/contents/{content_id}", response_model=ContentResponse)
def update_content(
    content_id: int,
    content_data: ContentCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_authenticated_user),
):
    content = db.query(Content).filter(Content.id == content_id).first()
    if not content:
        raise HTTPException(status_code=404, detail="Conteúdo não encontrado.")
    if (
        current_user.role not in ["professor", "admin"]
        or content.created_by != current_user.id
    ):
        raise HTTPException(status_code=403, detail="Permissão negada.")

    # atualiza todos os campos exceto tags
    data = content_data.model_dump(exclude={"tags"})
    if "file_url" in data and data["file_url"] is not None:
        data["file_url"] = str(data["file_url"])
    for key, val in data.items():
        setattr(content, key, val)

    # usa setter para tags
    content.tags_list = content_data.tags

    db.commit()
    db.refresh(content)

    # retorna com tags como lista
    out = {c.name: getattr(content, c.name) for c in content.__table__.columns}
    out["tags"] = content.tags_list
    return ContentResponse.model_validate(out)


@router.delete("/contents/{content_id}")
def delete_content(
    content_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_authenticated_user),
):
    content = db.query(Content).filter(Content.id == content_id).first()
    if not content:
        raise HTTPException(status_code=404, detail="Conteúdo não encontrado.")
    if (
        current_user.role not in ["professor", "admin"]
        or content.created_by != current_user.id
    ):
        raise HTTPException(status_code=403, detail="Permissão negada.")
    db.delete(content)
    db.commit()
    return {"message": "Conteúdo excluído com sucesso"}

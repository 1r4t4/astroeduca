from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from models.user import User
from schemas.user import UserCreate, UserResponse, UserUpdate
from database import get_db
from services.security import hash_password, verify_password, create_jwt_token
from services.dependencies import get_current_authenticated_user
from fastapi import Request


router = APIRouter()


@router.post("/auth/register", response_model=UserResponse)
def register(user_data: UserCreate, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == user_data.email).first():
        raise HTTPException(status_code=400, detail="Email já registrado")

    new_user = User(
        email=user_data.email,
        name=user_data.name,
        role=user_data.role,
        hashed_password=hash_password(user_data.password),
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


# Rota de login
@router.post("/auth/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)
):
    print("🔍 Dados recebidos no login:")
    print(f"username (email): {form_data.username}")
    print(f"password: {form_data.password}")
    user = (
        db.query(User).filter(User.email == form_data.username).first()
    )  # Aqui usamos form_data.username para o email
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Credenciais inválidas")

    token = create_jwt_token({"sub": user.email, "role": user.role})
    return {"access_token": token, "token_type": "bearer"}


# @router.post("/auth/login")
# async def login_debug(request: Request):
#     form = await request.form()
#     print("📥 Form data recebido:")
#     for key, value in form.items():
#         print(f"{key} = {value}")
#     return {"message": "Debug form ok"}


@router.get("/users/me", response_model=UserResponse)
def get_current_user(user: User = Depends(get_current_authenticated_user)):
    return user


@router.put("/users/me", response_model=UserResponse)
def update_user(
    user_update: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_authenticated_user),
):
    current_user.name = user_update.name
    db.commit()
    db.refresh(current_user)
    return current_user

from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException, status
from typing import Annotated
from .helper import decodeAccessToken
from jwt.exceptions import InvalidTokenError
import os
from pinecone import Pinecone

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/login")

def get_pinecone_index():
    try:
        pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
        return pc.Index("intelli-docs")
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Pinecone Index Error: {str(e)}"
        )

def authenicate_user(token: Annotated[str, Depends(oauth2_scheme)]):
    try:
        payload = decodeAccessToken(token)
        return payload
    except InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Unauthorized",
            headers={"Authorization": "Bearer"},
        )

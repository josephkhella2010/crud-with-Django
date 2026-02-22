""" import jwt
from django.conf import settings
from datetime import datetime, timedelta

def create_jwt(user):
    payload = {
        "user_id": user.id,
        "username": user.username,
        "email": user.email,
        "exp": datetime.utcnow() + timedelta(days=1),  # token expires in 1 day
        "iat": datetime.utcnow()
    }

    token = jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")

    # If PyJWT < 2.0, decode bytes to string
    if isinstance(token, bytes):
        token = token.decode("utf-8")
    
    return token
 """

import jwt
import datetime
from django.conf import settings

# Configurable constants
JWT_SECRET = getattr(settings, "JWT_SECRET_KEY", settings.SECRET_KEY)
JWT_ALGORITHM = getattr(settings, "JWT_ALGORITHM", "HS256")
JWT_EXP_DELTA_SECONDS = getattr(settings, "JWT_EXP_DELTA_SECONDS", 3600)  # 1 hour

def  create_jwt(user):
    """
    Generate a JWT token for a user
    """
    payload = {
        "user_id": user.id,
        "username": user.username,
        "email": getattr(user, "email", ""),  # optional
        "exp": datetime.datetime.utcnow() + datetime.timedelta(seconds=JWT_EXP_DELTA_SECONDS),
        "iat": datetime.datetime.utcnow()
    }

    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

    # PyJWT < 2.0 returns bytes
    if isinstance(token, bytes):
        token = token.decode("utf-8")
    
    return token

def decode_jwt(token):
    """
    Decode a JWT token and return payload
    Returns None if token is invalid or expired
    """
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

from functools import wraps
from flask import jsonify,request
import jwt
import os
from models.userModel import User


def auth_admin_middleware(func):
    @wraps(func)
    def wrapper(*args,**kwargs):
        token=request.cookies.get("token")
        print(token)
        if(token):
            validate=jwt.decode(token,os.getenv("JWT_KEY"),algorithms=["HS256"])
            if(validate):
                user_exist=User.objects(id=validate["id"])
                if(user_exist):
                    if(user_exist[0]["role"]==1):
                        return func(*args,**kwargs)
                    else:
                        return jsonify({"message":"Access denied"}),200
                else :
                    return jsonify({"message": "user not found in the database"})
            else:
                return jsonify({"message":"Sign in failed Invalid token"}),401
        else:
            return jsonify({"message":"access denied"}),401
    return wrapper
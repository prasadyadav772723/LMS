from flask import Blueprint,request,jsonify,make_response
from models.userModel import User
import bcrypt
import jwt
import datetime
import os
from middlewares.auth_admin_middleware import auth_admin_middleware
from middlewares.auth_student_middleware import auth_student_middleware
from middlewares.auth_admin_student_middleware import auth_admin_student_middleware

auth_bp=Blueprint('auth',__name__)
@auth_bp.route('/signup',methods=["POST"])
def signup():
    data=request.get_json()
    if data:
        try:
            hash_password=bcrypt.hashpw(data["password"].encode(),bcrypt.gensalt()).decode()
            user=User(
                name=data["name"],
                email=data["email"],
                ph_no=data["ph_no"],
                password=hash_password
            )
            user.save()
            return "Data saved in database"
        except:
            return "Database Error!"
    else:
        return "required all fields"

@auth_bp.route('/signin',methods=["POST"])
def signin():
    data=request.get_json()
    if data:
        email_check=User.objects(email=data["email"]).first()
        if email_check:
            password_check=bcrypt.checkpw(data["password"].encode(),email_check.password.encode())
            if password_check:
                token=jwt.encode({"id":str(email_check.id),"exp":datetime.datetime.utcnow()+datetime.timedelta(1)},os.getenv("JWT_KEY"),algorithm="HS256")
                response=make_response(jsonify({"message":"sign in Successfull"}),200)
                response.set_cookie("token",token,httponly=False,secure=False,samesite="LAX")
                response.set_cookie("id",str(email_check.id),httponly=False,secure=False,samesite="LAX")
                return response
            else:
                return "invalid password"
        else:
            return "email not found"
    else:
        return "email and password required!"

@auth_bp.route('/all-users',methods=["GET"])
@auth_admin_middleware
def all_users():
    
    try:
        result=User.objects()
        if result:
            users=[]
            for user in result:
                users.append({
                    "id":str(user.id),
                    "name":user.name,
                    "ph_no":user.ph_no,
                    "email":user.email,
                    "role":user.role,
                    "university_name":user.university_name,
                    "created_at":user.created_at
                })
            return jsonify({"message":"All users fetched cusscessfully ","data":users}),200
        else:
            return jsonify({"message":"NO users found !"}),401
    except:
        return jsonify({"message":"Internal server Error ! "}),500

@auth_bp.route('/update-user/<id>',methods=["PUT"])
@auth_admin_student_middleware
def update_user(id):
    updated_data=request.get_json()
    user=User.objects(id=id)
    user.update(**updated_data)
    return jsonify({"message":"user Updated successfylly"})

@auth_bp.route('/get-user/<id>',methods=["GET"])
@auth_admin_student_middleware
def get_user(id):
    user=User.objects(id=id).only("id","name","email","ph_no","role","created_at","university_name").first()
    user={
        "id":str(user.id),
        "name":user.name,
        "email":user.email,
        "ph_no":user.ph_no,
        "role":user.role,
        "created_at":user.created_at,
        "university_name":user.university_name
    }
    return jsonify({"data":user,"message":"users fetched cusscessfully "}),200

@auth_bp.route('/delete-user/<id>',methods=["DELETE"])
@auth_admin_middleware
def delete_user(id):
    try:
        user=User.objects(id=id).first()
        if user:
            result=user.delete()
            if result==None:
                return jsonify({"message":"user Deleted Successfully"}),200
            else:
                return jsonify({"message":"error while deleting user"}),500
        else:
            return jsonify({"message":"user not found in database"}),204
    except:
        return  jsonify({"message":"internal server error"}),500


@auth_bp.route('/sign-out',methods=["POST"])
def sign_out():
    response=make_response("deleted")
    response.delete_cookie("token")
    response.delete_cookie("id")
    return response


@auth_bp.route('/update-payment/<id>',methods=["PUT"])
# @auth_admin_student_middleware
def update_payment(id):
  payment_data=request.get_json()
  user=User.objects(id=id).first()
  user.purchased_courses.append(payment_data)
  user.save()
  return jsonify({"message":"Payment Successfull"})



            

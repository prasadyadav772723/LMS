from flask import Blueprint,request,jsonify
from models.courseModel import Course
from middlewares.auth_admin_middleware import auth_admin_middleware
from middlewares.auth_admin_student_middleware import auth_admin_student_middleware

course_bp=Blueprint('course',__name__)

@course_bp.route('/create-course',methods=["POST"])
@auth_admin_middleware
def create_course():
    try:
        data=request.get_json()
        if data:
            course=Course(
                course_name=data["course_name"],
                img=data["img"],
                duration=data["duration"],
                price=data["price"],
                mode=data["mode"],
                road_map_id=data["road_map_id"]
            )
            result=course.save()
            if result:
                return jsonify({"message":"Course created successfully"}),200
            else:
                return jsonify({"message":"Error while creating course in db"})
        else:
            return jsonify({"message":"Require all fields !"})
    except:
        return jsonify({"message":"Internal server Error !!"})

@course_bp.route('/get-all-courses',methods=["GET"])
# @auth_admin_student_middleware
def get_all_courseS():
    try:
        result=Course.objects()
        if result:
            courses=[]
            for course in result:
                courses.append({
                    "id":str(course.id),
                    "course_name":course.course_name,
                    "img":course.img,
                    "duration":course.duration,
                    "price":course.price,
                    "mode":course.mode,
                    "road_map_id":course.road_map_id,
                    "created_at":course.created_at
                })
            return jsonify({"message":"All courses fetched cusscessfully ","data":courses}),200
        else:
            return jsonify({"message":"NO course found !"}),401
    except:
        return jsonify({"message":"Internal server Error ! "}),500


@course_bp.route('/get-course/<id>',methods=["GET"])
def get_course(id):
    course=Course.objects(id=id).only("id","course_name","img","duration","price","mode","created_at","road_map_id").first()
    course={
        "id":str(course.id),
        "course_name":course.course_name,
        "img":course.img,
        "duration":course.duration,
        "price":course.price,
        "mode":course.mode,
        "road_map_id":course.road_map_id,
        "created_at":course.created_at
    }
    return course
    


@course_bp.route('/update-course/<id>',methods=["PUT"])
def update_course(id):
    updated_data=request.get_json()
    course=Course.objects(id=id)
    course.update(**updated_data)
    return "Course updated"


@course_bp.route('/delete-course/<id>',methods=["DELETE"])
def delete_course(id):
    try:
        course=Course.objects(id=id).first()
        if course:
            result=course.delete()
            if result==None:
                return jsonify({"message":"course Deleted Successfully"}),200
            else:
                return jsonify({"message":"error while deleting course"}),500
        else:
            return jsonify({"message":"course not found in database"}),204
    except:
        return  jsonify({"message":"internal server error"}),500



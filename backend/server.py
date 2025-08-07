from flask import Flask,request,jsonify
from flask_cors import CORS
from routes.authRoutes import auth_bp
from routes.courseRoutes import course_bp
from config.database import connect_db

app=Flask(__name__)
CORS(app, supports_credentials=True,origins=["http://localhost:5173"])
connect_db()


@app.route('/api/signup' , methods=["POST"])
def signup():
    data=request.get_json()
    if data:
        result=users.insert_one(data)
        if result:
            return jsonify({"message":"signup successfull"}),200
        else:
            return jsonify({"message":"signup failed"})
    else:
        return jsonify({"message":"data not recived"})
    

@app.route('/api/home')
def Home():
    return "<h1>Backend</h1>"

app.register_blueprint(auth_bp,url_prefix='/api/auth')
app.register_blueprint(course_bp,url_prefix='/api/courses')


if __name__=='__main__':
    app.run(host="localhost",port=4000, debug=True)
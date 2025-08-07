from mongoengine import Document,StringField,EmailField
import datetime

class Course(Document):
    course_name=StringField(required=True,max_length=30)
    img=StringField(required=True)
    duration=StringField(required=True,max_length=2)
    price=StringField(required=True,max_length=6)
    mode=StringField(default="online")
    road_map_id=StringField(default="0",max_length=30)
    created_at=StringField(default=str(datetime.datetime.now()))
    meta={
        "collection":"courses",
        "db_alias":"default"
    }
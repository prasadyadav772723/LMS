from mongoengine import Document,StringField,EmailField,IntField,ListField
import datetime

class User(Document):
    name=StringField(required=True,max_length=30)
    email=EmailField(required=True,unique=True)
    ph_no=StringField(required=True,max_length=10)
    password=StringField(required=True)
    role=IntField(default=0)
    university_name=StringField(default="lms")
    purchased_courses=ListField()
    created_at=StringField(default=str(datetime.datetime.now()))
    meta={
        "collection":"users",
        "db_alias":"default"
    }
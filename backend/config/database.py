from mongoengine import connect
import os

def connect_db():
    connect(
        host=os.getenv("MONGO_DB_URL"),
        alias="default"
    )
    print(os.getenv("MONGO_DB_URL"))
    print("db Connected✅")

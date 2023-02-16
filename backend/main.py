import pymongo
from fastapi import FastAPI
from pydantic import BaseModel
from bson.json_util import dumps
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware

myclient = pymongo.MongoClient("mongodb://localhost:27017")
collection = myclient['test']['data']

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3001",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Item(BaseModel):
    name: str
    province: str
    city: Optional[str]
    email: Optional[str]
    update_time: Optional[str]

    def to_dict(self):
        return {
            'name': self.name, 
            'province': self.province, 
            'city': self.city, 
            'email': self.email, 
            'update_time': self.update_time, 
        }
    

@app.get("/all")
async def all():
    return dumps(collection.find())

@app.post("/insert")
async def insert(item: Item):
    collection.delete_many({'name': item.name})
    collection.insert_one(item.to_dict())
    return dumps(collection.find())
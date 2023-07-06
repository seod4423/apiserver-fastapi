from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pymongo import MongoClient
from bson.json_util import dumps

client = MongoClient()
db = client.get_database('memoDB')
memos = db.get_collection('memos')

app = FastAPI()

@app.delete("/memos/{memo_id}")
def delete_memo(memo_id:str):
    memos.delete_one({'memo_id':memo_id})

@app.post("/memos/{memo_id}")
def update_memo(data:dict):
    memos.update_one({'memo_id':data['memo_id']},
                     {'$set':{'memo_content':data['memo_content']}})
    
@app.post("/memos")
def create_memo(data:dict):
    memos.insert_one(data).inserted_id

@app.get("/memos")
async def root():
    memos_cursor = memos.find({})
    memos_list = list(memos_cursor)
    memos_dumps = dumps(memos_list)
    return memos_dumps

app.mount("/", StaticFiles(directory="static", html=True), name="static")
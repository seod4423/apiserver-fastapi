from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.encoders import jsonable_encoder

app = FastAPI()

memos = [
            {"memo_id":"1", "memo_content":"example 01"},
            {"memo_id":"2", "memo_content":"example 02"},
            {"memo_id":"3", "memo_content":"example 03"},
        ]

@app.delete("/memos/{memo_id}")
def delete_memo(memo_id:str):
    for index, memo in enumerate(memos):
        print(memo, type(memo), index, type(index))
        if(memo["memo_id"]==memo_id):
            memos.pop(index)

@app.post("/memos/{memo_id}")
def update_memo(data:dict):
    
    for memo in memos:
        if memo["memo_id"] == data["memo_id"]:
            memo["memo_content"] = data["memo_content"]
    return memos
    
@app.post("/memos")
def create_memo(data:dict):
    memos.append(data)

@app.get("/memos")
async def root():
    return memos

app.mount("/", StaticFiles(directory="static", html=True), name="static")
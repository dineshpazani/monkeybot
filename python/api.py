from flask import Flask, jsonify, request,  redirect, url_for
from db import DbConn
import json

from flask_cors import CORS

app = Flask(__name__)
CORS(app)

dbconn = DbConn()

@app.route('/')
def welcome():
    return 'Welcome to the register.', 200

@app.route('/register', methods=['POST'])
def register_user():
    user = json.loads(request.data) 

    id = user.get("_id")
    dt = [ doc for doc in dbconn.order_table().find({"_id": id})]
    if len(dt) >= 1:
        return {'res':'User Already exist!'}, 200, {'content-type':'application/json'}
    else:
        dbconn.order_table().insert_one(user)
        return {'res':'Registered users information successfully!'}, 200, {'content-type':'application/json'}




app.run(host='0.0.0.0', port=8080, debug = False)
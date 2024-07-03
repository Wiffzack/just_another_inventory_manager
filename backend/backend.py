
from flask import Flask
from flask import Flask, request, jsonify, make_response
from flask import request, Blueprint,flash,json
import json
from pymongo import MongoClient
from flask import jsonify

from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


# Your mongodb connection string
client = MongoClient('mongodb://192.168.137.1:27017/')
db = client['inventar']
collection = db['home']

def combineJson(old_json, incoming_json):
    old = json.loads(old_json)
    incoming = json.loads(incoming_json)

    # begin with the contents of old
    combined = dict(old)

    for key, value in incoming.items():
        if type(value) == list and key in combined and type(combined[key]) == list:
            combined[key].extend(value)
        else:
            combined[key] = value
    return combined

@app.route('/get', methods=['GET', 'POST'])
@cross_origin()
def get_artikel_list():
    #ata = {'name': 'nabin khadka'}
    #return jsonify(data)
    articel_list = collection.find({}, {"_id": 0 }).limit(100)
    print (articel_list)
    return_list = []
    for doc in articel_list:
        print (doc)
        return_list.append(doc)
    # collection.update_one({'name': 'John'}, {'$set': {'age': 31}})
    return jsonify(return_list)

@app.route('/update', methods=['GET', 'POST'])
@cross_origin()
def update_artikel():
    id = request.args.get('articel_id')
    print (id)
    name = request.args.get('articel_name')
    print (name)
    amount = request.args.get('amount')
    print (amount)
    collection.update_one({'name': 'John'}, {'$set': {'age': 66}})
    test = {
        "test": "test"
    }
    return jsonify(test)

@app.route('/insertlist', methods=['GET', 'POST'])
@cross_origin()
def insert_list():
    print ("okay")
    cache = request.get_data()
    cache_json =  json.loads(cache)
    #cache = request.get_data().decode('utf-8')[1:-1].split("""', '""")
    for doc in cache_json:
        print (cache_json[doc])
        collection.insert_one(cache_json[doc])
    return "okay"

@app.route('/insert_excel', methods=['GET', 'POST'])
@cross_origin()
def insert_execel_artikel():
    id = request.args.get('articel_id')
    print (id)
    collection.update_one({'name': 'John'}, {'$set': {'age': 31}})
    test = {
        "test": "test"
    }
    return jsonify(test)

    
@app.route('/addentry', methods=['GET', 'POST'])
@cross_origin()
def insert_single_entry():
    cache = request.get_data()
    cache_json =  json.loads(cache)
    print (cache_json)
    collection.insert_one({'articel_name':cache_json['name'] , 'number':cache_json['number']  })
    test = {
        "test": "test"
    }
    return jsonify(test)

@app.route('/update2', methods=['GET', 'POST'])
def index():
    id = request.args.get('articel_id')
    print (id)
    # collection.update_one({'name': 'John'}, {'$set': {'age': 31}})
    return 'Hello World'





if __name__ == '__name__':
    app.run()

app.run(host='0.0.0.0', port=8081)
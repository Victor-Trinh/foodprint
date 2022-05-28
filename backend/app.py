import ast
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin # source https://stackoverflow.com/questions/25594893/how-to-enable-cors-in-flask
app = Flask(__name__)
cors = CORS(app)

@app.route('/')
@cross_origin()
def hello(): # replace thing to send webpage
    return 'Hello, World!' 

@app.route('/foodprint', methods=['POST'])
@cross_origin()
def run_inference():
    img = ast.literal_eval(request.get_data().decode('utf8'))['img']
    response = None

    return response
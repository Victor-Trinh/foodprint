import ast
from dis import Instruction
import os
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS, cross_origin # source https://stackoverflow.com/questions/25594893/how-to-enable-cors-in-flask
from dotenv import load_dotenv
from gvision import GVisionManager
from recipeextract import food_extract
from cdb import addfoods, exec_statement
import psycopg2

load_dotenv()

app = Flask(__name__)
cors = CORS(app, resources={r'/*':{'origins':['http://localhost:3000']}})

# gvision = GVisionManager()

# @app.route('/')
# @cross_origin()
# def hello(): # replace thing to send webpage
#     return send_from_directory("../frontend", "index.html")

# @app.route('/foodprint-image', methods=['POST', 'GET'])
# def foodprint_image():
#     save_dir = os.path.join(os.getcwd(), "images")
#     save_path = os.path.join(save_dir, str(len(os.listdir(save_dir))) + ".png")
#     if not os.path.exists(save_dir):
#         os.mkdir(save_dir)

#     img = request.files['ReceiptImage'].save(save_path) # MAKE SURE THE IMAGES ARE PNGS
    
#     words = [d.description for d in gvision.detect_text(save_path)]
#     print(words)

#     return str(words) # TODO: return food emissions


# @app.route('/foodprint-recipe', methods=['POST', 'GET'])
# def foodprint_recipe():

#     recipeText = request.form["RecipeText"]

#     return recipeText # TODO: return food emissions

@app.route('/extract/', methods=['POST'])
def foodprint_extract():
    instructions = request.get_json()
    food = food_extract(os.environ['COHERE_KEY'], instructions)
    response = jsonify({'food_list': food})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/todb/', methods=['POST'])
def food_to_db(): # add food to database after pressing submit
    connection = psycopg2.connect(os.getenv('DB_KEY'))
    food = request.get_json()
    response = jsonify({'food': food})
    response.headers.add('Access-Control-Allow-Origin', '*')
    query = addfoods([food])
    exec_statement(connection, query)
    connection.close()
    return response

@app.route('/analyze/', methods=['GET'])
def analyze():
    # get query to database
    return jsonify({'test': 'test'})
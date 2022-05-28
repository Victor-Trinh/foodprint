import ast
import os
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS, cross_origin # source https://stackoverflow.com/questions/25594893/how-to-enable-cors-in-flask
from dotenv import load_dotenv
from gvision import GVisionManager

load_dotenv()

app = Flask(__name__)
cors = CORS(app)

gvision = GVisionManager()

@app.route('/')
@cross_origin()
def hello(): # replace thing to send webpage
    return send_from_directory("../frontend", "index.html")

@app.route('/foodprint-image', methods=['POST', 'GET'])
@cross_origin()
def foodprint_image():
    save_dir = os.path.join(os.getcwd(), "images")
    save_path = os.path.join(save_dir, str(len(os.listdir(save_dir))) + ".png")
    if not os.path.exists(save_dir):
        os.mkdir(save_dir)

    img = request.files['ReceiptImage'].save(save_path) # MAKE SURE THE IMAGES ARE PNGS
    
    words = [d.description for d in gvision.detect_text(save_path)]
    print(words)

    return str(words) # TODO: return food emissions


@app.route('/foodprint-recipe', methods=['POST', 'GET'])
@cross_origin()
def foodprint_recipe():

    recipeText = request.form["RecipeText"]

    return recipeText # TODO: return food emissions
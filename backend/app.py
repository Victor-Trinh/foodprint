import ast
import os
from flask import Flask, request, jsonify
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
    return 'Hello, World!' 

@app.route('/foodprint', methods=['POST', 'GET'])
@cross_origin()
def run_inference():
    save_dir = os.path.join(os.getcwd(), "images")
    save_path = os.path.join(save_dir, str(len(os.listdir(save_dir))) + ".png")
    if not os.path.exists(save_dir):
        os.mkdir(save_dir)
    img = request.files['media'].save(save_path) # MAKE SURE THE IMAGES ARE PNGS
    
    words = [d.description for d in gvision.detect_text(save_path)]
    return "testresponse"
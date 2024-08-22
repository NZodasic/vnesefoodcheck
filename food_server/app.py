import os
from flask import Flask, request, jsonify
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, unset_jwt_cookies, jwt_required, JWTManager
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
from flask_swagger_ui import get_swaggerui_blueprint
import json
import os
from datetime import datetime, timedelta, timezone
from werkzeug.utils import secure_filename
from ultralytics import YOLO
from models import db, User
import firebase_admin
from firebase_admin import credentials, storage
import cv2
import requests
import numpy as np

api = Flask(__name__)

CORS(api, origins=["http://localhost:3000"], supports_credentials=True)
CORS(api , resources={r"/*": {"origins": "http://localhost:3000"}})


# Swagger UI configuration
SWAGGER_URL = '/api/docs'
API_URL = '/static/swagger.json'  # Adjust to your actual swagger.json file location
swaggerui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={'app_name': "Test application"}
)
api.register_blueprint(swaggerui_blueprint)

# File upload configuration
UPLOAD_FOLDER = 'static/uploads'
ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png'}
api.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Flask and JWT configuration
api.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', '65a8e27d8879283831b664bd8b7f0ad4')
api.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///flask.db'
api.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
api.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)

jwt = JWTManager(api)
bcrypt = Bcrypt(api)
db.init_app(api)

# Initialize Firebase Admin SDK
cred = credentials.Certificate('./food-rec-6b763-firebase-adminsdk-r43c4-d95ab811a2.json')
firebase_admin.initialize_app(cred, {
    'storageBucket': 'food-rec-6b763.appspot.com' 
})

model = YOLO("./model/final.pt")

with api.app_context():
    db.create_all()

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Function to upload image to Firebase Storage and get the public URL
def upload_image_to_firebase(file, storage_path):
    bucket = storage.bucket()
    blob = bucket.blob(storage_path)
    blob.upload_from_file(file)
    blob.make_public()  
    return blob.public_url

# Function to download image from URL and convert to OpenCV format
def download_image_from_url(url):
    response = requests.get(url)
    image_array = np.frombuffer(response.content, np.uint8)
    image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)
    return image

@api.route('/user/upload_folder', methods=['POST'])
@jwt_required()
@cross_origin(origins='http://localhost:3000', supports_credentials=True)
def user_upload_folder():
    if 'folder' not in request.files:
        return jsonify({"error": "No folder part"}), 400

    folder = request.files['folder']
    if folder.filename == '':
        return jsonify({"error": "No selected folder"}), 400

    folder_path = 'user_uploads/'
    file_urls = []

    for file in folder:
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            storage_path = os.path.join(folder_path, filename)
            image_url = upload_image_to_firebase(file, storage_path)
            file_urls.append(image_url)

    return jsonify({
        "file_urls": file_urls
    }), 200

@api.route('/upload_image', methods=['POST'])
@cross_origin(origins='http://localhost:3000', supports_credentials=True)
def upload_image():
    if 'image' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['image']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        storage_path = f'uploads/{filename}'
        image_url = upload_image_to_firebase(file, storage_path)
        
        # Process the image from the URL
        image = download_image_from_url(image_url)
        results = model(image, conf=0.6, verbose=False)
        
        highest_confidence = 0
        best_class_name = ""
        for r in results:
            for idx, class_idx in enumerate(r.probs.top5):
                class_name = r.names[class_idx]
                confidence = float(r.probs.top5conf[idx])
                if confidence > highest_confidence:
                    highest_confidence = confidence
                    best_class_name = class_name
        
        return jsonify({
            "best_class_name": best_class_name,
            "highest_confidence": highest_confidence,
            "image_url": image_url
        }), 200
    else:
        return jsonify({"error": "Invalid file type"}), 400

if __name__ == '__main__':
    api.run(debug=True)

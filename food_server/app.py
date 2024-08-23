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

# Initialize Flask app
api = Flask(__name__)

# Configure CORS
CORS(api, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)

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

# Routes
@api.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@api.route('/logintoken', methods=["POST"])
@cross_origin(origins='http://localhost:3000', supports_credentials=True)
def create_token():
    email = request.json.get("email")
    password = request.json.get("password")
  
    user = User.query.filter_by(email=email).first()
    if user is None or not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Wrong email or password"}), 401
  
    access_token = create_access_token(identity=email)
    return jsonify({"email": email, "access_token": access_token})

@api.route("/signup", methods=["POST"])
@cross_origin(origins='http://localhost:3000', supports_credentials=True)
def signup():
    name = request.json.get("name")
    email = request.json.get("email")
    password = request.json.get("password")
    about = request.json.get("about")
   
    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already exists"}), 409
       
    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(name=name, email=email, password=hashed_password, about=about)
    db.session.add(new_user)
    db.session.commit()
   
    return jsonify({
        "name": new_user.name,
        "id": new_user.id,
        "email": new_user.email,
        "about": new_user.about
    })

@api.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if isinstance(data, dict):
                data["access_token"] = access_token
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        return response

@api.route("/logout", methods=["POST"])
@cross_origin(origins='http://localhost:3000', supports_credentials=True)
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response

@api.route('/profile/<getemail>')
@jwt_required() 
@cross_origin(origins='http://localhost:3000', supports_credentials=True)
def my_profile(getemail):
    user = User.query.filter_by(email=getemail).first()
    if not user:
        return jsonify({"error": "User not found"}), 404
  
    return jsonify({
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "about": user.about
    })

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
            "image_url": image_url  # Trả về URL của ảnh
        }), 200
    else:
        return jsonify({"error": "Invalid file type"}), 400

if __name__ == '__main__':
    api.run(debug=True)

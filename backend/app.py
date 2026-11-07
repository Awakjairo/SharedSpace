import os
from flask import request, jsonify, Flask
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from models import db, User, Post, Service
from config import Config
import requests

app = Flask(__name__)
bcrypt = Bcrypt(app)
app.config.from_object(Config)
CORS(app)
db.init_app(app)

@app.route('/')
def home():
    return {"message": "SharedSpace backend is running!"}

# -------------------------------
# 🧾 Register route
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if not name or not email or not password:
        return jsonify({'error': 'All fields required'}), 400

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'error': 'User already exists'}), 409

    hashed_pw = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(name=name, email=email, password=hashed_pw)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201

# -------------------------------
# 🔐 Login route
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if not user or not bcrypt.check_password_hash(user.password, password):
        return jsonify({'error': 'Invalid email or password'}), 401

    return jsonify({'message': 'Login successful', 'user': {
        'id': user.id,
        'name': user.name,
        'email': user.email
    }})

# -------------------------------
# 📮 Create Post
@app.route('/posts', methods=['POST'])
def create_post():
    data = request.get_json()
    title = data.get('title')
    content = data.get('content')
    category = data.get('category')
    user_id = data.get('user_id')

    if not all([title, content, category, user_id]):
        return jsonify({'error': 'All fields are required'}), 400

    post = Post(title=title, content=content, category=category, user_id=user_id)
    db.session.add(post)
    db.session.commit()

    return jsonify({'message': 'Post created successfully'}), 201

# -------------------------------
# 📬 Get Posts
@app.route('/posts', methods=['GET'])
def get_posts():
    posts = Post.query.order_by(Post.timestamp.desc()).all()
    result = []

    for post in posts:
        ts = post.timestamp.isoformat() if post.timestamp else "Unknown"
        result.append({
            'id': post.id,
            'title': post.title,
            'content': post.content,
            'category': post.category,
            'timestamp': ts,
            'user_id': post.user_id,
            'author': f"User #{post.user_id}"
        })

    return jsonify(result)

# -------------------------------
# 🌦 Weather
@app.route('/weather', methods=['GET'])
def get_weather():
    city = request.args.get('city', default='Nairobi')
    api_key = app.config.get('WEATHER_API_KEY')

    if not api_key:
        return jsonify({'error': 'API key not found'}), 500

    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"

    try:
        response = requests.get(url)
        data = response.json()

        if response.status_code != 200:
            return jsonify({'error': data.get('message', 'Weather API error')}), response.status_code

        weather = {
            'city': data['name'],
            'temperature': data['main']['temp'],
            'description': data['weather'][0]['description'],
        }
        return jsonify(weather)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# -------------------------------
# 🛠 Create Service
@app.route('/services', methods=['POST'])
def create_service():
    data = request.get_json()

    try:
        new_service = Service(
            title=data['title'],
            description=data['description'],
            contact_info=data['contact_info'],
            category=data.get('category', ''),
            user_id=data['user_id']
        )
        db.session.add(new_service)
        db.session.commit()
        return jsonify({"message": "Service created successfully"}), 201
    except Exception as e:
        print("Error adding service:", e)
        return jsonify({"error": "Failed to add service"}), 500

# -------------------------------
# 📋 Get Services
@app.route('/services', methods=['GET'])
def get_services():
    services = Service.query.all()
    result = []
    for s in services:
        result.append({
            "id": s.id,
            "title": s.title,
            "description": s.description,
            "contact_info": s.contact_info,
            "category": s.category,
            "user_id": s.user_id,
        })
    return jsonify(result)

# -------------------------------
# ✅ Start app
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
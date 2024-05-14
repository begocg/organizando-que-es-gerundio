"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import psycopg2
from flask_jwt_extended import create_access_token
from functools import wraps
import jwt
import app

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

conn = psycopg2.connect(
    dbname="example",
    user="begocg",
    password="1212",
    host="localhost"
)
cur = conn.cursor()

# def token_required(f):
#     @wraps(f)
#     def decorated(*args, **kwargs):
#         token = request.headers.get('Authorization')

#         if not token:
#             return jsonify({'message': 'Token is missing'}), 401

#         try:
#             data = jwt.decode(token, app.config['SECRET_KEY'])
#         except:
#             return jsonify({'message': 'Token is invalid'}), 401

#         return f(*args, **kwargs)

#     return decorated

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/users', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    # Verifica si el usuario ya existe en la base de datos
    cur.execute("SELECT * FROM users WHERE username = %s OR email = %s", (username, email))
    existing_user = cur.fetchone()
    if existing_user:
        return jsonify({"error": "El usuario ya existe"}), 400

    # Crea un nuevo usuario
    cur.execute("INSERT INTO users (username, email, password) VALUES (%s, %s, %s)", (username, email, password))
    conn.commit()

    return jsonify({"message": "Usuario registrado exitosamente"}), 201
   


@api.route('/users/<userData>', methods=['GET'])
def login(userData):
    data=userData.split("$")
    username = data[0]
    password = data[1]
    cur.execute("SELECT * FROM users WHERE username = %s AND password= %s", (username,password))
    user = cur.fetchone()
    if user:
        access_token = create_access_token(identity=username)
        return jsonify({ "token": access_token, "username": username, "userId": user[0] })
    else:
        return jsonify({"error": "Credenciales inválidas"}), 401


@api.route('/users/<int:userId>', methods=['PUT'])
def update_user(userId):
    # Lógica para actualizar la información de un usuario existente
    return jsonify({"message": f"Update user with ID {userId}"}), 200

@api.route('/users/<int:userId>', methods=['DELETE'])
def delete_user(userId):
    # Lógica para eliminar un usuario
    return jsonify({"message": f"User with ID {userId} deleted"}), 200


@api.route('/tasks/<int:userId>', methods=['GET'])
def get_user_tasks(userId):
    listaTareas=[]
    cur.execute('SELECT * FROM tasks where "userId"= %s',(userId,))
    tasks = cur.fetchall()
    
    for task in tasks:
        listaTareas.append({"description": task[2], "deadline": task[4], "duration" : task[3], "taskId": task[0], "type": task[5]})
    return jsonify(listaTareas), 200

@api.route('/tasks/<int:userId>', methods=['POST'])
# @token_required
def create_task(userId):
    data = request.json
    description = data.get('description')
    duration = data.get('duration')
    deadline = data.get('deadline')
    type = data.get('type')
    cur.execute('INSERT INTO tasks ("userId", description, duration, deadline, type) VALUES (%s, %s, %s, %s, %s)', (userId, description, duration, deadline, type))
    conn.commit()
    return jsonify({"message": f"Create task for user with ID {userId}", "description": data.get("description"), "duration": data.get("duration"), "deadline": data.get("deadline"), "type": data.get("type")}), 201

@api.route('/tasks/<int:userId>/<int:taskId>', methods=['GET'])
def get_task(userId, taskId):
    # Lógica para obtener la información de una tarea
    return jsonify({"message": f"Get task with ID {taskId} for user with ID {userId}"}), 200

@api.route('/tasks/<int:taskId>', methods=['PUT'])
def update_task(taskId):
    # Lógica para editar la información de una tarea
    return jsonify({"message": f"Update task with ID {taskId}"}), 200

@api.route('/tasks/<int:taskId>', methods=['DELETE'])
def delete_task(taskId):
    # Lógica para eliminar una tarea
    return jsonify({"message": f"Task with ID {taskId} deleted"}), 200
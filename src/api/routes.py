"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


#ruta para crear un usuario

@api.route('/signup', methods=['POST'])
def handle_signup():

    body = request.get_json()

    if body is None:
        raise APIException(
            "You need to specify the request body as a json object", status_code=400)

    if "email" not in body:
        raise APIException('You need to specify the email', status_code=400)

    if "password" not in body:
        raise APIException('You need to specify the password', status_code=400)

    user1 = User(email=body["email"], password=body["password"])
    db.session.add(user1)
    db.session.commit()

    return jsonify("ok"), 200



#ruta definida para el login

@api.route('/login', methods=['POST'])
def handle_login():

    body = request.get_json()

    if body is None:
        raise APIException(
            "You need to specify the request body as a json object", status_code=400)

    if "email" not in body:
        raise APIException('You need to specify the email', status_code=400)

    if "password" not in body:
        raise APIException('You need to specify the password', status_code=400)

    user1 = User.query.filter_by(
        email=body["email"], password=body["password"]).first()
    if user1 is None:
        raise APIException('User not found', status_code=404)

    return jsonify("ok"), 200






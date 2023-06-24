"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)


@api.route('/auth', methods=['POST'])
def handle_auth():

    body = request.get_json()

    if body is None:
        raise APIException(
            "You need to specify the request body as a json object", status_code=400)

    if "email" not in body:
        raise APIException('You need to specify the email', status_code=400)

    if "password" not in body:
        raise APIException('You need to specify the password', status_code=400)

    if "option" not in body:
        raise APIException('You need to specify the option (signup or login)', status_code=400)

    option = body["option"]

    if option == "signup":
        user = User(email=body["email"], password=body["password"], dni=body["dni"], name=body["name"]) 
        db.session.add(user)
        db.session.commit()
        return jsonify({"message": "User registered successfully",
                    "id": user.id,
                    "email": user.email,
                    })
    
    elif option == "login":
        user = User.query.filter_by(email=body["email"], password=body["password"]).first()
        if user is None:
            raise APIException('User not found', status_code=404)
        
        token = create_access_token(identity=user.id)
        
        return jsonify({"message": "User logged in successfully",
                    "id": user.id,
                    "email": user.email,
                    "token": token
                    })
    else:
        raise APIException('Invalid action specified', status_code=400)
    


if __name__ == '__main__':
    api.run()


# Guardado comentado por si acaso se necesita cambiar a diferentes rutas signup y login


#ruta para crear un usuario

# @api.route('/signup', methods=['POST'])
# def handle_signup():

#     body = request.get_json()

#     if body is None:
#         raise APIException(
#             "You need to specify the request body as a json object", status_code=400)

#     if "email" not in body:
#         raise APIException('You need to specify the email', status_code=400)

#     if "password" not in body:
#         raise APIException('You need to specify the password', status_code=400)

#     user1 = User(email=body["email"], password=body["password"], dni=body["dni"], name=body["name"])
#     db.session.add(user1)
#     db.session.commit()

#     return jsonify("user signup ok"), 200



# #ruta definida para el login

# @api.route('/login', methods=['POST'])
# def handle_login():

#     body = request.get_json()

#     if body is None:
#         raise APIException(
#             "You need to specify the request body as a json object", status_code=400)

#     if "email" not in body:
#         raise APIException('You need to specify the email', status_code=400)

#     if "password" not in body:
#         raise APIException('You need to specify the password', status_code=400)

#     user1 = User.query.filter_by(
#         email=body["email"], password=body["password"]).first()
#     if user1 is None:
#         raise APIException('User not found', status_code=404)

#     return jsonify("user login ok"), 200


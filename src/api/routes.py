from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Evento, Empresa, User_Empresa , Valoracion, Factura
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import yagmail
import os
from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError
from werkzeug.exceptions import Unauthorized

import argon2


from datetime import date
import datetime
import json
import secrets

import cloudinary

cloudinary.config( 
  cloud_name = "dqhqjjhsd", 
  api_key = "183366914713799", 
  api_secret = "HqukMekNra-wxSR4B4wDIsqEKKo" 
)

import cloudinary.uploader
import cloudinary.api

ph = PasswordHasher()

def generate_hashed_password(password):
    return ph.hash(password)

def verify_password(hashed_password, plain_password):
    try:
        ph.verify(hashed_password, plain_password)
        return True
    except argon2.exceptions.VerifyMismatchError:
        return False


api = Blueprint('api', __name__)

@api.route('/users', methods=['GET'])
@jwt_required()
def get_usuarios():
    users = User.query.all()
    users_list = [user.serialize() for user in users]
    return jsonify(users_list), 200


@api.route('/eventos', methods=['GET'])
def obtener_eventos():
    eventos = Evento.query.all()
    lista_eventos = [evento.serialize() for evento in eventos]
    return jsonify(lista_eventos), 200

@api.route('/empresa', methods=['GET'])
def obtener_empresa():
    empresas = Empresa.query.all()
    lista_empresas = [empresa.serialize() for empresa in empresas]
    return jsonify(lista_empresas), 200

@api.route('/myempresa', methods=['GET'])
@jwt_required()
def obtener_myempresa():
    user_id = get_jwt_identity()
    user = User.query.filter_by(id=user_id).first()
    if user.user_empresa and user.user_empresa[0].role == "Admin":
        user_empresa = User_Empresa.query.filter_by(empresa_id=user.user_empresa[0].empresa_id)
        users = [{"email": user_data.user.email,"role":user_data.role, "name": user_data.user.name} for user_data in user_empresa]
        data = user.user_empresa[0].empresa.serialize()
        data["users"] = users
        return jsonify(data)
    return jsonify("El usuario no es Admin de la empresa"), 400



@api.route('/valoracion', methods=["POST"])
def create_valoracion():
    valoracion_data = request.get_json()
    opinion = Valoracion(**valoracion_data)

    db.session.add(opinion)
    db.session.commit()

    return jsonify({"message": "Valoración guardada exitosamente"}), 201

@api.route('/my_opinion', methods=["GET"])
@jwt_required()
def get_opinions():
    user_id = get_jwt_identity()
    opinions = Valoracion.query.filter_by(user_id=user_id)
    opinions_list = [opinion.serialize() for opinion in opinions]
    return jsonify(opinions_list), 200

@api.route('/myinvoice', methods=["GET"])
@jwt_required()
def get_facturas():
    user_id = get_jwt_identity()
    facturas = Factura.query.filter_by(user_id=user_id)
    facturas_list = [factura.serialize() for factura in facturas]
    return jsonify(facturas_list), 200


@api.route('/factura', methods=["POST"])
def create_factura():
    factura_data = request.get_json()
    factura_data['fecha'] = date.today() # Agregar la fecha actual
    factura_data['cantidad'] = factura_data.pop('cantidad', 1)  # Renombrar 'personas' a 'cantidad'
    factura = Factura(**factura_data)

    db.session.add(factura)
    db.session.commit() #

    return jsonify({"message": "Factura creada exitosamente"}), 201



# RUTA PARA REGISTRAR UN USUARIO

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

    hashed_password = ph.hash(body["password"])  
    user1 = User(email=body["email"], password=hashed_password, dni=body["dni"], name=body["name"])
    db.session.add(user1)
    db.session.commit()

    return jsonify("user signup ok"), 200

# RUTA PARA LOGEARSE

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

    user = User.query.filter_by(email=body["email"]).first()
    if user is None:
        raise APIException('User not found', status_code=404)

    try:
        ph.verify(user.password, body["password"]) 
        token = create_access_token(identity=user.id)
        return jsonify({
            "message": "User logged in successfully",
            "id": user.id,
            "email": user.email,
            "name": user.name,
            "dni": user.dni,
            "token": token
        })
    except VerifyMismatchError:
        raise Unauthorized('Invalid password')



# RUTA PARA REGISTRAR UNA EMPRESA
@api.route('/companysignup', methods=['POST'])
@jwt_required()
def handle_companysignup():
        user_id = get_jwt_identity()
        body = request.get_json()
    
        if body is None:
            raise APIException(
                "You need to specify the request body as a json object", status_code=400)
    
        if "email" not in body:
            raise APIException('You need to specify the email', status_code=400)
    
        empresa = Empresa(email=body["email"], cif=body["cif"], razon_social=body["razonSocial"], direccion=body["direccion"], poblacion=body["poblacion"], telefono=body["telefono"], codigo_postal=body["codigoPostal"])
        db.session.add(empresa)
        db.session.commit()

        user_empresa = User_Empresa(
            user_id = user_id,
            empresa_id = empresa.id,
            role = "Admin"
        )
        db.session.add(user_empresa)
        db.session.commit()

        response = {
        "message": "Company signup successful",
        "email": empresa.email,
        "cif": empresa.cif,
        "razon_social": empresa.razon_social,
        "direccion": empresa.direccion,
        "poblacion": empresa.poblacion,
        "telefono": empresa.telefono,
        "codigo_postal": empresa.codigo_postal
        }

        print(response)
        return jsonify(response), 200


# añadir empleado a empresa
@api.route('/adduser_empresa', methods=['POST'])
@jwt_required()
def handle_user_empresa():
        user_id = get_jwt_identity()
        body = request.get_json()
    
        if body is None:
            raise APIException(
                "You need to specify the request body as a json object", status_code=400)
    
        if "email" not in body:
            raise APIException('You need to specify the email', status_code=400)
        
        user = User.query.filter_by(email=body.get("email")).first()
        if not user:
            raise APIException('Usuario no existe', status_code=400)
        
        empresa = User_Empresa.query.filter_by(user_id=user_id, role="Admin").first()
        if not empresa:
            raise APIException('Empresa no existe', status_code=400)
        
        current_company = User_Empresa.query.filter_by(user_id=user.id, empresa_id=empresa.id).first()
        if current_company:
            raise APIException('Empleado ya registrado', status_code=400)
        
        user_empresa = User_Empresa(
            user_id = user.id,
            empresa_id = empresa.id,
            role = "Empleado"
        )


        db.session.add(user_empresa)
        db.session.commit()

        response = {
        "message": "Company signup successful",
        "email": user.email
        }

        print(response)
        return jsonify(response), 200




# RUTA PARA CREAR UN EVENTO
@api.route('/crearevento', methods=['POST'])
def handle_crearevento():
            
            body = request.form
            print(body)

            if body is None:
                raise APIException(
                    "You need to specify the request body as a json object", status_code=400)
        
            if not request.form.get("nombre"):
                raise APIException('You need to specify the name', status_code=400)
        
            if not request.form.get("fechaInicio"):
                raise APIException('You need to specify the date of start', status_code=400)
            
            if not request.form.get("fechaFin"):
                raise APIException('You need to specify the end date', status_code=400)
            
            if not request.form.get("ubicacion"):
                raise APIException('You need to specify the location', status_code=400)
    
            if not request.form.get("descripcion"):
                raise APIException('You need to specify the description', status_code=400)
    
            if not request.form.get("personas"):
                raise APIException('You need to specify the participants', status_code=400)

    
            imagen_file = request.files.get('imagen')
            imagen_url = ""

            if imagen_file:
                imagen_upload = cloudinary.uploader.upload(imagen_file)
                imagen_url = imagen_upload["secure_url"]
                print(imagen_url)
            print(body["free"])

            evento = Evento(nombre=body["nombre"], fecha_inicio=body["fechaInicio"], fecha_fin=body["fechaFin"], descripcion=body["descripcion"], imagen=imagen_url, ubicacion=body["ubicacion"], personas=body["personas"], free=body["free"] == "true", importe=int(body["importe"]))
            print(evento.free)
            db.session.add(evento)
            db.session.commit()
        
            response = {
            "message": "Evento creado correctamente",
            "nombre": evento.nombre,
            "fechaInicio": evento.fecha_inicio,
            "fechaFin": evento.fecha_fin,
            "descripcion": evento.descripcion,
            "imagen": evento.imagen,
            "ubicacion": evento.ubicacion,
            "personas": evento.personas,
            "free": evento.free,
            "importe": evento.importe,
            "empresa_id": evento.empresa_id,
            "user_id": evento.user_id
            }

            print(response)
            return jsonify(response), 200



# RUTA PARA MODIFICAR DATOS DE UN USUARIO

@api.route('/modify_user_data/<int:user_id>', methods=['PATCH'])
@jwt_required()
def handle_modify_user(user_id):
    user = User.query.get(user_id)

    if user is None:
        raise APIException('User not found', status_code=404)

    body = request.get_json()
    print(body)

    if body is None:
        raise APIException(
            "You need to specify the request body as a json object", status_code=400)

    old_password = body.get("oldPassword")
    new_password = body.get("newPassword")
    new_email = body.get("newEmail")

    if old_password is None:
        raise APIException("oldPassword is required", status_code=400)

    if ph.verify(user.password, old_password):
        if new_password:
            user.password = ph.hash(new_password)
        if new_email:
            user.email = new_email
        db.session.commit()
        return jsonify({"success": True, "passwordVerified": True}), 200
    else:
        return jsonify({"success": False, "passwordVerified": False}), 200













#RUTA PARA ACCEDER A AREA PRIVADA DE USUARIO
@api.route('/private', methods=['POST'])
@jwt_required()
def handle_private():
    
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        token = create_access_token(identity=user.id)
    
        return jsonify({"id": user.id,
                        "email": user.email,
                        "name": user.name,
                        "token": token,
                        }), 200
    

#RUTA PARA ACCEDER A OLVIDO DE CONTRASEÑA Y ENVIAR MAIL PARA RESTABLECERLA
@api.route('/forgotpassword', methods=['POST'])
def handle_forgot_password():
    body = request.get_json()

    if body is None:
        raise APIException("You need to specify the request body as a json object", status_code=400)

    if "email" not in body:
        raise APIException('You need to specify the email', status_code=400)

    user = User.query.filter_by(email=body["email"]).first()
    if user is None:
        raise APIException('User not found', status_code=404)

    email = "events.ibento@gmail.com"
    contraseña = "ctvzxlgrdoofhuud"

    reset_link = f"{os.getenv('FRONTEND_URL')}/password-reset"

    yag = yagmail.SMTP(email, contraseña)
    destinatario = [user.email]
    asunto = "Recuperación de contraseña"
    contenido = f"""\
    <html>
    <head></head>
    <body>
        <p>Hola,</p>
        <p>Has solicitado restablecer tu contraseña. Por favor, sigue este enlace para cambiar tu contraseña:</p>
        <p><a href="{reset_link}">{reset_link}</a></p>
        <p>Si no solicitaste este cambio, puedes ignorar este correo.</p>
        <p>Saludos,<br>Tu Equipo de Ibento</p>
    </body>
    </html>"""

    yag.send(to=destinatario, subject=asunto, contents=contenido)

    yagmail.SMTP.close(yag)   

    return jsonify({"message": "Email sent with password reset instructions"}), 200


# RUTA PARA RESETEAR LA CONTRASEÑA
@api.route('/password-reset', methods=['POST'])
def handle_password_reset():
    body = request.get_json()
    print(body)

    if body is None:
        raise APIException("You need to specify the request body as a json object", status_code=400)

    if "email" not in body or "password" not in body:
        raise APIException('You need to specify both email and newPassword', status_code=400)

    user = User.query.filter_by(email=body["email"]).first()
    if user is None:
        raise APIException('User not found', status_code=404)

    hashed_new_password = ph.hash(body["password"])  

    user.password = hashed_new_password
    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "Password reset successful"}), 200




if __name__ == '__main__':
    api.run()
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    dni = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
    

class Empresa(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cif = db.Column(db.String(20), unique=True, nullable=False)
    razon_social = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    telefono = db.Column(db.Integer, unique=True, nullable=False)
    poblacion = db.Column(db.String(40), unique=False, nullable=False)
    direccion = db.Column(db.String(60), unique=False, nullable=False)
    codigo_postal = db.Column(db.Integer, unique=False, nullable=False)
    datos_bancarios = db.Column(db.String(30), unique=False, nullable=True)
    autorizados = db.Column(db.String(60), unique=False, nullable=True)
    password = db.Column(db.String(80), unique=False, nullable=False)


class User_Empresa(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    empresa_id = db.Column(db.Integer, db.ForeignKey('empresa.id'))
    role = db.Column(db.String(20), unique=False, nullable=False)
  

class Evento(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    empresa_id = db.Column(db.Integer, db.ForeignKey('empresa.id'))
    nombre = db.Column(db.String(40), unique=False, nullable=False)
    descripcion = db.Column(db.String(140), unique=False, nullable=False)
    ubicacion = db.Column(db.String(40), unique=False, nullable=False)
    fecha_inicio = db.Column(db.String(10), unique=False, nullable=False)
    fecha_fin = db.Column(db.String(10), unique=False, nullable=False)
    personas = db.Column(db.Integer, unique=False, nullable=False)
    free = db.Column(db.Boolean())
    importe = db.Column(db.Integer, unique=False, nullable=False)


class Valoracion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    evento_id = db.Column(db.Integer, db.ForeignKey('evento.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    estrellas = db.Column(db.Integer, unique=False, nullable=False)
    comentario = db.Column(db.String(120), unique=True, nullable=False)


class Factura(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    evento_id = db.Column(db.Integer, db.ForeignKey('evento.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    fecha = db.Column(db.String(10), unique=False, nullable=False)
    pasarela_id = db.Column(db.String(120), unique=True, nullable=False)
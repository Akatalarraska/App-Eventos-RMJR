from flask_sqlalchemy import SQLAlchemy
from datetime import date

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    dni = db.Column(db.String(20), unique=True, nullable=False)
    name = db.Column(db.String(50), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    user_empresa = db.relationship('User_Empresa', backref= 'user', lazy=True)
    evento = db.relationship('Evento', backref= 'user', lazy=True)
    factura = db.relationship('Factura', backref= 'user', lazy=True)
    valoracion = db.relationship('Valoracion', backref= 'user', lazy=True)

    def __repr__(self):
        return f'<User: {self.name}>'

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
    poblacion = db.Column(db.String(40), unique=False, nullable=True)
    direccion = db.Column(db.String(60), unique=False, nullable=True)
    codigo_postal = db.Column(db.Integer, unique=False, nullable=True)
    user_empresa = db.relationship('User_Empresa', backref= 'empresa', lazy=True)
    evento = db.relationship('Evento', backref= 'empresa', lazy=True)

    def __repr__(self):
        return f'<Empresa: {self.razon_social}>'

    def serialize(self):
        return {
            "id": self.id,
            "cif": self.cif,
            "razon_social": self.razon_social,
            "email": self.email,
            "poblacion": self.poblacion

            # do not serialize the password, its a security breach
        }

class User_Empresa(db.Model):
    __tablename__ = 'user_empresa'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    empresa_id = db.Column(db.Integer, db.ForeignKey('empresa.id'))
    role = db.Column(db.String(20), unique=False, nullable=False)
    

    def __repr__(self):
        return f'<User {self.role}>'

    def serialize(self):
        return {
            "id": self.id,
            "role": self.role
            
            # do not serialize the password, its a security breach
        }
  

class Evento(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    empresa_id = db.Column(db.Integer, db.ForeignKey('empresa.id'))
    nombre = db.Column(db.String(200), unique=False, nullable=False)
    descripcion = db.Column(db.String(1400), unique=False, nullable=False)
    imagen = db.Column(db.String(400), unique=False, nullable=True)
    ubicacion = db.Column(db.String(40), unique=False, nullable=False)
    fecha_inicio = db.Column(db.String(10), unique=False, nullable=False)
    fecha_fin = db.Column(db.String(10), unique=False, nullable=False)
    personas = db.Column(db.Integer, unique=False, nullable=False)
    free = db.Column(db.Boolean())
    importe = db.Column(db.Integer, unique=False, nullable=True)
    valoracion = db.relationship('Valoracion', backref= 'evento', lazy=True)
    

    def __repr__(self):
        return f'<Evento {self.id}>'

    def serialize(self):

        return {
            "id": self.id,
            "imagen": self.imagen,
            "nombre": self.nombre,
            "descripcion": self.descripcion,
            "ubicacion": self.ubicacion,
            "fecha_inicio": self.fecha_inicio,
            "fecha_fin": self.fecha_fin,
            "personas": self.personas,
            "free": self.free,
            "importe": self.importe
            # do not serialize the password, its a security breach
        }

class Valoracion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    evento_id = db.Column(db.Integer, db.ForeignKey('evento.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    estrellas = db.Column(db.Integer, unique=False, nullable=False)
    comentario = db.Column(db.String(1500), unique=True, nullable=False)

    def __repr__(self):
        return f'<Valoracion {self.evento_id}>'

    def serialize(self):
        return {
            "id": self.id,
            "estrellas": self.estrellas,
            "comentario": self.comentario,
            "evento": self.evento.serialize()
            # do not serialize the password, its a security breach
        }

class Factura(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    evento_id = db.Column(db.Integer, db.ForeignKey('evento.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    fecha = db.Column(db.Date, nullable=False, default=date.today)
    cantidad = db.Column(db.Integer, nullable=True)
    precio = db.Column(db.Integer, nullable=True)
    pasarela_id = db.Column(db.String(120), unique=True, nullable=True)
    evento = db.relationship('Evento', backref= 'factura', lazy=True)

    def __repr__(self):
        return f'<Fra {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "fecha": self.fecha,
            "cantidad": self.cantidad,
            "precio": self.precio,
            "pasarela_id": self.pasarela_id,
            "evento": self.evento.serialize()
            # do not serialize the password, its a security breach
        }
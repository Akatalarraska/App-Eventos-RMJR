from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    dni = db.Column(db.String(20), unique=True, nullable=False)
    name = db.Column(db.String(50), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    user_empresa = db.relationship('User_Empresa', backref= 'user', lazy=True)

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

    def __repr__(self):
        return f'<Empresa: {self.razon_social}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

class User_Empresa(db.Model):
    __tablename__ = 'user__empresa'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    empresa_id = db.Column(db.Integer, db.ForeignKey('empresa.id'))
    role = db.Column(db.String(20), unique=False, nullable=False)
    evento = db.relationship('Evento', backref = 'user_empresa', lazy = 'dynamic')

    def __repr__(self):
        return f'<User {self.user_id}>'

    def serialize(self):
        return {
            "id": self.id,
            
            # do not serialize the password, its a security breach
        }
  

class Evento(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_empresa_id = db.Column(db.Integer, db.ForeignKey('user__empresa.id'))
    """
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    empresa_id = db.Column(db.Integer, db.ForeignKey('empresa.id'))
    """
    nombre = db.Column(db.String(40), unique=False, nullable=False)
    descripcion = db.Column(db.String(140), unique=False, nullable=False)
    ubicacion = db.Column(db.String(40), unique=False, nullable=False)
    fecha_inicio = db.Column(db.String(10), unique=False, nullable=False)
    fecha_fin = db.Column(db.String(10), unique=False, nullable=False)
    personas = db.Column(db.Integer, unique=False, nullable=False)
    free = db.Column(db.Boolean())
    importe = db.Column(db.Integer, unique=False, nullable=True)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

class Valoracion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    evento_id = db.Column(db.Integer, db.ForeignKey('evento.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    estrellas = db.Column(db.Integer, unique=False, nullable=False)
    comentario = db.Column(db.String(120), unique=True, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

class Factura(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    evento_id = db.Column(db.Integer, db.ForeignKey('evento.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    fecha = db.Column(db.String(10), unique=False, nullable=False)
    pasarela_id = db.Column(db.String(120), unique=True, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
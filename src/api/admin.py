  
import os
from flask_admin import Admin
from .models import db, User, Empresa, User_Empresa, Evento, Valoracion, Factura
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    class UserAdmin(ModelView):
        column_display_pk = True
        list_display = ('id', 'dni', 'email', 'passsword')
    
    class EventoAdmin(ModelView):
        column_display_pk = True
        list_display = ('id', 'nombre', 'descripcion', 'imagen', 'fecha_inicio', 'fecha_fin', 'personas', 'free','importe')


    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(UserAdmin(User, db.session))
    admin.add_view(EventoAdmin(Evento, db.session))
    admin.add_view(ModelView(Empresa, db.session))
    admin.add_view(ModelView(User_Empresa, db.session))
    admin.add_view(ModelView(Valoracion, db.session))
    admin.add_view(ModelView(Factura, db.session))

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))
"""empty message

Revision ID: e8acbc07fc95
Revises: e9432dcb9a8a
Create Date: 2023-06-21 16:42:16.795091

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e8acbc07fc95'
down_revision = 'e9432dcb9a8a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('evento', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_id', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('empresa_id', sa.Integer(), nullable=True))
        batch_op.drop_constraint('evento_user_empresa_id_fkey', type_='foreignkey')
        batch_op.create_foreign_key(None, 'empresa', ['empresa_id'], ['id'])
        batch_op.create_foreign_key(None, 'user', ['user_id'], ['id'])
        batch_op.drop_column('user_empresa_id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('evento', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_empresa_id', sa.INTEGER(), autoincrement=False, nullable=True))
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('evento_user_empresa_id_fkey', 'user__empresa', ['user_empresa_id'], ['id'])
        batch_op.drop_column('empresa_id')
        batch_op.drop_column('user_id')

    # ### end Alembic commands ###

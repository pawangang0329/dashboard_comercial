import os

import bcrypt
import psycopg2
from dotenv import load_dotenv
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================================================
# CONEXIÓN A POSTGRESQL
# =========================================================

def obtener_conexion():
    return psycopg2.connect(
        host=os.getenv("DB_HOST"),
        port=os.getenv("DB_PORT"),
        dbname=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
    )


# =========================================================
# MODELO PARA LOGIN
# =========================================================

class LoginRequest(BaseModel):
    usuario_id: int
    password: str


# =========================================================
# INICIO
# =========================================================

@app.get("/")
def inicio():
    return {
        "mensaje": "Backend del Dashboard funcionando"
    }


# =========================================================
# PRUEBA DE BASE DE DATOS
# =========================================================

@app.get("/prueba-db")
def prueba_db():

    try:
        conexion = obtener_conexion()

        cursor = conexion.cursor()

        cursor.execute("SELECT current_database();")

        base_datos = cursor.fetchone()[0]

        cursor.close()
        conexion.close()

        return {
            "conexion": "OK",
            "base_de_datos": base_datos
        }

    except Exception as error:

        return {
            "conexion": "ERROR",
            "detalle": str(error)
        }


# =========================================================
# LOGIN
# =========================================================

@app.post("/login")
def login(datos: LoginRequest):

    try:

        conexion = obtener_conexion()

        cursor = conexion.cursor()

        cursor.execute(
            """
            SELECT
                id,
                nombre,
                usuario,
                rol,
                nacional_id,
                password_hash,
                debe_cambiar_password,
                activo
            FROM usuarios
            WHERE id = %s
            """,
            (datos.usuario_id,)
        )

        usuario = cursor.fetchone()

        cursor.close()
        conexion.close()

        # -------------------------------------------------
        # USUARIO NO EXISTE
        # -------------------------------------------------

        if usuario is None:

            return {
                "login": False,
                "mensaje": "Usuario no encontrado"
            }

        (
            id_usuario,
            nombre,
            nombre_usuario,
            rol,
            nacional_id,
            password_hash,
            debe_cambiar_password,
            activo
        ) = usuario

        # -------------------------------------------------
        # USUARIO INACTIVO
        # -------------------------------------------------

        if not activo:

            return {
                "login": False,
                "mensaje": "Usuario inactivo"
            }

        # -------------------------------------------------
        # VERIFICAR CONTRASEÑA
        # -------------------------------------------------

        if not password_hash:

            return {
                "login": False,
                "mensaje": "El usuario no tiene contraseña configurada"
            }

        contraseña_correcta = bcrypt.checkpw(
            datos.password.encode("utf-8"),
            password_hash.encode("utf-8")
        )

        if not contraseña_correcta:

            return {
                "login": False,
                "mensaje": "Contraseña incorrecta"
            }

        # -------------------------------------------------
        # LOGIN CORRECTO
        # -------------------------------------------------

        return {
            "login": True,
            "usuario": {
                "id": id_usuario,
                "nombre": nombre,
                "usuario": nombre_usuario,
                "rol": rol,
                "nacional_id": nacional_id
            },
            "debe_cambiar_password": debe_cambiar_password
        }

    except Exception as error:

        return {
            "login": False,
            "mensaje": "Error del servidor",
            "detalle": str(error)
        }

    # =========================================================
# CAMBIAR CONTRASEÑA
# =========================================================

class CambiarPasswordRequest(BaseModel):
    usuario_id: int
    nueva_password: str


@app.post("/cambiar-password")
def cambiar_password(datos: CambiarPasswordRequest):

    try:

        # ---------------------------------------------
        # VALIDAR QUE SEAN EXACTAMENTE 6 DÍGITOS
        # ---------------------------------------------

        if not datos.nueva_password.isdigit():
            return {
                "actualizado": False,
                "mensaje": "La contraseña debe contener únicamente números"
            }

        if len(datos.nueva_password) != 6:
            return {
                "actualizado": False,
                "mensaje": "La contraseña debe tener exactamente 6 dígitos"
            }

        # ---------------------------------------------
        # GENERAR HASH
        # ---------------------------------------------

        nuevo_hash = bcrypt.hashpw(
            datos.nueva_password.encode("utf-8"),
            bcrypt.gensalt()
        ).decode("utf-8")

        # ---------------------------------------------
        # ACTUALIZAR USUARIO
        # ---------------------------------------------

        conexion = obtener_conexion()

        cursor = conexion.cursor()

        cursor.execute(
            """
            UPDATE usuarios
            SET
                password_hash = %s,
                debe_cambiar_password = FALSE
            WHERE id = %s
            """,
            (nuevo_hash, datos.usuario_id)
        )

        if cursor.rowcount == 0:

            cursor.close()
            conexion.close()

            return {
                "actualizado": False,
                "mensaje": "Usuario no encontrado"
            }

        conexion.commit()

        cursor.close()
        conexion.close()

        return {
            "actualizado": True,
            "mensaje": "Contraseña actualizada correctamente"
        }

    except Exception as error:

        return {
            "actualizado": False,
            "mensaje": "Error del servidor",
            "detalle": str(error)
        }
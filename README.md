# Proyecto de segundo parcial para la materia de aplicaciones de base de datos (Universidad Mesoamericana de San Agustín. 6to semestre) en Node.js, Express, Passport y diferentes dependencias.
El proyecto se trata de un cifrador de textos a diferentes tipos de cifrados. Para que el proyecto funcione se deben de instalar estas dependencias:
## **Para instalar las dependencias se debe poner en la terminal _npm install (la dependencia) -E_ para instalar una versión exacta.**
```
"dependencies": {
  "bcrypt": "5.1.1",
  "body-parser": "1.20.2",
  "connect-flash": "0.1.1",
  "cookie-parser": "1.4.6",
  "dotenv": "16.4.5",
  "express": "4.19.2",
  "express-session": "1.18.0",
  "jsonwebtoken": "9.0.2",
  "mysql2": "3.9.7",
  "nodemon": "3.1.0",
  "passport": "0.7.0",
  "passport-local": "1.0.0",
  "pug": "3.0.2",
  "sass": "1.75.0"
}
```
Así mismo el proyecto utilizan los siguientes scripts para optimizar tareas:
```
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "compile-sass": "sass styles/sass/styles.sass:public/css/styles.css",
    "start": "npm run compile-sass && nodemon server.js"
  },
```
+ `compile-sass`: Este script compila los archivos Sass ubicados en styles/sass/styles.sass y genera un archivo CSS en public/css/styles.css.
+ `start`: Este script primero ejecuta npm run compile-sass para compilar los estilos Sass a CSS y luego inicia el servidor utilizando nodemon server.js.
+ Para compilar el proyecto coloca dentro del apartado de `scripts` esas líneas y dentro de la terminal escribe `npm start`.
## Se maneja el siguiente esquema de base de datos en MySQL Workbench:
```
CREATE DATABASE encode_text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE encode_text;

CREATE TABLE IF NOT EXISTS usuarios(
  id INT PRIMARY KEY AUTO_INCREMENT, 
  nombre VARCHAR(255) NOT NULL,
  apellido_pat VARCHAR(255) NOT NULL,
  apellido_mat VARCHAR(255),
  username VARCHAR(255) NOT NULL,
  correo VARCHAR(255) NOT NULL,
  contrasenia_hash VARCHAR(255) NOT NULL
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS conversiones_sin_usuario(
  id INT PRIMARY KEY AUTO_INCREMENT,
  texto_por_convertir LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  texto_criptado LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  algoritmo TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  clave_sin_usuario TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  fecha_encode_sin_usuario TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS conversiones_con_usuario(
  id INT PRIMARY KEY AUTO_INCREMENT,
  id_usuario INT, 
  texto_por_convertir_usuario LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  texto_criptado_usuario LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  algoritmo TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  clave_con_usuario TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  fecha_encode_con_usuario TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);

CREATE TABLE IF NOT EXISTS veces_login(
  id INT PRIMARY KEY AUTO_INCREMENT,
  id_usuario INT, 
  fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);

CREATE TABLE IF NOT EXISTS veces_logout(
  id INT PRIMARY KEY AUTO_INCREMENT,
  id_usuario INT,
  fecha_logout TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);

ALTER TABLE usuarios
ADD CONSTRAINT username_unique UNIQUE (username);
```
> **NOTA: El backup de la base de datos ya viene en la carpeta de _database_connections_ en caso de querer simplemente importarla.**

Por último maneja variables de entorno por lo que se deberá de configurar estas mismas con la información del usuario. Es importante realizar cada uno de estos pasos para tener la aplicación lo más optimizada posible.

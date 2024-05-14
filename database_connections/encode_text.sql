 CREATE DATABASE encode_text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- Configuración para aceptar carácteres especiales como emojis y demás

USE encode_text; -- Llamada a la base de datos recién creada

CREATE TABLE IF NOT EXISTS usuarios(
id INT PRIMARY KEY AUTO_INCREMENT, 
nombre VARCHAR(255) NOT NULL,
apellido_pat VARCHAR(255) NOT NULL,
apellido_mat VARCHAR(255),
username VARCHAR(255) NOT NULL,
correo VARCHAR(255) NOT NULL,
contrasenia_hash VARCHAR(255) NOT NULL
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci; -- Definición de carácteres especiales

CREATE TABLE IF NOT EXISTS conversiones_sin_usuario(
id INT PRIMARY KEY AUTO_INCREMENT,
texto_por_convertir LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
texto_criptado LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
algoritmo TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
clave_sin_usuario TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
fecha_encode_sin_usuario TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);-- Definición de carácteres especiales

CREATE TABLE IF NOT EXISTS conversiones_con_usuario(
id INT PRIMARY KEY AUTO_INCREMENT,
id_usuario INT, 
texto_por_convertir_usuario LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
texto_criptado_usuario LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
algoritmo TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
clave_con_usuario TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
fecha_encode_con_usuario TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
); -- Definición de carácteres especiales

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
ADD CONSTRAINT username_unique UNIQUE (username); -- Añadido de un constraint para 
-- que solo se acepte un único usuario con un único username

-- DROP DATABASE encode_text;
-- Comentario para dropear la base de datos (prueba y error)
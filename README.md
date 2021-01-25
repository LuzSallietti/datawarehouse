# Data Warehouse

Trabajo práctico integrador correspondiente a la carrera de Desarrollo Web Full Stack de Acámica.

El objetivo del proyecto es generar un sitio web que permita a una compañía de Marketing ficticia gestionar todos los contactos de sus clientes para sus campañas. La herramienta realiza operaciones CRUD a la base de datos de contactos que incluyen: sus datos personales, sus preferencias, canales de comunicación, compañía donde trabajan, y lugar donde viven.
Por lo tanto, el proyecto implica el desarrollo de la interfaz (frontend, en versión desktop) así como también la integración y conexión a una base de datos MySQL (desarrollo backend).

## Recursos utilizados
* HTML
* CSS
* Bootstrap
* SASS
* Javascript
* Node.js
* Express
* Sequelize
* Mysql2
* Json Web Token
* Dotenv
* Nodemon
* Base de datos MySQL
* Postman (para el testing de endpoints)
* Swagger (para la documentación con estándar OpenAPI 3)

## Instalar e inicializar el proyecto

#### 1 - Clonar proyecto
Clonar o descargar el repositorio de Github desde este [link](https://github.com/LuzSallietti/datawarehouse.git)

Desde la consola, clonar el repositorio con el comando:

```bash
git clone https://github.com/LuzSallietti/datawarehouse.git
```


#### 2 - Instalar dependencias
Desde la consola, con el comando:
```bash
npm install
```
#### 3 - Crear variables de entorno
Dentro de la carpeta server del repositorio, crear un archivo .env con las siguientes variables y sus valores:
* PORT = 3000
* mysql_db = datawarehouse
* mysql_host = localhost
* mysql_db_port = 3306
* mysql_user = (asignar el usuario)
* mysql_pass = (asignar el password)
* jtw_SEED = (asignar un valor)


#### 4 - Crear la base de datos

* Abrir XAMPP y asegurarse que el puerto sobre el cual se está ejecutando es el 3306
* Inicializar los servicios de Apache y MySQL
* Abrir el panel de control del servicio MySQL (por ej. PHP MyAdmin)
* Abrir el archivo que se encuentra en /Backend/database/db.sql y dentro del panel de control de la base de datos ejecutar la serie de queries del archivo o importar el mismo. Se crearán la base de datos con el nombre datawarehouse, las tablas necesarias. En la tabla **users** se creará un usuario con rol administrador, necesario para el acceso en el login ( usuario: admin@rocket.com / password: acamica).
En la tabla **channels** se crearán seis registros, correspondientes a los posibles canales/vías de comunicación que pueden asignarse a un contacto (teléfono, Whatsapp, email, Linkedin, Facebook, Instagram).
* Asignar a la base de datos el mismo usuario y password establecidos en las variables de entorno mysql_user y mysql_pass (en el archivo .env antes creado). 


#### 4 - Iniciar el servidor
Abrir el archivo en /Backend/app.js desde node
```bash
node app.js
```

## Login y navegación
Abrir el archivo index.html desde el navegador web y ejecutar el acceso con las credenciales ya creadas en la base de datos, con privilegio de administrador (usuario: admin@rocket.com / password: acamica).

## Extra- Consulta de documentación

Abrir el archivo delilah.yaml y copiar su contenido en [Swagger](https://editor.swagger.io/#) o abrirlo en el editor de código.
Permite acceder a los endpoints y métodos disponibles, junto con la información necesaria para hacer uso de los mismos.

## Extra - Testeo
Testear los endpoints documentados en Swagger desde Postman para poder hacer uso de la API y base de datos generadas.
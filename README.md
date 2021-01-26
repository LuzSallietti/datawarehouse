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
Dentro de la carpeta Backend del repositorio, crear un archivo .env con las siguientes variables y sus valores:

mysql_db = datawarehouse

mysql_user = asigna tu valor

mysql_pass = asigna tu valor

mysql_host = localhost

mysql_db_port = 3306

jtw_SEED = asigna tu valor

PORT = 3000


#### 4 - Crear la base de datos

* Abrir XAMPP y asegurarse que el puerto sobre el cual se está ejecutando es el 3306
* Inicializar los servicios de Apache y MySQL
* Abrir el panel de control del servicio MySQL (por ej. PHP MyAdmin)
* Abrir el archivo que se encuentra en /Backend/database/db.sql y dentro del panel de control de la base de datos ejecutar la serie de queries del archivo o importar el mismo. Se crearán la base de datos con el nombre datawarehouse, las tablas necesarias. En la tabla **users** se creará un usuario con rol administrador, necesario para el acceso en el login ( usuario: admin@rocket.com / password: acamica).
En la tabla **channels** se crearán seis registros, correspondientes a los posibles canales/vías de comunicación que pueden asignarse a un contacto (teléfono, Whatsapp, email, Linkedin, Facebook, Instagram).
* Asignar a la base de datos el mismo usuario y password establecidos en las variables de entorno mysql_user y mysql_pass (en el archivo .env antes creado). 


#### 5 - Iniciar el servidor
Abrir el archivo en /Backend/app.js desde node
```bash
node app.js
```

## Login y navegación
Abrir el archivo /Frontend/index.html desde el navegador web, ejecutando localhost en el puerto 5500 (con Live Server por ej. desde Visual Studio Code): http://localhost:5500/Frontend/index.html y ejecutar el acceso con las credenciales ya creadas en la base de datos, con privilegio de administrador (usuario: admin@rocket.com / password: acamica).
* En la sección Usuarios se podrán consultar, crear, actualizar y eliminar usuarios del sistema, asignándoles pefil de usuario administrador o usuario básico.
* En la sección Región/Ciudad se podrán crear, consultar, actualizar y eliminar regiones, países y ciudades.
* En la sección Compañías se podrán crear, consultar, actualizar y eliminar compañías.
* Una vez trabajadas las anteriores secciones, en la sección Contactos se crearán, consultarán, actualizarán y eliminarán (de forma individual o masiva), los contactos.

## Extra- Consulta de documentación

Abrir el archivo /Backend/docs/datawarehouse.yaml y copiar su contenido en [Swagger](https://editor.swagger.io/#) o abrirlo en el editor de código.
Permite conocer los endpoints y servicios desarrollados, junto con la información necesaria para hacer uso de los mismos.
## TaskManagerBack

Desarrollar una aplicación de gestión de tareas "Task Manager" que permita a los usuarios: ● Crear, leer, actualizar y eliminar tareas. ● Visualizar la lista de tareas en una interfaz intuitiva y moderna. ● Marcar tareas como completadas o pendientes.

Esta es una API de administrador de tareas simple creada con Node.js, Express y MongoDB. El proyecto permite a los usuarios administrar tareas con funciones básicas como crear, ver, editar y eliminar tareas. También incluye autenticación de usuarios y seguimiento del historial de tareas.

## Requisitos previos

Antes de comenzar, asegúrese de cumplir con los siguientes requisitos:

- Node.js v21.4.0
- MongoDB (Cloud MongoDB Atlas o instancia local)
- Docker (opcional)

## Instalación

Siga los pasos a continuación para instalar y ejecutar el proyecto:

1. Clone el repositorio:

```bash
git clone https://github.com/Sramirei/TaskManagerBack.git
cd TaskManagerBack
```

2. Instale las dependencias:

```bash
npm install
```

3. Configure las variables de entorno. Cree un archivo `.env` en el directorio raíz e incluya lo siguiente:

```bash
MONGO_URL=mongodb+srv://your-username:your-password@cluster0.mongodb.net/TaskManager?retryWrites=true&w=majority
PORT=9000
SECRET_JWT=your-secret-jwt
NODE_ENV=development
```

4. Inicie el servidor:

- Para desarrollo (con recarga en caliente):

```bash
npm run dev
```

- Para producción:

```bash
npm start
```

5. Su API ahora debería estar ejecutándose en `http://localhost:9000`.

## Compatibilidad con Docker

Para ejecutar el proyecto con Docker, siga estos pasos: (ejecute los comandos en la raiz del proyecto)

1. Genere la imagen de Docker:

```bash
docker build -t task-manager-back .
```

2. Ejecute el contenedor de Docker:

```bash
docker run -p 9000:9000 task-manager-back
```

La aplicación estará disponible en `http://localhost:9000`.

## API de puntos finales

### Usuario

- **POST /api/v1/user/create** - Crear un nuevo usuario.
- Cuerpo de la solicitud: (si desea crear un usuario administrador debera agregar la propiedad "admin : true").

```json
{
  "userName": "",
  "password": ""
}
```

- **POST /api/v1/user/login** - Iniciar sesión como usuario y obtener un token JWT.
- Cuerpo de la solicitud:

```json
{
  "userName": "",
  "password": ""
}
```

###Tarea

- **POST /api/v1/task/create** - Crear una nueva tarea.
- Cuerpo de la solicitud:
  -> title obligatorio
  -> description debe estar en el json pero puede enviarse vacio
  -> completed obligatorio, debe enviar un boolean
  -> author obligatorio, es el id del usuario que te retorna el login

```json
{
"title": "",
"description": "",
"completed": false,
"author": "" <- id de usuario
}
```

- **GET /api/v1/task/** - Obtener todas las tareas.
- **GET /api/v1/task/forUser/{userId}** - Obtener las tareas de un usuario específico. (es el id del usuario que te retorna el login)
- **GET /api/v1/task/{taskId}** - Obtener una tarea específica por ID.
- **PUT /api/v1/task/edit/{taskId}** - Editar una tarea existente.
- Cuerpo de la solicitud:
  -> title obligatorio
  -> description debe estar en el json pero puede enviarse vacio
  -> state debe enviarse una de estas opciones (created, progress, finished)
  -> completed obligatorio, debe enviar un boolean

```json
{
  "title": "Tarea actualizada",
  "description": "Descripción actualizada",
  "state": "created",
  "completed": true
}
```

- **DELETE /api/v1/task/deleted/{taskId}** - Eliminar una tarea específica.

### Historial

- **GET /api/v1/history** - Obtener el historial de acciones de la tarea.

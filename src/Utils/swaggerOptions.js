const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "TaskManagerBack",
      version: "1.0",
      description:
        "Desarrollar una aplicación de gestión de tareas Task Manager que permita a los usuarios: ● Crear, leer, actualizar y eliminar tareas. ● Visualizar la lista de tareas en una interfaz intuitiva y moderna. ● Marcar tareas como completadas o pendientes.",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Sebastian Ramirez",
        url: "https://www.linkedin.com/in/sebastian-ramirez-ibarra/",
        gitHub: "https://github.com/Sramirei",
        email: "seebaastiian24@gmail.com",
      },
    },
    servers: [
      {
        url:
          process.env.NODE_ENV === "production"
            ? process.env.NODE_ENV
            : `http://localhost:${process.env.PORT}`,
      },
    ],
  },
  apis: ["../Routes/*.js", "../Controllers/*.js"],
};

module.exports = { options };

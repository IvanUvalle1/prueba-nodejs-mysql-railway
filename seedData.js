const faker = require('faker');
const mysql = require('mysql');

const dbOptions = {
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '',
  database: 'library'
};

const connection = mysql.createConnection(dbOptions);

// Function que genera y agrega los usuarios
const seedUsers = (numUsers) => {
  for (let i = 0; i < numUsers; i++) {
    const user = {
        nombre: faker.name.firstName(), // Cambiado a nombre
        primer_apellido: faker.name.lastName(), // Cambiado a apellido
        id_tarea_usuario: 0, // Agregado id_tarea_usuario con valor 0
      };

    connection.query('INSERT INTO usuarios SET ?', user, (err, result) => {
      if (err) throw err;
      console.log(`User inserted with ID ${result.insertId}`);
    });
  }
};

// Function que genera y agrega tareas
const seedTasks = (numTasks) => {
  for (let i = 0; i < numTasks; i++) {
    const task = {
        tarea: faker.lorem.sentence(), // Cambiado a tarea
        id_tarea_usuario: 0, // Agregado id_tarea_usuario con valor 0
        status: 1, // Agregado status con valor 1
      };

    connection.query('INSERT INTO tarea SET ?', task, (err, result) => {
      if (err) throw err;
      console.log(`Task inserted with ID ${result.insertId}`);
    });
  }
};

// agregar 30 usuarios y 20 tareas
seedUsers(30);
seedTasks(20);

connection.end();
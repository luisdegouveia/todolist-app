var express = require('express');
var router = express.Router();
const Task = require('../models/task');

// creamos la ruta de la pagina de la pagina index y la renderizamos. la ruta es / y el render es index.
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// creamos la ruta de la pagina de la pagina tasks y la renderizamos. 
// enumera los tasks en una nueva ruta.
router.get('/tasks', (req, res, next) => {
  Task.find()
    .then(allTheTasksFromDB => {
      res.render('tasks', { tasks: allTheTasksFromDB });
    })
    .catch(error => {
      console.log('Error while getting the tasks from the DB: ', error);
    })
});

// agregamos una tarea nueva
router.get('/task/add', (req, res, next) => {
  res.render("task-add");
});

router.post('/task/add', (req, res, next) => {
  const { title, author, description } = req.body;
  const newTask = new Task({ title, author, description})
  newTask.save()
  .then((task) => {
    res.redirect('/tasks');
  })
  .catch((error) => {
    console.log(error);
  })
});

// creamos la ruta de la pagina task/edit y la renderizamos.
router.get("/task/edit", (req, res, next) => {
  Task.findOne({ _id: req.query.task_id })
    .then((task) => {
      res.render("task-edit", { task });
    })
    // si hay un error, se ejecuta el catch que dentro tiene un console.log 
    .catch((error) => {
      console.log(error);
    });
});

router.post("/task/edit", (req, res, next) => {
  const { title, author, description } = req.body;
  // la sintaxis del metodo update recibe tres parametros: 
  Task.updateOne(
    // el primero, es el query para buscar lo que queremos editar.
    { _id: req.query.task_id },
    // el segundo, especificamos los campos que queremos actualizar.
    { $set: { title, author, description } },
    // el tercero, un objeto en el cual especificamos que queremos el nuevo documento. 
    { new: true }
  )
  // task es un parametro, es todo lo que me devuelve el resultado de la busqueda. 
    .then((task) => {
      // si todo sale bien, se ejecutara el then. si hay error ira al catch de abajo.
      res.redirect("/tasks");
    })
    // si hay un error, se ejecuta el catch que dentro tiene un console.log 
    .catch((error) => {
      console.log(error);
    });
});

router.post('/task/:taskId', (req, res, next) => {
  Task.findByIdAndDelete({ _id: req.query.task_id })
    .then((deleteTask) => {
      res.redirect("/tasks")
    })
    .catch((error) => {
      console.log('Error while deleting the task: ', error)
    })
})

// detalle de la tarea.
router.get('/task/:taskId', (req, res, next) => {
  Task.findById(req.params.taskId)
    .then(theTask => {
      res.render('task-details', { task: theTask });
    })
    .catch(error => {
      console.log('Error while retrieving task details: ', error);
    })  
});

module.exports = router;

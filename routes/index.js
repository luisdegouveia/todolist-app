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

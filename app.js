// nos permite acceder a las variables de entorno (cosas que no queremos mostrar)
require('dotenv').config();

var createError = require('http-errors');
// requerimos express.
var express = require('express');
// requerimos el modulo path.
var path = require('path');
// requerimos el modulo cookie parser, detecta si tiene cookies guardadas. 
var cookieParser = require('cookie-parser');
// requerimos el modulo morgan. 
var logger = require('morgan');

// requerimos el favicon.
const favicon = require('serve-favicon');
// requerimos handlebars.
const hbs = require('hbs');
// requerimos mongoose. 
const mongoose = require('mongoose');

//para conecctarnos a mongoose
mongoose
  .connect('mongodb://localhost/todolist-project', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  // si todo sale bien, se ejecutara el then.
  // x es todo lo que me devuelve el resultado de la busqueda. 
  .then(x => {
    console.log(
      // si todo se ejecuta bien nos muestra el console.log
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  // si ocurre un error, nos muestra este mensaje.
  .catch(err => {
    console.error('Error connecting to mongo', err);
  });

// para no tener las rutas en este archivo, las escribimos dentro de una carpeta llamada routes.
// dentro de nuestra carpeta routes se encuentran todas las rutas, en este archivo solo las requerimos. 
// creamos unas variables y usamos el metodo require, lo que esta dentro de los parentesis es la ruta donde esta el archivo.
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const router = require('./routes/index');

// ejecutamos express.
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

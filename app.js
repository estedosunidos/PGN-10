var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var perfilRouter = require('./routes/perfil');
var UsuarioRouter = require('./routes/Usuario');
var EstudiantesRouter = require('./routes/Estudiantes');
var DocenteRouter = require('./routes/Docente');
var AdministradorRouter = require('./routes/Administrador');
var AsignaturaRouter = require('./routes/Asignatura');
var CursoRouter = require('./routes/Curso');
var NotasRouter=require('./routes/Notas');
var AsistenciaRouter=require('./routes/Asistencia');
var EvaluacionesTipoRouter=require('./routes/EvaluacionesTipo');
var PlanEvaluacionRouter=require('./routes/PlanEvaluacion');
var Franja_HorarioRouter=require('./routes/Franja_Horario');
var UbicacionRouter=require('./routes/Ubicacion');
var CarreraRouter=require('./routes/Carrera');
var Estudio_RealizadoRouter=require('./routes/Estudio_Realizado');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/perfil', perfilRouter);

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

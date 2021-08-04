var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var  cors =require('cors');

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
var LoginRouter=require('./routes/login');
var FotoRouter=require('./routes/foto');
var AnuncioRouter=require('./routes/Anuncio');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', LoginRouter);
app.use('/perfil', perfilRouter);
app.use('/curso',  CursoRouter);
app.use('/asignatura',AsignaturaRouter);
app.use('/carrera',CarreraRouter);
app.use('/ubicacion',UbicacionRouter);
app.use('/franjahorario',Franja_HorarioRouter);
app.use('/planevaluacion',PlanEvaluacionRouter);
app.use('/evaluaciontipo',EvaluacionesTipoRouter);
app.use('/asistencia',AsistenciaRouter);
app.use('/notas',NotasRouter);
app.use('/administrador',AdministradorRouter);
app.use('/docente',DocenteRouter);
app.use('/estudiantes',EstudiantesRouter);
app.use('/usuario',UsuarioRouter);
app.use('/foto',FotoRouter);
app.use('/anuncio',AnuncioRouter);

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

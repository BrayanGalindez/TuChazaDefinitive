const express = require('express');
const path = require('path');
const morgan = require('morgan');
const multer = require('multer');
const { v4: uuid } = require('uuid');
const {format} = require('timeago.js');

//Inicializaciones

const app = express();
require('./database');
//Configuraciones
app.set('port', process.env.PORT || 3000);
app.set('views' , path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Middlewares
app.use(morgan('dev'));


//urlencoded ayuda a entender los datos que vienen de un formulario
app.use(express.urlencoded({extended: false}));
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/img/uploads'),
    filename: (req, file, cb, filename) => {
        console.log(file);
        cb(null, uuid() + path.extname(file.originalname));
    }
})   
app.use(multer({
    storage: storage
}).single('image'));


//Variables globales
app.use((req, res, next)=>{
    app.locals.format = format;
    next();
});
//Rutas
app.use(require('./routes/index'));

//Archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

//Start the server`
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const http = require('http');
const app = express();
const errorMiddleware = require('./src/middleware/errorMiddleware');
const bodyParser = require('body-parser');
const server = http.createServer(app);
const socketIo = require('socket.io');
const io = socketIo(server, {});
const path = require('path');
const fs = require('fs');

app.use(cors());

// Defina o esquema do modelo
const ImageSchema = new mongoose.Schema({
  base64: String
});

const ImageModel = mongoose.model('Image', ImageSchema);
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const destinationPath = path.join(__dirname, 'uploads');
    console.log('Destination Path:', destinationPath);

    // Verifica se o diretório de destino existe, se não, cria
    if (!fs.existsSync(destinationPath)) {
      fs.mkdirSync(destinationPath, { recursive: true });
    }

    cb(null, destinationPath);
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + '-' + file.originalname;
    console.log('Filename:', filename);
    cb(null, filename);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json({limit: '15mb'}));
app.use(errorMiddleware);

io.on('connection', socket => {
  const userToken = socket.handshake.query.token;

  // Recebe o nome de usuário após a autenticação
  socket.on('authenticate', username => {
    // Associa o nome de usuário ao Socket ID
    socket.username = username;
  });

  // Escuta mensagens do cliente
  socket.on('chat message', msg => {
    console.log('Received message:', msg);
    io.emit('chat message', { sentBy: msg.sentBy, content: msg.content });
  });

  // Trata a desconexão do usuário
  socket.on('disconnect', () => {});
});

// Db coneection
const conn = require('./src/db/conn');
conn();

// Routes
const routes = require('./src/routes/router');
app.use('/api', routes);

server.listen(8000, function () {
  console.log('Servidor Online!');
});

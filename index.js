const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Server } = require("socket.io");
const { createServer } = require('node:http');


const { notFoundHandler, errorHandler } = require('./middlewere/common/errorHandler');
const loginRouter = require('./router/loginRouter');
const inboxRouter = require('./router/inboxRouter');
const usersRouter = require('./router/usersRouter');

const app = express();

const expressServer = createServer(app)


// socket io
const io = new Server(expressServer,{
  cors:{
    origin:"*"
  },
  pingTimeout: 60000
});
global.io = io;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());




dotenv.config();
const port = 5000;

app.get('/', (req, res) => {
  res.send('Wechat server is running');
});

const connectDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      w: 'majority',

    });

    console.log('Connected to Wechat database ');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};

connectDb();

// parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

// routing setup
app.use('/login',loginRouter);
app.use('/users',usersRouter);
app.use('/inbox',inboxRouter);




//404 not fount error
app.use(notFoundHandler)

//error handler
app.use(errorHandler)


expressServer.listen(port, () => {
  console.log(`Wechat server listening on port ${port} ...... (>‿◠)✌`);
});

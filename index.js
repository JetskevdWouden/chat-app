// Import required modules
const express = require('express');
//const Sse = require('json-sse');
const bodyParser = require('body-parser');
const cors = require('cors')
const db = require('./db');

//DB - MODELS
const User = require('./user/model');
const Message = require('./message/model');

//DB - ROUTERS
const userRouter = require('./user/router');
const messageRouter = require('./message/router');

// Sample data store that will
// be sent to the client when
// a new client connects
// const messages = [
//     'Hello',
//     'You are connected...'
// ];
// Serialize the initial data
//const json = JSON.stringify(messages);

// Create the stream. Creates an event source
// It allows to generate messages to send to clients
// The stream allows you to register the client and
// then later send him messages.
//const stream = new Sse(json);

// Initialize and define port
const app = express();
const port = process.env.PORT || 5000;

// Register middlewares
const jsonParser = bodyParser.json();
app.use(cors());
app.use(jsonParser);
app.use(userRouter);
app.use(messageRouter);

//An on listen function that logs the current port
//start the server on the right port
function onListen() {
    console.log(`Listening on ${port}.`);
}

// Start listening
app.listen(port, onListen);
// Import required modules
const express = require('express');
const Sse = require('json-sse');
const bodyParser = require('body-parser');
const cors = require('cors')

// Sample data store that will
// be sent to the client when
// a new client connects
const messages = [
    'Hello',
    'You are connected...'
];
// Serialize the initial data
const json = JSON.stringify(messages);

// Create the stream. Creates an event source
// It allows to generate messages to send to clients
// The stream allows you to register the client and
// then later send him messages.
const stream = new Sse(json);

// Handles chat requests by initializing
const onStream = (req, res) => stream.init(req, res);

// Initialize and define port
const app = express();
const port = process.env.PORT || 5000;

// Register middlewares
app.use(cors());
const jsonParser = bodyParser.json();
app.use(jsonParser);

// Route listener for chat app events
app.get('/stream', onStream);

// Listen for new messages
const onMessage = (req, res) => {
    // Retrieve message from the body by destructing
    const { message } = req.body;
    // Add message to data store
    messages.push(message);
    // Re-serialize the store
    const json = JSON.stringify(messages);
    //update the initial data
    stream.updateInit(json)
    //notiofy all clients
    stream.send(json)
    //send a response
    return res.status(201).send(message)
}
app.post('/message', onMessage)

//An on listen function that logs the current port
//start the server on the right port
function onListen() {
    console.log(`Listening on ${port}.`);
}

// Start listening
app.listen(port, onListen);
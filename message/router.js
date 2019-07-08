const { Router } = require('express');
const Sse = require('json-sse');
const Message = require('./model');
//const User = require('../user/model');

const router = new Router();

Message
    .findAll()
    .then(messages => {
        const json = JSON.stringify(messages)
        const stream = new Sse(json);
        console.log(json)

        router.get('/stream', (req, res) => {
            stream.init(req, res)
        })

        router.post('/message', (req, res, next) => {
            const message = {
                content: req.body.message
            }
            Message
                .create(message)
                .then(message => {
                    Message
                        .findAll()
                        .then(messages => {
                            stream.updateInit(messages)
                            stream.send(messages)
                            return res
                                .status(201)
                                .send({
                                    "message": "YOU ADDED A MESSAGE",
                                    "new_message": message.content
                                })
                        })
                        .catch(error => next(error))
                })
                .catch(error => next(error))
        })
    })
    .catch(console.error)
    

module.exports = router;

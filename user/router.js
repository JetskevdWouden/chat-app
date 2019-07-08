const { Router } = require('express');
const {toJWT} = require('../auth/jwt');
const User = require('./model');
const Message = require('../message/model');

const router = new Router();

// '/'
// make username
router.post('/', (req, res, next) => {
    const user = {
        username: req.body.username
    }
    //if in model allowNull:true need an if statement here?
    if (user.username) {
        User
            .findOne({
                where: {
                    username: user.username
                }
            })
            .then(entity => {
                if (entity) {
                    res
                        .status(409)
                        .send({
                            message: `USERNAME: "${user.username}" ALREADY EXISTS`
                        })
                } else {
                    User
                        .create(user)
                        .then(user => {
                            res
                                .status(201)
                                .send({
                                    message: `NEW USER WITH USERNAME: "${user.username}"`,
                                    user_id: user.id
                                })
                        })
                }
            })
            .catch(error => next(error))
    } else {
        res
            .status(400)
            .send({
                message: "PLEASE FILL IN A USERNAME"
            })
    }
})

module.exports = router;
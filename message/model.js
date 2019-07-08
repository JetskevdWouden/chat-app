const Sequelize = require('sequelize');
const db = require('../db');
const User = require('../user/model');

const Message = db.define(
    'message',
    {
        content: {
            type: Sequelize.STRING
        }
    }, {
        timestamps: true,
        tableName: 'messages'
    }
)

Message.belongsTo(User);

module.exports = Message;

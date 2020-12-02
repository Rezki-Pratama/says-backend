'use sctrict'

module.exports = (app) => {
    let auth = require('../controller/auth');
    let message = require('../controller/message');
    
    app.route('/register').post(auth.register)
    app.route('/login').post(auth.login)
    app.route('/users').get(auth.getAllUsers)
    app.route('/users/:uuid').get(auth.getOneUsers)
    app.route('/users/:uuid').put(auth.editUsers)
    app.route('/users/:uuid').delete(auth.deleteUsers)

    // app.route('/message').post(message.createMessage)
    // app.route('/message').get(message.getMessage)
}
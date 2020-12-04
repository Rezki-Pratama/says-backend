'use sctrict'

module.exports = (app) => {
    const auth = require('../controller/auth');
    const message = require('../controller/message');
    const friend = require('../controller/friend');
    
    app.route('/register').post(auth.register)
    app.route('/login').post(auth.login)
    app.route('/users').get(auth.getAllUsers)
    app.route('/users/:uuid').get(auth.getOneUsers)
    app.route('/users/:uuid').put(auth.editUsers)
    app.route('/users/:uuid').delete(auth.deleteUsers)

    app.route('/friends').post(friend.addFriend)
    app.route('/friends').get(friend.getFriend)
    app.route('/searchFriends').get(friend.searchFriend)
    // app.route('/message').post(message.createMessage)
    // app.route('/message').get(message.getMessage)
}
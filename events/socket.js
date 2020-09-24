const { GetRandom, GetFriends } = require('../controllers/huntersCtrl');

const onConnection = socket => {
    console.log(`socket connected: ${socket.id}`)

    socket.on('disconnect', onDisconnection.bind(socket)) 

    socket.on('GetRandom', message => onGetRandom(message, socket))
    socket.on('GetFriends', message => onGetFriends(message, socket))
}


const onGetRandom = async (message, socket) => {
    const hunters = await GetRandom(message.user, message.hunterSelected);
    if (hunters) {
        socket.emit('ON_SUCCESS_GETRANDOM', {
			error: hunters.length > 0 ? false : true,
			message: '',
			rows: hunters.length,
			results: hunters
		})
    } else {
        socket.emit('ON_ERROR_GETRANDOM', {
			error: true,
			message: 'Hunter selected not found'
		})
    }
}

const onGetFriends = async (message, socket) => {
    const hunters = await GetFriends(message.user, message.hunterSelected);
    if (hunters) {
        socket.emit('ON_SUCCESS_GETFRIENDS', {
			error: hunters.length > 0 ? false : true,
			message: '',
			rows: hunters.length,
			results: hunters
		})
    } else {
        socket.emit('ON_ERROR_GETFRIENDS', {
			error: true,
			message: 'Hunter selected not found'
		})
    }
}



const onDisconnection = socket => {
    console.log(`socket has been disconnected`)
}


module.exports = {
    onConnection
}

import { activeSockets } from '../main.js';
export function executeCommand(username, session, command) {
    return new Promise(resolve => {
        const socket = getSocketFromSession(username, session);
        socket.emit('execute-command', command, data => {
            resolve(data);
        });
    });
}
export function getSocketFromSession(username, session) {
    if (!session || !username) {
        return undefined;
    }
    const connection = activeSockets[username]?.find(sock => sock.id === session.id.toString()) || undefined;
    if (!connection) {
        return undefined;
    }
    return activeSockets[username]?.find(sock => sock.id === session.id.toString())?.socket || undefined;
}
export class PersonalServerAcceleratorCommunication {
    socketConnection;
    constructor(username, session) {
        if (!session) {
            return undefined;
        }
        this.socketConnection = getSocketFromSession(username, session);
        return this;
    }
    listenFor(path, callBack) {
        this.socketConnection.on(path, callBack);
    }
    emit(path, data) {
        this.socketConnection.emit(path, data);
    }
}
//# sourceMappingURL=personalServerAccelerator.js.map
var log = require('./log');

class Channel {
    constructor(io, options) {
        this.io = io;
        this.options = options;
        this.privateChannels = ['private-*'];
        this.clientEvents = ['client-*'];
        this.private = new PrivateChannel(options);
        if(this.options.devMode) {
            log.Log.success('Channels are ready.')
        }
    }

    join(socket, data) {
        
        if(data.channel){
            if (this.isPrivate(data.channel)) {        
                this.joinPrivate(socket, data);
            }
            else {
                socket.join(data.channel);
                this.onJoin(socket, data.channel);
            }
        }
    }

    clientEvent(socket, data) {
        if (data.event && data.channel) {
            if (this.isClientEvent(data.event) &&
                this.isPrivate(data.channel) &&
                this.isInChannel(socket, data.channel)) {                    
                this.io.sockets.connected[socket.id]
                    .broadcast.to(data.channel)
                    .emit(data.event, data.channel, data.data);
            }
        }
    };

    leave (socket, channel, reason) {
        if (channel) {
            socket.leave(channel);
            if (this.options.devMode) {
                log.Log.info("[" + new Date().toLocaleTimeString() + "] - " + socket.id + " left channel: " + channel + " (" + reason + ")");
            }
        }
    };

    isPrivate(channel) {
        
        var isPrivate = false;
        this.privateChannels.forEach(function (privateChannel) {
            var regex = new RegExp(privateChannel.replace('\*', '.*'));
            if (regex.test(channel))
                isPrivate = true;
        });
        return isPrivate;
    }
    joinPrivate(socket, data) {
        socket.join(data.channel);
        this.onJoin(socket, data.channel);
    }

    onJoin(socket,channel) {
        if (this.options.devMode) {
            log.Log.info("[" + new Date().toLocaleTimeString() + "] - " + socket.id + " joined channel: " + channel);
        }
    }

    isClientEvent  (event) {
        var isClientEvent = false;
        this.clientEvents.forEach(function (clientEvent) {
            var regex = new RegExp(clientEvent.replace('\*', '.*'));
            if (regex.test(event))
                isClientEvent = true;
        });
       
        return isClientEvent;
    };
    isInChannel(socket, channel) {            
        return !!socket.adapter.rooms[channel];
    };
}

class PrivateChannel {
    constructor(options) {
        this.options = options;
    }
}

exports.Channel = Channel;
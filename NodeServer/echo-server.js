var Server = require('./server');
var Log = require('./log');
var channel = require('./channel');
var httpSubscriber = require('./http-subscriber');
const packageFile = require('./package.json');
class EchoServer {

    constructor(options) {
        this.options = options;
        this.defaultOptions = {
            clients: [],
            devMode: true,
            host: 'localhost',
            port: 3000,
            protocol: "http",
            socketio: {},
            sslCertPath: '',
            sslKeyPath: '',
            sslCertChainPath: '',
            sslPassphrase: '',
            subscribers: {
                http: true,
            },
            apiOriginAllow: {
                allowCors: false,
                allowOrigin: '',
                allowMethods: '',
                allowHeaders: ''
            }
        };

        this.subscribers = [];
        this.server = null;
        this.channel = null;
    }

    run() {
        var that = this;
        return new Promise((resolve, reject) => {
            that.options = Object.assign(that.defaultOptions, that.options);
            that.startup();
            // that.server = new Server(that.options);
            that.server = new Server.Server(that.options);

            that.server.init().then(io => {
                that.init(io).then(() => {
                    Log.Log.info('\nServer ready!\n');
                    resolve(that);
                }, error => Log.Log.error(error));
            }, error => Log.Log.error(error));
        });
    }

    /**
     * Initialize the class
     *
     * @param {any} io
     */
    init(io) {
        var that = this;
        return new Promise((resolve, reject) => {
            that.channel = new channel.Channel(io, that.options);

            // that.subscribers = [];
            // if (that.options.subscribers.http)
            //     that.subscribers.push(new httpSubscriber.HttpSubscriber(that.server.express, that.options));

            that.onConnect();
            that.listen().then(() => resolve(), err => Log.Log.error(err));
        });
    }

    /**
     * Text shown at startup.
     *
     * @return {void}
     */
    startup() {
        Log.Log.title(`\nZ E N D  E C H O  S E R V E R\n`);
        Log.Log.info(`version ${packageFile.version}\n`);

        if (this.options.devMode) {
            Log.Log.warning('Starting server in DEV mode...\n');
        } else {
            Log.Log.info('Starting server...\n')
        }
    }

     /**
     * Listen for incoming event from subscibers.
     *
     * @return {void}
     */
    listen() {
        var that = this;
        return new Promise((resolve, reject) => {
            let subscribePromises = that.subscribers.map(subscriber => {
                return subscriber.subscribe((channel, message) => {
                    return that.broadcast(channel, message);
                });
            });

            Promise.all(subscribePromises).then(() => resolve());
        });
    }

     /**
     * On server connection.
     *
     * @return {void}
     */
    onConnect(){
        this.server.io.on('connection', socket => {
            this.onSubscribe(socket);
            this.onUnsubscribe(socket);
            this.onDisconnecting(socket);
            this.onClientEvent(socket);
        });
    }

    /**
     * On subscribe to a channel.
     *
     * @param  {object} socket
     * @return {void}
     */
    onSubscribe(socket){        
        socket.on('subscribe', data => {        
            this.channel.join(socket, data);            
        });
    }

    /**
     * On unsubscribe from a channel.
     *
     * @param  {object} socket
     * @return {void}
     */
    onUnsubscribe(socket){
        socket.on('unsubscribe', data => {
            this.channel.leave(socket, data.channel, 'unsubscribed');
        });
    }

    /**
     * On socket disconnecting.
     *
     * @return {void}
     */
    onDisconnecting(socket) {
        socket.on('disconnecting', (reason) => {
            Object.keys(socket.rooms).forEach(room => {
                if (room !== socket.id) {
                    this.channel.leave(socket, room, reason);
                }
            });
        });
    }

    /**
     * On client events.
     *
     * @param  {object} socket
     * @return {void}
     */
    onClientEvent(socket){
        socket.on('client event', data => {
            this.channel.clientEvent(socket, JSON.parse(data));
        });
    }
}

exports.EchoServer = EchoServer;



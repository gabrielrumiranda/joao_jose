import server from './config/server';
import routes from './routes';

server.use(routes.base + '/user/', routes.users);

export default server;
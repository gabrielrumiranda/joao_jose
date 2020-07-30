import version from '../config/version';
import UserRoutes from './user';

export default {
  base: '/api/' + version.current,
  users: UserRoutes 
};
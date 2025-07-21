import { config } from '@keystone-6/core';
import { lists } from './schema';
import { withAuth, session } from './auth';

export default withAuth(
  config({
    db: {
      provider: 'sqlite',
      url: 'file:./keystone.db',
    },
    lists,
    session,
    ui: {
      isAccessAllowed: (context) => !!context.session?.data,
    },
    server: {
      port: 3000,
      cors: {
        origin: true,
        credentials: true
      }
    },
  })
); 
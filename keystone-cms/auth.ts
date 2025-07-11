import { createAuth } from '@keystone-6/auth';
import { statelessSessions } from '@keystone-6/core/session';

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password', 'role'],
  },
});

const sessionSecret = process.env.SESSION_SECRET || 'a-very-secure-secret-for-keystone-cms';

const session = statelessSessions({
  secret: sessionSecret,
  maxAge: 60 * 60 * 24 * 30, // 30 days
});

export { withAuth, session }; 
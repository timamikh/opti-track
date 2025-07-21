import { createAuth } from '@keystone-6/auth';
import { statelessSessions } from '@keystone-6/core/session';

// Create auth with direct config
const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password', 'role'],
  },
});

// Create session with direct config
const session = statelessSessions({
  secret: process.env.SESSION_SECRET || 'a-very-secure-secret-for-keystone-cms',
  maxAge: 60 * 60 * 24 * 30, // 30 days
});

export { withAuth, session }; 
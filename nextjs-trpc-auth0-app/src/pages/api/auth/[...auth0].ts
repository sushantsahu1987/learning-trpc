// pages/api/auth/[...auth0].js
import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';

// export default handleAuth();
export default handleAuth({
    async login(req, res) {
      try {
        await handleLogin(req, res, {
          authorizationParams: {
            audience: 'https://auth0.sushantsahu.in',
            scope: 'openid profile email'
          },
        });
      } catch (error: any) {
        res.status(error.status || 400).end(error.message);
      }
    }
  });
  

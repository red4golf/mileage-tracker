import { useCallback } from 'react';
import { Button } from '@/components/common/Button';
import { googleAuthService } from '@/services/auth/google-auth';

export const LoginButton = () => {
  const handleLogin = useCallback(async () => {
    try {
      await googleAuthService.login();
      // You can add additional logic here, like redirecting to dashboard
    } catch (error) {
      console.error('Login failed:', error);
    }
  }, []);

  return (
    <Button onClick={handleLogin} variant="primary">
      Sign in with Google
    </Button>
  );
};
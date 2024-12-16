import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';

export interface GoogleUser {
  email: string;
  name: string;
  picture: string;
  accessToken: string;
}

class GoogleAuthService {
  private static instance: GoogleAuthService;
  private currentUser: GoogleUser | null = null;

  private constructor() {}

  static getInstance(): GoogleAuthService {
    if (!GoogleAuthService.instance) {
      GoogleAuthService.instance = new GoogleAuthService();
    }
    return GoogleAuthService.instance;
  }

  async login(): Promise<GoogleUser> {
    try {
      const response = await useGoogleLogin({
        scope: 'https://www.googleapis.com/auth/spreadsheets',
      });

      // Get user info using access token
      const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${response.access_token}`,
        },
      });

      const userInfo = await userInfoResponse.json();

      this.currentUser = {
        email: userInfo.email,
        name: userInfo.name,
        picture: userInfo.picture,
        accessToken: response.access_token,
      };

      return this.currentUser;
    } catch (error) {
      console.error('Google login failed:', error);
      throw error;
    }
  }

  logout(): void {
    this.currentUser = null;
  }

  getCurrentUser(): GoogleUser | null {
    return this.currentUser;
  }

  getAccessToken(): string | null {
    return this.currentUser?.accessToken || null;
  }
}

export const googleAuthService = GoogleAuthService.getInstance();
declare module 'next-auth/client' {
    import { NextApiRequest, NextApiResponse } from 'next';
    import { Session } from 'next-auth';
  
    export function getSession(
      req?: NextApiRequest
    ): Promise<Session | null | undefined>;
  
    export function useSession(): [Session | null | undefined, boolean];
  
    export function signIn(
      provider?: string | null,
      options?: {
        callbackUrl?: string;
        redirect?: boolean;
      }
    ): Promise<void>;
  
    export function signOut(options?: {
      callbackUrl?: string;
    }): Promise<void>;
  
    export function getCsrfToken(
      req?: NextApiRequest
    ): Promise<string | undefined>;
  
    export interface SignInCredentials {
      username: string;
      password: string;
    }
  }
  
import { createContext, useCallback, useEffect, useState } from 'react';
import { AccessTokenKeys } from '../config/AccessTokenKeys';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { usersService } from '../services/usersService';
import toast from 'react-hot-toast';
import { PageLoader } from '../../view/components/PageLoader';

interface AuthContextValue {
  signedIn: boolean
  signin(accessToken: string): void
  signout(): void
}

export const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({ children } : { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedAccessToken = localStorage.getItem(AccessTokenKeys.ACCESS_TOKEN);

    return Boolean(storedAccessToken);
  });

  const signin = useCallback((accessToken: string) => {
    localStorage.setItem(AccessTokenKeys.ACCESS_TOKEN, accessToken);

    setSignedIn(true);
  }, []);

  const signout = useCallback(() => {
    localStorage.removeItem(AccessTokenKeys.ACCESS_TOKEN);

    queryClient.removeQueries();

    setSignedIn(false);
  }, []);

  const { isError, isFetching, isSuccess } = useQuery({
    queryKey: ['users', 'me'],
    queryFn: () => usersService.me(),
    enabled: signedIn,
    staleTime: Infinity
  });

  useEffect(() => {
    if(isError) {
      toast.error('Sua sessão expirou!');
      signout();
    }

  }, [isError, signout]);

  if(isFetching) {
    return <PageLoader/>;
  }

  return (
    <AuthContext.Provider value={{ signedIn: isSuccess && signedIn, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
}

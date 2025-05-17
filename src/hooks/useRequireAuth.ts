import { useCallback } from 'react';
import { useSessionStore } from '../store/session/slice';
import { useToast } from '@chakra-ui/react';

export const useRequireAuth = () => {
  const isAuthenticated = useSessionStore(state => state.isAuthenticated);
  const toast = useToast();
  const requireAuth = useCallback((callback: () => void) => {
    if (!isAuthenticated) {
      toast({
        title: 'Acceso requerido',
        description: 'Debes iniciar sesión para acceder a esta funcionalidad',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    callback();
  }, [isAuthenticated, toast]);

  return { requireAuth };
}; 
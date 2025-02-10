import { useEffect, useState } from 'react';
import { LoginController } from './interfaces';
import { SessionAction } from '../../store/session/actions';
import { useSessionStore } from '../../store/session/slice';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/Routes';

export const useLoginController =
  (): /* <--Dependency Injections  like services hooks */
    LoginController => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const stateLogin = useSessionStore(state => state.status);
    const { login } = SessionAction();
    const isAuthenticated = useSessionStore(state => state.isAuthenticated);
    const navigate = useNavigate();
    /* State */
    // Ex. const [count, setCount] = useState(0);

    /* Listeners */
    useEffect(() => {
      if (!!isAuthenticated) {
        navigate(-1);

        // Si no hay una página anterior, navega a una ruta específica
        // Nota: No hay una forma directa de verificar el historial en v6,
        // por lo que puedes usar un enfoque alternativo.
        window.addEventListener('popstate', () => {
          if (window.history.state === null) {
            navigate(ROUTES.HOME, { replace: true });
          }
        }, { once: true });
      }
    }, [isAuthenticated]);

    /* View Events */
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      login(email, password);
    };

    /* Private Methods */
    //Ex. const increaseCount = () => {}

    // Return state and events
    return {
      email,
      password,
      setEmail,
      setPassword,
      handleSubmit,
      isLoading: stateLogin.isFetching

    };
  };

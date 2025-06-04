import { useEffect, useState } from 'react';
import { LoginController } from './interfaces';
import { SessionAction } from '../../store/session/actions';
import { useSessionStore } from '../../store/session/slice';
import { useNavigate, useLocation } from 'react-router-dom';
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
    const location = useLocation();
    /* State */
    // Ex. const [count, setCount] = useState(0);

    /* Listeners */
    useEffect(() => {
      // Guardar la ruta actual si no es login ni register
      if (!location.pathname.includes(ROUTES.LOGIN) && !location.pathname.includes(ROUTES.REGISTER)) {
        localStorage.setItem('lastPath', location.pathname);
      }
    }, [location]);

    useEffect(() => {
      if (!!isAuthenticated) {
        const lastPath = localStorage.getItem('lastPath') || ROUTES.HOME;
        navigate(lastPath);
      }
    }, [isAuthenticated]);

    /* View Events */
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      login(email, password);
    };

    const handleGuestLogin = () => {
      const lastPath = localStorage.getItem('lastPath') || ROUTES.HOME;
      navigate(lastPath);
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
      handleGuestLogin,
      isLoading: stateLogin.isFetching
    };
  };

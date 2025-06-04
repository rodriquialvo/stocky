import { useEffect, useState } from 'react';
import { RegisterController } from './interfaces';
import { useSessionStore } from '../../store/session/slice';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/Routes';
import { useUserStore } from '../../store/users/slice';
import { UserAction } from '../../store/users/actions';
import { registerBody } from '../../services/users/dtos/register.dto';

export const useRegisterController =
  (): /* <--Dependency Injections  like services hooks */
    RegisterController => {
    const [formData, setFormData] = useState<registerBody>({
      name: "",
      lastname: "",
      password: "",
      email: "",
      birthdate: "",
      dni: "",
      roles: ['66eb9628b08697f675bcb0d9']
    });
    const isAuthenticated = useSessionStore(state => state.isAuthenticated);
    const navigate = useNavigate();
    const { registerNewUser } = UserAction()
    const isLoading = useUserStore(state => state.status.isFetching);
    /* Listeners */

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



    // Si no hay una página anterior, navega a una ruta específica
    // Nota: No hay una forma directa de verificar el historial en v6,
    // por lo que puedes usar un enfoque alternativo.


    /* View Events */
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      registerNewUser(formData);
    };


    /* Private Methods */
    //Ex. const increaseCount = () => {}

    // Return state and events
    return {
      handleInputChange,
      formData,
      handleSubmit,
      isLoading
    };
  };

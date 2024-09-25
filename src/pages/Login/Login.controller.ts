import { useState } from 'react';
import { LoginController } from './interfaces';
import { SessionAction } from '../../store/session/actions';

export const useLoginController =
  (): /* <--Dependency Injections  like services hooks */
    LoginController => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const { login } = SessionAction();

    /* State */
    // Ex. const [count, setCount] = useState(0);

    /* Listeners */
    // Ex. useEffect(() => { onSessionUpdate(); }, [session]);

    /* View Events */
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      login(email, password);
    };

    /* Private Methods */
    //Ex. const increaseCount = () => {}

    // Return state and events
    return { email, password, setEmail, setPassword, handleSubmit };
  };

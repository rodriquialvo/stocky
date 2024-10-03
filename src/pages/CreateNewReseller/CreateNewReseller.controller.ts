import {CreateNewResellerController} from './interfaces';

export const useCreateNewResellerController =
  (): /* <--Dependency Injections  like services hooks */
  CreateNewResellerController => {
    /* State */
    // Ex. const [count, setCount] = useState(0);

    /* Listeners */
    // Ex. useEffect(() => { onSessionUpdate(); }, [session]);

    /* View Events */
    const onExamplePressed = () => {};

    /* Private Methods */
    //Ex. const increaseCount = () => {}

    // Return state and events
    return {example: 'example', onExamplePressed};
  };

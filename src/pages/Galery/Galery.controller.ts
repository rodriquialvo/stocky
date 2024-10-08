import {GaleryController} from './interfaces';

export const useGaleryController =
  (): /* <--Dependency Injections  like services hooks */
  GaleryController => {
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

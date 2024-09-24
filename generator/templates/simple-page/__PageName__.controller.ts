import {__PageName__Controller} from './interfaces';

export const use__PageName__Controller =
  (): /* <--Dependency Injections  like services hooks */
  __PageName__Controller => {
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

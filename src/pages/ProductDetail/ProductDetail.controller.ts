import {ProductDetailController} from './interfaces';

export const useProductDetailController =
  (): /* <--Dependency Injections  like services hooks */
  ProductDetailController => {
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

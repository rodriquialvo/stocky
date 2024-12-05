import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../constants/Routes';
import { getStartStatus } from '../../store/helper/statusStateFactory';
import { ProductAction } from '../../store/product/actions';
import { useProductStore } from '../../store/product/slice';
import { CartAction } from '../../store/shoppingcart/actions';
import { useCartStore } from '../../store/shoppingcart/slice';
import { ParamsOnAddToCartPressed, ProductDetailController } from './interfaces';
import { useProductAtributesStore } from '../../store/product-atributes/slice';

export const useProductDetailController =
  (): /* <--Dependency Injections  like services hooks */
    ProductDetailController => {
    /* State */

    const { id } = useParams<{ id: string, }>();

    const { getProductDetail } = ProductAction()
    // todo: ver si esto esta bien, estoy importand cartAction dentro del product controller
    const { addToCart } = CartAction();

    const addToCartstatus = useCartStore(state => state.addToCartStatus);
    const setAddToCartStatus = useCartStore(state => state.setAddToCartStatus);
    const statusCart = useCartStore(state => state.status)
    
    const productDetail = useProductStore(state => state.product);
    const statusProduct = useProductStore(state => state.status);
    
    const [isDisabledButton, setIsDisabledButton] = useState(false)
    const [currentImageIndex, setCurrentImageIndex] = useState(0);


    const navigate = useNavigate();
    const [sizes, setSizes] = useState<{ label: string, value: string }[]>([]);
    const [size, setSize] = useState("");
    const [color, setColor] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [imageSelected, setImageSelected] = useState("");
    const setIsOpenCartPanel = useCartStore(state => state.setIsOpenCartPanel);
    const allColors = useProductAtributesStore(state => state.allColors);



    useEffect(() => {
      setSizes(
        productDetail?.stocks?.filter(stock => stock.variant.color === color).map(stock => ({ label: stock.variant.size, value: stock.variant.size }))
      );
      
      setSize("");
    }, [color, productDetail])

    useEffect(() => {
      setImageSelected(productDetail?.pictures[currentImageIndex].url);
    }, [currentImageIndex, productDetail])

    /* Listeners */

    useEffect(() => {
      getProductDetail(id, {by: 'variant'});
    }, [id]);

    useEffect(() => {
      setIsDisabledButton(
        !productDetail?.hasStock ||
        !color.length ||
        !size.length ||
        !quantity
      )
    }, [productDetail, color, size, quantity])

    useEffect(() => {
      if (addToCartstatus.success) {
        navigate(ROUTES.GALLERY);
        setIsOpenCartPanel(true);
        setAddToCartStatus(getStartStatus());
      }
    }, [addToCartstatus, navigate])

    useEffect(() => {
      if (productDetail?.pictures.length > 0) {
        setImageSelected(productDetail.pictures[0].url)
      }
    }, [productDetail])

    /* View Events */
    const onAddToCartPressed = ({ size, color, quantity }: ParamsOnAddToCartPressed) => {
      if (quantity > productDetail?.stocks.find(stock => stock.variant.size === size && stock.variant.color === color)?.quantity) {
        return toast("No hay suficiente stock. Intenta con una cantidad menor")
      }
      // find stock with size and color
      const stock = productDetail.stocks.find(stock => stock.variant.size === size && stock.variant.color === color);
      addToCart({
        productId: productDetail.id,
        variantId: stock.variant.id,
        quantity: quantity
      })
    };

    const handleSelectColor = (event) => {
      setColor(event.value);
    };

    const handleSelectSize = (event) => {
      setSize(event.value);
    };

    const onIncrease = () => {
      setQuantity(quantity + 1);
    };

    const onDecrease = () => {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    };

    const handleNext = () => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % productDetail.pictures.length);
      setImageSelected(productDetail.pictures[currentImageIndex].url);
    };
  
    const handlePrev = () => {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + productDetail.pictures.length) % productDetail.pictures.length);
    };

    /* Private Methods */
    //Ex. const increaseCount = () => {}

    // Return state and events

    return {
      productDetail,
      onAddToCartPressed,
      isDisabledButton,
      sizes,
      imageSelected,
      setImageSelected,
      handleSelectColor,
      handleSelectSize,
      onIncrease,
      onDecrease,
      quantity,
      size,
      color,
      isLoading: statusProduct.isFetching || statusCart.isFetching,
      colorsProduct: allColors.filter(color => productDetail?.colors?.includes(color.value)).map(color => { return {label: color.label, value: color.value}}),
      handleNext,
      handlePrev
    };
  };

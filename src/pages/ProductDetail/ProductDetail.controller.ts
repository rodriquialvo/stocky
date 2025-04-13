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
import { MOCK_WHOLESALE_PRODUCT } from './mockData';
import { AddToCartRequestDto, Item } from '../../services/shoppingcart/dtos/generic';

export const useProductDetailController =
  (): /* <--Dependency Injections  like services hooks */
    ProductDetailController => {
    /* State */

    const { id } = useParams<{ id: string, }>();

    const { getProductDetail } = ProductAction()
    // todo: ver si esto esta bien, estoy importand cartAction dentro del product controller
    const { addToCart, addToCartWholesale } = CartAction();

    const addToCartstatus = useCartStore(state => state.addToCartStatus);
    const setAddToCartStatus = useCartStore(state => state.setAddToCartStatus);
    const statusCart = useCartStore(state => state.status)

    const productDetail = useProductStore(state => state.product);
    // const productDetail = MOCK_WHOLESALE_PRODUCT;
    const statusProduct = useProductStore(state => state.status);

    const [isDisabledButton, setIsDisabledButton] = useState(false)
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isWholesaleEnabled, setIsWholesaleEnabled] = useState(false);

    const navigate = useNavigate();
    const [sizes, setSizes] = useState<{ label: string, value: string }[]>([]);
    const [size, setSize] = useState("");
    const [color, setColor] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [imageSelected, setImageSelected] = useState("");
    const setIsOpenCartPanel = useCartStore(state => state.setIsOpenCartPanel);
    const allColors = useProductAtributesStore(state => state.allColors);
    const [maximumQuantity, setMaximumQuantity] = useState(0);
    const isWholesale = (productDetail?.wholesaleData?.isWholesaler || false) && isWholesaleEnabled;
    const minimumQuantity = productDetail?.wholesaleData?.minimumQuantity || 0;
    const [totalUnits, setTotalUnits] = useState(0)
    const [variants, setVariants] = useState<{ color: string; size: string; quantity: number }[]>([]);
    const [totalDozens, setTotalDozens] = useState(0);
    const cart = useCartStore(state => state.cart);
    const [productItemCart, setProductItemCart] = useState<Item | null>(null);

    useEffect(() => {
      if (isWholesale) {
        // En modo mayorista, mostrar todos los talles disponibles
        const allSizes = productDetail?.stocks?.reduce((acc, stock) => {
          if (!acc.includes(stock.variant.size)) {
            acc.push(stock.variant.size);
          }
          return acc;
        }, [] as string[]) || [];
        setSizes(allSizes.map(size => ({ label: size, value: size })));
      } else {
        // En modo normal, filtrar por color seleccionado
        setSizes(
          productDetail?.stocks?.filter(stock => stock.variant.color === color).map(stock => ({ label: stock.variant.size, value: stock.variant.size }))
        );
      }

      setSize("");
    }, [color, productDetail, isWholesale]);

    useEffect(() => {
      setImageSelected(productDetail?.pictures[currentImageIndex].url);
    }, [currentImageIndex, productDetail])

    useEffect(() => {
      if (productDetail?.pictures.length > 0) {
        setImageSelected(productDetail.pictures[0].url)
      }
    }, [productDetail]);

    useEffect(() => {
      const findProductInCart = cart?.items?.find(item => item.product._id === productDetail?.id);
      if (findProductInCart) {
        setProductItemCart(findProductInCart);
      } else {
        setProductItemCart(null);
      }
    }, [cart, productDetail])

    useEffect(() => {
      if (productDetail?.wholesaleData?.isWholesaler) {
        setQuantity(productDetail.wholesaleData.minimumQuantity);
      }
    }, [productDetail]);

    useEffect(() => {
      setTotalUnits(productDetail?.stocks.reduce((acc, stock) => acc + stock.quantity, 0) || 0)
    }, [productDetail])

    useEffect(() => {
      getProductDetail(id, { by: 'variant' });
    }, [id]);

    useEffect(() => {
      setIsDisabledButton(
        !productDetail?.hasStock ||
        (!isWholesale && (!color.length || !size.length || !quantity)) ||
        (isWholesale && (!variants.length || variants.some(v => !v.color || !v.size || !v.quantity)))
      )
    }, [productDetail, color, size, quantity, isWholesale, variants])

    useEffect(() => {
      if (addToCartstatus.success) {
        navigate(ROUTES.GALLERY);
        setIsOpenCartPanel(true);
        setAddToCartStatus(getStartStatus());
      }
    }, [addToCartstatus, navigate])

    useEffect(() => {
      if (!!size && !!color) {
        setQuantity(0)
      }
    }, [size, productDetail, color]);

    useEffect(() => {
      setTotalDozens(Math.floor(totalUnits / 12));
    }, [totalUnits])

    const isValidWholesaleQuantity = (qty: number) => {
      if (!isWholesale) return true;
      return qty === 6 || qty % 12 === 0;
    };

    const getNextValidQuantity = (currentQty: number) => {
      if (!isWholesale) return currentQty + 1;
      if (currentQty === 6) return 12;
      return currentQty + 12;
    };

    const getPrevValidQuantity = (currentQty: number) => {
      if (!isWholesale) return currentQty - 1;
      if (currentQty === 12) return 6;
      return currentQty - 12;
    };

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

    const onAddToCartWholesalePressed = () => {
      const items = transformVariantsToCartItems();
      addToCartWholesale(items.map(element => ({
        ...element,
        isWholesalePackage: true,
        predefinedQuantity: 12
      })))
    }

    const transformVariantsToCartItems = () => {
      return variants.map(variant => {
        const stock = productDetail?.stocks.find(
          s => s.variant.color === variant.color && s.variant.size === variant.size
        );
        if (!stock?.variant.id) {
          toast.error(`No se encontró la variante para color ${variant.color} y talle ${variant.size}`);
          return null;
        }

        return {
          productId: productDetail?.id || '',
          variantId: stock.variant.id,
          quantity: variant.quantity
        };
      }).filter(Boolean) as AddToCartRequestDto[];
    }

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

    const handleVariantsChange = (newVariants: { color: string; size: string; quantity: number }[]) => {
      setVariants(newVariants);
    };

    const handleWholesaleToggle = () => {
      setIsWholesaleEnabled(!isWholesaleEnabled);
      // Resetear estados cuando se cambia el modo
      setVariants([]);
      setQuantity(minimumQuantity);
    };

    const getVariantSelected = () => {
      return productDetail?.stocks.find(stock => stock.variant.size === size && stock.variant.color === color);
    }

    const onCloseModalWholeSale = () => {
      setIsWholesaleEnabled(false);
      setVariants([]);
      setQuantity(minimumQuantity);
    }

    // console.log("variants", variants)
    // console.log("colorsProduct", allColors)
    console.log("productDetail", productDetail)
    console.log("quantity", quantity)
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
      colorsProduct: allColors.filter(color => productDetail?.colors?.includes(color.value)).map(color => { return { label: color.label, value: color.value } }),
      handleNext,
      handlePrev,
      isWholesale,
      minimumQuantity,
      variants,
      handleVariantsChange,
      isWholesaleEnabled,
      handleWholesaleToggle,
      variantSelected: getVariantSelected(),
      totalUnits,
      totalDozens,
      onAddToCartWholesalePressed,
      onCloseModalWholeSale,
      productItemCart
    };
  };


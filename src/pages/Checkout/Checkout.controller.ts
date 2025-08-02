import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckoutController, CheckoutFormData } from './interfaces';
import { useCartStore } from '../../store/shoppingcart/slice';
import { useSessionStore } from '../../store/session/slice';
import { CartAction } from '../../store/shoppingcart/actions';
import { ROUTES } from '../../constants/Routes';
import toast from 'react-hot-toast';
import { SaleAction } from '../../store/sales/actions';
import { WHATSAPP_NUMBER } from '../../constants/importantNumbers';

export const useCheckoutController = (): CheckoutController => {
  const navigate = useNavigate();
  const cart = useCartStore(state => state.cart);
  const userLogged = useSessionStore(state => state.userLogged);
  const { getCart, clearCart } = CartAction();
  
  const [formData, setFormData] = useState<CheckoutFormData>({
    name: '',
    lastname: '',
    email: '',
    phone: '',
    address: '',
    comments: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { postSale } = SaleAction();

  // Validar que hay productos en el carrito
  useEffect(() => {
    if (!cart?.items?.length) {
      navigate(ROUTES.HOME);
    }
  }, [cart?.items?.length]);

  const onInputChange = (field: keyof CheckoutFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      toast.error('El nombre es obligatorio');
      return false;
    }
    if (!formData.email.trim()) {
      toast.error('El email es obligatorio');
      return false;
    }
    if (!formData.phone.trim()) {
      toast.error('El teléfono es obligatorio');
      return false;
    }
    return true;
  };

  const formatProductDetails = (): string => {
    if (!cart?.items) return '';
    
    return cart.items.map((item: any, index: number) => {
      const productName = item.product.name;
      const quantity = item.quantity;
      const price = item.variant?.price?.retail || item.product.price?.retail || 0;
      const totalPrice = price * quantity;
      const variantInfo = item.variant ? 
        ` (${item.variant.color || ''}${item.variant.color && item.variant.size ? ' - ' : ''}${item.variant.size || ''})` : '';
      const wholesaleBadge = item.is_wholesale_package ? ' [MAYORISTA]' : '';
      
      return `${index + 1}. ${productName}${variantInfo}${wholesaleBadge}\n   Cantidad: ${quantity}\n   Precio: $${price.toLocaleString('es-AR')}\n   Subtotal: $${totalPrice.toLocaleString('es-AR')}`;
    }).join('\n\n');
  };

  const calculateTotal = (): number => {
    if (!cart?.items) return 0;
    return cart.items.reduce((total: number, item: any) => {
      const price = item.variant?.price?.retail || item.product.price?.retail || 0;
      return total + (price * item.quantity);
    }, 0);
  };

  const generateWhatsAppMessage = (): string => {
    const productDetails = formatProductDetails();
    const total = calculateTotal();
    
    let message = `🛍️ *NUEVO PEDIDO*\n\n`;
    message += `👤 *Cliente:* ${formData.name}\n`;
    message += `📧 *Email:* ${formData.email}\n`;
    message += `📱 *Teléfono:* ${formData.phone}\n`;
    
    if (formData.comments.trim()) {
      message += `💬 *Comentarios:* ${formData.comments}\n`;
    }
    
    message += `\n🛒 *PRODUCTOS:*\n\n${productDetails}\n\n`;
    message += `💰 *TOTAL: $${total.toLocaleString('es-AR')}*\n\n`;
    message += `📅 *Fecha:* ${new Date().toLocaleDateString('es-AR')}\n`;
    message += `⏰ *Hora:* ${new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}`;
    
    return message;
  };

  const onSubmit = async () => {
    if (!validateForm()) return;
    if (!cart?.items?.length) {
      toast.error('No hay productos en el carrito');
      return;
    }

    setIsSubmitting(true);
    try {
      const message = generateWhatsAppMessage();
      const whatsappNumber = WHATSAPP_NUMBER;
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
      
      // Abrir WhatsApp en nueva pestaña
      window.open(whatsappUrl, '_blank');
      
      
      // Limpiar carrito después de enviar
      setTimeout(() => {
        navigate(ROUTES.HOME);
      }, 2000);
      
      postSale({
        customerData: formData,
        cartId: cart._id,
      });
      toast.success('¡Pedido enviado por WhatsApp!');
    } catch (error) {
      toast.error('Error al generar el mensaje de WhatsApp');
      console.error('Error en checkout:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onBackToCart = () => {
    navigate(-1);
  };

  return {
    formData,
    isSubmitting,
    cart,
    onInputChange,
    onSubmit,
    onBackToCart
  };
};

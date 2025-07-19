import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckoutController, CheckoutFormData } from './interfaces';
import { useCartStore } from '../../store/shoppingcart/slice';
import { useSessionStore } from '../../store/session/slice';
import { CartAction } from '../../store/shoppingcart/actions';
import { ROUTES } from '../../constants/Routes';
import toast from 'react-hot-toast';

export const useCheckoutController = (): CheckoutController => {
  const navigate = useNavigate();
  const cart = useCartStore(state => state.cart);
  const userLogged = useSessionStore(state => state.userLogged);
  const { getCart, clearCart } = CartAction();
  
  const [formData, setFormData] = useState<CheckoutFormData>({
    nombre: '',
    email: '',
    telefono: '',
    comentarios: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cargar carrito del usuario si está autenticado
  useEffect(() => {
    if (userLogged?.id) {
      getCart(userLogged.id);
    }
  }, [userLogged?.id]);

  // Validar que hay productos en el carrito
  useEffect(() => {
    if (!cart?.items?.length) {
      navigate(ROUTES.HOME);
      toast.error('No hay productos en el carrito');
    }
  }, [cart?.items?.length]);

  const onInputChange = (field: keyof CheckoutFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.nombre.trim()) {
      toast.error('El nombre es obligatorio');
      return false;
    }
    if (!formData.email.trim()) {
      toast.error('El email es obligatorio');
      return false;
    }
    if (!formData.telefono.trim()) {
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
    message += `👤 *Cliente:* ${formData.nombre}\n`;
    message += `📧 *Email:* ${formData.email}\n`;
    message += `📱 *Teléfono:* ${formData.telefono}\n`;
    
    if (formData.comentarios.trim()) {
      message += `💬 *Comentarios:* ${formData.comentarios}\n`;
    }
    
    message += `\n🛒 *PRODUCTOS:*\n\n${productDetails}\n\n`;
    message += `💰 *TOTAL: $${total.toLocaleString('es-AR')}*\n\n`;
    message += `📅 *Fecha:* ${new Date().toLocaleDateString('es-AR')}\n`;
    message += `⏰ *Hora:* ${new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}`;
    
    return message;
  };

  /*
  Ejemplo del mensaje que se generará:
  
  🛍️ *NUEVO PEDIDO*

  👤 *Cliente:* Juan Pérez
  📧 *Email:* juan@email.com
  📱 *Teléfono:* +54 9 11 1234-5678
  📍 *Dirección:* Av. Siempreviva 742, Springfield
  💬 *Comentarios:* Entregar por la tarde

  🛒 *PRODUCTOS:*

  1. Remera Básica (Azul - L)
     Cantidad: 2
     Precio: $15,000
     Subtotal: $30,000

  2. Jeans Clásicos [MAYORISTA]
     Cantidad: 1
     Precio: $45,000
     Subtotal: $45,000

  💰 *TOTAL: $75,000*

  📅 *Fecha:* 15/12/2024
  ⏰ *Hora:* 14:30
  */

  const onSubmit = async () => {
    if (!validateForm()) return;
    if (!cart?.items?.length) {
      toast.error('No hay productos en el carrito');
      return;
    }

    setIsSubmitting(true);
    try {
      const message = generateWhatsAppMessage();
      const whatsappNumber = '+5493513285531';
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
      
      // Abrir WhatsApp en nueva pestaña
      window.open(whatsappUrl, '_blank');
      
      toast.success('¡Pedido enviado por WhatsApp!');
      
      // Limpiar carrito después de enviar
      clearCart();
      setTimeout(() => {
        navigate(ROUTES.HOME);
      }, 2000);
      
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

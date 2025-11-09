import { irACheckout } from '../services/stripeServices';

export default function CheckoutButton({ token, items, id_usuario }) {
  const handleClick = async () => {
    try {
      await irACheckout(token, items, id_usuario); // <-- ahora enviamos id_usuario
    } catch (err) {
      console.error('Error al iniciar checkout:', err);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="w-full py-2.5 sm:py-3 bg-[#C122ED] text-white rounded-lg text-sm sm:text-base font-semibold hover:bg-[#9333EA] transition-colors active:scale-95"
    >
      Proceder al pago
    </button>
  );
}

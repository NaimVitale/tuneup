// src/services/stripeServices.js
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

/**
 * Crea una sesión de checkout en el backend
 * @param {string} token - Token de autenticación del usuario
 * @param {Array} items - Lista de tickets { id_precio_stripe, quantity }
 * @param {number} id_usuario - ID del usuario que realiza la compra
 * @returns {Promise<{url: string}>}
 */
export async function crearCheckoutSession(token, items, id_usuario) {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/stripe/checkout`,
      { items, id_usuario }, // enviamos también el id_usuario
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data; // { url: "https://checkout.stripe.com/..." }
  } catch (err) {
    console.error('Error creando sesión de pago:', err.response?.data || err.message);
    throw new Error('Error creando sesión de pago');
  }
}

/**
 * Redirige al checkout de Stripe
 * @param {string} token
 * @param {Array} items
 * @param {number} id_usuario
 */
export async function irACheckout(token, items, id_usuario) {
  const { url } = await crearCheckoutSession(token, items, id_usuario);
  window.location.href = url;
}


export async function getGananciasMensuales(token) {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/stripe/ganancias-mensuales`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data.total;
  } catch (error) {
    console.error("Error al obtener ganancias mensuales:", error);
    return 0;
  }
}


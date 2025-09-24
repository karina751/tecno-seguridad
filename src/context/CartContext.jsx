// src/context/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { useAuth } from './AuthContext';
import { app } from '../api/firebase';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [cart, setCart] = useState([]);
  const [loadingCart, setLoadingCart] = useState(true);
  const db = getFirestore(app);

  const getCartRef = (userId) => {
    return doc(db, 'carts', userId);
  };

  useEffect(() => {
    let unsubscribe = () => {};

    if (currentUser) {
      const cartRef = getCartRef(currentUser.uid);
      unsubscribe = onSnapshot(cartRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const fetchedCart = docSnapshot.data().items || [];
          setCart(fetchedCart);
        } else {
          setDoc(cartRef, { items: [] });
          setCart([]);
        }
        setLoadingCart(false);
      }, (error) => {
        console.error("Error al escuchar el carrito:", error);
        setLoadingCart(false);
      });
    } else {
      setCart([]);
      setLoadingCart(false);
    }

    return () => unsubscribe();
  }, [currentUser]);

  const saveCartToFirestore = async (newCart) => {
    if (currentUser) {
      const cartRef = getCartRef(currentUser.uid);
      try {
        await setDoc(cartRef, { items: newCart });
      } catch (error) {
        console.error("Error al guardar el carrito en Firestore:", error);
      }
    }
  };

  const addToCart = (product) => {
    const existingProductIndex = cart.findIndex(item => item.id === product.id);

    let newCart;
    if (existingProductIndex > -1) {
      newCart = [...cart];
      newCart[existingProductIndex].quantity += 1;
    } else {
      newCart = [...cart, { ...product, quantity: 1 }];
    }
    setCart(newCart);
    saveCartToFirestore(newCart);
  };

  const removeFromCart = (productId) => {
    const newCart = cart.filter(item => item.id !== productId);
    setCart(newCart);
    saveCartToFirestore(newCart);
  };

  const updateQuantity = (productId, quantity) => {
    const newCart = cart.map(item =>
      item.id === productId ? { ...item, quantity: quantity } : item
    ).filter(item => item.quantity > 0);
    setCart(newCart);
    saveCartToFirestore(newCart);
  };

  const clearCart = () => {
    setCart([]);
    saveCartToFirestore([]);
  };

  const cartTotal = cart.reduce((total, item) => total + (item.precio * item.quantity), 0);

  const value = {
    cart,
    loadingCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
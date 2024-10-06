import { useState, useEffect } from "react";
import { getFirestore } from "../firebase/firebase"; // Adjust path based on your setup
import useAuthStore from "../store/authStore"; // If you are using Zustand's user auth store
import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";

const useCart = () => {
  const [cart, setCart] = useState([]);
  const { user } = useAuthStore();
  const db = getFirestore(); // Initialize Firestore

  // Load user's cart from Firebase on mount
  useEffect(() => {
    if (user) {
      const userDocRef = doc(db, "users", user.id);
      const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
        if (docSnap.exists()) {
          setCart(docSnap.data().cart || []);
        }
      });

      return () => unsubscribe(); // Cleanup subscription on unmount
    }
  }, [user, db]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      } else {
        return [...prevCart, product];
      }
    });
  };

  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Sync cart with Firebase whenever it changes
  useEffect(() => {
    if (user && cart.length) {
      const userDocRef = doc(db, "users", user.id);
      setDoc(userDocRef, { cart }, { merge: true });
    }
  }, [cart, user, db]);

  return { cart, addToCart, updateQuantity, removeFromCart, clearCart };
};

export default useCart;

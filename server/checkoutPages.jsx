import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CheckoutPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get('/api/cart');
                if (response.data.success) {
                    setCartItems(response.data.items);
                    calculateTotal(response.data.items);
                }
            } catch (error) {
                console.error("Error fetching cart items:", error);
            }
        };

        fetchCartItems();
    }, []);

    const calculateTotal = (items) => {
        const sum = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        setTotal(sum);
    };

    return (
        <div>
            <h1>Checkout</h1>
            {cartItems.map(item => (
                <div key={item.id}>
                    <p>{item.name} - Quantity: {item.quantity} - Price: ₹{item.price * item.quantity}</p>
                </div>
            ))}
            <h2>Total: ₹{total}</h2>
        </div>
    );
};

export default CheckoutPage;
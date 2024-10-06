import React from 'react';
import { Box, Flex, Heading, Button, Divider } from '@chakra-ui/react';
import useCart from '../hooks/useCart'; // Your cart hook

const CheckoutPage = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();

  // Function to calculate total price
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <Flex p={5} justifyContent="space-between">
      {/* Left Section: Cart Items */}
      <Box flex="3" mr={5}>
        <Heading size="lg" mb={5}>Your Cart</Heading>
        {cart.length > 0 ? (
          cart.map((item) => (
            <Box key={item.id} mb={4} p={4} borderWidth="1px" borderRadius="md">
              <Flex justifyContent="space-between" alignItems="center">
                <Box>
                  <Heading size="md">{item.name}</Heading>
                  <p>Price: ${item.price.toFixed(2)}</p>
                  <p>Quantity: {item.quantity}</p>
                </Box>
                <Flex alignItems="center">
                  <Button size="sm" mr={2} onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</Button>
                  <Button size="sm" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</Button>
                  <Button size="sm" ml={4} colorScheme="red" onClick={() => removeFromCart(item.id)}>Remove</Button>
                </Flex>
              </Flex>
            </Box>
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
      </Box>

      {/* Right Section: Checkout */}
      <Box flex="1" borderWidth="1px" borderRadius="md" p={5}>
        <Heading size="lg" mb={4}>Order Summary</Heading>
        <Divider mb={4} />
        <Box>
          <p>Total Items: {cart.length}</p>
          <p>Total Price: ${calculateTotal().toFixed(2)}</p>
        </Box>
        <Divider my={4} />
        <Button
          size="lg"
          colorScheme="blue"
          width="100%"
          onClick={() => {
            // Implement Medusa checkout or any other checkout logic
          }}
        >
          Proceed to Checkout
        </Button>
      </Box>
    </Flex>
  );
};

export default CheckoutPage;

import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Extract the price and item details passed via state
    const { price, itemName } = location.state || {};

    const handlePayment = () => {
        // Add your payment logic here (payment gateway integration)
        alert("Payment successful!");
        navigate("/"); // Redirect to home after payment
    };

    if (!price) {
        // Redirect if no price is passed (for safety)
        return <Text>Invalid request. No price data.</Text>;
    }

    return (
        <Flex direction="column" align="center" justify="center" minH="100vh" p={4}>
            <Box bg="gray.100" p={6} borderRadius="md" boxShadow="md">
                <Text fontSize="xl" fontWeight="bold" mb={4}>
                    Checkout
                </Text>
                <Text mb={4}>You're purchasing: {itemName}</Text>
                <Text mb={4}>Amount to be paid: ${price}</Text>

                <Button
                    colorScheme="green"
                    size="md"
                    onClick={handlePayment}
                >
                    Complete Payment
                </Button>
            </Box>
        </Flex>
    );
};

export default Checkout;

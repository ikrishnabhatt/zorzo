import { Box, Button, Flex, Text, RadioGroup, Radio, Stack, Image, NumberInput, NumberInputField, Input, FormControl, FormLabel } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaCreditCard, FaMoneyCheckAlt, FaMobileAlt } from 'react-icons/fa';
import { MdLocalShipping } from 'react-icons/md';

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Extract the price and item details passed via state
    const { price, itemName } = location.state || {};

    // State for quantity, payment method, and payment details
    const [quantity, setQuantity] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState("UPI");
    const [upiId, setUpiId] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");

    // Calculate total price
    const totalPrice = price * quantity;

    const handlePayment = () => {
        // Validate the input fields based on the payment method
        if (paymentMethod === "UPI" && !upiId) {
            alert("Please enter your UPI ID.");
            return;
        } else if ((paymentMethod === "Credit Card" || paymentMethod === "Debit Card") && (!cardNumber || !expiryDate || !cvv)) {
            alert("Please fill in all card details.");
            return;
        }

        // Here you can integrate the payment logic using a payment gateway
        alert(`Proceeding to payment via ${paymentMethod} for ₹${totalPrice}!`);

        // Mocking a payment process
        setTimeout(() => {
            alert(`Payment successful via ${paymentMethod} for ₹${totalPrice}!`);
            navigate("/"); // Redirect to home after payment
        }, 2000); // Simulate a delay for the payment process
    };

    if (!price) {
        // Redirect if no price is passed (for safety)
        return <Text color="gray.500">Invalid request. No price data.</Text>;
    }

    return (
        <Flex
            direction="column"
            align="center"
            justify="center"
            minH="100vh"
            bg="black"
            color="white"
            p={4}
        >
            <Box
                bg="gray.800"
                p={8}
                borderRadius="lg"
                boxShadow="lg"
                w={{ base: "90%", md: "50%", lg: "30%" }}
                textAlign="center"
            >
                <Text fontSize="2xl" fontWeight="bold" mb={4}>
                    Checkout
                </Text>
                <Text mb={4} fontSize="lg" fontWeight="medium">
                    You're purchasing: <span style={{ color: "#00BFFF" }}>{itemName}</span>
                </Text>

                {/* Quantity Input */}
                <Text mb={4} fontSize="lg" fontWeight="medium">
                    Quantity:
                </Text>
                <NumberInput
                    defaultValue={1}
                    min={1}
                    max={100}
                    onChange={(valueString) => setQuantity(Number(valueString))}
                    mb={6}
                    size="lg"
                >
                    <NumberInputField borderColor="blue.400" color="white" />
                </NumberInput>

                <Text mb={6} fontSize="lg" fontWeight="medium">
                    Amount to be paid: <span style={{ color: "#00BFFF" }}>₹{totalPrice}</span>
                </Text>

                {/* Payment Method Selection */}
                <Text fontSize="lg" fontWeight="bold" mb={4}>
                    Select Payment Method:
                </Text>
                <RadioGroup onChange={setPaymentMethod} value={paymentMethod} mb={6}>
                    <Stack direction="column" spacing={3}>
                        <Radio value="UPI">
                            <Flex align="center">
                                <FaMobileAlt style={{ marginRight: '8px' }} />
                                UPI (GPay, PhonePe, Paytm)
                            </Flex>
                        </Radio>
                        <Radio value="Credit Card">
                            <Flex align="center">
                                <FaCreditCard style={{ marginRight: '8px' }} />
                                Credit Card
                            </Flex>
                        </Radio>
                        <Radio value="Debit Card">
                            <Flex align="center">
                                <FaMoneyCheckAlt style={{ marginRight: '8px' }} />
                                Debit Card
                            </Flex>
                        </Radio>
                        <Radio value="Pay at Delivery">
                            <Flex align="center">
                                <MdLocalShipping style={{ marginRight: '8px' }} />
                                Pay at Delivery
                            </Flex>
                        </Radio>
                        <Radio value="No Cost EMI">
                            <Flex align="center">
                                <FaCreditCard style={{ marginRight: '8px' }} />
                                Easy No Cost EMI (Coming Soon)
                            </Flex>
                        </Radio>
                    </Stack>
                </RadioGroup>

                {/* Dynamic Input Fields Based on Payment Method */}
                {paymentMethod === "UPI" && (
                    <FormControl mb={6}>
                        <FormLabel>UPI ID:</FormLabel>
                        <Input 
                            value={upiId} 
                            onChange={(e) => setUpiId(e.target.value)} 
                            placeholder="Enter your UPI ID" 
                            borderColor="blue.400" 
                            color="white" 
                        />
                    </FormControl>
                )}

                {(paymentMethod === "Credit Card" || paymentMethod === "Debit Card") && (
                    <>
                        <FormControl mb={3}>
                            <FormLabel>Card Number:</FormLabel>
                            <Input 
                                value={cardNumber} 
                                onChange={(e) => setCardNumber(e.target.value)} 
                                placeholder="Enter your card number" 
                                borderColor="blue.400" 
                                color="white" 
                            />
                        </FormControl>
                        <FormControl mb={3}>
                            <FormLabel>Expiry Date (MM/YY):</FormLabel>
                            <Input 
                                value={expiryDate} 
                                onChange={(e) => setExpiryDate(e.target.value)} 
                                placeholder="MM/YY" 
                                borderColor="blue.400" 
                                color="white" 
                            />
                        </FormControl>
                        <FormControl mb={3}>
                            <FormLabel>CVV:</FormLabel>
                            <Input 
                                value={cvv} 
                                onChange={(e) => setCvv(e.target.value)} 
                                placeholder="Enter your CVV" 
                                type="password"
                                borderColor="blue.400" 
                                color="white" 
                            />
                        </FormControl>
                    </>
                )}

                {/* Proceed Further Button */}
                <Button
                    size="lg"
                    color="blue.400"
                    bg="transparent"
                    borderRadius="full"
                    border="2px solid #00BFFF"
                    _hover={{ bg: "blue.600", color: "white" }}
                    onClick={handlePayment}
                    w="full"
                    mb={6}
                >
                    Proceed Further
                </Button>

                {/* Payment Logos */}
                {/* <Flex justify="center" align="center" mt={4} flexWrap="wrap" gap={4}>
                    <Image src="./images/gpay.jpg" alt="GPay" boxSize="40px" />
                    <Image src="./images/amazonpay.png" alt="AmazonPay" boxSize="40px" />
                    <Image src="./images/paytm.png" alt="Paytm" boxSize="40px" />
                    <Image src="./images/mastercard.png" alt="Mastercard" boxSize="40px" />
                    <Image src="./images/visa.png" alt="Visa" boxSize="40px" />
                    <Image src="./images/dinersclub.png" alt="Diners Club" boxSize="40px" />
                </Flex> */}
            </Box>
        </Flex>
    );
};

export default Checkout;

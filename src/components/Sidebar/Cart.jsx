import { Box, Link, Tooltip } from "@chakra-ui/react";
import { AiOutlineShoppingCart } from "react-icons/ai"; // Import cart icon
import { Link as RouterLink } from "react-router-dom"; // For routing
const Cart = () => {
	return (
		<Tooltip
			hasArrow
			label={"Cart"} // Change tooltip label to "Cart"
			placement='right'
			ml={1}
			openDelay={500}
			display={{ base: "block", md: "none" }}
		>
			<Link
				display={"flex"}
				to={"./cart"} // Change route to cart page
				as={RouterLink}
				alignItems={"center"}
				gap={4}
				_hover={{ bg: "whiteAlpha.400" }}
				borderRadius={6}
				p={2}
				w={{ base: 10, md: "full" }}
				justifyContent={{ base: "center", md: "flex-start" }}
			>
				<AiOutlineShoppingCart size={25} /> {/* Change icon to cart */}
				<Box display={{ base: "none", md: "block" }}>Cart</Box> {/* Change label to "Cart" */}
			</Link>
		</Tooltip>
	);
};

export default Cart;
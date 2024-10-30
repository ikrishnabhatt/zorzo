import { useState } from "react";
import { Container, Flex, VStack, Box, Image, Button } from "@chakra-ui/react";
import AuthForm from "../../components/AuthForm/AuthForm";

const AuthPage = () => {
	const [userType, setUserType] = useState("buyer");

	return (
		<Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4}>
			<Container maxW={"container.md"} padding={0}>
				<Flex justifyContent={"center"} alignItems={"center"} gap={10}>
					{/* Left-hand side */}
					<Box display={{ base: "none", md: "block" }}>
						<Image src='/auth.png' h={480} alt='Phone img' />
					</Box>

					{/* Right-hand side */}
					<VStack spacing={4} align={"stretch"}>
						<Flex justifyContent="center" gap={4}>
							<Button
								bg={userType === "buyer" ? "#3897f0" : "white"} // Instagram blue
								color={userType === "buyer" ? "white" : "#3897f0"} // Adjust text color
								border={"1px solid #3897f0"}
								_hover={{
									bg: userType === "buyer" ? "#287dc0" : "#f0f0f0", // Darker blue on hover
								}}
								onClick={() => setUserType("buyer")}
							>
								Buyer Login
							</Button>
							<Button
								bg={userType === "seller" ? "#3897f0" : "white"} // Instagram blue
								color={userType === "seller" ? "white" : "#3897f0"} // Adjust text color
								border={"1px solid #3897f0"}
								_hover={{
									bg: userType === "seller" ? "#287dc0" : "#f0f0f0", // Darker blue on hover
								}}
								onClick={() => setUserType("seller")}
							>
								Seller Login
							</Button>
						</Flex>

						{/* Display the selected user type */}
						<Box textAlign={"center"}>
							You are logging in as a <strong>{userType}</strong>.
						</Box>

						<AuthForm userType={userType} />

						<Box textAlign={"center"}>Get the app.</Box>
						<Flex gap={5} justifyContent={"center"}>
							<Image src='/playstore.png' h={"10"} alt='Playstore logo' />
							<Image src='/microsoft.png' h={"10"} alt='Microsoft logo' />
						</Flex>
					</VStack>
				</Flex>
			</Container>
		</Flex>
	);
};

export default AuthPage;

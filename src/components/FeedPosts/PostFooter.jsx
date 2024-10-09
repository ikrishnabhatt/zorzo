import { Box, Button, Flex, Input, InputGroup, InputRightElement, Text, useDisclosure } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { CommentLogo, NotificationsLogo, UnlikeLogo } from "../../assets/constants";
import usePostComment from "../../hooks/usePostComment";
import useAuthStore from "../../store/authStore";
import useLikePost from "../../hooks/useLikePost";
import { timeAgo } from "../../utils/timeAgo";
import CommentsModal from "../Modals/CommentsModal";
import { useToast } from "@chakra-ui/react";


const PostFooter = ({ post, isProfilePage, creatorProfile }) => {
	const { isCommenting, handlePostComment } = usePostComment();
	const [comment, setComment] = useState("");
	const authUser = useAuthStore((state) => state.user);
	const commentRef = useRef(null);
	const { handleLikePost, isLiked, likes } = useLikePost(post);
	const { isOpen, onOpen, onClose } = useDisclosure();
	
	// Quantity state
	const [quantity, setQuantity] = useState(1);

	const handleSubmitComment = async () => {
		await handlePostComment(post.id, comment);
		setComment("");
	};

	const toast = useToast();

    const handleAddToCart = async () => {
        try {
            const response = await axios.post('/api/cart/add', {
                productId: post.id,
                name: post.caption,
                price: post.price,
                quantity: quantity
            });

            if (response.data.success) {
                toast({
                    title: "Added to cart",
                    description: `${quantity} x ${post.caption} added to your cart`,
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
            toast({
                title: "Error",
                description: "Failed to add item to cart",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };
	// Functions to increase/decrease quantity
	const increaseQuantity = () => {
		setQuantity((prev) => prev + 1);
	};

	const decreaseQuantity = () => {
		if (quantity > 1) {
			setQuantity((prev) => prev - 1);
		}
	};


	return (
		<Box mb={10} marginTop={"auto"}>
			<Flex alignItems={"center"} justifyContent="space-between" w={"full"} pt={0} mb={2} mt={4}>
				{/* Like and Comment Icons on the left */}
				<Flex alignItems={"center"} gap={2.5}>
					<Box onClick={handleLikePost} cursor={"pointer"} fontSize={18}>
						{!isLiked ? <NotificationsLogo /> : <UnlikeLogo />}
					</Box>
					<Text fontWeight={600} fontSize={"sm"}>
						{likes} likes
					</Text>
					{/* Pipeline Symbol with Price */}
					<Text fontWeight={600} fontSize={"sm"}>| ₹{post.price}</Text> 
				</Flex>

				{/* Quantity Button */}
				<Flex alignItems="center" gap={2}>
					<Button
						onClick={decreaseQuantity}
						bg="transparent"
						color="blue.500"
						borderRadius="full"
						_hover={{ bg: "blue.100" }} // Change to desired hover color
					>
						-
					</Button>
					<Text fontSize="sm" color="blue.500" fontWeight={600}>{quantity}</Text>
					<Button
						onClick={increaseQuantity}
						bg="transparent"
						color="blue.500"
						borderRadius="full"
						_hover={{ bg: "blue.100" }} // Change to desired hover color
					>
						+
					</Button>

					{/* Add to Cart Button */}
					<Button
						id="addToCart"
						bg="blue.500"
						color="white"
						borderRadius="2xl"
						size="sm"
						_hover={{ bg: "blue.800" }}
						onClick={handleAddToCart}
					>
						Add to Cart
					</Button>
				</Flex>
			</Flex>

			{isProfilePage && (
				<Text fontSize='12' color={"gray"}>
					Posted {timeAgo(post.createdAt)}
				</Text>
			)}

			{!isProfilePage && (
				<>
					<Text fontSize='sm' fontWeight={700}>
						{creatorProfile?.username}{" "}
						<Text as='span' fontWeight={400}>
							{post.caption}
						</Text>
					</Text>
					{post.comments.length > 0 && (
						<Text fontSize='sm' color={"gray"} cursor={"pointer"} onClick={onOpen}>
							View all {post.comments.length} comments
						</Text>
					)}
					{/* COMMENTS MODAL ONLY IN THE HOME PAGE */}
					{isOpen ? <CommentsModal isOpen={isOpen} onClose={onClose} post={post} /> : null}
				</>
			)}

			{/* Comment Post Section */}
			{authUser && (
				<Flex alignItems={"center"} gap={3} justifyContent={"space-between"} w={"full"} mt={2}>					
					<Box cursor={"pointer"} fontSize={18} onClick={() => commentRef.current.focus()}>
						<CommentLogo />
					</Box>
					<InputGroup>
						<Input
							variant={"flushed"}
							placeholder={"Add a comment..."}
							fontSize={14}
							onChange={(e) => setComment(e.target.value)}
							value={comment}
							ref={commentRef}
						/>
						<InputRightElement>
							<Button
								fontSize={14}
								color={"blue.500"}
								fontWeight={600}
								cursor={"pointer"}
								_hover={{ color: "white" }}
								bg={"transparent"}
								onClick={handleSubmitComment}
								isLoading={isCommenting}
							>
								Post
							</Button>
						</InputRightElement>
					</InputGroup>
				</Flex>
			)}
		</Box>
	);
};

export default PostFooter;

import { create } from "zustand";

const usePostStore = create((set) => ({
	posts: [],
	createPost: (post) =>
		set((state) => ({ posts: [{ ...post, price: post.price || 0, quantity: post.quantity || 1 }, ...state.posts] })),
	deletePost: (id) =>
		set((state) => ({ posts: state.posts.filter((post) => post.id !== id) })),
	setPosts: (posts) =>
		set({ posts }),
	addComment: (postId, comment) =>
		set((state) => ({
			posts: state.posts.map((post) => {
				if (post.id === postId) {
					return {
						...post,
						comments: [...post.comments, comment],
					};
				}
				return post;
			}),
		})),
	// Update quantity of a specific post
	updateQuantity: (postId, quantity) =>
		set((state) => ({
			posts: state.posts.map((post) => {
				if (post.id === postId) {
					return { ...post, quantity };
				}
				return post;
			}),
		})),
	// Update price of a specific post
	updatePrice: (postId, price) =>
		set((state) => ({
			posts: state.posts.map((post) => {
				if (post.id === postId) {
					return { ...post, price };
				}
				return post;
			}),
		})),
}));

export default usePostStore;

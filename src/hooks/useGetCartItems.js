import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";

const useGetCartItems = () => {
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const authUser = useAuthStore((state) => state.user);
    const showToast = useShowToast();

    useEffect(() => {
        const getCartItems = async () => {
            setIsLoading(true);
            try {
                const q = query(collection(firestore, "cart"), where("userId", "==", authUser.id));
                const querySnapshot = await getDocs(q);
                const items = [];

                querySnapshot.forEach((doc) => {
                    items.push({ id: doc.id, ...doc.data() });
                });

                setCartItems(items);
            } catch (error) {
                showToast("Error", error.message, "error");
            } finally {
                setIsLoading(false);
            }
        };

        if (authUser) getCartItems();
    }, [authUser, showToast]);

    return { isLoading, cartItems };
};

export default useGetCartItems;

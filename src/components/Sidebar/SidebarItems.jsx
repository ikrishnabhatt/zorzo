import CreatePost from "./CreatePost";
import Home from "./Home";
import Notifications from "./Notifications";
import ProfileLink from "./ProfileLink";
import Search from "./Search";
import Cart from "./Cart";

const SidebarItems = () => {
	return (
		<>
			<Home />
			<Search />
			<Notifications />
			<CreatePost />
			<Cart />
			<ProfileLink />
		</>
	);
};

export default SidebarItems;

import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import Image from "next/image";
import { useContext, useState } from "react";
import { UserContext } from "../util/context";

function Header() {
	const [searchFocus, setSearchFocus] = useState(false);
	const session = useContext(UserContext);
	const image_url =
		session?.user?.image ||
		"https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg";
	return (
		<div className="sticky top-0 z-50 flex items-center px-4 py-4 shadow-md bg-white">
			<Button
				color="gray"
				rounded
				iconOnly
				ripple="dark"
				buttonType="outline"
				className="border-0 h-15 w-15"
			>
				<Icon name="menu" size="3xl" />
			</Button>
			<div className="flex items-center space-x-1 mx-4">
				<Icon name="description" size="4xl" color="blue" />
				<span className="text-gray-700 text-2xl">Docs</span>
			</div>
			<div
				// className={`flex ml-auto lg:mr-auto md:mr-32 lg:ml-32 xl:ml-52 2xl:ml-80 md:ml-10 max-w-xl md:flex-grow items-center px-1 rounded-lg ${
				// 	searchFocus ? "md:bg-white shadow-md" : "md:bg-gray-100"
				// }`}
				className={`flex ml-auto md:mx-20 lg:mx-32 xl:mx-auto max-w-3xl md:flex-grow items-center px-1 rounded-lg ${
					searchFocus ? "md:bg-white shadow-md" : "md:bg-gray-100"
				}`}
			>
				<Button
					color="gray"
					rounded
					iconOnly
					ripple="dark"
					buttonType="outline"
					className="border-0"
				>
					<Icon name="search" size="2xl" />
				</Button>
				<input
					type="text"
					placeholder="Search"
					className="outline-none px-2 bg-transparent hidden md:block text-base"
					onFocus={() => setSearchFocus(true)}
					onBlur={() => setSearchFocus(false)}
				/>
			</div>
			<div className="flex space-x-10">
				<Button
					color="gray"
					ripple="dark"
					buttonType="outline"
					className="border-0 mx-3"
					rounded
					iconOnly
				>
					<Icon name="apps" size="3xl" />
				</Button>
				<Image
					className="w-10 h-10 cursor-pointer hover:shadow-md rounded-3xl"
					width={40}
					height={40}
					// src="https://lh3.googleusercontent.com/ogw/ADea4I6yenyXzk1obi40hiYZV7UaQzZrl0h9qZCxgUWt=s64-c-mo"
					src={image_url}
				/>
			</div>
		</div>
	);
}

export default Header;

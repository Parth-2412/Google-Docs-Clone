import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";

import { useState } from "react";
import Avatar from "./Avatar";

function Header() {
	const [searchFocus, setSearchFocus] = useState(false);

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
			<div className="flex">
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
				<Avatar />
			</div>
		</div>
	);
}

export default Header;

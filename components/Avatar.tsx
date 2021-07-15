import Dropdown from "@material-tailwind/react/Dropdown";
import DropdownItem from "@material-tailwind/react/DropdownItem";
import Image from "next/image";
import { signOut, useSession } from "next-auth/client";

function Avatar() {
	const [session] = useSession();
	const image_url =
		session?.user?.image ||
		"https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg";
	return (
		<div className="flex items-center">
			<Image
				className="w-10 h-10 cursor-pointer hover:shadow-md rounded-3xl"
				width={40}
				height={40}
				// src="https://lh3.googleusercontent.com/ogw/ADea4I6yenyXzk1obi40hiYZV7UaQzZrl0h9qZCxgUWt=s64-c-mo"
				src={image_url}
			/>
			<Dropdown
				ripple="dark"
				buttonType="outline"
				color="white"
				className="border-0 ml-0 p-0"
				size="large"
				buttonText=""
			>
				<DropdownItem
					onClick={() => {
						signOut({
							callbackUrl: "/auth/signin",
						});
					}}
				>
					Sign Out
				</DropdownItem>
			</Dropdown>
		</div>
	);
}

export default Avatar;

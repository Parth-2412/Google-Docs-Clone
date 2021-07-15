import Icon from "@material-tailwind/react/Icon";
import { useRouter } from "next/router";

interface Props {
	size?: string;
}
function Logo({ size }: Props) {
	const router = useRouter();

	return (
		<div className="cursor-pointer">
			<Icon
				onClick={() => router.push("/")}
				name="description"
				color="blue"
				size={size || "5xl"}
			/>
		</div>
	);
}

export default Logo;

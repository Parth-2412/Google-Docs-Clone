import Icon from "@material-tailwind/react/Icon";
import Button from "@material-tailwind/react/Button";
import { IDocument } from "../interfaces/IDocument";
import { useRouter } from "next/router";

function Document({ name, createdAt, id }: IDocument) {
	const router = useRouter();
	return (
		<div className="flex px-4 py-3 rounded-lg cursor-pointer hover:bg-gray-100 justify-between items-center text-sm text-gray-600">
			<div
				className="flex items-center space-x-4"
				onClick={() => {
					router.push(`/docs/${id}`);
				}}
			>
				<Icon name="description" color="blue" size="3xl" />
				<div className="">{name}</div>
			</div>
			<div className="flex items-center space-x-11">
				<div className="">
					{createdAt.toDate().toLocaleDateString()}
				</div>
				<Button
					iconOnly
					rounded
					ripple="dark"
					color="gray"
					buttonType="outline"
					className="border-0"
				>
					<Icon name="more_vert" size="2xl" />
				</Button>
			</div>
		</div>
	);
}

export default Document;

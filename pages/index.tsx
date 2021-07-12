import Header from "../components/Header";
import { getSession, useSession } from "next-auth/client";
import { UserContext } from "../util/context";
import Icon from "@material-tailwind/react/Icon";
import Button from "@material-tailwind/react/Button";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";

export default function Home() {
	const [session] = useSession();
	const router = useRouter();
	if (!session) {
		router.push("/auth/signin");
	}
	return (
		<UserContext.Provider value={session}>
			<div className="">
				<Header />
				<div className="py-10 px-96 bg-gray-100 text-gray-600">
					<div className="flex justify-between text-lg">
						Start a new document
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
					<div className="my-3 space-y-2">
						<div className="relative border-2 h-52 w-40 hover:border-blue-400 cursor-pointer">
							<Image
								width={156}
								height={204}
								src="https://links.papareact.com/pju"
							/>
						</div>
						<div className="text-md font-semibold">Blank</div>
					</div>
				</div>
			</div>
		</UserContext.Provider>
	);
}

export async function getServerSideProps(context) {
	const session = await getSession(context);
	return session
		? {
				props: {
					session,
				},
		  }
		: {
				redirect: {
					permanent: false,
					destination: "/auth/signin",
				},
		  };
}

import Header from "../components/Header";
import { getSession, useSession } from "next-auth/client";
import { UserContext } from "../util/context";
import Icon from "@material-tailwind/react/Icon";
import Button from "@material-tailwind/react/Button";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { db } from "../util/firebase";
import { IDocument, IServerDocument } from "../interfaces/IDocument";
import firebase from "firebase";
import Document from "../components/Document";
import { checkUserAccess } from "../util/check";
import { convertDocClient } from "../util/convert";

export default function Home({ userDocs }: { userDocs: IServerDocument[] }) {
	const [session] = useSession();
	const [docs, setDocs] = useState<Array<IDocument>>(
		userDocs.map(convertDocClient)
	);
	const router = useRouter();
	useEffect(() => {
		db.collection("docs").onSnapshot((snapshot) => {
			setDocs(
				snapshot.docs.filter(checkUserAccess(session)).map((doc) => {
					const data = doc.data() as IDocument;
					return {
						...data,
						id: doc.id,
					};
				})
			);
		});
	}, []);
	if (!session) {
		router.push("/auth/signin");
	}
	return (
		<UserContext.Provider value={session}>
			<div className="">
				<Header />
				<div className="py-10 px-10  bg-gray-100 text-gray-600">
					<section className="max-w-3xl mx-auto">
						<div className="mx-auto max-w-3xl flex justify-between text-lg">
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
							<div
								className="relative border-2 h-52 w-40 hover:border-blue-400 cursor-pointer"
								onClick={() => {
									db.collection("docs").add({
										name: "Untitled",
										users: [
											db
												.collection("users")
												.doc(session.id as string),
										],
										createdAt:
											new firebase.firestore.Timestamp(
												+new Date() / 1000,
												0
											),
									});
								}}
							>
								<Image
									width={156}
									height={204}
									src="https://links.papareact.com/pju"
								/>
							</div>
							<div className="text-md font-semibold">Blank</div>
						</div>
					</section>
				</div>
				<div className="mx-auto max-w-3xl px-5 md:px-0">
					<div className="flex justify-between p-5 items-center text-gray-600 text-sm">
						<div className="font-semibold">My Documents</div>
						<div className="flex items-center space-x-10">
							<div>Created At</div>
							<Button
								iconOnly
								rounded
								ripple="dark"
								color="gray"
								buttonType="outline"
								className="border-0"
							>
								<Icon name="folder" color="gray" size="3xl" />
							</Button>
						</div>
					</div>
					{docs.map((doc) => (
						<Document {...doc} key={doc.id} />
					))}
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
					userDocs: (await db.collection("docs").get()).docs
						.filter(checkUserAccess(session))
						.map((doc) => {
							const data = doc.data() as IDocument;
							return {
								...data,
								createdAt: +data.createdAt.toDate(),
								users: data.users.map((user) => user.id),
								id: doc.id,
							};
						}),
				},
		  }
		: {
				redirect: {
					permanent: false,
					destination: "/auth/signin",
				},
		  };
}

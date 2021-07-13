import { getSession } from "next-auth/client";
import { useEffect, useState } from "react";
import { IDocument, IServerDocument } from "../../interfaces/IDocument";
import { db } from "../../util/firebase";
import { convertDocClient } from "../../util/convert";

function Doc({ userDoc }: { userDoc: IServerDocument }) {
	const [doc, setDoc] = useState(convertDocClient(userDoc));
	useEffect(() => {
		db.collection("docs")
			.doc(userDoc.id)
			.onSnapshot((snapshot) => {
				const data = snapshot.data() as IDocument;
				setDoc({
					...data,
					id: doc.id,
				});
			});
	});
	return <div>{doc.name}</div>;
}

export default Doc;

export async function getServerSideProps(context) {
	const session = await getSession(context);
	const doc = await db.collection("docs").doc(context.params.id).get();
	if (
		!doc.exists ||
		!doc
			.data()
			.users.map((user) => user.id)
			.includes(session.id as string)
	) {
		return {
			redirect: {
				permanent: false,
				destination: "/404",
			},
		};
	} else {
		const data = doc.data() as IDocument;

		return {
			props: {
				userDoc: {
					...data,
					createdAt: +data.createdAt.toDate(),
					users: data.users.map((user) => user.id),
					id: doc.id,
				},
			},
		};
	}
}

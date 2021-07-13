import { IDocument, IServerDocument } from "../interfaces/IDocument";
import firebase from "firebase";
import { db } from "./firebase";

export function convertDocClient(userDoc: IServerDocument): IDocument {
	return {
		...userDoc,
		createdAt: new firebase.firestore.Timestamp(
			userDoc.createdAt / 1000,
			0
		),
		users: userDoc.users.map((user) => db.collection("users").doc(user)),
	};
}

export function convertDocServer(
	doc: firebase.firestore.DocumentSnapshot<IDocument>
): IServerDocument {
	const data = doc.data() as IDocument;
	return {
		...data,
		createdAt: +data.createdAt.toDate(),
		users: data.users.map((user) => user.id),
		id: doc.id,
	};
}

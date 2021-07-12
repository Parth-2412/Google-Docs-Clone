import firebase from "firebase";
import { Session } from "next-auth";
import { IDocument } from "../interfaces/IDocument";

export const checkUserAccess = (session: Session) => {
	return (doc: firebase.firestore.DocumentSnapshot<IDocument>) => {
		const data = doc.data();
		return data.users.map((user) => user.id).includes(session.id as string);
	};
};

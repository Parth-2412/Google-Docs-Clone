import firebase from "firebase";

export interface IBaseDocument {
	name: string;
	content: any;
	id: string;
}
export interface IDocument extends IBaseDocument {
	createdAt: firebase.firestore.Timestamp;
	users: firebase.firestore.DocumentReference[];
}
export interface IServerDocument extends IBaseDocument {
	createdAt: number;
	users: string[];
}

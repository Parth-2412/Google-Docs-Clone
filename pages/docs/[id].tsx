import { getSession } from "next-auth/client";
import { useEffect, useRef, useState } from "react";
import { IDocument, IServerDocument } from "../../interfaces/IDocument";
import { db } from "../../util/firebase";
import { convertDocClient } from "../../util/convert";
import Icon from "@material-tailwind/react/Icon";
import Button from "@material-tailwind/react/Button";
import Avatar from "../../components/Avatar";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dynamic from "next/dynamic";
import { Editor as TextEditor } from "react-draft-wysiwyg";
import _ from "lodash";

const Editor = dynamic<TextEditor>(
	() => import("react-draft-wysiwyg").then((module) => module.Editor),
	{
		ssr: false,
	}
);

function Doc({ userDoc }: { userDoc: IServerDocument }) {
	const [doc, setDoc] = useState(convertDocClient(userDoc));
	const [name, setName] = useState(doc.name);
	const [editorState, setEditorState] = useState({
		editor: doc.content
			? EditorState.createWithContent(convertFromRaw(doc.content))
			: EditorState.createEmpty(),
		local: true,
	});
	const firstUpdate = useRef(true);
	useEffect(() => {
		return db
			.collection("docs")
			.doc(userDoc.id)
			.onSnapshot((snapshot) => {
				const data = snapshot.data() as IDocument;
				setDoc({
					...data,
					id: snapshot.id,
				});
				if (!snapshot.metadata.hasPendingWrites && doc.content) {
					setEditorState({
						editor: EditorState.createWithContent(
							convertFromRaw(data.content)
						),
						local: false,
					});
				}
			});
	}, []);
	useEffect(() => {
		if (editorState.local) {
			db.collection("docs")
				.doc(doc.id)
				.update({
					content: convertToRaw(
						editorState.editor.getCurrentContent()
					),
				});
		}
	}, [editorState]);
	useEffect(() => {
		if (firstUpdate.current) {
			firstUpdate.current = false;
			return;
		}
		db.collection("docs").doc(doc.id).update({
			name,
		});
	}, [name]);
	return (
		<div>
			<div className="flex p-3 items-center">
				<Icon name="description" color="blue" size="5xl" />
				<div className="flex-grow px-2">
					<input
						className="px-1 text-lg text-left"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<div className="flex h-8 items-center space-x-1">
						{[
							"Files",
							"Edit",
							"View",
							"Insert",
							"Format",
							"Tools",
						].map((option) => (
							<div
								className="text-sm p-2 rounded-lg text-gray-600 cursor-pointer hover:bg-gray-100"
								key={option}
							>
								{option}
							</div>
						))}
					</div>
				</div>
				<Button ripple="dark" className="hidden md:flex space-x-1 py-2">
					<Icon name="people" size="2xl" />
					<div>Share</div>
				</Button>
				<div className="ml-auto md:ml-3">
					<Avatar />
				</div>
			</div>
			<div className="bg-gray-100 min-h-screen pt-4">
				<Editor
					editorClassName="bg-white m-7 p-8"
					toolbarClassName="lg:!flex !justify-center !hidden"
					editorState={editorState.editor}
					onEditorStateChange={(newEditorState) => {
						setEditorState({
							editor: newEditorState,
							local: true,
						});
					}}
				/>
			</div>
		</div>
	);
}

export default Doc;

export async function getServerSideProps(context) {
	const session = await getSession(context);
	if (!session) {
		return {
			redirect: {
				permanent: false,
				destination: "/auth/signin",
			},
		};
	}
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
				session,
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

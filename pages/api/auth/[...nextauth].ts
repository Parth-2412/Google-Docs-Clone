import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { FirebaseAdapter } from "@next-auth/firebase-adapter";
import { db } from "../../../util/firebase";
import "firebase/firestore";

export default NextAuth({
	// Configure one or more authentication providers
	providers: [
		Providers.Google({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
		}),
		Providers.GitHub({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
	],
	adapter: FirebaseAdapter(db),
	pages: {
		signIn: "/auth/signin",
	},
});

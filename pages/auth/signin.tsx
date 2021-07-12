import { getProviders, getSession, signIn } from "next-auth/client";
import { Provider } from "next-auth/providers";
import Image from "next/image";
import Button from "@material-tailwind/react/Button";

interface PropTypes {
	providers: {
		[key: string]: Provider;
	};
}

const icons = {
	google: (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 48 48"
			width="30px"
			height="30px"
		>
			<path
				fill="#FFC107"
				d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
			/>
			<path
				fill="#FF3D00"
				d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
			/>
			<path
				fill="#4CAF50"
				d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
			/>
			<path
				fill="#1976D2"
				d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
			/>
		</svg>
	),
	github: (
		<svg
			fill="#000000"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 30 30"
			width="32px"
			height="32px"
		>
			<path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z" />
		</svg>
	),
};
function signin({ providers }: PropTypes) {
	return (
		<div className="flex justify-center items-center w-screen h-screen flex-col space-y-5">
			<Image
				src="https://links.papareact.com/1ui"
				width={550}
				height={300}
			/>
			{Object.values(providers).map((provider) => (
				<div key={provider.id}>
					<Button
						onClick={() =>
							signIn(provider.id, {
								callbackUrl: "/",
							})
						}
						buttonType="outline"
						color="blueGray"
					>
						<span className="flex items-center justify-between space-x-5">
							<span className="mr-3">
								{icons[provider.name.toLowerCase()]}
							</span>
							Sign in with {provider.name}
						</span>
					</Button>
				</div>
			))}
		</div>
	);
}

export default signin;

export async function getServerSideProps(context) {
	const session = await getSession(context);
	const providers = await getProviders();
	return !session
		? {
				props: {
					providers,
				},
		  }
		: {
				redirect: {
					permanent: false,
					destination: "/",
				},
		  };
}

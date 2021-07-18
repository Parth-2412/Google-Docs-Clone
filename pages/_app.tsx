import "@material-tailwind/react/tailwind.css";
import "tailwindcss/tailwind.css";
import Head from "next/head";
import { Provider } from "next-auth/client";
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title> Google Docs</title>
				<link
					rel="icon"
					href="https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico"
					type="image/x-icon"
				/>
				<link
					href="https://fonts.googleapis.com/icon?family=Material+Icons"
					rel="stylesheet"
				/>
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css"
					integrity="sha512-HK5fgLBL+xu6dm/Ii3z4xhlSUyZgTT9tuc/hSrtw6uzJOvgRr2a9jyxxT1ely+B+xFAmJKVSTbpM/CuL7qxO8w=="
					crossOrigin="anonymous"
				/>
				<meta charSet="utf-8" />
			</Head>
			<Provider session={pageProps.session}>
				<NextNProgress
					color="#2196F3"
					startPosition={0.3}
					stopDelayMs={200}
					height={5}
					options={{ showSpinner: false }}
					showOnShallow={true}
				/>
				<Component {...pageProps} />
				<div className="text-gray-500 p-5 flex bottom-0 left-0 right-0 z-10 justify-center absolute ">
					<p>Created by</p>
					&nbsp;
					<a
						href="https://www.instagram.com/parth_2412_/"
						className="font-medium hover:text-black"
					>
						Parth2412
					</a>
				</div>
			</Provider>
		</>
	);
}

export default MyApp;

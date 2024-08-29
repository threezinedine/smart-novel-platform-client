import React from "react";
import styles from "./Home.module.scss";
import CssLoader from "utils/cssloader";

const loader = new CssLoader(styles);

const Home: React.FC = () => {
	return (
		<div className={loader.load("home")}>
			<h1>Home Page</h1>
		</div>
	);
};

export default Home;

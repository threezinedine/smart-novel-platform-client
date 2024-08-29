import React from "react";
import styles from "./Home.module.scss";
import CssLoader from "utils/cssloader";
import FileUpload from "components/file-upload";

const loader = new CssLoader(styles);

const Home: React.FC = () => {
	return (
		<div className={loader.load("home")}>
			Home page
			<FileUpload
				id="file-upload"
				text="Upload image"
				onFileSelected={(file) => {
					console.log(file);
				}}
				secondary
			/>
		</div>
	);
};

export default Home;

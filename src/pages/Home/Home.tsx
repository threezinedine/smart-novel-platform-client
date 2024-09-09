import React from "react";
import styles from "./Home.module.scss";
import CssLoader from "utils/cssloader";
import FileUpload from "components/file-upload";
import DragList from "components/drag-list";

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
			<div className={loader.load("test-drag-list")}>
				<DragList
					items={[
						{ id: "item-1", node: <div>Item 1</div> },
						{ id: "item-2", node: <div>Item 2</div> },
						{ id: "item-3", node: <div>Item 3</div> },
						{ id: "item-4", node: <div>Item 4</div> },
					]}
				/>
			</div>
		</div>
	);
};

export default Home;

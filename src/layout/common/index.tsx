import React from "react";
import { CommonLayoutProps } from "./CommonLayoutProps";
import Toast from "components/toasts";
import Navbar from "layout/navbar";
import styles from "./Common.module.scss";
import CssLoader from "utils/cssloader";

const loader = new CssLoader(styles);

const CommonLayout: React.FC<CommonLayoutProps> = ({ page }) => {
	return (
		<div className={loader.load("container")}>
			<div className={loader.load("navbar")}>
				<Navbar />
			</div>
			<div className={loader.load("body")}>{page}</div>
			<Toast />
		</div>
	);
};

export default CommonLayout;

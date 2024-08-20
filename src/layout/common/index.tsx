import React from "react";
import { CommonLayoutProps } from "./CommonLayoutProps";
import Toast from "components/toasts";
import Navbar from "layout/navbar";

const CommonLayout: React.FC<CommonLayoutProps> = ({ page }) => {
	return (
		<div>
			<div>
				<Navbar />
			</div>
			<div>{page}</div>
			<Toast />
		</div>
	);
};

export default CommonLayout;

import React from "react";
import { CommonLayoutProps } from "./CommonLayoutProps";
import Toast from "components/toasts";

const CommonLayout: React.FC<CommonLayoutProps> = ({ page }) => {
	return (
		<div>
			<div>{page}</div>
			<Toast />
		</div>
	);
};

export default CommonLayout;

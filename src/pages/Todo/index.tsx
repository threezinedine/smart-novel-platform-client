import React from "react";

import styles from "./styles.module.scss";
import CssLoader from "utils/cssloader";

const loader = new CssLoader(styles);

const Todo = () => {
	return (
		<div
			className={loader.load("container")}
			data-testid="todo-container"
		></div>
	);
};

export default Todo;

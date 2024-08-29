import React from "react";
import { ToggleProps } from "./Props";
import styles from "./Toggle.module.scss";
import CssLoader from "utils/cssloader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

const loader = new CssLoader(styles);

const Toggle: React.FC<ToggleProps> = ({
	value,
	onChange,
	testId,
	onIcon,
	offIcon,
	className,
}) => {
	const [state, setState] = React.useState(value || false);

	const onIconItem = (
		<FontAwesomeIcon
			icon={onIcon ? onIcon : faCheck}
			className={loader.load("checkmark")}
		/>
	);

	const offIconItem = (
		<FontAwesomeIcon
			icon={offIcon ? offIcon : faXmark}
			className={loader.load("cross")}
		/>
	);

	return (
		<div
			{...{ "data-testid": testId }}
			className={loader.load("container", className)}
			onClick={() => {
				onChange && onChange(!state);
				setState(!state);
			}}
		>
			<input
				className={loader.load("input")}
				type="checkbox"
				checked={state}
				onChange={() => {}}
				{...{ "data-testid": value ? "toggle-on" : "toggle-off" }}
			/>
			<div className={loader.load("slider")}>
				<div className={loader.load("circle")}>
					{onIconItem}
					{offIconItem}
				</div>
			</div>
		</div>
	);
};

export default Toggle;

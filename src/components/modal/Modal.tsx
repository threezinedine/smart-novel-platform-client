import React from "react";
import styles from "./styles.module.scss";
import CssLoader from "utils/cssloader";
import { ModalProps } from "./Props";
import Button from "components/buttons";

const loader = new CssLoader(styles);

const Modal: React.FC<ModalProps> = ({
	visible,
	children,
	btnClassName,
	btnText,
	btnSecondary,
}) => {
	const [isVisible, setIsVisible] = React.useState(visible || false);

	return (
		<div className={loader.load("modal-container")}>
			<div
				className={loader.load(
					"container",
					isVisible ? "" : "display-none"
				)}
			>
				{isVisible && (
					<>
						<div
							data-testid="modal-background"
							className={loader.load("background")}
							onClick={() => setIsVisible(!isVisible)}
						/>
						<div
							data-testid="modal-content"
							className={loader.load("modal-content")}
						>
							<div className={loader.load("content")}>
								{children}
							</div>
						</div>
					</>
				)}
			</div>
			<Button
				testId="modal-button"
				text={btnText}
				className={btnClassName}
				secondary={btnSecondary}
				onClick={() => setIsVisible(!isVisible)}
			/>
		</div>
	);
};

export default Modal;

import React from "react";
import { CalendarProps } from "./Props";
import styles from "./styles.module.scss";
import CssLoader from "utils/cssloader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGreaterThan, faLessThan } from "@fortawesome/free-solid-svg-icons";

const loader = new CssLoader(styles);

const CustomCalendar: React.FC<CalendarProps> = ({ date, onDateChange }) => {
	date = date || new Date();
	// const [chosenDate, setChosenDate] = React.useState(date);
	const monthAbbreviation = date.toLocaleString("en-US", { month: "short" });

	return (
		<div className={loader.load("container")}>
			<div className={loader.load("month-nav")}>
				<div className={loader.load("year")}>{date.getFullYear()}</div>
				<div className={loader.load("nav")}>
					<div className={loader.load("nav-btn")}>
						<FontAwesomeIcon icon={faLessThan} />
					</div>
					<div className={loader.load("month")}>
						{monthAbbreviation}
					</div>
					<div className={loader.load("nav-btn")}>
						<FontAwesomeIcon icon={faGreaterThan} />
					</div>
				</div>
			</div>
			<div className={loader.load("month-views")}></div>
		</div>
	);
};

export default CustomCalendar;

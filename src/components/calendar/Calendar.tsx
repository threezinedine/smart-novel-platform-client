import React from "react";
import { CalendarProps } from "./Props";
import styles from "./styles.module.scss";
import CssLoader from "utils/cssloader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGreaterThan, faLessThan } from "@fortawesome/free-solid-svg-icons";
import CalendarView from "./CanlendarView";

const loader = new CssLoader(styles);

const Calendar: React.FC<CalendarProps> = ({ date, onDateChange }) => {
	date = date || new Date();
	const [chosenDate, setChosenDate] = React.useState(date);

	const handleDateChange = (date: Date) => {
		onDateChange(date);
		setChosenDate(date);
	};

	const movePrevMonth = () => {
		const newDate = new Date(chosenDate);
		newDate.setDate(1);
		newDate.setMonth(newDate.getMonth() - 1);
		setChosenDate(newDate);
	};

	const moveNextMonth = () => {
		const newDate = new Date(chosenDate);
		newDate.setDate(1);
		newDate.setMonth(newDate.getMonth() + 1);
		setChosenDate(newDate);
	};

	return (
		<div className={loader.load("container")}>
			<div className={loader.load("month-nav")}>
				<div className={loader.load("year")}>
					{chosenDate.getFullYear()}
				</div>
				<div className={loader.load("nav")}>
					<div
						className={loader.load("nav-btn")}
						onClick={movePrevMonth}
					>
						<FontAwesomeIcon icon={faLessThan} />
					</div>
					<div className={loader.load("month")}>
						{chosenDate.toLocaleString("en-US", { month: "short" })}
					</div>
					<div
						className={loader.load("nav-btn")}
						onClick={moveNextMonth}
					>
						<FontAwesomeIcon icon={faGreaterThan} />
					</div>
				</div>
			</div>
			<CalendarView date={chosenDate} onDateChange={handleDateChange} />
		</div>
	);
};

export default Calendar;

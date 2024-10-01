import React from "react";
import { GetMonthDays, weekDaysShort } from "utils/date";
import styles from "./styles.module.scss";
import CssLoader from "utils/cssloader";
import { CalendarViewProps } from "./Props";

const loader = new CssLoader(styles);

const CalendarView: React.FC<CalendarViewProps> = ({ date, onDateChange }) => {
	const monthDays: Date[][] = GetMonthDays(date);
	const [currentDate, setCurrentDate] = React.useState(date);

	const handleDateChange = (date: Date) => {
		onDateChange(date);
		setCurrentDate(date);
	};

	return (
		<table className={loader.load("month-view")}>
			<tr className={loader.load("week-day")}>
				{weekDaysShort.map((day, index) => (
					<th key={index} className={loader.load("week-day-element")}>
						{day}
					</th>
				))}
			</tr>
			{monthDays.map((week, weekIndex) => (
				<tr key={weekIndex} className={loader.load("week")}>
					{week.map((date, index) => (
						<td
							key={index}
							className={loader.load(
								"day",
								date.getMonth() !== currentDate.getMonth()
									? "outline"
									: "",
								date.getTime() === currentDate.getTime()
									? "chosen"
									: ""
							)}
							onClick={() => handleDateChange(date)}
						>
							{date.getDate()}
						</td>
					))}
				</tr>
			))}
		</table>
	);
};

export default CalendarView;

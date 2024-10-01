const weekDaysShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const GetDateWeekDay = (date: Date): string => {
	return date.toLocaleString("en-US", { weekday: "short" });
};

const GetWeekDays = (date: Date): Date[] => {
	let weekDays = [];

	const weekDayIndex = weekDaysShort.indexOf(GetDateWeekDay(date));

	for (let i = -weekDayIndex; i < 7 - weekDayIndex; i++) {
		const newDate = new Date(date);
		newDate.setDate(date.getDate() + i);
		weekDays.push(newDate);
	}

	return weekDays;
};

const GetMonthDays = (date: Date): Date[][] => {
	let monthDays: Date[][] = [];

	let tempDate = new Date(date);

	while (true) {
		const weekDays = GetWeekDays(tempDate);
		if (
			weekDays.every(
				(weekDate) => weekDate.getMonth() !== date.getMonth()
			)
		) {
			break;
		}
		tempDate.setDate(tempDate.getDate() - 7);
	}

	tempDate.setDate(tempDate.getDate() + 7);

	while (true) {
		const weekDays = GetWeekDays(tempDate);
		if (
			weekDays.every(
				(weekDate) => weekDate.getMonth() !== date.getMonth()
			)
		) {
			break;
		}

		monthDays.push(weekDays);

		tempDate.setDate(tempDate.getDate() + 7);
	}

	return monthDays;
};

export { GetDateWeekDay, GetWeekDays, GetMonthDays, weekDaysShort };

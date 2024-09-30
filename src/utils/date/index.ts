const GetDateWeekDay = (date: Date): string => {
	return date.toLocaleString("en-US", { weekday: "short" });
};

export { GetDateWeekDay };

import { GetDateWeekDay, GetWeekDays, GetMonthDays } from ".";

describe("Date utils testing", () => {
	it("should return the correct week day", () => {
		expect(GetDateWeekDay(new Date("2024-10-08"))).toBe("Tue");
	});

	it("should return the week's days", () => {
		expect(GetWeekDays(new Date("2024-10-08"))).toEqual([
			new Date("2024-10-06"),
			new Date("2024-10-07"),
			new Date("2024-10-08"),
			new Date("2024-10-09"),
			new Date("2024-10-10"),
			new Date("2024-10-11"),
			new Date("2024-10-12"),
		]); /// 6 is Sun, 12 is Sat
	});

	it("should include the last days of the previous month", () => {
		expect(GetWeekDays(new Date("2024-10-03"))).toEqual([
			new Date("2024-09-29"),
			new Date("2024-09-30"),
			new Date("2024-10-01"),
			new Date("2024-10-02"),
			new Date("2024-10-03"),
			new Date("2024-10-04"),
			new Date("2024-10-05"),
		]);
	});

	it("should include the first days of the next month", () => {
		expect(GetWeekDays(new Date("2024-10-30"))).toEqual([
			new Date("2024-10-27"),
			new Date("2024-10-28"),
			new Date("2024-10-29"),
			new Date("2024-10-30"),
			new Date("2024-10-31"),
			new Date("2024-11-01"),
			new Date("2024-11-02"),
		]);
	});

	it("should return the whole days of the month in list of weeks", () => {
		const monthDays = GetMonthDays(new Date("2024-10-08"));
		const dayOnly: number[][] = monthDays.map((week) =>
			week.map((day) => day.getDate())
		);

		expect(dayOnly).toEqual([
			[29, 30, 1, 2, 3, 4, 5],
			[6, 7, 8, 9, 10, 11, 12],
			[13, 14, 15, 16, 17, 18, 19],
			[20, 21, 22, 23, 24, 25, 26],
			[27, 28, 29, 30, 31, 1, 2],
		]);
	});

	it("should return the empty list if the sunday is the 1st", () => {
		const monthDays = GetMonthDays(new Date("2024-09-12"));
		const dayOnly = monthDays.map((week) =>
			week.map((day) => day.getDate())
		);

		expect(dayOnly).toEqual([
			[1, 2, 3, 4, 5, 6, 7],
			[8, 9, 10, 11, 12, 13, 14],
			[15, 16, 17, 18, 19, 20, 21],
			[22, 23, 24, 25, 26, 27, 28],
			[29, 30, 1, 2, 3, 4, 5],
		]);
	});

	it("should return the empty list if the saturday is the last day", () => {
		const monthDays = GetMonthDays(new Date("2024-08-23"));
		const dayOnly = monthDays.map((week) =>
			week.map((day) => day.getDate())
		);

		expect(dayOnly).toEqual([
			[28, 29, 30, 31, 1, 2, 3],
			[4, 5, 6, 7, 8, 9, 10],
			[11, 12, 13, 14, 15, 16, 17],
			[18, 19, 20, 21, 22, 23, 24],
			[25, 26, 27, 28, 29, 30, 31],
		]);
	});
});

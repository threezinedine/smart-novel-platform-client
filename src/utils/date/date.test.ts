import { GetDateWeekDay } from ".";

describe("Date utils testing", () => {
	expect(GetDateWeekDay(new Date("2024-10-08"))).toBe("Tue");
});

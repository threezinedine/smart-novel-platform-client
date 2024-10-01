interface CalendarProps {
	date: Date | null;
	onDateChange: (date: Date) => void;
}

interface CalendarViewProps {
	date: Date;
	onDateChange: (date: Date) => void;
}

export type { CalendarProps, CalendarViewProps };

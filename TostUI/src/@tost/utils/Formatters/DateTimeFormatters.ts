export const formatDate = (date: Date, format: string): string => {
	const day = String(date.getDate()).padStart(2, "0");
	const weekDay = date.toLocaleString("default", { weekday: "short" });
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const shortMonth = date.toLocaleString("default", { month: "short" });
	const longMonth = date.toLocaleString("default", { month: "long" });
	const year = String(date.getFullYear());
	const shortYear = year.slice(-2);

	return format
		.replace("d", day)
		.replace("m", month)
		.replace("Y", year)
		.replace("y", shortYear)
		.replace("M", shortMonth)
		.replace("F", longMonth)
		.replace("l", weekDay);
};

export const formatTime = (date: Date, format: string): string => {
	const hours24 = date.getHours();
	const hours12 = hours24 % 12 || 12;
	const minutes = String(date.getMinutes()).padStart(2, "0");
	const amPmLower = hours24 >= 12 ? "pm" : "am";
	const amPmUpper = amPmLower.toUpperCase();

	return format
		.replace("hh", String(hours12).padStart(2, "0"))
		.replace("HH", String(hours24).padStart(2, "0"))
		.replace("mm", minutes)
		.replace("AM", amPmUpper)
		.replace("am", amPmLower);
};

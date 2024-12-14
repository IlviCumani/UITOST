export function formatNumber(value: number): string {
	return value.toString().padStart(2, "0");
}

export function formatToCapitalCase(value: string): string {
	return value.charAt(0).toUpperCase() + value.slice(1);
}

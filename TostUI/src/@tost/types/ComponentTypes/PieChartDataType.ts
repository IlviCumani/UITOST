export type PieChartDataType = {
	name: string;
	fill?: string;
} & {
	[key: string]: string | number;
};

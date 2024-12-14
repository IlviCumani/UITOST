import {
	Bar,
	BarChart as BC,
	CartesianGrid,
	Cell,
	LabelList,
	Rectangle,
	XAxis,
	YAxis,
} from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/ui/cardCN";
import {
	ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/ui/chartCN";
import { useMemo } from "react";

const NAME_KEY = "name";
const COLOR_DEFINING_KEY = "fill";

type BarChartDataType = {
	[key: string]: string | number;
};

type BarChartProps = {
	chartData: BarChartDataType[];
	nameKey?: string;
	title?: string;
	description?: string;
	tickFormatter?: (value: string) => string;
	labelFormatter?: (value: string) => string;
	horizontal?: boolean;
	showLabel?: boolean;
	showLegend?: boolean;
	stacked?: boolean;
	yAxisTickCount?: number;
};

export default function BarChart({
	chartData,
	nameKey = NAME_KEY,
	title,
	description,
	tickFormatter = (value: string) => value,
	labelFormatter = (value: string) => value,
	horizontal = false,
	showLabel = false,
	showLegend = false,
	stacked = false,
	yAxisTickCount = 0,
}: BarChartProps) {
	const dataKeys = useMemo(() => {
		if (chartData.length === 0) return [];

		return Object.keys(chartData[0]).filter((key) => key !== nameKey && key !== COLOR_DEFINING_KEY);
	}, [chartData, nameKey]);

	const hasNegativeValues = useMemo(() => {
		return chartData.some((item) => dataKeys.some((key) => Number(item[key] ?? 0) < 0));
	}, [chartData, dataKeys]);

	const [chartConfig] = useMemo(() => {
		const config: ChartConfig = {};

		dataKeys.forEach((key, index) => {
			config[key] = {
				label: key,
				color: `hsl(var(--chart-${(index % 5) + 1}))`,
			};
		});

		return [config];
	}, [dataKeys]);

	return (
		<Card>
			{(title || description) && (
				<CardHeader>
					{title && <CardTitle>{title}</CardTitle>}
					{description && <CardDescription>{description}</CardDescription>}
				</CardHeader>
			)}
			<CardContent className="px-2 sm:p-6">
				<ChartContainer config={chartConfig} className="aspect-auto h-[300px] w-full">
					<BC
						accessibilityLayer
						data={chartData}
						layout={horizontal ? "vertical" : "horizontal"}
						margin={{
							right: 56,
						}}
					>
						<CartesianGrid vertical={horizontal} horizontal={!horizontal} />

						{!horizontal ? (
							!hasNegativeValues && (
								<>
									{yAxisTickCount && (
										<YAxis
											tickLine={false}
											axisLine={false}
											tickMargin={8}
											tickCount={yAxisTickCount}
										/>
									)}
									<XAxis
										dataKey={nameKey}
										tickLine={false}
										tickMargin={12}
										axisLine={false}
										tickFormatter={tickFormatter}
									/>
								</>
							)
						) : (
							<>
								{dataKeys.map((key) => {
									return <XAxis key={key} type="number" dataKey={key} hide />;
								})}
								<YAxis
									dataKey={nameKey}
									type="category"
									tickLine={false}
									tickMargin={10}
									axisLine={false}
									tickFormatter={tickFormatter}
									hide={hasNegativeValues}
								/>
							</>
						)}

						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent indicator="line" labelFormatter={labelFormatter} />}
						/>
						{showLegend && !hasNegativeValues  && (
							<ChartLegend content={<ChartLegendContent />} />
						)}

						{dataKeys.map((key, index) => {
							const isLast = index === dataKeys.length - 1;

							return (
								<Bar
									key={key}
									dataKey={key}
									fill={`hsl(var(--chart-${(index % 5) + 1}))`}
									radius={stacked ? [isLast ? 6 : 0, isLast ? 6 : 0, 0, 0] : 4}
									{...(stacked ? { stackId: "a" } : {})}
									activeBar={({ ...props }) => {
										return (
											<Rectangle
												{...props}
												fillOpacity={0.8}
												stroke={props.payload.fill}
												strokeDasharray={4}
												strokeDashoffset={4}
											/>
										);
									}}
								>
									{showLabel && !stacked && !hasNegativeValues && (
										<LabelList
											dataKey={key}
											position={horizontal ? "right" : "top"}
											offset={12}
											className="fill-foreground"
											fontSize={12}
										/>
									)}

									{hasNegativeValues && (
										<>
											<LabelList
												position={horizontal ? "right" : "top"}
												dataKey={nameKey}
												fillOpacity={1}
											/>
											{chartData.map((item) => (
												<Cell
													key={item[nameKey] as string}
													fill={
														Number(item[key]) > 0 ? "hsl(var(--chart-1))" : "hsl(var(--chart-2))"
													}
												/>
											))}
										</>
									)}
								</Bar>
							);
						})}
					</BC>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}

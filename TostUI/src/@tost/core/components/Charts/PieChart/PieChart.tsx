import { Pie, PieChart as PC, Sector, Label } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/ui/cardCN";
import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/ui/chartCN";
import { useMemo, useState } from "react";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import { ChartVariant } from "./enums/PieChartVariants";
import type { PieChartDataType } from "@/@tost/types/ComponentTypes/PieChartDataType";
import { ChartPie } from "lucide-react";
import InnerLabel from "./components/InnerLabel";

const NAME_KEY = "name";
const DATA_KEY = "value";

type Props = {
	title?: string;
	description?: string;
	chartData: PieChartDataType[];
	outerChartData?: PieChartDataType[];
	variant?: ChartVariant;
	showTooltipLabel?: boolean;
	onSelect?: (name: string) => void;
	showLegend?: boolean;
	innerDataValue: string;
	innerDataLabel?: string;
	legendVerticalAlign?: "top" | "bottom";
	dataKey?: string;
	nameKey?: string;
	outerDataKey?: string;
	outerNameKey?: string;
};

export default function PieChart({
	title,
	description,
	showLegend,
	chartData = [],
	outerChartData,
	variant = ChartVariant.Full,
	showTooltipLabel = true,
	onSelect,
	innerDataValue,
	innerDataLabel,
	legendVerticalAlign = "bottom",
	dataKey = DATA_KEY,
	nameKey = NAME_KEY,
	outerDataKey,
	outerNameKey,
}: Props) {
	const isMultipleCharts = useMemo(() => outerChartData !== undefined, [outerChartData]);

	const [active, setActive] = useState<number | null>(null);

	function handleSelect(name: string, data: PieSectorDataItem[] = formattedData) {
		const index = data.findIndex((item) => item.name === name);
		setActive(active === index ? null : index);
		if (onSelect !== undefined) {
			onSelect(name);
		}
	}

	const formattedData = useMemo(() => {
		return chartData.map((item) => ({
			...item,
			display: item[nameKey],
			name: item[nameKey].toString().toLowerCase().replace(/\s/g, ""),
			fill:
				item.fill || `var(--color-${item[nameKey].toString().toLowerCase().replace(/\s/g, "")})`,
		}));
	}, [chartData, nameKey]);

	const formattedOuterData = useMemo(() => {
		if (!outerChartData) return [];
		return outerChartData.map((item) => ({
			...item,
			display: item[outerNameKey || nameKey],
			name: (item[outerNameKey || nameKey] || "").toString().toLowerCase().replace(/\s/g, ""),
			fill:
				item.fill ||
				`var(--color-${(item[outerNameKey || nameKey] || "")
					.toString()
					.toLowerCase()
					.replace(/\s/g, "")})`,
		}));
	}, [outerChartData, outerNameKey, nameKey]);

	const chartConfig = useMemo(() => {
		return formattedData.reduce<Record<string, { label: string; color?: string }>>(
			(acc, { name, display }, i) => {
				acc[name] = {
					label: display.toString(),
					color: `hsl(var(--chart-${((i + 1) % 5) + 1}))`,
				};
				return acc;
			},
			{
				[dataKey]: { label: dataKey },
				...(outerDataKey ? { [outerDataKey]: { label: outerDataKey } } : {}),
			},
		);
	}, [formattedData, dataKey, outerDataKey]);

	return (
		<Card className="flex flex-col h-full">
			<CardHeader className="items-center pb-0">
				{title && <CardTitle>{title}</CardTitle>}
				{description && <CardDescription>{description}</CardDescription>}
			</CardHeader>
			<CardContent className="flex-1 pb-0 flex items-center justify-center  mt-5 ">
				{chartData.length > 0 ? (
					<ChartContainer
						config={chartConfig}
						className="flex justify-center items-center aspect-square min-h-[300px] size-[calc(100% - 2rem)]"
					>
						<PC>
							<Pie
								onClick={
									onSelect !== undefined
										? (data: PieSectorDataItem) => handleSelect(data.name as string)
										: undefined
								}
								data={formattedData}
								dataKey={dataKey}
								nameKey={"display"}
								stroke="0"
								activeIndex={active !== null ? active : undefined}
								outerRadius={isMultipleCharts ? 60 : undefined}
								innerRadius={
									variant === ChartVariant.Donut ? `${!isMultipleCharts ? "50%" : "30%"}` : "0%"
								}
								activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => (
									<Sector {...props} outerRadius={outerRadius + (isMultipleCharts ? 5 : 10)} />
								)}
							>
								{variant === ChartVariant.Donut && innerDataValue !== undefined && (
									<Label
										content={({ viewBox }) => {
											return (
												<InnerLabel
													innerDataValue={innerDataValue}
													innerDataLabel={innerDataLabel}
													viewBox={viewBox}
												/>
											);
										}}
									/>
								)}
							</Pie>

							{isMultipleCharts && (
								<Pie
									onClick={
										onSelect !== undefined
											? (data: PieSectorDataItem) =>
													handleSelect(data.name as string, outerChartData)
											: undefined
									}
									data={formattedOuterData}
									dataKey={outerDataKey!}
									nameKey={outerNameKey}
									innerRadius={70}
									outerRadius={90}
									activeIndex={active !== null ? active : undefined}
									activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => (
										<Sector {...props} outerRadius={outerRadius + 5} />
									)}
								></Pie>
							)}

							<ChartTooltip
								cursor={false}
								content={
									<ChartTooltipContent
										hideLabel={!showTooltipLabel && !isMultipleCharts}
										indicator="line"
									/>
								}
							/>

							{showLegend && !isMultipleCharts && (
								<ChartLegend
									verticalAlign={legendVerticalAlign}
									content={<ChartLegendContent nameKey={nameKey} />}
									className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
								/>
							)}
						</PC>
					</ChartContainer>
				) : (
					<div className="text-center text-lg text-muted-foreground flex items-center justify-center flex-col min-h-24">
						<ChartPie />
						<span>{"No Data To Show"}</span>
					</div>
				)}
			</CardContent>
		</Card>
	);
}

PieChart.Variant = ChartVariant;

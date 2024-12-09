import { Area, AreaChart as AC, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/ui/cardCN";
import {
	ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/ui/chartCN";
import Select from "../../UserInputs/Select/Select";
import { StackVariant } from "./enum/StackVariant";
import type { SelectOptionItem } from "@/@tost/types/ComponentTypes/SelectOptionItem";
import type { CurveType } from "recharts/types/shape/Curve";
import { ComponentType, useMemo } from "react";
import { ChartArea } from "lucide-react";

const NAME_KEY = "label";

type AreaChartDataType = {
	[key: string]: string | number;
	[key: number]: number;
};

type showIconConfigType = {
	dataKey: string;
	icon: ComponentType;
};

type AreaChartProps = {
	chartData: AreaChartDataType[];
	nameKey: string;
	title?: string;
	description?: string;
	curveType?: CurveType;
	tickFormatter?: (value: string) => string;
	tooltipFormatter?: (value: string) => string;
	legendVerticalAlign?: "top" | "bottom";
	showIconConfig?: showIconConfigType[];
	showLegend?: boolean;
	yAxisTickCount?: number;
	gradient?: boolean;
	selectOptions?: SelectOptionItem[];
	stackVariant?: StackVariant;
	onSelectChange?: (value: string) => void;
};

function generateFillValue(key: string, gradient: boolean) {
	if (gradient) {
		return `url(#fill${key})`;
	}

	return `var(--color-${key})`;
}

export default function AreaChart({
	chartData = [],
	nameKey = NAME_KEY,
	title,
	description,
	curveType = "natural",
	tickFormatter = (value) => value.slice(0, 3),
	tooltipFormatter = (value) => value,
	legendVerticalAlign = "bottom",
	showIconConfig = [],
	showLegend = true,
	yAxisTickCount = 0,
	gradient,
	selectOptions = [],
	stackVariant = StackVariant.None,
	onSelectChange,
}: AreaChartProps) {
	const dataKeys = useMemo(() => {
		if (chartData.length === 0) return [];

		return Object.keys(chartData[0]).filter((key) => key !== nameKey);
	}, [chartData, nameKey]);

	const showSelect = useMemo(() => selectOptions.length > 0, [selectOptions.length]);

	const chartConfig = useMemo(() => {
		const config: ChartConfig = {};
		dataKeys.forEach((key, index) => {
			config[key] = {
				label: key,
				color: `hsl(var(--chart-${(index % 5) + 1}))`,
				icon: showIconConfig?.length > 0 ? showIconConfig[index].icon : undefined,
			};
		});

		return config;
	}, [showIconConfig, dataKeys]);

	return (
		<Card>
			<CardHeader
				className={`${
					showSelect ? "flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row" : " "
				}`}
			>
				<div className={showSelect ? "grid flex-1 gap-1 text-center sm:text-left" : " "}>
					{title && <CardTitle>{title}</CardTitle>}
					{description && <CardDescription>{description}</CardDescription>}
				</div>

				{showSelect && (
					<div className="w-[160px]">
						<Select
							options={selectOptions}
							onChange={(value) => {
								onSelectChange?.(value.toString());
							}}
						></Select>
					</div>
				)}
			</CardHeader>
			<CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
				{chartData.length > 0 ? (
					<ChartContainer config={chartConfig}>
						<AC
							accessibilityLayer
							data={chartData}
							margin={{
								top: showSelect ? 12 : 0,
								left: 12,
								right: 12,
							}}
							stackOffset={stackVariant}
						>
							{gradient &&
								dataKeys.map((key) => (
									<defs key={key}>
										<linearGradient id={`fill${key}`} x1="0" y1="0" x2="0" y2="1">
											<stop offset="5%" stopColor={`var(--color-${key})`} stopOpacity={0.8} />
											<stop offset="95%" stopColor={`var(--color-${key})`} stopOpacity={0.1} />
										</linearGradient>
									</defs>
								))}

							<CartesianGrid vertical={false} />
							<XAxis
								dataKey={nameKey}
								tickLine={false}
								axisLine={false}
								tickMargin={8}
								tickFormatter={tickFormatter}
							/>
							{yAxisTickCount && (
								<YAxis
									tickLine={false}
									axisLine={false}
									tickMargin={8}
									tickCount={yAxisTickCount}
								/>
							)}
							<ChartTooltip
								cursor={false}
								content={
									<ChartTooltipContent
										indicator="line"
										labelFormatter={(value) => tooltipFormatter(value)}
									/>
								}
							/>
							{dataKeys.map((key) => (
								<Area
									key={key}
									dataKey={key}
									type={curveType}
									fill={generateFillValue(key, !!gradient)}
									fillOpacity={0.8}
									stroke={`var(--color-${key})`}
									stackId={1}
								/>
							))}

							{showLegend && (
								<ChartLegend verticalAlign={legendVerticalAlign} content={<ChartLegendContent />} />
							)}
						</AC>
					</ChartContainer>
				) : (
					<div className="text-center text-lg text-muted-foreground flex items-center justify-center flex-col min-h-24">
						<ChartArea />
						<span>{"No Data To Show"}</span>
					</div>
				)}
			</CardContent>
		</Card>
	);
}

AreaChart.StackVariant = StackVariant;

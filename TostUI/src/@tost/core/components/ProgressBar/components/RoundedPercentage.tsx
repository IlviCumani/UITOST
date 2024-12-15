import { Label, LabelList, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import { ChartContainer } from "@/ui/chartCN";
import type { ProgressProps } from "../Progress";
import { LabelFormat, LabelPosition, ProgressBarVariant } from "../enum/LabelDisplayEnum";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

const chartConfig = {
	value: {
		label: "Value",
	},
	left: {
		label: "Left",
	},
};

export default function RoundedProgress({
	value = 0,
	indicatorColor = "",
	className,
	labelPosition = LabelPosition.ASIDE,
	progressVariant = ProgressBarVariant.CIRCLE,
	labelFormat = LabelFormat.PERCENTAGE,
	max = 100,
}: ProgressProps) {
	const chartData = useMemo(() => {
		return [
			{
				value: value,
				left: max - value,
			},
		];
	}, [value, max]);

	const isInside = useMemo(() => labelPosition === LabelPosition.INSIDE, [labelPosition]);
	const isFullCircle = useMemo(
		() => progressVariant === ProgressBarVariant.CIRCLE,
		[progressVariant],
	);
	const isPercentage = useMemo(() => labelFormat === LabelFormat.PERCENTAGE, [labelFormat]);

	return (
		<div>
			<ChartContainer
				config={chartConfig}
				className={cn("mx-auto aspect-square w-full max-w-[250px]", className)}
			>
				<RadialBarChart
					data={chartData}
					startAngle={isFullCircle ? 90 : 180}
					endAngle={isFullCircle ? -270 : 0}
					innerRadius={60}
					outerRadius={isInside ? 100 : 80}
				>
					<PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
						{!isInside && labelPosition !== LabelPosition.NONE && (
							<Label
								content={({ viewBox }) => {
									if (viewBox && "cx" in viewBox && "cy" in viewBox) {
										return (
											<text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
												<tspan
													x={viewBox.cx}
													y={
														(viewBox.cy || 0) -
														(progressVariant === ProgressBarVariant.CIRCLE ? -7 : 5)
													}
													className={cn(
														"fill-foreground font-bold",
														isPercentage ? "text-2xl" : "text-lg",
													)}
												>
													{`${value.toLocaleString()}${isPercentage ? "%" : `/${max}`}`}
												</tspan>
											</text>
										);
									}
								}}
							/>
						)}
					</PolarRadiusAxis>

					<RadialBar
						dataKey="value"
						{...(isInside ? { background: true } : {})}
						stackId="a"
						cornerRadius={0}
						fill={indicatorColor ? indicatorColor : "hsl(var(--primary))"}
						className="stroke-transparent stroke-2 "
					>
						{isInside && isPercentage && (
							<LabelList
								position="insideStart"
								dataKey="value"
								className="text-white capitalize mix-blend-luminosity text-base"
								fontSize={11}
							/>
						)}
					</RadialBar>
					<RadialBar
						dataKey="left"
						stackId="a"
						cornerRadius={0}
						fill={`hsl(var(--primary) / 20%)`}
						className="stroke-transparent stroke-2"
					/>
				</RadialBarChart>
			</ChartContainer>
		</div>
	);
}

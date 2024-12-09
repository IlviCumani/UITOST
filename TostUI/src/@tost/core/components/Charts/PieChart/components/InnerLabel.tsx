import type { ViewBox } from "recharts/types/util/types";

export default function InnerLabel({
	innerDataValue,
	innerDataLabel,
	viewBox,
}: {
	innerDataValue: string;
	innerDataLabel?: string;
	viewBox?: ViewBox;
}) {
	if (viewBox && "cx" in viewBox && "cy" in viewBox) {
		return (
			<text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
				<tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-2xl font-bold">
					{innerDataValue}
				</tspan>
				{innerDataLabel && (
					<tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
						{innerDataLabel}
					</tspan>
				)}
			</text>
		);
	} else {
		return null;
	}
}

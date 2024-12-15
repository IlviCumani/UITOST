import { Label } from "@/ui/labelCN";
import type { ProgressProps } from "../Progress";
import { LabelPosition, LabelFormat } from "../enum/LabelDisplayEnum";
import { cn } from "@/lib/utils";
import { Progress as P } from "@/ui/progressCN";

export default function LineProgress({
	value,
	indicatorColor,
	className,
	labelPosition = LabelPosition.ASIDE,
	labelFormat = LabelFormat.PERCENTAGE,
	max = 1000,
}: ProgressProps) {
	return (
		<div
			className={`flex items-center justify-between gap-4 ${
				labelPosition === LabelPosition.INSIDE ? "flex-col relative h-[18px]" : "flex-row "
			}`}
		>
			{labelPosition !== LabelPosition.NONE && (
				<Label
					className={
						labelPosition === LabelPosition.INSIDE
							? "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 "
							: ""
					}
				>
					{`${value}${labelFormat === LabelFormat.PERCENTAGE ? "%" : `/${max}`}`}
				</Label>
			)}
			<P
				value={Math.round((value / max) * 100)}
				className={cn(labelPosition === LabelPosition.INSIDE ? "h-full" : "", className)}
				indicatorColor={indicatorColor}
				max={max}
			/>
		</div>
	);
}

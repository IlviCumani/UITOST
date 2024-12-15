import { LabelPosition, ProgressBarVariant, LabelFormat } from "./enum/LabelDisplayEnum";
import type { ProgressProps } from "./types/ProgressPropsType";

import LineProgress from "./components/LineProgress";
import RoundedProgress from "./components/RoundedPercentage";
import { useMemo } from "react";

export default function Progress({
	value = 0,
	indicatorColor,
	className,
	labelPosition = LabelPosition.ASIDE,
	progressVariant = ProgressBarVariant.LINE,
	labelFormat = LabelFormat.PERCENTAGE,
	max = 100,
}: ProgressProps) {
	const isPercentage = useMemo(() => labelFormat === LabelFormat.PERCENTAGE, [labelFormat]);

	const valueToDisplay = useMemo(() => {
		if (isPercentage) {
			return value > max ? 100 : Math.round((value / max) * 100);
		}

		return value;
	}, [value, max, isPercentage]);

	if (
		progressVariant === ProgressBarVariant.CIRCLE ||
		progressVariant === ProgressBarVariant.SEMI_CIRCLE
	) {
		return (
			<RoundedProgress
				value={valueToDisplay}
				indicatorColor={indicatorColor}
				className={className}
				labelPosition={labelPosition}
				progressVariant={progressVariant}
				labelFormat={labelFormat}
				max={isPercentage ? 100 : max}
			/>
		);
	}

	return (
		<LineProgress
			value={valueToDisplay}
			indicatorColor={indicatorColor}
			className={className}
			labelPosition={labelPosition}
			labelFormat={labelFormat}
			max={isPercentage ? 100 : max}
		/>
	);
}

export { ProgressBarVariant, LabelPosition, ProgressProps };

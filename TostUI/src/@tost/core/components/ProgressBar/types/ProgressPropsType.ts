import { LabelPosition, ProgressBarVariant, LabelFormat } from "../enum/LabelDisplayEnum";

export type ProgressProps = {
	value: number;
	indicatorColor?: string;
	className?: string;
	labelPosition?: LabelPosition;
	progressVariant?: ProgressBarVariant;
	labelFormat?: LabelFormat;
	max?: number;
};

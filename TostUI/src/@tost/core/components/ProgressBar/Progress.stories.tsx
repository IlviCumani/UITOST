import { ComponentProps } from "react";
import Progress from "./Progress";
import { Meta, StoryObj } from "@storybook/react";
import { LabelPosition, ProgressBarVariant, LabelFormat } from "./enum/LabelDisplayEnum";

type StoryProps = ComponentProps<typeof Progress>;

function helperProgressColor(value: number) {
	if (value < 25) {
		return "hsl(0 90.6% 70.8%)";
	} else if (value < 50) {
		return "hsl(43.3 96.4% 56.3%)";
	} else if (value < 75) {
		return "hsl(198.4 93.2% 59.6%)";
	} else {
		return "hsl(158.1 64.4% 51.6%)";
	}
}

const meta: Meta<StoryProps> = {
	component: Progress,
	tags: ["autodocs"],
	title: "Core/Progress/Progress",
	args: {
		value: 50,
		labelPosition: LabelPosition.ASIDE,
		labelFormat: LabelFormat.PERCENTAGE,
		progressVariant: ProgressBarVariant.LINE,
		className: "",
		max: 100,
	},
	argTypes: {
		value: {
			control: {
				type: "range",
				min: 0,
				max: 100,
				step: 1,
			},
		},
		labelPosition: {
			control: {
				type: "select",
			},
			options: Object.values(LabelPosition),
		},
		progressVariant: {
			control: {
				type: "select",
			},
			options: Object.values(ProgressBarVariant),
		},
		labelFormat: {
			control: {
				type: "select",
			},
			options: Object.values(LabelFormat),
		},
	},
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Primary: Story = {
	render: ({ ...args }) => <Progress {...args} />,
};

export const Inside: Story = {
	args: {
		labelPosition: LabelPosition.INSIDE,
	},

	render: ({ ...args }) => <Progress {...args} />,
};

export const Circle: Story = {
	args: {
		progressVariant: ProgressBarVariant.CIRCLE,
	},

	render: ({ ...args }) => <Progress {...args} />,
};

export const SemiCircle: Story = {
	args: {
		progressVariant: ProgressBarVariant.SEMI_CIRCLE,
	},

	render: ({ ...args }) => <Progress {...args} />,
};

export const Colors: Story = {
	render: ({ value }) => (
		<div className="grid grid-cols-3 gap-4 items-center max-sm:grid-cols-1">
			<Progress value={value} indicatorColor="hsl(238.7 83.5% 66.7%)" />
			<Progress
				value={value}
				indicatorColor="hsl(158.1 64.4% 51.6%)"
				progressVariant={ProgressBarVariant.CIRCLE}
			/>
			<Progress
				value={value}
				indicatorColor="hsl(328.6 85.5% 70.2%)"
				progressVariant={ProgressBarVariant.SEMI_CIRCLE}
			/>

			<div className="col-span-3 text-center max-sm:col-span-1">
				<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-3xl">
					Percentage inside{" "}
				</h1>
			</div>

			<div className="col-span-3 grid grid-cols-2 max-sm:grid-cols-1 max-sm:col-span-1 items-center">
				<Progress
					value={value}
					labelPosition={LabelPosition.INSIDE}
					indicatorColor="hsl(43.3 96.4% 56.3%)"
				/>
				<Progress
					value={value}
					labelPosition={LabelPosition.INSIDE}
					indicatorColor="hsl(351.3 94.5% 71.4%)"
					progressVariant={ProgressBarVariant.CIRCLE}
				/>
			</div>

			<div className="col-span-3 text-center max-sm:col-span-1">
				<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-3xl">
					Dynamic color
				</h1>
			</div>

			<div className="col-span-3 max-sm:col-span-1">
				<Progress
					value={value}
					indicatorColor={helperProgressColor(value)}
					progressVariant={ProgressBarVariant.SEMI_CIRCLE}
				/>
			</div>

			<div className="col-span-3 text-center max-sm:col-span-1">
				<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-3xl">
					With Value
				</h1>
			</div>

			<div className="col-span-3 grid grid-cols-2 max-sm:grid-cols-1 max-sm:col-span-1">
				<Progress
					value={value}
					indicatorColor={"hsl(263.4 70% 50.4%)"}
					progressVariant={ProgressBarVariant.CIRCLE}
					labelFormat={LabelFormat.VALUE}
					className="col-span-3"
					max={1000}
				/>
				<Progress
					value={value}
					progressVariant={ProgressBarVariant.SEMI_CIRCLE}
					labelFormat={LabelFormat.VALUE}
					max={1000}
				/>
			</div>
		</div>
	),
};

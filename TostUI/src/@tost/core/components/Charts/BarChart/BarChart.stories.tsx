import { ComponentProps } from "react";
import BarChart from "./BarChart";
import { Meta, StoryObj } from "@storybook/react";

type StoryProps = ComponentProps<typeof BarChart>;

const meta: Meta<StoryProps> = {
	component: BarChart,
	tags: ["autodocs"],
	title: "Core/Charts/BarChart",
	args: {
		horizontal: false,
		showLabel: false,
		showLegend: true,
		stacked: false,
		chartData: [
			{ month: "April", desktop: 278, mobile: 100 },
			{ month: "March", desktop: 200, mobile: 100 },
			{ month: "February", desktop: 100, mobile: 100 },
			{ month: "January", desktop: 300, mobile: 100 },
			{ month: "May", desktop: 189, mobile: 100 },
			{ month: "June", desktop: 239, mobile: 100 },
		],
		nameKey: "month",
		title: "Bar Chart",
		description: "This is a bar chart",
		tickFormatter: (value) => value.slice(0, 3),
		yAxisTickCount: 5,
	},
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Primary: Story = {
	args: {},
	render: (props: StoryProps) => <BarChart {...props} />,
};

export const Horizontal: Story = {
	args: {
		horizontal: true,
	},
	render: (props: StoryProps) => <BarChart {...props} />,
};

export const SingleBar: Story = {
	args: {
		chartData: [
			{ browser: "chrome", visitors: 187 },
			{ browser: "safari", visitors: 200, fill: "#f00" },
			{ browser: "firefox", visitors: 275 },
			{ browser: "edge", visitors: 173 },
			{ browser: "other", visitors: 90 },
		],
		nameKey: "browser",
		tickFormatter: (value) => value,
	},
	render: (props: StoryProps) => <BarChart {...props} />,
};

export const NegativeValues: Story = {
	args: {
		chartData: [
			{ month: "April", desktop: -278 },
			{ month: "March", desktop: 200 },
			{ month: "February", desktop: -100 },
			{ month: "January", desktop: -300 },
			{ month: "May", desktop: -189 },
			{ month: "June", desktop: 239 },
		],
	},
	render: (props: StoryProps) => <BarChart {...props} />,
};

export const Stacked: Story = {
	args: {
		stacked: true,
	},
	render: (props: StoryProps) => <BarChart {...props} />,
};

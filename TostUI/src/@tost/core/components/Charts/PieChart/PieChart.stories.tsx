import { ComponentProps } from "react";
import PieChart from "./PieChart";
import { Meta, StoryObj } from "@storybook/react";

type StoryProps = ComponentProps<typeof PieChart>;

const meta: Meta<StoryProps> = {
	component: PieChart,
	tags: ["autodocs"],
	title: "Core/Charts/PieChart",
	args: {
		chartData: [
			{ name: "A", book: 100 },
			{ name: "B", book: 200 },
			{ name: "C", book: 300 },
			{ name: "D", book: 400 },
			{ name: "E", book: 500 },
		],
		variant: PieChart.Variant.Full,
		dataKey: "book",
	},
	argTypes: {
		chartData: {
			control: "object",
			description: "Data for the chart.",
		},
		variant: {
			control: {
				type: "select",
			},
			options: Object.values(PieChart.Variant),
			description: "Chart variant.",
		},
	},
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Full: Story = {
	args: {
		title: "Pie Chart",
		description: "This is a pie chart",
		showLegend: true,
		showTooltipLabel: true,
		onSelect: (key: string) => console.log(key),
		innerDataValue: "1500",
	},

	render: ({ ...args }) => <PieChart {...args} />,
};

export const Donut: Story = {
	args: {
		...Full.args,
		variant: PieChart.Variant.Donut,
		innerDataLabel: "Total",
	},

	render: ({ ...args }) => <PieChart {...args} />,
};

export const MultipleCharts: Story = {
	args: {
		...Full.args,
		outerChartData: [
			{ name: "A", computer: 600 },
			{ name: "B", computer: 120 },
			{ name: "C", computer: 250 },
			{ name: "D", computer: 100 },
			{ name: "E", computer: 500 },
		],
		outerDataKey: "computer",
	},

	render: ({ ...args }) => <PieChart {...args} />,
};

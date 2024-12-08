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
			{ name: "A", book: 100, fill: "var(--color-A)" },
			{ name: "B", book: 200, fill: "var(--color-B)" },
			{ name: "C", book: 300, fill: "var(--color-C)" },
			{ name: "D", book: 400, fill: "var(--color-D)" },
			{ name: "E", book: 500, fill: "var(--color-E)" },
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
			{ name: "A", computer: 600, fill: "var(--color-A)" },
			{ name: "B", computer: 120, fill: "var(--color-B)" },
			{ name: "C", computer: 250, fill: "var(--color-C)" },
			{ name: "D", computer: 100, fill: "var(--color-D)" },
			{ name: "E", computer: 500, fill: "var(--color-E)" },
		],
		outerDataKey: "computer",
	},

	render: ({ ...args }) => <PieChart {...args} />,
};

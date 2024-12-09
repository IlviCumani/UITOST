import { ComponentProps } from "react";
import AreaChart from "./AreaChart";
import { Meta, StoryObj } from "@storybook/react";
import { Computer, Smartphone } from "lucide-react";

type StoryProps = ComponentProps<typeof AreaChart>;

function formatterHelper(value: string) {
	const date = new Date(value);
	return date.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
	});
}

const meta: Meta<StoryProps> = {
	component: AreaChart,
	tags: ["autodocs"],
	title: "Core/Charts/AreaChart",
	args: {
		chartData: [
			{ month: "January", desktop: 186, mobile: 80 },
			{ month: "February", desktop: 305, mobile: 200 },
			{ month: "March", desktop: 237, mobile: 120 },
			{ month: "April", desktop: 73, mobile: 190 },
			{ month: "May", desktop: 209, mobile: 130 },
			{ month: "June", desktop: 214, mobile: 140 },
		],
		title: "Area Chart",
		description: "Area Chart description",
		nameKey: "month",
		showIconConfig: [
			{ dataKey: "desktop", icon: Computer },
			{ dataKey: "mobile", icon: Smartphone },
		],
		showLegend: true,
		curveType: "natural",
		legendVerticalAlign: "bottom",
		yAxisTickCount: 5,
		gradient: false,
		stackVariant: AreaChart.StackVariant.None,
	},
	argTypes: {
		curveType: {
			control: {
				type: "select",
			},
			options: [
				"basis",
				"cardinal",
				"catmullRom",
				"linear",
				"monotone",
				"natural",
				"step",
				"stepAfter",
				"stepBefore",
			],
		},
		stackVariant: {
			control: {
				type: "select",
			},
			options: Object.values(AreaChart.StackVariant),
		},
	},
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Primary: Story = {
	args: {},
	render: ({ ...args }) => <AreaChart {...args} />,
};

export const Interactive: Story = {
	args: {
		chartData: [
			{ date: "2024-04-01", mobile: 222, desktop: 150 },
			{ date: "2024-04-02", mobile: 97, desktop: 180 },
			{ date: "2024-04-03", mobile: 167, desktop: 120 },
			{ date: "2024-04-04", mobile: 242, desktop: 260 },
			{ date: "2024-04-05", mobile: 373, desktop: 290 },
			{ date: "2024-04-06", mobile: 301, desktop: 340 },
			{ date: "2024-04-07", mobile: 245, desktop: 180 },
			{ date: "2024-04-08", mobile: 409, desktop: 320 },
			{ date: "2024-04-09", mobile: 59, desktop: 110 },
			{ date: "2024-04-10", mobile: 261, desktop: 190 },
			{ date: "2024-04-11", mobile: 327, desktop: 350 },
			{ date: "2024-04-12", mobile: 292, desktop: 210 },
			{ date: "2024-04-13", mobile: 342, desktop: 380 },
			{ date: "2024-04-14", mobile: 137, desktop: 220 },
			{ date: "2024-04-15", mobile: 120, desktop: 170 },
			{ date: "2024-04-16", mobile: 138, desktop: 190 },
			{ date: "2024-04-17", mobile: 446, desktop: 360 },
			{ date: "2024-04-18", mobile: 364, desktop: 410 },
			{ date: "2024-04-19", mobile: 243, desktop: 180 },
			{ date: "2024-04-20", mobile: 89, desktop: 150 },
			{ date: "2024-04-21", mobile: 137, desktop: 200 },
			{ date: "2024-04-22", mobile: 224, desktop: 170 },
			{ date: "2024-04-23", mobile: 138, desktop: 230 },
			{ date: "2024-04-24", mobile: 387, desktop: 290 },
			{ date: "2024-04-25", mobile: 215, desktop: 250 },
			{ date: "2024-04-26", mobile: 75, desktop: 130 },
			{ date: "2024-04-27", mobile: 383, desktop: 420 },
			{ date: "2024-04-28", mobile: 122, desktop: 180 },
			{ date: "2024-04-29", mobile: 315, desktop: 240 },
			{ date: "2024-04-30", mobile: 454, desktop: 380 },
			{ date: "2024-05-01", mobile: 165, desktop: 220 },
			{ date: "2024-05-02", mobile: 293, desktop: 310 },
			{ date: "2024-05-03", mobile: 247, desktop: 190 },
			{ date: "2024-05-04", mobile: 385, desktop: 420 },
			{ date: "2024-05-05", mobile: 481, desktop: 390 },
			{ date: "2024-05-06", mobile: 498, desktop: 520 },
			{ date: "2024-05-07", mobile: 388, desktop: 300 },
			{ date: "2024-05-08", mobile: 149, desktop: 210 },
			{ date: "2024-05-09", mobile: 227, desktop: 180 },
			{ date: "2024-05-10", mobile: 293, desktop: 330 },
			{ date: "2024-05-11", mobile: 335, desktop: 270 },
			{ date: "2024-05-12", mobile: 197, desktop: 240 },
			{ date: "2024-05-13", mobile: 197, desktop: 160 },
			{ date: "2024-05-14", mobile: 448, desktop: 490 },
			{ date: "2024-05-15", mobile: 473, desktop: 380 },
			{ date: "2024-05-16", mobile: 338, desktop: 400 },
			{ date: "2024-05-17", mobile: 499, desktop: 420 },
			{ date: "2024-05-18", mobile: 315, desktop: 350 },
			{ date: "2024-05-19", mobile: 235, desktop: 180 },
			{ date: "2024-05-20", mobile: 177, desktop: 230 },
			{ date: "2024-05-21", mobile: 82, desktop: 140 },
			{ date: "2024-05-22", mobile: 81, desktop: 120 },
			{ date: "2024-05-23", mobile: 252, desktop: 290 },
			{ date: "2024-05-24", mobile: 294, desktop: 220 },
			{ date: "2024-05-25", mobile: 201, desktop: 250 },
			{ date: "2024-05-26", mobile: 213, desktop: 170 },
			{ date: "2024-05-27", mobile: 420, desktop: 460 },
			{ date: "2024-05-28", mobile: 233, desktop: 190 },
			{ date: "2024-05-29", mobile: 78, desktop: 130 },
			{ date: "2024-05-30", mobile: 340, desktop: 280 },
			{ date: "2024-05-31", mobile: 178, desktop: 230 },
			{ date: "2024-06-01", mobile: 178, desktop: 200 },
			{ date: "2024-06-02", mobile: 470, desktop: 410 },
			{ date: "2024-06-03", mobile: 103, desktop: 160 },
			{ date: "2024-06-04", mobile: 439, desktop: 380 },
			{ date: "2024-06-05", mobile: 88, desktop: 140 },
			{ date: "2024-06-06", mobile: 294, desktop: 250 },
			{ date: "2024-06-07", mobile: 323, desktop: 370 },
			{ date: "2024-06-08", mobile: 385, desktop: 320 },
			{ date: "2024-06-09", mobile: 438, desktop: 480 },
			{ date: "2024-06-10", mobile: 155, desktop: 200 },
			{ date: "2024-06-11", mobile: 92, desktop: 150 },
			{ date: "2024-06-12", mobile: 492, desktop: 420 },
			{ date: "2024-06-13", mobile: 81, desktop: 130 },
			{ date: "2024-06-14", mobile: 426, desktop: 380 },
			{ date: "2024-06-15", mobile: 307, desktop: 350 },
			{ date: "2024-06-16", mobile: 371, desktop: 310 },
			{ date: "2024-06-17", mobile: 475, desktop: 520 },
			{ date: "2024-06-18", mobile: 107, desktop: 170 },
			{ date: "2024-06-19", mobile: 341, desktop: 290 },
			{ date: "2024-06-20", mobile: 408, desktop: 450 },
			{ date: "2024-06-21", mobile: 169, desktop: 210 },
			{ date: "2024-06-22", mobile: 317, desktop: 270 },
			{ date: "2024-06-23", mobile: 480, desktop: 530 },
			{ date: "2024-06-24", mobile: 132, desktop: 180 },
			{ date: "2024-06-25", mobile: 141, desktop: 190 },
			{ date: "2024-06-26", mobile: 434, desktop: 380 },
			{ date: "2024-06-27", mobile: 448, desktop: 490 },
			{ date: "2024-06-28", mobile: 149, desktop: 200 },
			{ date: "2024-06-29", mobile: 103, desktop: 160 },
			{ date: "2024-06-30", mobile: 446, desktop: 400 },
		],
		nameKey: "date",
		tickFormatter: formatterHelper,
		tooltipFormatter: formatterHelper,
		showIconConfig: [],
		selectOptions: [
			{ value: "3 days", label: "Last 3 days" },
			{ value: "30 days", label: "Last 30 days" },
			{ value: "💍", label: "last 7 days" },
		],
		onSelectChange: (value: string) => {
			console.log(value);
		},
	},
	render: ({ ...args }) => <AreaChart {...args} />,
};

import { ComponentProps } from "react";
import Loader from "./Loader";
import { Meta, StoryObj } from "@storybook/react";

type StoryProps = ComponentProps<typeof Loader>;

const meta: Meta<StoryProps> = {
	component: Loader,
	tags: ["autodocs"],
	title: "Core/Loader/Loader",
	args: {
		size: 50,
		className: "text-primary",
	},
	argTypes: {
		size: {
			control: {
				type: "number",
			},
		},
		variant: {
			control: {
				type: "select",
			},
			options: ["Default", "Circle", "PinWheel", "Arrow", "DoubleArrow"],
			defaultValue: "Default",
		},
	},
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Primary: Story = {
	render: ({ ...args }) => <Loader {...args} />,
};

export const Circle: Story = {
	args: {
		variant: Loader.Variants.Circle,
	},
	render: ({ ...args }) => <Loader {...args} />,
};

export const PinWheel: Story = {
	args: {
		variant: Loader.Variants.PinWheel,
	},
	render: ({ ...args }) => <Loader {...args} />,
};

export const Arrow: Story = {
	args: {
		variant: Loader.Variants.Arrow,
	},
	render: ({ ...args }) => <Loader {...args} />,
};

export const DoubleArrow: Story = {
	args: {
		variant: Loader.Variants.DoubleArrow,
	},
	render: ({ ...args }) => <Loader {...args} />,
};

export const Small: Story = {
	args: {
		size: 20,
	},
	render: ({ ...args }) => <Loader {...args} />,
};

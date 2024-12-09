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
		variant: Loader.Variants.Circle,
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

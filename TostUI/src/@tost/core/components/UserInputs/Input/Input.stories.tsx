import { ComponentProps } from "react";
import Input from "./Input";
import { Meta, StoryObj } from "@storybook/react";

type StoryProps = ComponentProps<typeof Input>;

const meta: Meta<StoryProps> = {
	component: Input,
	tags: ["autodocs"],
	title: "Core/UserInput/Input",
	args: {},
};

export default meta;
type Story = StoryObj<StoryProps>;

export const Primary: Story = {
	args: {
		noStyle: false,
		placeholder: "Placeholder",
		wrapperClassName: "",
	},
	render: ({ ...args }) => <Input {...args} />,
};

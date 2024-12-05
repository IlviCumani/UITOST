import { ComponentProps } from "react";
import Input from "./Input";
import { Meta, StoryObj } from "@storybook/react";
import { Clock9 } from "lucide-react";

type StoryProps = ComponentProps<typeof Input>;

const meta: Meta<StoryProps> = {
	component: Input,
	tags: ["autodocs"],
	title: "Core/Input/Input",
	args: {},
};

export default meta;
type Story = StoryObj<StoryProps>;

export const Primary: Story = {
	args: {
		noStyle: false,
		prepend: <Clock9 />,
		append: <span>days</span>,
		wrapperClassName: "",
	},
	render: ({ ...args }) => <Input {...args} />,
};

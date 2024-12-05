import { ComponentProps } from "react";
import Button from "./Button";
import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { CheckCheck } from "lucide-react";

type StoryProps = ComponentProps<typeof Button>;

const meta: Meta<StoryProps> = {
	component: Button,
	tags: ["autodocs"],
	title: "Core/Buttons/Button",
	args: {
		onClick: fn(),
		children: "Click me",
	},
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Primary: Story = {
	args: {
		loading: false,
		disabled: false,
		reverse: false,
		variant: "default",
		size: "default",
		rounded: "sm",
		icon: <CheckCheck />,
	},

	render: ({ ...args }) =><div className={'flex'}>
		<Button {...args}>{args.children}</Button>,
	</div>
};

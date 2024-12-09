import { ComponentProps } from "react";
import Button from "./Button";
import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { CheckCheck } from "lucide-react";
import { LoaderVariant } from "../Loader/enums/LoaderVariants";

type StoryProps = ComponentProps<typeof Button>;

const meta: Meta<StoryProps> = {
	component: Button,
	tags: ["autodocs"],
	title: "Core/Buttons/Button",
	args: {
		onClick: fn(),
		children: "Click me",
	},
	argTypes: {
		loaderVariant: {
			control: {
				type: "select",
			},
			options: Object.values(LoaderVariant),
		},
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
		loaderVariant: LoaderVariant.Circle,
	},

	render: ({ ...args }) => <Button {...args}>{args.children}</Button>,
};

export const Loading: Story = {
	args: {
		loading: true,
		disabled: false,
		reverse: false,
		variant: "default",
		size: "default",
		rounded: "sm",
		icon: <CheckCheck />,
	},

	render: ({ ...args }) => <Button {...args}>{args.children}</Button>,
};

export const Icon: Story = {
	args: {
		loading: false,
		disabled: false,
		reverse: false,
		variant: "default",
		size: "icon",
		rounded: "sm",
		icon: <CheckCheck />,
	},

	render: ({ ...args }) => <Button {...args}></Button>,
};

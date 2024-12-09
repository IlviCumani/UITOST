import { Meta, StoryObj } from "@storybook/react";
import Select from "./Select";
import type { SwitchProps } from "./Select";

const meta: Meta = {
	title: "Core/UserInput/Select",
	tags: ["autodocs"],
	component: Select,
	argTypes: {
		id: {
			control: {
				type: "text",
			},
		},
		options: {
			control: {
				type: "object",
			},
		},
		defaultValue: {
			control: {
				type: "text",
			},
		},
		onChange: {
			description: "Function to handle the change event.",
		},
		isLoading: {
			control: {
				type: "boolean",
			},
		},
	},
};

export default meta;
type Story = StoryObj<SwitchProps>; // Use the correct props type here

export const Primary: Story = {
	args: {
		id: "select",
		options: [
			{ label: "Option 1", value: "1" },
			{ label: "Option 2", value: "2" },
			{ label: "Option 3", value: "3" },
			{ label: "Option 4", value: "4" },
			{ label: "Option 5", value: "5" },
			{ label: "Option 6", value: "6" },
			{ label: "Option 7", value: "7" },
			{ label: "Option 8", value: "8" },
			{ label: "Option 9", value: "9" },
		],
		isLoading: false,
		defaultValue: "1",
		onChange: (value) => console.log(value, " selected"),
	},
	render: (args) => {
		return <Select {...args} />;
	},
};

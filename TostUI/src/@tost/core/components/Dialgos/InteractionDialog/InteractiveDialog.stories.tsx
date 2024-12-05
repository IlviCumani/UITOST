import { ComponentProps } from "react";
import InteractiveDialog from "./InteractiveDialog";
import { Meta, StoryObj } from "@storybook/react";

type StoryProps = ComponentProps<typeof InteractiveDialog>;

const meta: Meta<StoryProps> = {
	component: InteractiveDialog,
	tags: ["autodocs"],
	title: "Core/Dialogs/InteractiveDialog",
	args: {
		title: "Title",
		defaultOpen: true,
	},
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Primary: Story = {
	args: {},
	render: ({ ...args }) => {
		return (
			<>
				<InteractiveDialog {...args}>
					<div>Content</div>
				</InteractiveDialog>
			</>
		);
	},
};

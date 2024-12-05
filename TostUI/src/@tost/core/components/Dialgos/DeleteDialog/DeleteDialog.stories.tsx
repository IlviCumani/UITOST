import { ComponentProps } from "react";
import DeleteDialog from "./DeleteDialog";
import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

type StoryProps = ComponentProps<typeof DeleteDialog>;

const meta: Meta<StoryProps> = {
	component: DeleteDialog,
	tags: ["autodocs"],
	title: "Core/Dialogs/DeleteDialog",
	args: {
		selectedToDelete: "Agent",
		defaultOpen: true,
		onDelete: fn(),
		onCancel: fn(),
		t: (key: string) => key,
		dialogTitle: "Are you sure you want to delete",
		dialogDescription: "You will not be able to recover the deleted record!",
	},
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Primary: Story = {
	args: {},
	render: ({ ...args }) => {
		return (
			<>
				<DeleteDialog {...args} />
			</>
		);
	},
};

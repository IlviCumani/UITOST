import { ComponentProps } from "react";
import Tabs from "./Tab";
import { Meta, StoryObj } from "@storybook/react";
import { BookmarkCheck, GalleryVertical, UserRoundCheck, UserRoundX } from "lucide-react";

type StoryProps = ComponentProps<typeof Tabs>;

const meta: Meta<StoryProps> = {
	component: Tabs,
	tags: ["autodocs"],
	title: "Core/Tabs/Tab",
	args: {
		tabConfig: [
			{
				value: "all",
				label: (
					<div className="flex gap-4 items-center">
						All
						<GalleryVertical />
					</div>
				),
				component: <div>All</div>,
			},
			{
				value: "active",
				label: (
					<div className="flex gap-4 items-center text-emerald-400">
						Active
						<UserRoundCheck />
					</div>
				),
				component: <div>Active</div>,
			},
			{
				value: "inactive",
				label: (
					<div className="flex gap-4 items-center text-destructive">
						Inactive
						<UserRoundX />
					</div>
				),
				component: <div>Inactive</div>,
			},
			{
				value: "completed",
				label: (
					<div className="flex gap-4 items-center">
						Completed
						<BookmarkCheck />
					</div>
				),
				component: <div>Completed</div>,
			},
		],
		searchParams: new URLSearchParams({
			tab: "active",
		}),
		setSearchParams: (params: Record<string, string>) => {
			console.log("Updated params:", params);
		},
	},
	argTypes: {
		tabConfig: {
			control: "object",
			description: "Configure the tabs dynamically.",
		},
		setSearchParams: {
			control: false,
			description: "Function to update the active tab programmatically.",
		},
	},
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Primary: Story = {
	args: {},
	render: ({ tabConfig, setSearchParams, ...args }) => (
		<Tabs
			{...args}
			tabConfig={tabConfig}
			setSearchParams={(params: Record<string, string>) => {
				setSearchParams(params);
				console.log("Active tab changed to:", params);
			}}
		/>
	),
};

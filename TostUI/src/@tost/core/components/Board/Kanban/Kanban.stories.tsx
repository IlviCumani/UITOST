import { ComponentProps } from "react";
import { KanbanBoard } from "./KanbanBoard";
import { Meta, StoryObj } from "@storybook/react";

type StoryProps = ComponentProps<typeof KanbanBoard>;

const meta: Meta<StoryProps> = {
	component: KanbanBoard,
	tags: ["autodocs"],
	title: "Core/Board/KanbanBoard",
	args: {
		data: [
			{
				id: "task-1",
				columnId: "column-to-do",
				title: "Task 1",
				badge: "1",
				content: "This is a task",
			},
			{
				id: "task-2",
				columnId: "column-to-do",
				title: "Task 2",
				badge: "2",
				content: "This is an other task",
			},
			{
				id: "task-3",
				columnId: "column-in-progress",
				title: "Task 3",
				badge: "3",
				content: "This is a task",
			},
			{
				id: "task-4",
				columnId: "column-done",
				title: "Task 4",
				badge: "4",
				content: "This is a task",
			},
		],
		defaultColumns: [
			{
				id: "column-to-do",
				title: "To Do",
				color: "#fbbf24",
			},
			{
				id: "column-in-progress",
				title: "In Progress",
				color: "#2dd4bf",
			},
			{
				id: "column-done",
				title: "Done",
				color: "#4ade80",
			},
		],
		onMoveColumn: (column, position) => {
			console.log("Column moved", column, position);
		},
		onMoveTask: (task) => {
			console.log("Task moved", task.id + " to " + task.columnId);
		},
		onAddTask: (columnId) => {
			console.log("Task added to column", columnId);
		},
	},
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Primary: Story = {
	render: ({ ...args }) => <KanbanBoard {...args}></KanbanBoard>,
};
//

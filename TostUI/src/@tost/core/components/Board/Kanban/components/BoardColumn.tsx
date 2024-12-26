import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { useDndContext, type UniqueIdentifier } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useMemo } from "react";
import { Task, TaskCard } from "./TaskCard";
import { cva } from "class-variance-authority";
import { Card, CardContent, CardHeader } from "@/ui/cardCN";
import { Button } from "@/ui/buttonCN";
import { GripVertical } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/ui/scrollAreaCN";
import { Badge } from "@/ui/badgeCN";
import AddNewTask from "./AddNewTask";
export interface Column {
	id: UniqueIdentifier;
	title: string;
	color: string;
}

export type ColumnType = "Column";

export interface ColumnDragData {
	type: ColumnType;
	column: Column;
}

interface BoardColumnProps {
	column: Column;
	tasks: Task[];
	isOverlay?: boolean;
	isDraggableColumn?: boolean;
	isDraggableTask?: boolean;
	onAddTask?: (columnId: UniqueIdentifier) => void;
}

export function BoardColumn({
	column,
	tasks,
	isOverlay,
	isDraggableColumn,
	isDraggableTask,
	onAddTask,
}: BoardColumnProps) {
	const tasksIds = useMemo(() => {
		return tasks.map((task) => task.id);
	}, [tasks]);

	const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
		id: column.id,
		data: {
			type: "Column",
			column,
		} satisfies ColumnDragData,
		attributes: {
			roleDescription: `Column: ${column.title}`,
		},
	});

	const style = {
		transition,
		transform: CSS.Translate.toString(transform),
	};

	const variants = cva(
		"flex-1 min-w-[350px] max-w-full bg-secondary flex flex-col flex-shrink-0 snap-center",
		{
			variants: {
				dragging: {
					default: "border-2 border-transparent",
					over: "ring-2 opacity-30",
					overlay: "ring-2 ring-primary",
				},
			},
		},
	);

	return (
		<Card
			ref={setNodeRef}
			style={style}
			className={variants({
				dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
			})}
		>
			<CardHeader className="p-4 font-semibold border-b-2 text-left flex flex-row space-between items-center">
				<div className="flex items-center gap-2 flex-1">
					{isDraggableColumn && (
						<Button
							variant={"ghost"}
							{...attributes}
							{...listeners}
							className=" p-1 text-primary/50 -ml-2 h-auto cursor-grab relative"
						>
							<span className="sr-only">{`Move column: ${column.title}`}</span>
							<GripVertical />
						</Button>
					)}

					<span className="flex items-center gap-2">
						<div
							className="size-4 rounded-full"
							style={{
								backgroundColor: column.color,
							}}
						></div>
						{column.title}
					</span>

					<Badge className="ml-auto" variant="secondary">
						{tasks.length}
					</Badge>
				</div>
			</CardHeader>
			<ScrollArea>
				<CardContent className="flex flex-grow flex-col gap-2 p-2">
					<SortableContext items={tasksIds}>
						{tasks.length
							? tasks.map((task) => (
									<TaskCard key={task.id} task={task} isDraggable={isDraggableTask} />
							  ))
							: onAddTask && (
									<AddNewTask
										onClick={() => {
											onAddTask(column.id);
										}}
									/>
							  )}
					</SortableContext>
				</CardContent>
			</ScrollArea>
		</Card>
	);
}

export function BoardContainer({ children }: { children: React.ReactNode }) {
	const dndContext = useDndContext();

	const variations = cva("px-2 md:px-0 flex lg:justify-center pb-4", {
		variants: {
			dragging: {
				default: "snap-x snap-mandatory",
				active: "snap-none",
			},
		},
	});

	return (
		<ScrollArea
			className={variations({
				dragging: dndContext.active ? "active" : "default",
			})}
		>
			<div className="flex gap-4 items-start flex-row ">{children}</div>
			<ScrollBar orientation="horizontal" />
		</ScrollArea>
	);
}

import { Button } from "@/ui/buttonCN";
import { Plus } from "lucide-react";

type AddNewTaskProps = {
	onClick: () => void;
	addBtnText?: string;
};

export default function AddNewTask({ onClick, addBtnText = "Add New Item" }: AddNewTaskProps) {
	return (
		<Button
			onClick={onClick}
			variant={"secondary"}
			className="cursor-pointer flex items-center justify-center min-h-[100px] border-dashed border-2 border-primary rounded-lg"
		>
			<Plus size={24} />
			{addBtnText}
		</Button>
	);
}

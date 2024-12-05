import { Button } from "@/ui/buttonCN";
import { CircleAlert } from "lucide-react";
import { forwardRef, useImperativeHandle, useRef } from "react";

import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogTitle,
	AlertDialogTrigger,
	AlertDialogHeader,
	AlertDialogAction,
	AlertDialogCancel,
} from "@/ui/alertDialogCN";

type DialogProps = {
	selectedToDelete?: string | null;
	dialogTitle?: string;
	dialogDescription?: string;
	icon?: React.ReactNode;
	onDelete: () => void;
	onCancel: () => void;
	t: (key: string) => string;
	defaultOpen?: boolean;
};

const DeleteDialog = forwardRef(function DeleteAgentDialog(
	{
		onDelete,
		onCancel,
		selectedToDelete,
		t,
		defaultOpen = false,
		icon = <CircleAlert size={98} className="text-orange-300" />,
		dialogTitle = "are-you-sure-you-want-to-delete",
		dialogDescription = "you-will-not-be-able-to-recover-the-deleted-record!",
	}: DialogProps,
	ref,
) {
	const buttonRef = useRef<HTMLButtonElement>(null);

	useImperativeHandle(ref, () => ({
		toggle: () => {
			buttonRef.current?.click();
		},
	}));

	return (
		<AlertDialog defaultOpen={defaultOpen}>
			<AlertDialogTrigger asChild>
				<Button className="hidden" ref={buttonRef}></Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="flex flex-col items-center">
				{icon}
				<AlertDialogHeader>
					<AlertDialogTitle className="text-center">
						{t(dialogTitle) + " " + selectedToDelete} ?
					</AlertDialogTitle>
				</AlertDialogHeader>
				<AlertDialogDescription>{t(dialogDescription)}</AlertDialogDescription>
				<div className="flex gap-4">
					<AlertDialogCancel className="text-destructive" onClick={onCancel} asChild>
						<Button variant={"transparent"}>{t("cancel")}</Button>
					</AlertDialogCancel>
					<AlertDialogAction onClick={onDelete}>{t("confirm")}</AlertDialogAction>
				</div>
			</AlertDialogContent>
		</AlertDialog>
	);
});

export default DeleteDialog;

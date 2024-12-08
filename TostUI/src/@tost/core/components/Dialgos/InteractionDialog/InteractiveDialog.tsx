// import Button from "../../Button/Button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/ui/dialogCN";
import { forwardRef, useRef, useImperativeHandle, PropsWithChildren } from "react";

type AddNewLeadAgentProps = {
	title: string;
	defaultOpen?: boolean;
};

const InteractiveDialog = forwardRef(function InteractiveDialog(
	{ children, title, defaultOpen = false }: PropsWithChildren<AddNewLeadAgentProps>,
	ref,
) {
	const buttonRef = useRef<HTMLButtonElement>(null);

	useImperativeHandle(ref, () => ({
		toggle: () => {
			buttonRef.current?.click();
		},
	}));

	return (
		<Dialog defaultOpen={defaultOpen}>
			<DialogTrigger className="hidden" ref={buttonRef}></DialogTrigger>
			<DialogContent className="min-w-min">
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
				</DialogHeader>
				{children}
			</DialogContent>
		</Dialog>
	);
});

export default InteractiveDialog;

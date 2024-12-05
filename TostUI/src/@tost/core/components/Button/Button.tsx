import { Button as BTN } from "@/ui/buttonCN";
import { LoaderCircle } from "lucide-react";
import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = {
	variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "transparent";
	size?: "default" | "sm" | "lg" | "icon";
	loading?: boolean;
	disabled?: boolean;
	className?: string;
	onClick?: () => void;
	icon?: JSX.Element;
	rounded?: "none" | "sm" | "md" | "lg" | "full";
	reverse?: boolean;
	rest?: ButtonHTMLAttributes<HTMLButtonElement>;
};

const ROUNDED_VARIANT = {
	none: "rounded-none",
	sm: "rounded-sm",
	md: "rounded-md",
	lg: "rounded-lg",
	full: "rounded-full",
};

export default function Button({
	variant = "default",
	size = "default",
	onClick,
	loading,
	disabled,
	className,
	children,
	icon,
	rounded = "sm",
	reverse,
	rest,
}: PropsWithChildren<ButtonProps>) {
	return (
		<BTN
			variant={variant}
			size={size}
			onClick={onClick}
			disabled={disabled || loading}
			className={cn(
				"flex flex-1 gap-4 ",
				ROUNDED_VARIANT[size !== "icon" ? rounded : "lg"],
				reverse ? "flex-row-reverse" : "",
				className,
			)}
			{...rest}
		>
			{loading && <LoaderCircle className="animate-spin" />}
			{!loading && icon}
			{size !== "icon" && children}
		</BTN>
	);
}

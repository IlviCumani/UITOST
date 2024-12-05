import { forwardRef, Fragment, InputHTMLAttributes, useMemo } from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	noStyle?: boolean;
	prepend?: React.ReactNode;
	append?: React.ReactNode;
	wrapperClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, type, noStyle, prepend, append, wrapperClassName, ...props }, ref) => {
		const Wrapper = useMemo(() => {
			return noStyle || prepend || append ? "div" : Fragment;
		}, [noStyle, prepend, append]);

		return (
			<Wrapper
				className={cn(
					`flex items-center px-2 rounded-md ${
						prepend || append
							? "border border-input focus-visible:ring-1 focus-visible:ring-ring shadow-sm"
							: ""
					} `,
					wrapperClassName,
				)}
			>
				{prepend && prepend}
				<input
					type={type}
					className={cn(
						`flex h-9 w-full rounded-md ${
							noStyle || prepend || append
								? ""
								: "border border-input focus-visible:ring-1 focus-visible:ring-ring shadow-sm"
						}  bg-transparent px-3 py-1 text-sm  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50`,
						className,
					)}
					ref={ref}
					{...props}
				/>
				{append && append}
			</Wrapper>
		);
	},
);
Input.displayName = "Input";

export default Input;

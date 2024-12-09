import {
	Select as SelectComponent,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
	SelectGroup,
} from "@/ui/selectCN";
import { useEffect, useState } from "react";
import Loader from "../../Loader/Loader";
import type { SelectOptionItem } from "@/@tost/types/ComponentTypes/SelectOptionItem";

export type SwitchProps = {
	id?: string;
	options: SelectOptionItem[];
	defaultValue?: string | number;
	onChange?: (value: string | number) => void;
	isLoading?: boolean;
};

export default function Select({
	id,
	options = [],
	defaultValue,
	onChange,
	isLoading,
}: SwitchProps) {
	const [value, setValue] = useState<string | number | undefined>();

	useEffect(() => {
		if (defaultValue) {
			setValue(defaultValue);
		} else {
			setValue(options[0]?.value);
		}
	}, [defaultValue, options]);

	function handleChange(value: string) {
		setValue(value);
		onChange?.(value);
	}

	return (
		<SelectComponent value={value?.toString()} onValueChange={handleChange}>
			<SelectTrigger className="flex-1" id={id} disabled={isLoading}>
				<SelectValue></SelectValue>
				{isLoading && <Loader size={17} />}
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{options.map((option) => (
						<SelectItem key={option.value} value={option.value.toString()}>
							{option.label}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</SelectComponent>
	);
}

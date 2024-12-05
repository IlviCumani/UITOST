import { useRef, useState } from "react";

type UseDebounceProps = {
	delay: number;
};

type DebounceFNProps = {
	value: string;
	callback: (value: string) => void;
};

type ClearSearchFNProps = {
	callback?: () => void | undefined;
};

export function useDebounce({ delay }: UseDebounceProps) {
	const lastChange = useRef<NodeJS.Timeout | null>(null);
	const [searchTerm, setSearchTerm] = useState<string>("");

	function handleClearSearch({ callback = () => {} }: ClearSearchFNProps) {
		setSearchTerm("");
		callback();
	}

	function updateSearchTerm(value: string) {
		setSearchTerm(value);
	}

	function debounce({ value, callback }: DebounceFNProps) {
		setSearchTerm(value);
		if (lastChange.current) {
			clearTimeout(lastChange.current);
		}
		lastChange.current = setTimeout(() => {
			lastChange.current = null;
			callback(value);
		}, delay);
	}

	return { debounce, searchTerm, handleClearSearch, updateSearchTerm };
}

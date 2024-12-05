import { Tabs as T, TabsContent, TabsList, TabsTrigger } from "@/ui/tabsCN";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/ui/dropDownMenuCN";
import { useEffect, useRef, useState } from "react";
import type { TabConfig } from "@/@tost/types/ComponentTypes/TabConfigType";

const DEFAULT_TAB_WIDTH_IN_PX = 168;

type CustomTabsProps = {
	tabConfig: TabConfig[];
	className?: string;
	searchParams: URLSearchParams;
	setSearchParams: (params: Record<string, string>) => void;
};

export default function Tabs({
	tabConfig,
	className,
	searchParams,
	setSearchParams,
}: CustomTabsProps) {
	const [moreTabs, setMoreTabs] = useState<TabConfig[]>([]);
	const containerDiv = useRef<HTMLDivElement>(null);
	const [defaultTab, setDefaultTab] = useState<string>("");
	const [range, setRange] = useState(0);

	useEffect(() => {
		const observer = new ResizeObserver((entries) => {
			for (const entry of entries) {
				const cr = entry.contentRect;

				const width = cr.width;

				const maxTabsThatCanBeDisplayed = Math.max(2, Math.floor(width / DEFAULT_TAB_WIDTH_IN_PX));

				if (maxTabsThatCanBeDisplayed < tabConfig.length + 1) {
					const inRange = maxTabsThatCanBeDisplayed - 2;
					setRange(inRange);
					setMoreTabs(tabConfig.slice(inRange));
				} else {
					setMoreTabs([]);
					setRange(tabConfig.length);
				}
			}
		});

		observer.observe(containerDiv.current!);
	}, [tabConfig]);

	useEffect(() => {
		setRange(tabConfig.length);
		setDefaultTab(tabConfig[0]?.value);
	}, [tabConfig]);

	function handleTabChange(value: string) {
		setSearchParams(value === tabConfig[0].value ? {} : { tab: value });
	}

	return (
		<div ref={containerDiv}>
			<T
				className={className}
				onValueChange={handleTabChange}
				value={searchParams.get("tab") || defaultTab}
			>
				<DropdownMenu>
					<TabsList className={`flex`}>
						{tabConfig.slice(0, range).map((tab) => (
							<TabsTrigger key={tab.value} value={tab.value} className="flex-1 min-w-40">
								{tab.label}
							</TabsTrigger>
						))}

						{moreTabs.length > 0 && (
							<DropdownMenuTrigger className={`flex-1 min-w-52 `}>More...</DropdownMenuTrigger>
						)}
						<DropdownMenuContent>
							{moreTabs.map((tab) => (
								<DropdownMenuItem key={tab.value} className="flex items-start">
									<TabsTrigger
										key={tab.value}
										value={tab.value}
										className="flex-1 flex items-start justify-end "
									>
										{tab.label}
									</TabsTrigger>
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</TabsList>
				</DropdownMenu>

				{tabConfig.map((tab) => (
					<TabsContent value={tab.value} key={tab.value}>
						{tab.component}
					</TabsContent>
				))}
			</T>
		</div>
	);
}

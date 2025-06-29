import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

export function FileTabs({ type }: { type: string | null }) {
	return (
		<Tabs value={type ?? "all"} className="w-[400px]">
			<TabsList>
				<TabsTrigger asChild value="all">
					<Link href="/app">All</Link>
				</TabsTrigger>
				<TabsTrigger asChild value="folder">
					<Link href="/app/?type=folder">Folders</Link>
				</TabsTrigger>
				<TabsTrigger asChild value="document">
					<Link href="/app/?type=document">Documents</Link>
				</TabsTrigger>
				<TabsTrigger asChild value="media">
					<Link href="/app/?type=media">Media</Link>
				</TabsTrigger>
			</TabsList>
		</Tabs>
	);
}

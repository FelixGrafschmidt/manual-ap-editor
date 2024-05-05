/* eslint-disable @typescript-eslint/no-unused-vars */
interface Game {
	game: string;
	creator: string;
	filler_item_name: string;
	starting_items: StartingItem[];
}

interface StartingItem {
	items?: string[];
	item_categories?: string[];
	random?: number;
	if_previous_item?: string[];
}

interface Item {
	name: string;
	category: string[];
	count: number;
	progression: boolean;
}

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

interface Categories {
	[k: string]: {
		/**
		 * (Optional) Should this category be Hidden in the client?
		 */
		hidden?: boolean;
		/**
		 * (Optional) Array of Options that will decide if the items & locations in this category are enabled
		 */
		yaml_option?: [string, ...string[]];
		_comment?: string | string[];
		[k: string]: unknown;
	};
}

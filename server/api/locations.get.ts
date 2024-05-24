import fs from "fs/promises";

export default defineEventHandler(async () => {
	const config = useRuntimeConfig();

	const path = config.apworldPath + "/locations.json";
	try {
		const file = await fs.readFile(path);
		return file;
	} catch (error) {
		console.error(error);
		return error;
	}
});

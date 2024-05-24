import fs from "fs/promises";

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig();

	const path = config.apworldPath + "/items.json";
	const body = await readBody(event);
	try {
		await fs.writeFile(path, JSON.stringify(body));
	} catch (error) {
		console.error(error);
		return error;
	}
});

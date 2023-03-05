export function getApi() {
	return require(`../../src/index`);
	// const api = express();
	// api.use(express.json());
	// mappings.forEach(({ apiResource, functionSourcePath }) => {
	// 	let resourceName = apiResource.replace(/{/g, ':').replace(/}/g, '');
	// 	registerResource(api, resourceName, functionSourcePath);
	// });
	// return api;
}
// const { handler } = require(`../../src/index.ts`);

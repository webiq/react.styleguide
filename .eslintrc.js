// re-export our eslint config so we can lint this project
// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('./lib')

module.exports = {
	...config,
	env: {
		amd: true,
		node: true,
	},
}

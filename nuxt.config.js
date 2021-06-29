// import path from 'path';
// import fs from 'fs';

export default {
	server: {
		// https: {
		// 	key: fs.readFileSync(path.join(__dirname, 'ssl/server.key')),
		// 	cert: fs.readFileSync(path.join(__dirname, 'ssl/server.crt'))
		// }
		// port: 443,
		port: 80,
		host: 'localhost'
	},
	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: 'LITEST',
		htmlAttrs: {
			lang: 'ru'
		},
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: '' }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
		]
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [
		'~assets/style/normalize-classic.css',
		'~assets/style/normalize-modern.css',
		'~assets/style/default.scss',
		'~assets/style/mixins-litest.scss',
		'~assets/style/mixins-space.scss',
		'~assets/style/mixins-2-the-moon.scss'
	],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
	],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		'@nuxtjs/style-resources',
		// https://go.nuxtjs.dev/typescript
		'@nuxt/typescript-build',
		// https://go.nuxtjs.dev/stylelint
		'@nuxtjs/stylelint-module'
	],
	stylelint: {
		emitWarning: true,
		emitError: false,
		failOnError: false
	},
	styleResources: {
		scss: [
			'~assets/style/mixins-litest.scss',
			'~assets/style/mixins-space.scss',
			'~assets/style/mixins-2-the-moon.scss'
		]
	},
	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		// https://go.nuxtjs.dev/axios
		'@nuxtjs/axios'
	],

	// Axios module configuration: https://go.nuxtjs.dev/config-axios
	axios: {},
	babel: {
		plugins: [
			'@babel/plugin-proposal-optional-chaining',
			'@babel/plugin-proposal-nullish-coalescing-operator'
		]
	},
	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
	}
};

<template lang="pug">
	.global-wrapper
		.global-wrapper__content

			nav.nav
				NuxtLink.nav__link.nav__link--logo(to="/")
					.mask
						include ../../assets/svg/mask-lines-white.svg
				NuxtLink.nav__link(to="/theory") теория
				NuxtLink.nav__link(to="/code") код
				NuxtLink.nav__link(to="/art") арт

			.breadcrumbs
				template(
					v-if="breadcrumbs"
					v-for="item of breadcrumbs"
				)
					template(v-if="!item.isLast")
						NuxtLink(:to="item.link").breadcrumbs__item {{ item.title }}
						span.breadcrumbs__divider
							include ../../assets/svg/arrow-right.svg
					template(v-else)
						span.breadcrumbs__last {{ item.title }}

			slot

</template>

<script lang="ts">
// TS
import Vue from 'vue';
import Component from 'vue-class-component';

const	getFormattedTitle = (path) => {
	const paths = path.split('/');

	if (path === '/') {
		return '%s';
	}
	return paths.splice(1).join('/') + ' | %s';
};

@Component({
	head() {
		return {
			title: 'LITEST',
			titleTemplate: getFormattedTitle(this.$route.path),
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: 'Home page description'
				}
			]
		};
	},
	components: {
	}
})
export default class Wrapper extends Vue {
	breadcrumbsDictionary = {
		theory: 'Теория',
		code: 'Код',
		art: 'Арт'
	}

	get breadcrumbs() {
		if (this.$route.path === '/') {
			return null;
		}
		return this.$route.path.split('/').map((path, index, array) => {
			const link = path ? array[index - 1] + '/' + path : '/';
			const title = path ? this.breadcrumbsDictionary[path] || path : 'Главная';
			return {
				link,
				title,
				isLast: index === array.length - 1
			};
		});
	}
}
</script>

<style lang="scss" scoped>

.global-wrapper {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	min-height: 100vh;
	padding-top: 1rem;
	background-color: $White;

	&__content {
		width: 960px;
	}
}

.breadcrumbs {
	margin-bottom: 3rem;
	font-size: 0.7rem;
	text-transform: uppercase;

	&__item {
		font-weight: 600;
		color: $Black;
		transition: color 0.3s;

		&:hover {
			color: $DarkGray;
		}
	}

	&__divider {
		margin: 0 8px;

		svg {
			width: 34px;
		}
	}

	&__last {
		font-weight: 400;
	}
}

a.nav__link.nuxt-link-active {
	border-bottom: 1px solid $Black;
}

.mask svg {
	width: 80px;
	stroke: $Black;
}

.nav {
	display: flex;
	align-items: center;
	margin-bottom: 3rem;

	&__link {
		@include clear-link();
		@include font-nav();

		margin-left: 2rem;
		// font-size: 14px;
		// font-weight: 400;
		color: $Black;
		text-transform: uppercase;
		background-color: linear-gradient(currentColor 0 0);
		background-position: 0 100%;
		background-size: 3px 3px;
		transition:
			opacity 0.3s ease-in,
			color 0.3s ease-in;

		&:hover {
			opacity: 0.8;
		}

		&--logo {
			margin-right: auto;
			margin-left: 0;
			border-bottom: none !important;
		}
	}
}

</style>

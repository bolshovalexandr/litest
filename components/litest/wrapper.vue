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

			//- CONTENT
			.content
				slot

			footer.footer
				.footer-navigation
					NuxtLink.footer-navigation__item(to="/theory") теория
					NuxtLink.footer-navigation__item(to="/code") код
					NuxtLink.footer-navigation__item(to="/art") арт

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

.mask svg {
	width: 80px;
	stroke: $Black;
}

a.nav__link.nuxt-link-active {
	// border-bottom: 1px solid $Black;
	&::before {
		background: linear-gradient(to right, $Black, $Black);
	}
}

.nav {
	display: flex;
	align-items: center;
	margin-bottom: 3rem;

	&__link {
		@include clear-link();
		@include font-nav();

		position: relative;
		margin-left: 2rem;
		color: $Black;
		text-transform: uppercase;
		// -start- анимируем подчеркивание и цвет элемента меню
		background-image: linear-gradient(currentColor 0 0);
		background-repeat: no-repeat;
		background-position: 0 100%;
		background-size: 0 1px;
		transition:
			background-size 0.35s linear,
			background-position 0s 0.35s linear;
		// -end- анимируем подчеркивание и цвет элемента меню

		&:hover {
			background-position: 100% 100%;
			background-size: 100% 1px;
		}

		&--logo {
			margin-right: auto;
			margin-left: 0;
			background: none !important;

			&:hover {
				background: none !important;
			}
		}
	}
}

.footer {
	width: 960px;
	height: 200px;
	margin-top: 8rem;
	border-top: 4px double $Black;
}

.footer-navigation {
	&__item {
		display: block;
	}
}

</style>

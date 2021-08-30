<template lang="pug">
	LitestWarpper
		ul.intro
			li.intro__item macromedia dreamweaver
			li.intro__item &lt;frameset src="main.html"&gt; enter the site &lt;frameset/&gt;
			li.intro__item clearfix
			li.intro__item display: grid;
			li.intro__item MVP, SSR, REST, VPS
			li.intro__item
				span но наши
				span.intro__snowflakes снежинки
				span до сих пор летают

		.block
			.block__head
				h2.block__header теория
				NuxtLink.block__arrow-link(to="/theory")
					include ../assets/svg/arrow-right.svg
			.block__quote Если всё знать, так это любой дурак сделает
			ul.block__link-list
				li
					NuxtLink.block__link(to="/theory/ts-basics") TypeScript: lost not forgotten. Basics.
				li
					NuxtLink.block__link(to="/theory/ts-advanced") TypeScript: advanced.
				li
					NuxtLink.block__link(to="/theory/tsx") TSX: like a React in disguise
				li
					NuxtLink.block__link(to="/theory/animation-basics") Теория анимации

		.block
			.block__head
				h2.block__header код
				NuxtLink.block__arrow-link(to="/code")
					include ../assets/svg/arrow-right.svg
			.block__quote Должен же когда-то закончиться этот бардак
			ul.block__link-list
				//- li
				//- 	NuxtLink.block__link(to="/code/components") Компоненты для Web (но не web-компоненты!)
				li
					NuxtLink.block__link(to="/code/animation-experience") Анимация: опыт
				li
					NuxtLink.block__link(to="/code/algorithm-tree") Алгноритмы: дерево

		.block
			.block__head
				h2.block__header арт
				NuxtLink.block__arrow-link(to="/art")
					include ../assets/svg/arrow-right.svg
				.block__hidden-icon
			.block__quote So experience becomes "the opyt"
			ul.block__link-list
				li
					NuxtLink.block__link(to="/external/space") космос
				li
					NuxtLink.block__link(to="/external/2-the-moon") 2-the-moon

</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import LitestWarpper from '~/components/litest/wrapper.vue';

@Component({ components: { LitestWarpper } })
export default class Index extends Vue {}
</script>

<style lang="scss" scoped>
@import "../assets/style/globals-litest.scss";

.intro {
	position: relative;
	margin-bottom: 3rem;
	font-size: 1rem;
	font-weight: 400;
	color: $Black;
	list-style: none;

	&__item {
		position: relative;
		padding-left: 2rem;

		&:nth-child(1) {
			opacity: 0.5;
		}

		&:nth-child(2) {
			opacity: 0.6;
		}

		&:nth-child(3) {
			opacity: 0.7;
		}

		&:nth-child(4) {
			opacity: 0.8;
		}

		&:nth-child(5) {
			opacity: 0.85;
		}

		&:nth-child(6) {
			opacity: 1;
		}

		&::after {
			position: absolute;
			top: calc(50%);
			left: 0;
			display: block;
			width: 1rem;
			height: 1px;
			content: '';
			background-color: $Black;
		}
	}

	&__snowflakes {
		margin: 0 0.25rem;
		cursor: pointer;
		border-bottom: 1px dashed $RoyalBlue;
	}
}

.block {
	padding-top: 2rem;
	margin-bottom: 5rem;
	border-top: 2px solid $Black;

	&__hidden-icon {
		position: absolute;
		top: 0;
		right: 0;
		width: 360px;
		height: 200px;
		background-color: $Gray;
		opacity: 0;
		transition: opacity 0.6s 0.3s;
	}

	&__head {
		position: relative;
		display: flex;
		align-items: center;
		margin-bottom: 1rem;
	}

	&__arrow-link {
		display: inline-flex;
		height: 100%;
		transition: transform 0.6s;

		svg {
			height: 1.5rem;
			margin-top: 0.5rem;
			fill: $Black;
			transition: fill 0.6s;
		}

		&:hover {
			transform: translateX(4px);

			svg {
				fill: $PureBlack;
			}

			& + .block__hidden-icon {
				opacity: 0.2;
			}
		}
	}

	&__header {
		@include header-main();

		margin-right: 1rem;
		color: $Black;
		text-transform: uppercase;
	}

	&__quote {
		@include font-epigraph();

		margin-bottom: 2rem;
	}

	&__description {
		max-width: 480px;
		margin-bottom: 2rem;
		font-size: 1.2rem;
		font-weight: 300;
	}

	&__link-list {
		list-style: none;

		li {
			margin-bottom: 0.25rem;
		}
	}

	&__link {
		@include font-link();

		color: $Black;

		&:hover {
			color: $DarkGray;
		}
	}
}
</style>

<template lang="pug">
	LitestWarpper
		.intro Заметки, синтетические примеры, изыскания, мысли и обобщения
		.toc
			.toc__header
				.toc__head(@click="isTocShown.js = !isTocShown.js")  А что JS?
				.toc__expand-icon(@click="isTocShown.js = !isTocShown.js" :class="{'toc__expand-icon--expanded': isTocShown.js}")
			Expander
				ul.toc__content(v-show="isTocShown.js")
					li.toc__item
						NuxtLink(to="/theory/ts-basics").toc__link JS с собеседований, apéritif: потоки, выполнение
					li.toc__item
						NuxtLink(to="/theory/ts-advanced").toc__link JS с собеседований, entrée: контекст, замыкания, цепочки промисов
					li.toc__item
						NuxtLink(to="/theory/ts-nuxt").toc__link JS с собеседований, savoureux: генераторы, декораторы

		.toc
			.toc__header
				.toc__head(@click="isTocShown.ts = !isTocShown.ts") TypeScript: lost not forgotten
				.toc__expand-icon(@click="isTocShown.ts = !isTocShown.ts" :class="{'toc__expand-icon--expanded': isTocShown.ts}")
			Expander
				ul.toc__content(v-show="isTocShown.ts")
					li.toc__item
						NuxtLink(to="/theory/ts-basics").toc__link Основы
					li.toc__item
						NuxtLink(to="/theory/ts-advanced").toc__link Сложные примеры
					li.toc__item
						NuxtLink(to="/theory/tsx").toc__link TSX
					li.toc__item
						NuxtLink(to="/theory/ts-nuxt").toc__link Особенности работы в NuxtJS

		NuxtLink(to="/theory/js")
		NuxtLink(to="/theory/ts")
</template>

<script lang="ts">
// TS
import Vue from 'vue';
import Component from 'vue-class-component';
// Глобальные компоненты
import LitestWarpper from '~/components/litest/wrapper.vue';
// Крафтовые компоненты
import Expander from '~/components/litest/components/expander.vue';
// Вспомогательные библиотеки

@Component({
	components: {
		LitestWarpper,
		Expander
	}
})
export default class TheoryIndex extends Vue {
	isTocShown = {
		js: false,
		ts: false
	}
}
</script>

<style lang="scss" scoped>
@import "../../assets/style/globals-litest.scss";

.intro {
	@include font-epigraph();

	max-width: 360px;
	margin-bottom: 4rem;
	color: $Black;
}

.toc {
	padding: 0.5rem 0;
	margin: 0.5rem 0 3rem;
	border-top: 2px solid $Black;

	&__header {
		display: flex;
		align-items: center;
		padding: 0.5rem 0;
	}

	&__head {
		font-size: 1.5rem;
		font-weight: 400;
		cursor: pointer;
	}

	&__expand-icon {
		position: relative;
		width: 2rem;
		height: 2rem;
		margin-left: auto;
		cursor: pointer;

		&::before,
		&::after {
			position: absolute;
			top: calc(50% - 1px);
			right: 0;
			display: block;
			width: 75%;
			height: 3px;
			content: '';
			background-color: $Black;
			transition: transform 0.3s;
		}

		&::after {
			transform: rotate(90deg);
		}

		&--expanded {
			&::before {
				transform: rotate(45deg);
			}

			&::after {
				transform: rotate(135deg);
			}
		}
	}

	&__content {
		display: flex;
		flex-direction: column;
		font-size: 1rem;
		font-weight: 400;
		color: $Black;
		list-style: none;
		background-color: $DarkWhite;
		border-radius: 4px;
	}

	&__item {
		position: relative;
		padding-top: 0.25rem;
		padding-bottom: 0.25rem;
		padding-left: 2rem;
		margin: 0 0.5rem;

		&:first-child {
			margin-top: 0.5rem;
		}

		&:last-child {
			margin-bottom: 0.5rem;
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

	&__link {
		@include toc-link();

		color: $Black;

		&:hover {
			color: $DarkGray;
		}
	}
}

</style>

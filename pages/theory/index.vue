<template lang="pug">
	LitestWarpper
		.intro Заметки, синтетические примеры, изыскания, мысли и обобщения
		Toc(
			v-for="toc of tocData"
			:header="toc.header"
			:key="toc.header"
			:links="toc.links"
		)

</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import LitestWarpper from '~/components/litest/wrapper.vue';
import Toc from '~/components/litest/toc.vue';

@Component({
	components: {
		LitestWarpper,
		Toc
	}
})
export default class TheoryIndex extends Vue {
	tocData = [
		{
			header: 'А что JS?',
			links: [
				{ href: '/theory/js-aperitif', text: 'JS с собеседований, apéritif: потоки, выполнение' },
				{ href: '/theory/js-entree', text: 'JS с собеседований, entrée: контекст, замыкания, ООП' },
				{ href: '/theory/js-savourex', text: 'JS с собеседований, savoureux: генераторы, декораторы, прокси' }
			]
		},
		{
			header: 'TypeScript: lost not forgotten',
			links: [
				{ href: '/theory/ts-basics', text: 'Основы' },
				{ href: '/theory/ts-advanced', text: 'Сложные примеры' },
				{ href: '/theory/tsx', text: 'TSX' },
				{ href: '/theory/ts-nuxt', text: 'Особенности работы в NuxtJS' }
			]
		},
		{
			header: 'Анимация',
			links: [
				{ href: '/theory/animation-basics', text: 'Анимация: основы' }
			]
		}]
}
</script>

<style lang="scss" scoped>
@import "../../assets/style/globals-litest.scss";

</style>

<template lang="pug">
	LitestWarpper
		.block
			.block__header А что JS?
			.block__content.toc
				.toc__item JS с собеседований, apéritif: потоки, выполнение
				.toc__item JS с собеседований, entrée: контекст, замыкания, цепочки промисов
				.toc__item JS с собеседований, savoureux: генераторы, декораторы

		.block
			.block__header Lost not forgotten: TypeScript
			.block__content.toc
				.toc__item

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
// Вспомогательные библиотеки

@Component({
	components: {
		LitestWarpper
	}
})
export default class TheoryIndex extends Vue {

}
</script>

<style lang="scss" scoped>
@import "../../assets/style/mixins-litest.scss";

</style>

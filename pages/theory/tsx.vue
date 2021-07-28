<template lang="pug">
	LitestWarpper
		.global-article
			h1 TSX
			h2 Одной строкой
			ul
				li JSX вообще - это XML-подобная надстройка над JS, комбинирующая JS-код и разметку
			h2 Использование TSX в NuxtJS
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
export default class TSX extends Vue {

}
</script>

<style lang="scss" scoped>
@import "../../assets/style/globals-litest.scss";
</style>

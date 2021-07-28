<template lang="pug">
	LitestWarpper
			ul
				li
					NuxtLink(to="/code/algorithm") Алгоритмы
				li
					NuxtLink(to="/code/animation") Анимация
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
export default class CodeIndex extends Vue {

}
</script>

<style lang="scss" scoped>
@import "../../assets/style/globals-litest.scss";

</style>

<template lang="pug">
	LitestWarpper
		.intro Анимация и алгоритмы
		Toc(
			v-for="toc of tocData"
			:key="toc.header"
			:header="toc.header"
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
export default class CodeIndex extends Vue {
	tocData = [
		{
			header: 'Анимация',
			links: [
				{ href: '/code/animation-experience', text: 'Анимация: опыт' }
			]
		},
		{
			header: 'Алгоритмы',
			links: [
				{ href: '/code/algorithm-tree', text: 'Дерево' }
			]
		}]
}
</script>

<style lang="scss" scoped>
@import "../../assets/style/globals-litest.scss";
</style>

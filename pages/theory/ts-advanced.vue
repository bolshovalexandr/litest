<template lang="pug">
	LitestWarpper
		.global-article
			h1 TypeScript: сложные примеры
			h2 Перегрузка функций
			p возможна, однако проверку параметров в любом случае придется выполнять вручную внутри функции
			code(v-highlight class="typescript")
				pre.
					type Result = void | number | boolean;
					function func(): void;
					function func(a:number): number;
					function func(a:number, b:string): boolean;

					function func (a?:number, b?:string) {
							if (a === undefined && b === undefined) {
									return undefined;
							} else if (typeof a === 'number' && b === undefined) {
									return a;
							} else if (typeof a === 'number' && typeof b === 'string') {
									return !!a && !!b;
							}
							return;
					}

					let result: Result = func();
					result = func(1);
					result = func(1, 'a');
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
export default class TSAdvanced extends Vue {

}
</script>

<style lang="scss" scoped>
@import "../../assets/style/globals-litest.scss";
</style>

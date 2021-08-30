<template lang="pug">
	LitestWarpper
		.global-article
			h1 TypeScript: advanced

			h2 Сложная теория
			h3 Перегрузка функций
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

			h2 Сложные примеры
			h3 Создаем тип, массив и валидатор по объекту
			code(v-highlight class="typescript")
				pre.
					const btnSizesPossibleValues = {
						big: null,
						medium: null,
						small: null
					};
					export type IBtnSizes = keyof typeof btnSizesPossibleValues;
					export const btnSizes = Object.keys(btnSizesPossibleValues);
					export validator(value) {
						return btnSizesPossibleValues[value] !== undefined;;
					}
			h3 аналогичный валидатору пример, но с дженериками в функции
			code(v-highlight class="typescript")
				pre.
					function getObjectValue&lt;T extends object, R extends keyof T&gt;(o: T, key: R) {
						return o[key];
					}

					const user = {
						name: 'li',
						pass: '0000'
					}

					const result = getObjectValue(user, 'pass')

			h3 Паттерн "одиночка", статические свойства и методы
			p в языках с квалификаторами доступа паттерн "Одиночка" реализуется:
			ul
				li private для конструктора - тогда оператор new работать не будет и создание извне нескольких экземпляров будет невозможно
				li статический метода класса, который проверит существование единственного экземпляра, создаст его при необходимости и вернет ссылку
			code(v-highlight class="typescript")
				pre.
					class SingleState {
							private constructor() { }
							private static instanceRef:SingleState;
							counter = 0;

							static getInstance():SingleState {
									if (this.instanceRef === undefined) {
											this.instanceRef = new SingleState();
									}
									return this.instanceRef;
							}
					}

					const state1 = SingleState.getInstance();
					const state2 = SingleState.getInstance();

			h3 Пример маппинга camel- и kebab-case событий в стиль JSX
			code(v-highlight class="typescript")
				pre.
					type ReverseJsxEvent&lt;T&gt; = ReverseMap&lt;{ [key in keyof T & string]: `on${Capitalize&lt;key&gt;}` }&gt;;
					type jsxEventMapper&lt;T&gt; = {
						[rootKey in keyof ReverseJsxEvent&lt;T&gt;]: T[ReverseJsxEvent&lt;T&gt;[rootKey]];
					};
					interface FileTypeEvents {
						click: MouseEvent;
					}
					type jsxType = jsxEventMapper&lt;FileTypeEvents&gt;;
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import LitestWarpper from '~/components/litest/wrapper.vue';

@Component({ components: { LitestWarpper } })
export default class TSAdvanced extends Vue {}
</script>

<style lang="scss" scoped>
@import "../../assets/style/globals-litest.scss";
</style>

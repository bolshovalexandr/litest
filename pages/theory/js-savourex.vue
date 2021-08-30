<template lang="pug">
	LitestWarpper
		.global-article
			h1 JS с собеседований, savoureux: генераторы, декораторы, прокси
			h2 Декораторы
			ul
				li декоратор — особый вид объявления, который может быть прикреплен к объявлению класса, метода, аксессора, свойства или параметра.
				li можно сказать, что декоратор добавляет метаданные для цели
				li декоратор, вообще, это функция, и в зависимости от задачи её сигнатура (параметры, возвращаемое значение) будут различаться:
				code(v-highlight class="typescript")
					pre.
						// декорирование класса - стрелочная функция, которая принимает на вход дженерик, являющийся подтипом фукнцкии (здесь - фунцкия-конструктор класса)
						declare type ClassDecorator = &lt;TFunction extends Function&gt;(target: TFunction) =&gt; TFunction | void
						// декорирование свойства
						declare type PropertyDecorator = (target: Object, propertyKey: string | symbol) =&gt; void;
						// декорирование метода
						declare type MethodDecorator = &lt;T&gt;(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor&lt;T&gt;) =&gt; TypedPropertyDescriptor&lt;T&gt; | void;

</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import LitestWarpper from '~/components/litest/wrapper.vue';

@Component({ components: { LitestWarpper } })
export default class JSSavourex extends Vue {}
</script>

<style lang="scss" scoped>
@import "../../assets/style/globals-litest.scss";
</style>

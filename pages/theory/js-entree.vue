<template lang="pug">
	LitestWarpper
		.global-article
			h1 JS с собеседований, entrée: контекст, замыкания, ООП
			h2 ООП
			h3 Метод super()
			ul
				li super вызывается в конструкторе класса-потомка, чтобы передать корректные параметры в конструктор класса-родителя (супер-класса), если, конечно, у них есть конструкторы
				li если у потомка конструктора нет, то super вызовется автоматически
				li если у родителя и потомка есть методы с одинаковыми именами, то вызывать родительский метод из потомка надо через super.someMethod();
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import LitestWarpper from '~/components/litest/wrapper.vue';

@Component({ components: { LitestWarpper } })
export default class JSEntree extends Vue {}
</script>

<style lang="scss" scoped>
@import "../../assets/style/globals-litest.scss";
</style>

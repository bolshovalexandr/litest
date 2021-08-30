<template lang="pug">
	LitestWarpper
		.global-article
			h1 JS с собеседований, apéritif: потоки, выполнение

</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import LitestWarpper from '~/components/litest/wrapper.vue';

@Component({ components: { LitestWarpper	} })
export default class JSAperitif extends Vue {}
</script>

<style lang="scss" scoped>
@import "../../assets/style/globals-litest.scss";
</style>

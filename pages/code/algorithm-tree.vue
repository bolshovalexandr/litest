<template lang="pug">
	LitestWarpper

</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import LitestWarpper from '~/components/litest/wrapper.vue';

@Component({ components: { LitestWarpper	} })
export default class CodeAlgorithm extends Vue {}
</script>

<style lang="scss" scoped>
@import "../../assets/style/globals-litest.scss";

</style>

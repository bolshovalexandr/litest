<template lang="pug">
LitestWarpper
	.global-article
		ul
			li
				NuxtLink(to="2-the-moon-svg") 2-the-moon SVG draft
			li
				NuxtLink(to="2-the-moon-canvas") 2-the-moon CANVAS draft
			li
				NuxtLink(to="2-the-moon-canvas-custom") 2-the-moon CANVAS custom
			li
				NuxtLink(to="2-the-moon-canvas-final") 2-the-moon CANVAS FINAL
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import LitestWarpper from '~/components/litest/wrapper.vue';
import Expander from '~/components/litest/components/expander.vue';

@Component({
	components: {
		LitestWarpper,
		Expander
	}
})
export default class ArtIndex extends Vue {}
</script>

<style lang="scss" scoped>
@import "../../assets/style/globals-litest.scss";

</style>

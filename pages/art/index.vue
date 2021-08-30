<template lang="pug">
	LitestWarpper

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

<template lang="pug">
.wrapper
	.animated
		include ../../assets/img/svg/2-the-moon/layout.svg

</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
	components: {}
})
export default class ArtIndex extends Vue {}
</script>

<style lang="scss" scoped>
@import "../../assets/style/globals-litest.scss";

.animated {
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
}
</style>

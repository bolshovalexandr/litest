<template lang="pug">
	transition(
		name="expand"
		@enter="onEnter"
		@after-enter="onAfterEnter"
		@leave="onLeave"
	)
		slot
</template>

<script lang="ts">
// Vue и декораторы
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({})
export default class Expander extends Vue {
	onAfterEnter(element) {
		element.style.height = 'auto';
	}

	onEnter(element) {
		const { width } = getComputedStyle(element);
		element.style.width = width;
		element.style.position = 'absolute';
		element.style.visibility = 'hidden';
		element.style.height = 'auto';
		const { height } = getComputedStyle(element);
		element.style.width = null;
		element.style.position = null;
		element.style.visibility = null;
		element.style.height = 0;
		/* eslint-enable */
		// Force repaint to make sure the
		// animation is triggered correctly.
		// eslint-disable-next-line no-unused-expressions
		getComputedStyle(element).height;
		requestAnimationFrame(() => {
			// eslint-disable-next-line no-param-reassign
			element.style.height = height;
		});
	}

	onLeave(element) {
		const { height } = getComputedStyle(element);
		// eslint-disable-next-line no-param-reassign
		element.style.height = height;
		// Force repaint to make sure the
		// animation is triggered correctly.
		// eslint-disable-next-line no-unused-expressions
		getComputedStyle(element).height;
		requestAnimationFrame(() => {
			// eslint-disable-next-line no-param-reassign
			element.style.height = 0;
		});
	}
};
</script>

<style>
.expand-enter-active,
.expand-leave-active {
	overflow: hidden;
	transition: height 1s ease-in-out;
}

.expand-enter,
.expand-leave-to {
	height: 0;
}
</style>

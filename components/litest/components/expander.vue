<template lang="pug">
	transition(
		name="expand"
		@enter="onEnter"
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
	onEnter(element) {
		// Получаем полную высоту по контенту (ширину берем, чтобы блок при не растянулся при абс. позиционировании)
		const { width } = getComputedStyle(element);
		element.style.width = width;
		element.style.position = 'absolute';
		element.style.visibility = 'hidden';
		element.style.height = 'auto';
		const { height } = getComputedStyle(element);
		// сбрасываем инлайновые стили
		element.style.position = null;
		element.style.visibility = null;
		element.style.width = null;
		// высоту - в ноль
		element.style.height = 0;
		// запускаем анимацию развертывания
		window.requestAnimationFrame(() => {
			element.style.height = height;
		});
	}

	onLeave(element) {
		const { height } = getComputedStyle(element);
		element.style.height = height;
		window.requestAnimationFrame(() => {
			element.style.height = 0;
		});
	}
};
</script>

<style>
.expand-enter-active,
.expand-leave-active {
	overflow: hidden;
	transition: height 0.3s ease-in-out;
}

.expand-enter,
.expand-leave-to {
	height: 0;
}
</style>

<template>
  <Nuxt />
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class DefaultLayout extends Vue {
	mounted() {
		const createAnimateStrokeDasharray = (letter, length) => {
			const animateSVGTag = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
			[
				{ name: 'attributeName', value: 'stroke-dasharray' },
				// { name: 'from', value: `0, ${length}` },
				{ name: 'to', value: `${length}, 0` },
				{ name: 'dur', value: '1300ms' },
				{ name: 'fill', value: 'freeze' }
			].forEach(({ name, value }) => animateSVGTag.setAttribute(name, value));
			letter.appendChild(animateSVGTag);
		};

		document.querySelectorAll('.mask path').forEach((letter) => {
			const length = (letter as SVGPathElement).getTotalLength() / 3;
			letter.setAttribute('stroke-dasharray', `0, ${length}`);
			createAnimateStrokeDasharray(letter, length);
		});
	}
}
</script>

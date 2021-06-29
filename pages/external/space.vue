<template lang="pug">
	SpaceWarpper

</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import SpaceWarpper from '~/components/space/wrapper.vue';

@Component({
	components: {
		SpaceWarpper
	}
})
export default class Index extends Vue {
	light = true;

	onSwitcherChange({ light }) {
		this.light = !light;
	}
};
</script>

<style lang="scss" scoped>
	.wrap {
		display: flex;
		flex-direction: column;
		width: 100vw;
		height: 100vh;
		background-color: #efeeee;
		transition: background-color 0.3s;

		&__content {
			flex-grow: 1;
		}

		&__switcher {
			display: flex;
			flex-basis: 100px;
			padding: 10px;

			a {
				margin-left: auto;
			}
		}

		&--dark {
			background-color: #060606;
			transition: background-color 0.3s;
		}
	}

	.content {
		&__text {
			color: #efeeee;
		}
	}

</style>

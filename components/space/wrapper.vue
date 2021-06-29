<template lang="pug">
	.wrap(:class="{'wrap--dark': !light}")
		.wrap__content.content
			.content__next
				include ./assets/arrow-right.svg
			.content__text  г л у б о к и й в н у т р е н н и й к о с м о с
		.wrap__switcher
			Switcher(:light="light" @change-light="onSwitcherChange")
			a(href="/litest") li
		slot
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Switcher from './components/switch.vue';

@Component({
	components: {
		Switcher
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

<template lang="pug">
	button.button(
		type="button"
		@click="onBtnClick"
	) {{ title }}
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'nuxt-property-decorator';

@Component({})
export default class Btn extends Vue {
	@Prop({ type: String, default: '' })
	color!: string;

	@Prop({ type: String, default: '' })
	title!: string;

	onBtnClick(e) {
		this.$emit('click', e);
	}
};

</script>

<style lang="scss" scoped>

	.button {
		min-width: 24px;
		min-height: 24px;
		padding: 4px 12px;
		color: $DarkGray;
		cursor: pointer;
		background-color: $LightGray;
		border: none;
		border-radius: 4px;
		outline: none;
		transition: all 0.3s ease-in-out;

		&:hover {
			opacity: 0.76;
		}

		&:active {
			background-color: $Gray;
		}
	}

</style>

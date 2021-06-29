<template lang="pug">
	//- .switch-wrap(:class="{'switch-wrap--dark': !light}")
	.switch(@click="switchLight" :class="{'switch--active': !light}")
		.switch__light
</template>

<script>
export default {
	props: {
		light: { type: Boolean, default: false }
	},
	data() {
		return {
		};
	},
	methods: {
		switchLight() {
			this.$emit('change-light', { light: this.light });
		}
	}
};
</script>

<style lang="scss" scoped>
	// .switch-wrap {
	// 	// padding: 1em;
	// 	display: inline-flex;
	// 	justify-content: flex-start;
	// 	align-items: flex-start;
	// 	background-color: #efeeee;
	// 	transition: background-color 0.3s;
	// 	&--dark {
	// 		background-color: #060606;
	// 		transition: background-color 0.3s;
	// 	}
	// }

	.switch {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 80px;
		height: 80px;
		cursor: pointer;
		background-color: #efeeee;
		border-radius: 12px;
		// border: 1px solid rgba(255, 255, 255, 0.20);
		box-shadow:
			-5px -5px 25px 0 rgba(255, 255, 255, 1),
			5px 5px 25px 0 rgba(217, 210, 200, 1);

		&:hover {
			transition: border 0.3s;
			// border: 1px solid rgba(255, 255, 255, 0.40);
		}

		&__light {
			width: 20%;
			height: 25%;
			background-color: #6189d2;
			border-radius: 10px;
			box-shadow: unset;
			opacity: 0.4;
			transition: all 0.3s;
		}

		&--active {
			background-color: #1a1919;
			border: none;
			box-shadow: 0 0 11px 0 #8ba3ce inset;

			&:hover {
				border: none;
			}
		}

		&--active .switch__light {
			background-color: #6189d2;
			box-shadow: 0 0 10px 2px #8ba3ce;
			opacity: 1;
			transition: all 0.8s;
		}
	}
</style>

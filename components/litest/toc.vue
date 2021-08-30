<template lang="pug">
	.toc
		.toc__header
			.toc__head(@click="isShown = !isShown")  {{ header }}
			.toc__expand-icon(@click="isShown = !isShown" :class="{'toc__expand-icon--expanded': isShown}")
		Expander
			ul.toc__content(v-show="isShown")
				li.toc__item(v-for="link of links")
					NuxtLink(
						:key="link.href"
						:to="link.href"
					).toc__link {{ link.text }}

</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'nuxt-property-decorator';
import Expander from '~/components/litest/components/expander.vue';

@Component({
	components: {
		Expander
	}
})
export default class Toc extends Vue {
	@Prop({ type: String, required: true })
	header!: string;

	@Prop({ type: Array, required: true })
	links!: { href: string; text: string; }[];

	isShown = false;
}

</script>

<style lang="scss" scoped>

.toc {
	padding: 0.5rem 0;
	margin: 0.5rem 0 3rem;
	border-top: 2px solid $Black;

	&__header {
		display: flex;
		align-items: center;
		padding: 0.5rem 0;
	}

	&__head {
		font-size: 1.5rem;
		font-weight: 400;
		cursor: pointer;
	}

	&__expand-icon {
		position: relative;
		width: 2rem;
		height: 2rem;
		margin-left: auto;
		cursor: pointer;

		&::before,
		&::after {
			position: absolute;
			top: calc(50% - 1px);
			right: 0;
			display: block;
			width: 75%;
			height: 3px;
			content: '';
			background-color: $Black;
			transition: transform 0.3s;
		}

		&::after {
			transform: rotate(90deg);
		}

		&--expanded {
			&::before {
				transform: rotate(45deg);
			}

			&::after {
				transform: rotate(135deg);
			}
		}
	}

	&__content {
		display: flex;
		flex-direction: column;
		font-size: 1rem;
		font-weight: 400;
		color: $Black;
		list-style: none;
		background-color: $DarkWhite;
		border-radius: 4px;
	}

	&__item {
		position: relative;
		padding-top: 0.25rem;
		padding-bottom: 0.25rem;
		padding-left: 2rem;
		margin: 0 0.5rem;

		&:first-child {
			margin-top: 0.5rem;
		}

		&:last-child {
			margin-bottom: 0.5rem;
		}

		&::after {
			position: absolute;
			top: calc(50%);
			left: 0;
			display: block;
			width: 1rem;
			height: 1px;
			content: '';
			background-color: $Black;
		}
	}

	&__link {
		@include toc-link();

		color: $Black;

		&:hover {
			color: $DarkGray;
		}
	}
}

</style>

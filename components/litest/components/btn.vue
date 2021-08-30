<script lang="tsx">
import * as tsx from 'vue-tsx-support';
import Component from 'vue-class-component';
import { Prop } from 'nuxt-property-decorator';
import { VNode } from 'vue';

interface IProps {
	color?: string;
	title?: string;
}

interface IPrefixedEvents {
	onClick: MouseEvent;
	// так трансформируется событие в kebab-case
	'onSpecial-btn-event': { payload: string; };
}

interface IScopedSlots {
	afterContentCounter: null
}

interface IVueEvents {
	click: MouseEvent;
	'special-btn-event': { payload: string; };

}

@Component
export default class Btn extends tsx.Component<IProps, IPrefixedEvents, IScopedSlots, IVueEvents> {
	@Prop({ type: String, default: '' })
	color!: string;

	@Prop({ type: String, default: '' })
	title!: string;

	onBtnClick(e: MouseEvent) {
		this.$emit('click', e);
		this.$emit('special-btn-event', { payload: 'click payload' });
	}

	render(): VNode {
		return (
			<button
				class="button"
				type="button"
				onClick={(e:MouseEvent) => this.onBtnClick(e)}
			> { this.title }
				{ this.$scopedSlots.afterContentCounter && this.$scopedSlots.afterContentCounter(null)}
			</button>
		);
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

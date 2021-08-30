<script lang="tsx">
import * as tsx from 'vue-tsx-support';
import Component from 'vue-class-component';
import { VNode } from 'vue';
import LitestWarpper from '~/components/litest/wrapper.vue';

@Component({ components: { LitestWarpper } })
export default class TSX extends tsx.Component<{}> {
	render(): VNode {
		return (
			<LitestWarpper>
				<div class="global-article">
					<h1>TSX</h1>
					<h2>Одной строкой</h2>
					<ul>
						<li>JSX вообще - это XML-подобная надстройка над JS, комбинирующая JS-код и разметку</li>
					</ul>
					<h2>Использование TSX в NuxtJS</h2>
					<ul>
						<li>Репозиторий <b>wonderful-panda/vue-tsx-support</b> для <b>class-style API</b></li>
						<li>Конфигурация</li>
						<code v-highlight class="typescript">
							<pre>
								{`
// tsconfig.json (дополнительно к мануалу добавить типы)
"types": [
	"vue-tsx-support/enable-check"
]
// shims-tsx.d.ts (расширение типов для DOM)
import Vue, { VNode } from 'vue';
declare global {
	namespace JSX {
		interface Element extends VNode {}
		interface ElementClass extends Vue {}
		interface IntrinsicElements {}
	}
}
// globals.d.ts (расширение интерфейса tsx.Component)
import Vue from 'vue';
import { EventHandler, InnerScopedSlots, TsxComponentTypeInfo } from 'vue-tsx-support/types/base';
declare module 'vue-tsx-support/lib/api' {
	interface Component<Props, PrefixedEvents = {}, ScopedSlotArgs = {}, VueEvents = {}> extends Vue {
		_tsx: TsxComponentTypeInfo<{}, Props, PrefixedEvents, {}>;
		$scopedSlots: InnerScopedSlots<ScopedSlotArgs>;
		$emit<T extends string & keyof VueEvents>(event: T, ...args: Parameters<EventHandler<VueEvents[T]>>): this;
	}
}
									`}
							</pre>
						</code>
						<li>Start coding</li>
						<code v-highlight class="typescript">
							<pre>
								{`
//
import * as tsx from 'vue-tsx-support';
import Component from 'vue-class-component';
import { Prop } from 'nuxt-property-decorator';
import { VNode } from 'vue';

interface IProps {
	title?: string;
}
// prefixedEvents
interface IPrefixedEvents {
	onClick: MouseEvent;
	'onSpecial-btn-event': { payload: string; };
}
// см. использование vm.$scopedSlots
interface IScopedSlots {
	afterContent: null
}
// реальные имена событий Vue для валидации в разметке (см. globals.d.ts)
interface IVueEvents {
	click: MouseEvent;
	'special-btn-event': { payload: string; };
}

@Component
export default class Btn extends tsx.Component<
	IProps,
	IPrefixedEvents,
	IScopedSlots,
	IVueEvents
> {
	@Prop({ type: String, default: '' })
	title!: string;

	onBtnClick(e: MouseEvent) {
		this.$emit('click', e);
		this.$emit('special-btn-event', { payload: 'click payload' });
	}

	render(): VNode {
		return (
			<Wrapper
				scopedSlots={
					{ copyright: () => '(c) this year' }
				}
			>
				<button
					class="button"
					type="button"
					onClick={(e:MouseEvent) => this.onBtnClick(e)}
				> { this.title }
					{ this.$scopedSlots.afterContent }
				</button>
			</Wrapper>
		);
	}
};
								`}
							</pre>
						</code>
					</ul>
				</div>
			</LitestWarpper>
		);
	};
}
</script>

<style lang="scss" scoped>
@import "../../assets/style/globals-litest.scss";
</style>

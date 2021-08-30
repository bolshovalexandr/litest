import Vue from 'vue';
import { EventHandler, InnerScopedSlots, TsxComponentTypeInfo } from 'vue-tsx-support/types/base';
declare module 'vue-tsx-support/lib/api' {
	interface Component<Props, PrefixedEvents = {}, ScopedSlotArgs = {}, VueEvents = {}> extends Vue {
		_tsx: TsxComponentTypeInfo<{}, Props, PrefixedEvents, {}>;
		$scopedSlots: InnerScopedSlots<ScopedSlotArgs>;
		$emit<T extends string & keyof VueEvents>(event: T, ...args: Parameters<EventHandler<VueEvents[T]>>): this;
	}
}

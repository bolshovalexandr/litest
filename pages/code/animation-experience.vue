<template lang="pug">
	LitestWarpper
		.global-article
			h1 Базовые примеры
			h2 Примеры из "12 принципов анимации"

			h3 Сжатие и растяжение - иллюзия физических свойств объект
			Codepen(id="qBjOVmq")

			h3 Подготовка или упреждение - небольшой отступ перед движением
			Codepen(id="xxrwaEP")

			h3 Доводка и захлест - эффект инерции
			Codepen(id="powjxVK")

			h3 Кривая Безье
			a(href="https://cubic-bezier.com") Нагляный пример кривой Безье на cubic-bezier.com
			ul
				li используется для описания временных функций,
				li кривая - кубическая, по 4-м опорным точкам, где:
				ul
					li т.1 в координатах (0; 0)
					li т.2 и т.3 мы можем задать в формате `cubic-bezier(x1, y1, x2, y2)`
					li т.4 в координатах (1; 1)
				li по оси X - шкала времени, по Y - шкала прогресса, при этом
				ul
					li x1 и x2 могут принимать значения от 0 до 1
					li y1 и y2 могут выходить за эти пределы, таким образом можно реализовать
						= ' '
						strong подготовку
						= ' или '
						strong захлест

			h3 Переходы с помощью transition

			h2 2. CSS-анимация

</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import LitestWarpper from '~/components/litest/wrapper.vue';
import Codepen from '~/components/litest/components/codepen.vue';

@Component({
	components: {
		LitestWarpper,
		Codepen
	}
})
export default class CodeAnimation extends Vue {
	mounted() {
		const script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = 'https://cpwebassets.codepen.io/assets/embed/ei.js';
		document.body.appendChild(script);
	}
}
</script>

<style lang="scss">
	@import "../../assets/style/globals-litest.scss";
</style>

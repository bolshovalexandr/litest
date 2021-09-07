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

			h2 2. CSS-анимация

			h3 Кривая Безье
			ul
				li используется для описания временных функций,
				li кривая - кубическая, по 4-м опорным точкам, где:
				ul
					li т.1 - зафиксирована в координатах (0; 0)
					li т.4 - зафиксирована в координатах (1; 1)
					li т.2 и т.3 мы можем задать в формате `cubic-bezier(x2, y2, x3, y3)`
				li по оси X - шкала времени, по Y - шкала прогресса, при этом координаты
				ul
					li по оси X могут принимать значения от 0 до 1
					li по оси Y могут выходить за эти пределы (в т.ч. быть отрицательными)
				li выводя точки кривой Безье по оси прогресса в отрицательные значения можно реализовать подготовку
					Codepen(id="bGRBYbN")
				li смягчение начала и/или конца движения реализую встроенные функции ease / ease-in / ease-out / ease-in-out
				li
					a(href="https://cubic-bezier.com") Нагляный пример кривой Безье на cubic-bezier.com
					= ' '
					span и
					= ' '
					a(href="easings.net/ru") примеры ease-функций

			h3 Анимация переходов между двумя состояниями (transition)
			ul
				li основное отличие transition от animation - управление переходом только между двумя состояниями: начальным и конечным
				li можно задавать пошаговый переход при помощи
					code(v-highlight class="css")
						pre.
							transition-timing-function: steps(5, start/end);
				li можно задавать несколько трансформаций одновременно, причем порядок влияет на результат
					code(v-highlight class="css")
						pre.
							transform:
								translate(15px, 15px)
								rotate(90deg);

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

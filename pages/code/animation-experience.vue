<template lang="pug">
	LitestWarpper
		.global-article
			h1 Базовые примеры
			h2 Примеры из "12 принципов анимации"

			h3 Сжатие и растяжение - иллюзия физических свойств объект
			Codepen(id="qBjOVmq")

			h3 Подготовка или упреждение
			p реализация с помощью вывода точки кривой Безье по оси прогресса в отрицательные значения
			Codepen(id="bGRBYbN")
			p реализация с помощью animation
			Codepen(id="xxrwaEP")

			h3 Доводка и захлест - эффект инерции
			Codepen(id="powjxVK")

			h2 Анимация переходов между двумя состояниями (transition)

			h3 Подчеркивание
			Codepen(id="XWgMXVy")

			h2 SVG и SMIL-анимация
			h3 Примеры SVG
			Codepen(id="xxXOXBX")
			h3 SMIL-анимация

			h2 ToDo
			ul
				li нумерованный список (реф.: Mist.Vacation/Rules)

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
	script!:HTMLScriptElement;

	mounted() {
		this.script = document.createElement('script');
		this.script.type = 'text/javascript';
		this.script.src = 'https://cpwebassets.codepen.io/assets/embed/ei.js';
		document.body.appendChild(this.script);
	}

	beforeDestroy() {
		this.script.remove();
	}
}
</script>

<style lang="scss">
	@import "../../assets/style/globals-litest.scss";
</style>

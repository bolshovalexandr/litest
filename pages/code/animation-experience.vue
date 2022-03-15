<template lang="pug">
	LitestWarpper
		.global-article
			h1 Базовые примеры

			h2 Анимация переходов между двумя состояниями (transition)

			h3 Подчеркивание
			Codepen(id="XWgMXVy")
			h3 Кривая Безье [under construnction]
			Codepen(id="BaZYzLo")

			h2 SVG и SMIL-анимация
			h3 Примеры SVG [under construnction]
			Codepen(id="xxXOXBX")
			h3 SMIL-анимация
			h4 Анимация SVG и прорисовка контура [under construnction]
			Codepen(id="xxXEVmd")
			h4 CSS-переменные и раздельное анимирование свойств
			Codepen(id="WNZJapO")

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

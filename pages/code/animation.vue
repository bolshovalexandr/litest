<template lang="pug">
	LitestWarpper
		h1 Web-анимация
		h2 0. Общие заметки по анимации
		ul
			li оптимальная длительность большинства анимаций от 0.35s до 1.5s, при этом на основную часть анимации должно приходиться максимум 0.5s, остальное - доводка
			li сайт можно рассматривать как набор статичных состояний, анимацию - как средство их, состояний, объединения
		h2 1. Основы анимации
		h3 Микровзаимодействия
		ul
			li микровзаимодействие - элемент взаимодействия пользователя с интерфейсом (клики, ховеры, ввод, ожидание загрузки и т.д.)
			li цель анимации в микровзаимодействиях - сгладить переход при смене состояний интерфейса и управлять вниманием пользователя. Элемент интерфейса должен восприниматься как единое целое
			li большую роль играет временной интервал, интерфейc не должен "рассыпаться"
		h3 12 принципов анимации
		h4 Активно используются в CSS-анимации
		.example
			.example__header Сжатие и растяжение (Squash and stretch)
			.example__description иллюзия эластичности, веса, скорости и прочих физических свойств объекта (быстрое движение - удлиннение, торможение - сплющивание, лёгкий и эластичный объект, такой, как резиновый шарик, искажается гораздо сильнее, чем тяжёлый металлический шар)
			.example__button
				Button(
					title="squash"
					@click="onSquashAndStratchClick"
				)
			.example__container
				.example__item.example__item--circle.squash-and-stratch(:class="{'squash-and-stratch--light': squashAndStratchFlag}") 1kg.
			.example__container
				.example__item.example__item--circle.squash-and-stratch(:class="{'squash-and-stratch--hard': squashAndStratchFlag}") 1t.
		.example
			.example__header Подготовка или упреждение (Anticipation)
			.example__description небольшой разгон/отступ в противоположную сторону перед началом движения
			.example__button
				Button(
					title="anticipation"
					@click="onAnticipationClick"
				)
			.example__container
				.example__item.example__item--circle(:class="{'anticipation': anticipationFlag}") &rarr;
		.example
			.example__header Доводка и захлест (overlapping)
			.example__description эффект инерции. Физический объект не может начать двигаться/остановиться моментально. Скорость достигает максимума к середине. Если движение останавливается резко, то нужно создать эффект гашения кинетической энергии
			.example__button
				Button(
					title="overlapping"
					@click="onOverlappingClick"
				)
			.example__container
				.example__item.example__item--square(:class="{'overlapping': overlappingFlag}")
		.example
			.example__header Движение по дуге
			.example__description в реальном мире объекты никогда не двигаются по идеальной прямой
		.example
			.example__header Тайминг
			.example__description одна и та же анимация с разными скоростями может сообщать разные физические свойства и передавать разное настроение
		h4 Общие приемы анимации
		.example
			.example__header
			.example__description
				strong Смягчение начала и завершение движения
				span &nbsp;- большая частота кадров в начале и конце анимации (напр., временные функции ease-* в CSS)
			.example__description
				strong Сценичность
				span &nbsp;- привлечение внимания при помощи анимации в область экрана с самой высокой важностью, отсутствие перегруженности анимацией
			.example__description
				strong Компоновки и фазованные движения
				span &nbsp;- Компоновки (отрисовка ключевых кадров и добавление переходов между ними, используется для создания четкого понимания начального и конечного значения анимации, напр., движение от т.А к т.Б) и фазованные движения (последовательная отрисовка кадров от начала до конца, используется в процессах, напр., горение огня)
		h4 Художественные эффекты
		.example
			.example__header
			.example__description К исключительно изобразительным эффектам относятся: выразительная деталь, преувеличение (утрирование), качество рисунка и харизматичность

		h3 Кривая Безье
		.example
			.example__header
			.example__description
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
// TS
import Vue from 'vue';
import Component from 'vue-class-component';
// Глобальные компоненты
import LitestWarpper from '~/components/litest/wrapper.vue';
import Button from '~/components/litest/components/btn.vue';
// Крафтовые компоненты
// Вспомогательные библиотеки

@Component({
	components: {
		LitestWarpper,
		Button
	}
})
export default class CodeAnimation extends Vue {
	squashAndStratchFlag = false;
	anticipationFlag = false;
	overlappingFlag = false;

	onSquashAndStratchClick() {
		this.squashAndStratchFlag = true;
		setTimeout(() => (this.squashAndStratchFlag = false), 1000);
	}

	onAnticipationClick() {
		this.anticipationFlag = true;
		setTimeout(() => (this.anticipationFlag = false), 2000);
	}

	onOverlappingClick() {
		this.overlappingFlag = true;
		setTimeout(() => (this.overlappingFlag = false), 1000);
	}
}
</script>

<style lang="scss">
	@import "../../assets/style/mixins-litest.scss";

	.example {
		margin: 1rem;

		&__header {
			@include h16;
		}

		&__description {
			@include c14;
		}

		&__button {
			margin: 8px 0;
		}

		&__container {
			display: flex;
			align-items: center;
			width: 100%;
			height: 100px;
			margin-bottom: 0.5rem;
			border: 1px solid $LightGray;
			border-radius: 4px;
		}

		&__item {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 75px;
			height: 75px;
			margin-left: 20px;
			color: $White;
			cursor: pointer;
			background-color: $Gray;
			transition: 0.3s ease-in opacity;

			&:hover {
				opacity: 0.76;
			}

			&--square {
				border-radius: 4px;
			}

			&--circle {
				border-radius: 50%;
			}
		}
	}

	@keyframes squashAndStratchLight {
		from {
			transform: scale(1, 1);
		}

		30% {
			transform: scale(1.25, 0.75);
		}

		40% {
			transform: scale(0.75, 1.25);
		}

		50% {
			transform: scale(1.15, 0.85);
		}

		65% {
			transform: scale(0.95, 1.05);
		}

		75% {
			transform: scale(1.05, 0.95);
		}

		to {
			transform: scale(1, 1);
		}
	}

	@keyframes squashAndStratchHard {
		from {
			transform: scale(1, 1);
		}

		50% {
			transform: scale(1.05, 0.95);
		}

		to {
			transform: scale(1, 1);
		}
	}

	.squash-and-stratch {
		@include t12;

		animation-duration: 1s;

		&--light {
			animation-name: squashAndStratchLight;
		}

		&--hard {
			animation-name: squashAndStratchHard;
		}
	}

	@keyframes anticipation {
		from {
			transform: translateX(0);
		}

		15% {
			transform: translateX(-4px);
		}

		to {
			transform: translateX(240px);
		}
	}

	.anticipation {
		@include t12;

		animation-name: anticipation;
		animation-duration: 2s;
	}

	@keyframes overlapping {
		from {
			transform: translateX(-240px);
		}

		5% {
			// transform: translateX(-4px);
		}

		85% {
			// transform: translateX(240px);
		}

		95% {
			transform: skewX(15deg);
		}

		to {
			transform: skewX(0deg);
			transform: translateX(0);
		}
	}

	.overlapping {
		animation-name: overlapping;
		animation-duration: 1s;
		// animation-timing-function: ease-out;
		animation-timing-function: cubic-bezier(0.5, 2, 0.5, 2);
	}

</style>

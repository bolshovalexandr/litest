<template lang="pug">
.wrap
	.wrap__rocket.rocket
			canvas#canvas(
				ref="canvas"
			)
	.wrap__text.text
		.text__clouds.clouds
			.clouds__item(@click="setAdviceType('how')") Да как так-то??!
			.clouds__item(@click="setAdviceType('what')") Да что теперь-то?!!
			.clouds__item(@click="setAdviceType('now')") Да чего уж там!!!
		.text__advices
			.advices
				.advices__prefix Просто
				.advices__advice прибыль фиксанули
		.text__philosophy
			.philosophy Утешение в философии
	.wrap__land.land
		.land__kotlet
			.kotlet
				.kotlet__person
					include ../../assets/img/svg/2-the-moon/kotlet.svg
				.kotlet__smoke
					include ../../assets/img/svg/2-the-moon/cloud.svg
					include ../../assets/img/svg/2-the-moon/cloud.svg
					include ../../assets/img/svg/2-the-moon/cloud.svg
		.land__disclaimer Не является индивидуальной инвестиционной рекомендацией. Не является ничем.

</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import animation from '~/components/to-the-moon/animation';

type AdviceType = 'how' | 'what' | 'now';

@Component({
	components: {}
})
export default class ArtIndex extends Vue {
	$refs!: {
		canvas: HTMLCanvasElement;
	};

	animation = animation;

	canvasWidth = 0;
	canvasHeight = 0;
	ctx!: CanvasRenderingContext2D;
	image!: HTMLImageElement;

	advicePrefix = {
		how: 'Просто',
		what: 'Да'
	};

	advices = {
		how: ['амеры в кэш вышли', 'все ждут заседания ФРС', 'прибыль фиксанули', 'вышли в кэш в пятницу', 'все ушли в крипту', 'после пампа пришел дамп', 'после дампа пришел памп'],
		what: ['выкупят просадку', 'сейчас Маск пампанет', 'этот пузырь давно должен был лопнуть', 'Пелоси опять ляпнула', 'снова Фаучи не то сказал'],
		now: ['На всю котлету шортим Теслу!', 'Чаще усредняйся!', 'Реже усредняйся!', 'Выкупай просадку!', 'Лови жирных лосей!', 'В Ашан на всю котлету!', 'Маск — клоун. Тесла в шорт.', 'Маск — гений. Тесла в лонг.', 'Зафолловь Трампа, потом пригодится', 'К черту Баффета - он старый', 'Слушай Баффета - он опытный']
	};

	current: AdviceType = 'how';

	setAdviceType(type: AdviceType) {
		this.current = type;
	};

	getScrollWidth() {
		const div = document.createElement('div');
		div.style.overflowY = 'scroll';
		div.style.width = '50px';
		div.style.height = '50px';
		document.body.append(div);
		const scrollWidth = div.offsetWidth - div.clientWidth;
		div.remove();
		return scrollWidth;
	}

	mounted() {
		this.animation(this.$refs.canvas, '../../2-the-moon/rocket-horizontal.png');
	}
}
</script>

<style lang="scss" scoped>

@keyframes flyToRight {
	from {
		transform: translate3d(0px, 0px, 0);
	}
	to {
		transform: translate3d(8px, 2px, 0);
	}
}

@keyframes flyToLeft {
	from {
		transform: translate3d(0px, 0px, 0);
	}
	to {
		transform: translate3d(-8px, -2px, 0);
	}
}

#canvas {
	align-self: flex-start;
	border: 1px dashed gray;
}

.wrap {
	display: flex;
	flex-direction: column;
	width: 100vw;
	height: 100vh;
	max-width: 100%;
	&__rocket {
		flex: 0 0 200px;
		display: flex;
		justify-content: center;
		padding: 36px;
	}
	&__text {
		flex: 1 0 0;
		width: 100%;
		min-height: 300px;
	}
	&__land {
		flex: 0 0 100px;
		min-height: 100px;

	}
}

// ОСНОВНЫЕ СТРОКИ
.rocket {
		background-color: rgb(168, 181, 241);
}

.text {
	display: flex;
	justify-content: space-between;
	&__clouds {

	}
	&__advices {
		flex: 0 0 900px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	&__philosophy {

	}
}

.land {
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	align-items: center;
	background-color: rgb(112, 240, 191);
	&__kotlet {
		align-self: flex-start;
	}
	&__disclaimer {

	}
}

// КОНТЕНТНЫЕ БЛОКИ
.clouds {
	display: flex;
	justify-content: center;
	flex-direction: column;
	text-transform: uppercase;
	&__item {
		position: relative;
		display: inline-flex;
		align-self: baseline;
		margin: 16px;
		padding: 4px 8px;
		cursor: pointer;
		&::before {
			position: absolute;
			width: 75%;
			height: 100%;
			left: 0;
			top: 0;
			content: '';
			border: 1px solid lightgray;
			background-color:rgba(127, 127, 127, 0.15);
			box-shadow: 0px 0px 16px 2px rgba(127, 127, 127, 0.3);
			border-radius: 4px;

			animation-name: flyToRight;
			animation-duration: 3s;
			animation-timing-function: linear;
			animation-iteration-count: infinite;
			animation-direction: alternate;
		}
		&::after {
			position: absolute;
			width: 25%;
			height: 100%;
			top: -2px;
			right: 0;
			content: '';
			border: 1px solid lightgray;
			background-color:rgba(127, 127, 127, 0.15);
			box-shadow: 0px 0px 16px 2px rgba(127, 127, 127, 0.3);
			border-radius: 4px;

			animation-name: flyToLeft;
			animation-duration: 3s;
			animation-timing-function: linear;
			animation-iteration-count: infinite;
			animation-direction: alternate;
		}
	}
}

.kotlet {
	display: flex;
	&__person {
		margin-left: 40px;
		margin-right: 100px;
	}
	&__smoke {
		position: relative;
		top: 50px;
		svg {
			position: absolute;
			transform-origin: center;
		}
		@for $i from 1 through 3 {
			svg:nth-of-type(#{$i}) {
				top: 1px * 20 * -$i;
				left: 0;
				transform: scale(1 - $i * 0.1);
			}
		}
	}
}

.advices {
	display: flex;
	align-items: center;
	&__prefix {
		height: 40px;
		margin-right: 8px;
		font-size: 40px;
		color: darkgreen;
		text-transform: uppercase;
		line-height: 40px;
	}
	&__advice {
		height: 28px;
		text-transform: uppercase;
		font-size: 28px;
		line-height: 28px;
	}
}

</style>

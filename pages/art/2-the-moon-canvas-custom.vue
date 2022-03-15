<template lang="pug">
.wrapper
	canvas#canvas(ref="canvas")

</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
	components: {}
})
export default class ArtIndex extends Vue {
	$refs!: {
		canvas: HTMLCanvasElement;
	};

	canvasWidth = 0;
	canvasHeight = 0;
	ctx!: CanvasRenderingContext2D;
	image!: HTMLImageElement;
	x = 0;
	y = 0;
	angle = 0;

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

	getScreenSizes() {
		this.$refs.canvas.height = window.innerHeight;
		this.$refs.canvas.width = window.innerWidth - this.getScrollWidth();
		this.rotate();
		this.translateAndRotate();
	}

	rotate() {
		this.ctx.save();
		this.ctx.translate(50, 50);
		this.ctx.rotate(this.angle * Math.PI / 180);
		this.ctx.translate(-50, -50);
		this.ctx.drawImage(this.image, 0, 0);
		this.ctx.restore();
	}

	translateAndRotate() {
		this.ctx.save();
		// this.ctx.scale(this.x % 2 ? 2 : 1, this.y % 2 ? 2 : 1);
		this.ctx.translate(50 + this.x, 50 + this.y);
		this.ctx.rotate(this.angle * Math.PI / 180);
		this.ctx.translate(-50, -50);
		this.ctx.drawImage(this.image, 0, 0);
		this.ctx.restore();
	}

	drawScene() {
		// const now = performance.now;
		window.requestAnimationFrame(() => {
			++this.x;
			++this.y;
			this.angle += 1;
			if (this.angle > 500) {
				return;
			}
			this.ctx.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);
			this.rotate();
			this.translateAndRotate();
			this.drawScene();
		});
	}

	mounted() {
		this.ctx = this.$refs.canvas!.getContext('2d')!;
		this.image = new Image();
		this.image.src = '../2-the-moon/disk-100-100.png';
		this.image.addEventListener('load', () => {
			this.getScreenSizes();
			window.addEventListener('resize', this.getScreenSizes);
			this.drawScene();
		});

		// const animateDuration = (render, duration) => new Promise(resolve => {
		// 	let start = Date.now();
		// 	(function loop() {
		// 		let p = Date.now() - start;
		// 		if (p > duration) {
		// 			render(duration); // отрисовка анимации
		// 			resolve(); // передаём в промис информацию о заверешении анимации
		// 		} else {
		// 			requestAnimationFrame(loop);
		// 			render(p); // отрисовка анимации
		// 		}
		// 	}());
		// });
		// animateDuration(tick, 10500);

		// -----------------------------------------
	}
}
</script>

<style lang="scss" scoped>
@import "../../assets/style/globals-litest.scss";

#canvas {
	background: url('/2-the-moon/grid-400-200.png');
	outline: 2px solid black;
}

</style>

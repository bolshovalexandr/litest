<template lang="pug">
.wrapper
	canvas#canvas(ref="canvas") Here animation will be

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

	mounted() {
		// UTILS
		const easeLinear = (x: number) => x;
		// const easeInCubic = (x: number) => x * x * x;
		// const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);
		// const easeInElastic = (x: number) => {
		// 	const c4 = (2 * Math.PI) / 3;

		// 	if (x === 0) {
		// 		return 0;
		// 	} else if (x === 1) {
		// 		return 1;
		// 	} else {
		// 		return Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4);
		// 	}
		// };
		/** ==== Animation ====
		 *
		 *
		 */
		class Animation {
			options: {
				easing(x: number): number;
				duration: number | string;
				delay: number;
				func(
					progress: number,
					options?: {
						startTime: number;
						currentTime: number;
						isFinished: boolean;
					}
				): void;
			};

			timeoutId: number | null = null;
			requestId: number | null = null;
			startTime: number = 0;
			lastFrameTime: number = 0;
			interval: number = 0;
			isFinished: boolean = false;
			readonly fps = 60;
			constructor(options) {
				this.options = options;

				if (!this.options.easing) {
					this.options.easing = easeLinear;
				}

				if (!this.options.duration) {
					this.options.duration = 1000;
				}

				if (!this.options.delay) {
					this.options.delay = 0;
				}
			}

			restart() {
				this.start();
			}

			stop() {
				if (this.timeoutId) {
					clearTimeout(this.timeoutId);
				}
				if (this.requestId) {
					cancelAnimationFrame(this.requestId);
				}
			}

			start() {
				this.stop();

				this.timeoutId = window.setTimeout(() => {
					this.startTime = performance.now();
					this.interval = 1000 / this.fps;
					this.lastFrameTime = this.startTime;
					this.isFinished = false;

					let animateFrame;

					if (this.options.duration === 'infinite') {
						animateFrame = (currentTime) => {
							this.requestId = requestAnimationFrame(animateFrame);

							const delta = currentTime - this.lastFrameTime;

							if (delta > this.interval) {
								this.options.func(1, {
									startTime: this.startTime,
									currentTime,
									isFinished: false
								});

								this.lastFrameTime = currentTime - delta % this.interval;
							}
						};
					} else {
						animateFrame = (currentTime) => {
							this.requestId = requestAnimationFrame(animateFrame);

							const delta = currentTime - this.lastFrameTime;

							if (delta > this.interval && typeof this.options.duration === 'number') {
								let timeFraction = (currentTime - this.startTime) / this.options.duration;

								if (timeFraction > 1) {
									timeFraction = 1;
									this.isFinished = true;
								}

								if (timeFraction <= 1) {
									const progress = this.options.easing(timeFraction);

									this.options.func(progress, {
										startTime: this.startTime,
										currentTime,
										isFinished: this.isFinished
									});

									this.lastFrameTime = currentTime - delta % this.interval;
								}

								if (this.isFinished) {
									this.stop();
								}
							}
						};
					}

					this.requestId = requestAnimationFrame(animateFrame);
				}, this.options.delay);
			}
		}

		/** ==== Scene2D ====
		 *
		 *
		 */
		class Scene2D {
			canvas: HTMLCanvasElement;
			ctx: CanvasRenderingContext2D;
			imagesUrls = {
				rocket: '../2-the-moon/rocket.png',
				square: '../2-the-moon/square.png'
			};

			// size = 100;
			size = {
				width: 0,
				height: 0
			};

			isLoaded: boolean = false;
			isWaitingForImages: boolean = true;
			isStarted: boolean = false;
			images: any[] = [];
			animations: Animation[] = [];
			// Храним координаты картинок в значениях от 0 до 100 и рассчитываем их реальное положение только при их отображении на экране
			// Это уменьшает сложность кода для восприятия, т. к. координаты можно воспринимать как заданные в процентах,
			// как в CSS. Такой же способ мы часто применяем при работе с SVG, когда используем viewBox="0 0 100 100».
			objects = {
				rocket: {
					imageId: 'rocket',
					x: 50,
					y: 50,
					size: 5,
					opacity: 1,
					transforms: {
						rotate: 10
					}
				},
				square: {
					imageId: 'square',
					x: 50,
					y: 50,
					size: 5,
					opacity: 0.5,
					transforms: {
						translateY: 2
					}
				}
			}

			constructor(canvasNode: HTMLCanvasElement) {
				this.canvas = canvasNode;
				this.ctx = this.canvas.getContext('2d')!;
				this.loadImages();
			}

			loadImages() {
				let loadingCounter = 0;
				for (const name in this.imagesUrls) {
					const image = new Image();
					image.addEventListener('load', () => {
						loadingCounter++;
						if (loadingCounter === Object.keys(this.imagesUrls).length) {
							this.isLoaded = true;
							if (this.isWaitingForImages) {
								this.start();
							} else {
								this.drawScene();
							}
						}
					});
					this.images[name] = image;
					image.src = this.imagesUrls[name];
				}
			}

			updateSize() {
				// this.size = Math.min(window.innerWidth, window.innerHeight);
				this.size.width = window.innerWidth - 20;
				this.size.height = window.innerHeight;
				this.canvas.height = this.size.height;
				this.canvas.width = this.size.width;
			}

			drawImage(image, object) {
				// object.x и object.y - положение изображения в процентах
				// object.size - похоже, что размер изображения также в процентах
				let x = object.x;
				let y = object.y;
				const size = object.size;
				const opacity = object.opacity;
				const transforms = object.transforms;

				if (opacity === 0) {
					return;
				}
				if (transforms && (transforms.scaleX === 0 || transforms.scaleY === 0)) {
					return;
				}
				// ширина и высота изображения, которые мы будем использовать в drawImage и для рассчета координат
				// let width = this.size.width * (size / 100);
				let width = (this.size.width < this.size.height ? this.size.width : this.size.height) * (size / 100);
				let height = width * image.height / image.width;

				x = this.size.width * (x / 100) - width / 2;
				y = this.size.height * (y / 100) - height / 2;
				// x = this.size.width * (x / 100) - image.width / 2;
				// y = this.size.height * (y / 100) - height / 2;

				// debugger

				const isContextTransforming = opacity ||
					(transforms && (transforms.rotate || transforms.scaleX || transforms.scaleY));

				if (isContextTransforming) {
					this.ctx.save();
				}

				if (transforms) {
					if (transforms.translateX) {
						x += this.size.width * (transforms.translateX / 100);
					}

					if (transforms.translateY) {
						y += this.size.height * (transforms.translateY / 100);
					}

					if (transforms.rotate) {
						this.ctx.translate(x + width / 2, y + height / 2);
						this.ctx.rotate(transforms.rotate * Math.PI / 180);
					}

					if (transforms.scaleX) {
						width *= transforms.scaleX;
						if (transforms.scaleX < 0) {
							this.ctx.scale(-1, 1);
							x = -x;
						}
					}

					if (transforms.scaleY) {
						height *= transforms.scaleY;
						if (transforms.scaleY < 0) {
							this.ctx.scale(1, -1);
							y = -y;
						}
					}

					if (transforms.rotate) {
						this.ctx.translate(-x - width / 2, -y - height / 2);
					}
				}

				if (opacity) {
					this.ctx.globalAlpha = opacity;
				}

				this.ctx.drawImage(image, x, y, width, height);
				// this.ctx.drawImage(image, x, y, 100, 100 * image.height / image.width);
				// this.ctx.drawImage(image, x, y);

				if (isContextTransforming) {
					this.ctx.restore();
				}
			}

			clearScene() {
				this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			}

			drawScene() {
				this.clearScene();

				for (const name in this.objects) {
					const object = this.objects[name];
					this.drawImage(
						this.images[object.imageId],
						object
					);
				}
			}

			initAnimations() {
				this.animations.push(new Animation({
					func: () => {
						this.drawScene();
					},
					duration: 'infinite',
					fps: 60
				}));

				this.animations.push(new Animation({
					func: (progress) => {
						const progressReversed = 1 - progress;
						this.objects.rocket.transforms.rotate = 30 * progressReversed;
					},
					// func: () => {},
					duration: 3000,
					delay: 0,
					easing: easeLinear
				}));

				this.animations.push(new Animation({
					func: (progress) => {
						const progressReversed = 1 - progress;
						this.objects.square.transforms.translateY = 30 * progressReversed;
					},
					duration: 3000,
					delay: 0,
					easing: easeLinear
				}));
			}

			stop() {
				this.animations.forEach((animation) => {
					animation.stop();
				});
			}

			start() {
				if (!this.isLoaded) {
					this.isWaitingForImages = true;
					return;
				}

				if (this.isStarted) {
					this.stop();
				}

				if (this.animations.length === 0) {
					this.initAnimations();
				}

				this.animations.forEach((animation) => {
					animation.start();
				});

				this.isStarted = true;
				console.dir(this.canvas);
			}

			beginAnimation() {
				window.addEventListener('resize', this.updateSize.bind(this));
				this.updateSize();
				this.start();
			}
		}

		/** Scene2D
		 *
		 * 0. загружаем в конструкторе картинки (создаем новые (new Image) изображения )
		 * 1. определяем внутренние размеры окна, создаем квадрат по меньшей стороне
		 * 2.
		 *
		 */

		const scene = new Scene2D(this.$refs.canvas);
		scene.beginAnimation();
	}
}
</script>

<style lang="scss" scoped>
@import "../../assets/style/globals-litest.scss";

#canvas {
	border: 1px solid lightgray;
	background:
		linear-gradient(90deg, rgba(186, 255, 252, 0.7) 50%, transparent 50%),
		linear-gradient(180deg, rgba(59, 231, 125, 0.7) 50% 50%, transparent 50%),
		url('/2-the-moon/grid-400-200.png') repeat;
}

</style>

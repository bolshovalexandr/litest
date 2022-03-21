/**
 * ======== 1 ИСХОДНЫЕ   =======
 * - размеры холста
 * - определяем путь (начальные и конечный точки, формулу трактории)
 * - определяем время прохождения пути
 *
 * ======== 2 ПОДГОТОВКА =======
 * - получаем холст и устанавливаем размеры
 * - получаем изображение (запустим анимацию по событию onload) / создаем объект
 *
 * ======== 3 ОТРИСОВКА =======
 */

// ======== 1 ИСХОДНЫЕ   =======
const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT = 240;
const INCREASE_X = 3.5;
const AMPLITUDE_MAX = 50;

class Rocket {
	private w: number;
	private h: number;
	private x = 0
	private y = 100;
	// постоянно увеличивающийся аргумент функции синуса
	private sinArgument = 0;
	private amplitude = 0;
	private xMotion = 'go';
	constructor(private img: HTMLImageElement, private ratio: number) {
		// считаем, чтобы длина изображения была ratio (0 - 1) от длины холста
		this.w = CANVAS_WIDTH * this.ratio;
		this.h = (this.img.height / this.img.width) * this.w;
	}

	get imgSize() {
		return { w: this.w, h: this.h };
	}

	update() {
		if (this.x < CANVAS_WIDTH / 4) {
			this.y = CANVAS_HEIGHT / 2 + AMPLITUDE_MAX * Math.sin(4 * (this.sinArgument += 0.05)) / Math.pow(this.sinArgument + 1, 1.5);
		} else {
			this.amplitude = this.amplitude < AMPLITUDE_MAX ? this.amplitude += 0.5 : AMPLITUDE_MAX;
			this.y = CANVAS_HEIGHT / 2 + this.amplitude * Math.sin(this.sinArgument += 0.05);
		}

		if (this.xMotion === 'go' && this.x < CANVAS_WIDTH / 2) {
			this.x += INCREASE_X;
		} else {
			this.xMotion = 'stay';
		}

		if (this.xMotion === 'stay') {
			this.x += 0.4 * Math.sin(this.sinArgument);
		}

		return {
			x: this.x,
			y: this.y,
			w: this.w,
			h: this.h,
			img: this.img
		};
	}
}

interface ICandleBody {x: number; y: number; w: number; h: number; color: 'red' | 'green'; reverse: boolean };
interface ICandle extends ICandleBody { line: { x: number; y1: number; y2: number }; isChecked: boolean; check: Function }
class Candles {
	private readonly candleWidth = 10;
	private readonly baseCandleHeightRatio = 0.25;
	private readonly additionalCandleHeightRatio = 0.1;
	private readonly lineHeightRatio = 0.15;
	// расстояние между свечами
	private gap: number;
	private candleBaseHeight: number;
	private candles: ICandle[] = [];

	constructor(private width: number, private quantity: number) {
		this.candleBaseHeight = this.baseCandleHeightRatio * CANVAS_HEIGHT;
		this.gap = (width - (quantity - 1) * this.candleWidth) / (quantity);
		this.addNext();
	}

	private get plusMinus() {
		return Math.random() >= 0.5 ? -1 : 1;
	}

	createCandle(x: number, y: number, w: number, h: number, color: 'red' | 'green', reverse: boolean) {
		return {
			x,
			w,
			y,
			h,
			color,
			reverse,
			line: {
				x: x + w / 2,
				y1: y - this.candleBaseHeight * this.lineHeightRatio,
				y2: y + h + this.candleBaseHeight * this.lineHeightRatio
			},
			isChecked: false,
			check() {
				this.isChecked = true;
			}
		};
	};

	/**
	 * создание очередной свечи
	 * 1. Первая свеча зеленая, начинает восходящий тренд
	 * 2. Любая следующая свеча является продолжением текущего тренда (если это возможно), или разворотом
	 */
	private addNext() {
		const x = this.width + this.candleWidth;
		const w = this.candleWidth;

		// ВЫСОТА: базовая высота (25% высоты канваса) +/- случайная величина (10% ОТ КАНВАСА) - итого высота может быть от 15% до 35% общей
		const hRandomized = CANVAS_HEIGHT * this.baseCandleHeightRatio + (this.plusMinus * this.additionalCandleHeightRatio * Math.random() * CANVAS_HEIGHT);
		const hMaximal = this.candleBaseHeight + CANVAS_HEIGHT * this.additionalCandleHeightRatio;
		const hMinimal = this.candleBaseHeight - CANVAS_HEIGHT * this.additionalCandleHeightRatio;

		// первая свеча
		if (!this.candles.length) {
			this.candles.push(this.createCandle(x, (CANVAS_HEIGHT - this.candleBaseHeight + 1) / 2, w, hRandomized, 'green', false));
			return;
		}

		const lastCandle = { ...this.candles[this.candles.length - 1] };
		// разворот тренда
		if (lastCandle.reverse) {
			const y = lastCandle.y;
			if (lastCandle.color === 'green') {
				this.candles.push(this.createCandle(x, y, w, hRandomized, 'red', false));
			}
			if (lastCandle.color === 'red') {
				this.candles.push(this.createCandle(x, lastCandle.y - lastCandle.h, w, hRandomized, 'green', false));
			}
			return;
		}

		// тренд вверх
		if (lastCandle.color === 'green') {
			// проверяем, можно ли уверенно продолжить тренд вверх (уберется ли еще одна свеча с максимальными размерами)
			if (lastCandle.y > CANVAS_HEIGHT - hMaximal) {
				const y = lastCandle.y - hRandomized;
				this.candles.push(this.createCandle(x, y, w, hRandomized, 'green', false));
				return;
			}
			// уберется ли минимальная свеча
			if (lastCandle.y > hMinimal) {
				const y = lastCandle.y - hMinimal;
				this.candles.push(this.createCandle(x, y, w, hMinimal, 'green', true));
				return;
			}
		}

		// тренд вниз
		if (lastCandle.color === 'red') {
			const y = lastCandle.y + lastCandle.h;
			if (CANVAS_HEIGHT - (lastCandle.y + lastCandle.h) > CANVAS_HEIGHT - hMaximal) {
				this.candles.push(this.createCandle(x, y, w, hRandomized, 'red', false));
				return;
			}
			if (CANVAS_HEIGHT - (lastCandle.y + lastCandle.h) > hMinimal) {
				this.candles.push(this.createCandle(x, y, w, hMinimal, 'red', true));
			}
		}
	}

	private dropFirst() {
		this.candles.shift();
	}

	private update() {
		this.candles.forEach((candle) => {
			candle.x -= INCREASE_X;
			candle.line.x -= INCREASE_X;
		});
		if (this.candles[this.candles.length - 1].x < this.width - this.gap && this.candles.length < this.quantity) {
			this.addNext();
		}
		if (this.candles[0].x + this.candleWidth < 0) {
			this.dropFirst();
		}
	}

	get items(): ICandle[] {
		this.update();
		return this.candles;
	}
}

let candles: Candles;
let rocket: Rocket;
let deposite = 0;
let deal = 0;

// ======== 3 ОТРИСОВКА =======
const drawScene = (ctx: CanvasRenderingContext2D) => {
	ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

	const { x: xR, y: yR, w: wR, h: hR, img } = rocket.update();

	candles.items.forEach((candle) => {
		const { x, y, w, h, line, color } = candle;
		ctx.fillStyle = color;
		ctx.strokeStyle = color;
		ctx.beginPath();
		ctx.moveTo(line.x, line.y1);
		ctx.lineTo(line.x, line.y2);
		ctx.stroke();
		ctx.fillRect(x, y, w, h);
		if (!candle.isChecked && x < xR && y < yR && y + h > yR + hR) {
			candle.check();
			deal = Math.floor(h) * (color === 'red' ? -1 : 1);
			deposite = deposite + deal;
		}
	});

	// вставляем изображение
	ctx.drawImage(img, xR - wR / 2, yR, wR, hR);
	ctx.font = '24px monospace';
	console.log(deal);

	ctx.fillStyle = deal > 0 ? 'green' : 'red';
	ctx.fillText(String(deal), CANVAS_WIDTH / 2, 20);
	ctx.font = '24px monospace';
	ctx.fillStyle = 'white';
	ctx.fillText(String(deposite), CANVAS_WIDTH - 40, CANVAS_HEIGHT - 20);

	requestAnimationFrame(() => {
		drawScene(ctx);
	});
};

export default (canvasNode: HTMLCanvasElement, imgUrl: string): string => {
	const rocketImg = new Image();
	const ctx = canvasNode.getContext('2d')!;
	rocketImg.src = imgUrl;

	canvasNode.width = CANVAS_WIDTH;
	canvasNode.height = CANVAS_HEIGHT;

	rocketImg.addEventListener('load', () => {
		candles = new Candles(CANVAS_WIDTH, 12);
		rocket = new Rocket(rocketImg, 0.1);
		drawScene(ctx);
	});

	return 'animation started';
};

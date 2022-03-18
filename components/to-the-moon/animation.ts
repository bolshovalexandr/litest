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
 *
 *
 */

// ======== 1 ИСХОДНЫЕ   =======
const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT = 200;

// const TIME = 1200;

// Изменение координат ракеты
const rocket = {
	MIN_Y: 45,
	MAX_Y: 105,
	x: 0,
	y: 51,
	xMotion: 'go',
	yDirection: 'down',
	update() {
		if (this.yDirection === 'down' && this.y === this.MAX_Y) {
			this.yDirection = 'up';
		}
		if (this.yDirection === 'up' && this.y === this.MIN_Y) {
			this.yDirection = 'down';
		}

		if (this.x > CANVAS_WIDTH / 4) {
			this.y = this.y + (this.yDirection === 'down' ? 2 : -2);
		}

		if (this.xMotion === 'go' && this.x < CANVAS_WIDTH / 2) {
			this.x += 2;
		} else {
			this.xMotion = 'stay';
		}

		if (this.xMotion === 'stay') {
			if (this.yDirection === 'up') {
				if (this.y < (this.MAX_Y - this.MIN_Y)) {
					this.x += 0.5;
				} else {
					this.x -= 0.5;
				}
			}
			if (this.yDirection === 'down') {
				if (this.y > (this.MAX_Y - this.MIN_Y)) {
					this.x += 0.5;
				} else {
					this.x -= 0.5;
				}
			}
		}

		return {
			x: this.x,
			y: this.y
		};
	}
};

/**
 * алгортим
 * - принимаем ширину холста и количество свечей
 * - рассчитываем расстояние между свечами так, чтобы они появлялись равномерно
 */

class Candles {
	private readonly candleWidth = 20;
	private readonly candleOffsetTop = 20;
	private readonly candleHeight = 100;
	private gap: number;
	private candles: {x: number, y: number, w: number, h: number, line?: {x: number; y1: number; y2: number}}[] = [];

	constructor(private width: number, private quantity: number) {
		this.gap = (width - (quantity - 1) * this.candleWidth) / (quantity);
		this.addNext();
	}

	private get next() {
		return {
			x: this.width + this.candleWidth,
			y: this.candleOffsetTop,
			w: this.candleWidth,
			h: this.candleHeight,
			color: Math.random() > 0.5 ? 'green' : 'red'
		};
	}

	get items() {
		return this.candles.map((candle) => {
			candle.line = {
				x: candle.x + candle.w / 2,
				y1: candle.y - 10,
				y2: candle.y + candle.h + 10
			};
			return candle;
		});
	}

	addNext() {
		this.candles.push(this.next);
	}

	dropFirst() {
		this.candles.shift();
	}

	update() {
		this.candles.forEach(candle => (candle.x -= 2));
		if (this.candles[this.candles.length - 1].x < this.width - this.gap && this.candles.length < this.quantity) {
			this.addNext();
		}
		if (this.candles[0].x + this.candleWidth < 0) {
			this.dropFirst();
		}
	}
}

const candle = new Candles(900, 12);

// ======== 3 ОТРИСОВКА =======
const drawScene = (ctx: CanvasRenderingContext2D, img: HTMLImageElement) => {
	ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	const { x: xRocket, y: yRocket } = rocket.update();

	// вставляем изображение
	// считаем, чтобы длина изображения была 20% от длины холста
	const w = (CANVAS_WIDTH / 100) * 15;
	const h = (img.height / img.width) * w;
	candle.update();
	candle.items.forEach(({ x, y, w, h, line, color }) => {
		ctx.fillStyle = color;
		ctx.strokeStyle = color;
		ctx.beginPath();
		ctx.moveTo(line?.x, line?.y1);
		ctx.lineTo(line?.x, line?.y2);
		ctx.stroke();
		ctx.fillRect(x, y, w, h);
	});
	ctx.drawImage(img, xRocket - w / 2, yRocket, w, h);
	console.log(candle.items);
	requestAnimationFrame(() => {
		drawScene(ctx, img);
	});
	// window.setTimeout(() => {
	// 	return null;
	// }, 4);
};

export default (canvasNode: HTMLCanvasElement, imgUrl: string): string => {
	const rocket = new Image();
	const ctx = canvasNode.getContext('2d')!;
	rocket.src = imgUrl;

	canvasNode.width = CANVAS_WIDTH;
	canvasNode.height = CANVAS_HEIGHT;
	rocket.addEventListener('load', () => {
		drawScene(ctx, rocket);
	});

	return 'yohoho';
};

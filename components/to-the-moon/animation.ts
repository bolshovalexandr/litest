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
const CANDLE_LINE_MAX_HEIGHT = CANVAS_HEIGHT * 0.8;
const CANDLE_WIDTH = 10;

// const TIME = 1200;

// Изменение координат ракеты
const rocket = {
	MIX_Y: 45,
	MAX_Y: 105,
	y: 51,
	yDirection: 'down',
	update() {
		if (this.yDirection === 'down' && this.y === this.MAX_Y) {
			this.yDirection = 'up';
		}
		if (this.yDirection === 'up' && this.y === this.MIX_Y) {
			this.yDirection = 'down';
		}
		this.y = this.y + (this.yDirection === 'down' ? 1.5 : -2);
		return this.y;
	}
};

/**
 * СВЕЧА - ИТЕРАЦИЯ
 *
 *
 */
const candleIteration = {
	x: 220,
	iterationRandom: Math.random(),
	// y: 0,
	update() {
		// получаем случайную высоту линии в пределах CANDLE_LINE_MAX_HEIGHT, считаем от нее тело свечи и случайно определяем цвет
		if (this.x === CANVAS_WIDTH) {
			this.x = 0;
			this.iterationRandom = Math.random();
		}
		this.x = this.x += 1;

		return {
			x: this.x,
			iterationRandom: this.iterationRandom
		};
	}
};

/**
 * мне нужен класс, объект которого будет возвращать массив координат для построения свечей
 * массив возвращается для каждого такта (requestAnimationFrame)
 * на каждый такт приходится набор свечей в соответствующих положениях
 *
 * конструктор принимает
 *
 */

/**
 * алгортим
 * - принимаем ширину холста и количество свечей
 * -
 */

class Candles {
	private readonly candleWidth = 20;
	private readonly candleHeight = 100;
	candles: {x: number, y: number, w: number, h: number}[] = [];

	constructor(private width: number, private quantity: number) {

	}

	private get first() {
		return {
			x: this.width + this.candleWidth,
			y: 20,
			w: this.candleWidth,
			h: this.candleHeight
		};
	}

	updateCoords() {
		this.candles.forEach(candle => candle.x--);
	}

	dropFirst() {}
	add() {}
}

/** рисуем свечу
 *
 *
 */
const getCandle = (ctx: CanvasRenderingContext2D, xCandle, heightCandle, colorCandle, candleLineOffsetTop) => {
	ctx.fillStyle = colorCandle;
	ctx.strokeStyle = colorCandle;

	// опорная линия
	// отступ сверху: (высота канваса - полная высота свечи) * случайную величину (пока, потом должна быть синусоида)
	ctx.beginPath();
	ctx.moveTo(CANVAS_WIDTH - xCandle + CANDLE_WIDTH / 2, candleLineOffsetTop);
	ctx.lineTo(CANVAS_WIDTH - xCandle + CANDLE_WIDTH / 2, candleLineOffsetTop + heightCandle);
	ctx.stroke();

	// тело свечи - прямоугольник
	const cBodyX = CANVAS_WIDTH - xCandle;
	const cBodyY = candleLineOffsetTop + 10;
	const cBodyW = CANDLE_WIDTH;
	const cBodyH = heightCandle - 20;
	ctx.fillRect(cBodyX, cBodyY, cBodyW, cBodyH);
};

// ======== 3 ОТРИСОВКА =======
const drawScene = (ctx: CanvasRenderingContext2D, img: HTMLImageElement) => {
	ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	const yRocket = rocket.update();

	// отрисовка порции свечей
	const candleSetRandom = Math.random();
	const candleCoords: {xCandle: number, heightCandle: number, colorCandle: 'red' | 'green', candleSetRandom: number, iterationRandom: number}[] = [];
	for (let i = 0; i < 6; i++) {
		const { x, iterationRandom } = candleIteration.update();
		const xCandle = x - i * 25;
		const colorCandle = candleSetRandom > 0.5 ? 'green' : 'red';
		const heightCandle = Math.floor(CANDLE_LINE_MAX_HEIGHT * iterationRandom);
		const candleLineOffsetTop = Math.floor((CANVAS_HEIGHT - heightCandle) * iterationRandom);

		candleCoords.push({ xCandle, heightCandle, colorCandle, candleLineOffsetTop });
	}
	console.log(candleCoords);

	candleCoords.forEach(({ xCandle, heightCandle, colorCandle, candleLineOffsetTop }) => {
		getCandle(ctx, xCandle, heightCandle, colorCandle, candleLineOffsetTop);
	});

	// вставляем изображение
	// считаем, чтобы длина изображения была 20% от длины холста
	const w = (CANVAS_WIDTH / 100) * 15;
	const h = (img.height / img.width) * w;
	ctx.drawImage(img, (CANVAS_WIDTH / 2) - w / 2, yRocket, w, h);

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

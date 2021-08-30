<template lang="pug">
	LitestWarpper
		.global-article
			h1 TypeScript: основы
			h2 Философия
			ul
				li tsc не компилятор, а транспилер - преобразователь кода на одном языке в код на другом
				li TS + JSDoc = интерактивная документация
				li типизация = соответствие типу (flag = true - это точно boolean) + расширение типа (от undefined до any) + сужение типа (защита, приведение типа к более конкретному, чем объявленный, напр. вычленение конкретного типа из объединения)
				li защита типа в основном - это уточняющие тип подсказки компилятору, реализованные средствами JS
				li типизация в TS структурная, пользвательские типы с разными именами эквивалентны при одинаковой структуре
			h2 Типы
			h3 Обзор типов
			ul
				li Базовые типы примитивов - соотносится с примитивами в JS (boolean, string, number и т.п)
				li Специальные базовые типы - any, never, unknown
				li Объединения (Union)
				li Кортежи (Tuple)
				li Пользовательские типы и интерфейсы
				li Перечисления (Enums)
				li Обобщения (Generics)
			h3 Примеры использования типов
			h4 Базовый тип never
			code(v-highlight class="typescript")
				pre.
					// тип never присваивается результату функции, которая никогда не дойдет до завершения
					// (бесконечные циклы, ловцы ошибок и т.п.)
					const logger = () => {
						while (true) {
							console.log("The server is up and running");
						}
					};
					// TS определит тип never для переменной data
					let data = logger();
			h4 Кортеж
			code(v-highlight class="typescript")
				pre.
					let arrOfMisc: [string, number] = [1, 2, 3, 'a', 'b'];
					// также можно использовать обобщение (Generics)
					let arrOfMisc2: Array&lt;number|string&gt; = [1, 2, 3, 'a', 'b'];
					let arrOfNumbers3: (number|string)[] = [1, 2, 3, 'a', 'b'];

			h4 Перечисления (Enums)
			code(v-highlight class="typescript")
				pre.
					enum Numbers {
							One,
							Two,
							Four = 4
					}
					console.log(Numbers.One);  // 0
					console.log(Numbers[0]);   // One
					console.log(Numbers.Four); // 4
					console.log(Numbers[4]);   // Four

			h4 Обобщение (Generic)
			ul
				li типы могу быть параметризированы - в качестве параметра можно передать тип, а не значение
				li обобщенными могут быть классы, функции и интерфейсы
				li обобщение — это часть кода, способная обрабатывать значения нескольких типов, которые указываются при использовании этого кода
				code(v-highlight class="typescript")
					pre.
						// указываем тип элемента массива
						const someValues: number[];
						// используем обобщенный тип Array, в который передаем параметр типа
						const someValues: Array&lt;number&gt;;
				li также корректно будет использовать подтип, если в обобщение был передан супертип (т.е. использовать расширенную версию), к тому же из-за структурной типизации, можно передать любой тип, схожий по составу
				code(v-highlight class="typescript")
					pre.
						class Person { name: string; }
						class Employee extends Person { department: number; }
						const workers: Array&lt;Person&gt; = [];
						workers[0] = new Person();
						workers[1] = new Employee();
				li пример использования обобщений в функциях и промисах
				code(v-highlight class="typescript")
					pre.
						function reverse&lt;T&gt;(arr: Array&lt;T&gt;) :Array&lt;T&gt; {									// функциональное объявление
							return arr.reverse();
						}
						const reverse = function&lt;T&gt;(arr:Array&lt;T&gt;):Array&lt;T&gt; {						// функциональное выражение
							return arr.reverse();
						}
						const reverse = &lt;T&gt;(arr: Array&lt;T&gt;): Array&lt;T&gt; =&gt; arr.reverse();  // стрелочная функция
						// Пример с промисом
						const pr = new Promise&lt;number&gt;((res, rej) =&gt; {
								setTimeout(() =&gt;  {
										res(200)
								}, 2000)
						});
						pr.then(data =&gt; data); // на data будет работать автокомплит
			h2 Интерфейсы
			h3 Обзор интерфейсов
			ul
				li интерфейс - это определение пользовательского типа данных без реализации
				li если вам нужен пользовательский тип, включающий конструктор, используйте класс; в противном случае используйте интерфейс
				li интерфейс обеспечивает выполнение определенного контракта
				li реализовать интерфейсы могут объекты, классы, массивы и функции
				li интерфейсы наследуются с помощью ключевого слова
					b &nbsp;extends
				li реализация классом интерфейса выполняется с помощью ключевого слова
					b &nbsp;implements
				li интерфейс массивов описывает их как объекты, к полям которых можно обращаться по индексу
			h4 реализация интефейса классом и наследование интерфейсов
			code(v-highlight class="typescript")
				pre.
					interface ICharacter{
							name: string;
					}
					interface ICat extends ICharacter {
							color: string;
					}
					interface ICheshir {
							flight: boolean;
							setOpacity(level: number) :number;
					}
					class MagicRedCat implements ICheshir, ICat {
							flight = false;
							name = 'Lewis';
							color = 'white';
							setOpacity(level: number) {
									return level;
							}
					}
			h4 реализация интефейса массивом (данный способ также подходит для объекта, кличи которого заранее не известны, но известен их тип)
			code(v-highlight class="typescript")
				pre.
					interface IArrayInt {
							[index:number]: number
					}
					const i:IArrayInt = [24, 42];
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import LitestWarpper from '~/components/litest/wrapper.vue';
@Component({ components: { LitestWarpper } })
export default class TSBasics extends Vue {}
</script>

<style lang="scss" scoped>
@import "../../assets/style/globals-litest.scss";
</style>

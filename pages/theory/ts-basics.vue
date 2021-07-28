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

			h2 Интерфейсы
			h3 Обзор интерфейсов
			ul
				li Интерфейс - это определение пользовательского типа данных без реализации
				li реализовать интерфейсы могут объекты, классы, массивы и функции
				li

</template>

<script lang="ts">
// TS
import Vue from 'vue';
import Component from 'vue-class-component';
// Глобальные компоненты
import LitestWarpper from '~/components/litest/wrapper.vue';
// Крафтовые компоненты
// Вспомогательные библиотеки

@Component({
	components: {
		LitestWarpper
	}
})
export default class TSBasics extends Vue {

}
</script>

<style lang="scss" scoped>
@import "../../assets/style/globals-litest.scss";
</style>

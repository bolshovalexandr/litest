<template lang="pug">
.codepen-frame
	client-only
		p.codepen(
			data-height="300"
			data-theme-id="light"
			data-default-tab="css,result"
			data-user="litest"
			style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;"
			:data-slug-hash="id"
		)

</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'nuxt-property-decorator';

@Component
export default class Toc extends Vue {
	@Prop({ type: String, required: true })
	id!: string;
}
</script>

<style lang="scss" scoped>
.codepen-frame {
	margin: 2rem 0 4rem;
}
</style>

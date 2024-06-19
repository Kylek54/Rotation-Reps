<script lang="ts" setup>
	import {computed, watch} from "vue"
	import { useCurrentClassStore, IAction } from "./../stores/current-class-store"
	import { storeToRefs } from "pinia";

    const { currentCast } = storeToRefs(useCurrentClassStore())

	watch(currentCast, () => {
		currentCast.value.casting = currentCast.value.castTime
		castbarCountdown(currentCast.value)
	})

    function castbarCountdown(castedSpell: IAction) {
		if (castedSpell.casting < 0.001 ) return useCurrentClassStore().resetCurrentCast()
		setTimeout(() => {
			castedSpell.casting -= 0.1
			castbarCountdown(castedSpell)
		}, 100)
    }

	const percentage = computed(() => {
		const current = (currentCast.value.casting / currentCast.value.castTime) * 100
		return 100 - current
	})
	 
</script>
<template>
	<div class="castbar" v-if="currentCast.casting">
		<div class="inner-bar" :style="{ 'width': percentage + '%' }"></div>
		<span>{{ currentCast.casting ? currentCast.casting.toFixed(1) : "" }}</span>
	</div>
</template>

<style scoped>
	.castbar{
		width: 300px;
		height: 50px;
		border: solid 2px black;

	}

	.inner-bar {
		transition: all 0.3s;
		height: 100%;
		background: theme("backgroundColor.red.500");
	}
</style>
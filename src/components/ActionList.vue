<script setup lang="ts">
import { useCurrentClassStore } from "../stores/current-class-store"
import DebuffList from "./DebuffList.vue"
import Castbar from "./Castbar.vue"
const currentClassStore = useCurrentClassStore()
</script>

<template>
    <DebuffList />
    <Castbar/>
    <button v-for="action in currentClassStore.actions" @click="currentClassStore.abilityUsed(action)"
        class="flex items-center justify-center h-24 w-24 bg-white">
        {{ action.actionName }}
    </button>
</template>
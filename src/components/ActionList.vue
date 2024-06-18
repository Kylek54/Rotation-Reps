<script setup lang="ts">
import { useCurrentClassStore } from "../stores/current-class-store"
import DebuffList from "./DebuffList.vue"
const currentClassStore = useCurrentClassStore()
</script>

<template>
    <div class="flex h-full justify-center items-center gap-10">
        <DebuffList />
        <button v-for="action in currentClassStore.actions" @click="currentClassStore.abilityUsed(action)"
            class="flex items-center justify-center h-24 w-24 bg-white">
            {{ action.actionName }}
        </button>
    </div>
</template>
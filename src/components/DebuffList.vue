<script lang="ts" setup>
import { useEnemyStore } from './../stores/enemy-store';
const enemyStore = useEnemyStore()
</script>

<template>
    <div>
        <div v-for="debuff in enemyStore.debuffList">
            {{ debuff.debuffName }} {{ debuff.debuffDuration }}
        </div>
    </div>
</template>
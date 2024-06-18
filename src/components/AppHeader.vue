<script lang="ts" setup>
import { useCurrentClassStore } from "../stores/current-class-store";
const currentClassStore = useCurrentClassStore();

</script>

<template>
    <section class="flex justify-between p-4">
        <div>
            <h1>Rotation Reps</h1>
            <h2>{{ currentClassStore.className }}</h2>
        </div>
        <div class="flex items-center gap-8">
            <nav>
                <ul class="flex gap-4">
                    <li>World of Warcraft (Coming Soon)</li>
                    <li>Final Fantasy XIV</li>
                </ul>
            </nav>
            <button class="bg-blue-500 px-4 py-2">Keybind Mode</button>
        </div>
    </section>
</template>